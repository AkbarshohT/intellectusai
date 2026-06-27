import { type Assessment } from "../data";

// Shape returned by the backend's POST /api/analyze on success.
export interface AnalyzeResponse {
  overall_score: number;
  pace: { wpm: number; note: string };
  filler_words: { count: number; examples: string[] };
  pauses: { score: number; note: string };
  pronunciation: { score: number; note: string };
  structure: { score: number; note: string };
  energy: { score: number; note: string };
  transcript: string;
  top_strengths: string[];
  top_improvements: string[];
  relevance_note: string;
}

const clamp = (n: number, lo = 0, hi = 100) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(n) ? n : 0)));

// The backend reports pace as words-per-minute + a note but no 0–100 score, so
// we derive one centred on a comfortable ~135 wpm for the breakdown gauge.
function paceScore(wpm: number): number {
  if (!Number.isFinite(wpm) || wpm <= 0) return 70;
  const diff = Math.abs(wpm - 135);
  return clamp(100 - diff * 0.8, 40, 100);
}

// Likewise the backend gives a filler-word count but no score; fewer is better.
function fillerScore(count: number): number {
  return clamp(100 - count * 3, 30, 100);
}

function verdictFor(score: number): string {
  if (score >= 85) return "Excellent delivery — polished, clear, and confident.";
  if (score >= 70) return "Strong delivery with a few areas to refine.";
  if (score >= 55) return "Solid effort — focus on the suggested improvements.";
  return "Delivery needs work — start with the improvements below.";
}

// The breakdown UI sums per-word counts to show the total. The backend only
// gives a total count plus example words, so distribute the count across the
// unique examples while keeping the sum equal to the real total.
function buildBreakdown(
  count: number,
  examples: string[],
): { word: string; count: number }[] {
  const uniq = [...new Set((examples || []).map((s) => String(s).trim()).filter(Boolean))];
  if (count <= 0) return [];
  if (uniq.length === 0) return [{ word: "filler", count }];
  if (count <= uniq.length) return uniq.slice(0, count).map((word) => ({ word, count: 1 }));
  const base = Math.floor(count / uniq.length);
  const rem = count % uniq.length;
  return uniq.map((word, i) => ({ word, count: base + (i < rem ? 1 : 0) }));
}

function padTo3(items: string[], fallback: string): string[] {
  const out = (items || []).filter((s) => typeof s === "string" && s.trim());
  while (out.length < 3) out.push(fallback);
  return out.slice(0, 3);
}

/**
 * Transform a backend AnalyzeResponse into the Assessment shape the Results
 * page already renders. Fields the backend doesn't provide (verdict, the pace
 * and filler 0–100 scores, a numeric relevance) are derived here so the shared
 * ResultsView component doesn't need to change.
 */
export function mapResponseToAssessment(
  res: AnalyzeResponse,
  topic: string,
  language: string,
): Assessment {
  const score = clamp(res.overall_score);
  const wpm = Math.round(Number(res.pace?.wpm) || 0);
  const fillerCount = Math.max(0, Math.round(Number(res.filler_words?.count) || 0));

  return {
    id: "live",
    topic: topic || "Untitled presentation",
    language,
    submittedAt: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    status: "completed",
    score,
    verdict: verdictFor(score),
    subscores: {
      pace: {
        score: paceScore(wpm),
        detail: `${wpm} words/min — ${res.pace?.note ?? ""}`.trim(),
      },
      fillerWords: {
        score: fillerScore(fillerCount),
        count: fillerCount,
        detail: `${fillerCount} filler words detected`,
      },
      pausesPacing: {
        score: clamp(res.pauses?.score),
        detail: res.pauses?.note ?? "",
      },
      pronunciation: {
        score: clamp(res.pronunciation?.score),
        detail: res.pronunciation?.note ?? "",
      },
      structure: {
        score: clamp(res.structure?.score),
        detail: res.structure?.note ?? "",
      },
      energy: {
        score: clamp(res.energy?.score),
        detail: res.energy?.note ?? "",
      },
    },
    strengths: padTo3(res.top_strengths, "—"),
    improvements: padTo3(res.top_improvements, "—"),
    fillerWordBreakdown: buildBreakdown(fillerCount, res.filler_words?.examples ?? []),
    // The backend returns relevance as a textual note rather than a number; the
    // gauge needs an integer, so we reuse the overall score as a stand-in.
    relevanceScore: score,
    transcript: res.transcript ?? "",
  };
}
