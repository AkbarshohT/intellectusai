export interface Assessment {
  id: string;
  topic: string;
  language: string;
  submittedAt: string;
  status: "completed" | "pending";
  score: number;
  verdict: string;
  subscores: {
    pace: { score: number; detail: string };
    fillerWords: { score: number; count: number; detail: string };
    pausesPacing: { score: number; detail: string };
    pronunciation: { score: number; detail: string };
    structure: { score: number; detail: string };
    energy: { score: number; detail: string };
  };
  strengths: string[];
  improvements: string[];
  fillerWordBreakdown: { word: string; count: number }[];
  relevanceScore: number;
  transcript: string;
}

export interface StudentSubmission {
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: "completed" | "pending";
  assessment?: Assessment;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  language: string;
  dueDate: string;
  totalStudents: number;
  submissions: StudentSubmission[];
}

export const sampleAssessment: Assessment = {
  id: "a1",
  topic: "How to save the environment",
  language: "English",
  submittedAt: "Jun 25, 2026, 10:40 PM",
  status: "completed",
  score: 82,
  verdict: "Strong delivery with room to tighten pacing.",
  subscores: {
    pace: { score: 70, detail: "142 words/min — slightly fast" },
    fillerWords: { score: 74, count: 12, detail: "12 filler words detected" },
    pausesPacing: { score: 85, detail: "Good use of pauses overall" },
    pronunciation: { score: 91, detail: "Clear and accurate throughout" },
    structure: { score: 88, detail: "Clear intro, body, and conclusion" },
    energy: { score: 80, detail: "Consistent energy with natural variation" },
  },
  strengths: [
    "Clear, confident opening that framed the topic in the first 15 seconds",
    "Excellent pronunciation clarity — audience would follow without effort",
    "Strong structural flow from intro through three body points to conclusion",
  ],
  improvements: [
    "Slow down slightly: aim for 120–130 words/min for better comprehension",
    "Replace filler words with short silent pauses — silence reads as confidence",
    "Vary vocal energy more in the conclusion to reinforce your key message",
  ],
  fillerWordBreakdown: [
    { word: "uh", count: 7 },
    { word: "like", count: 3 },
    { word: "you know", count: 2 },
  ],
  relevanceScore: 94,
  transcript:
    "Good afternoon, everyone. Today I want to talk about one of the most pressing challenges of our generation — saving the environment. Uh, over the past century, we've seen dramatic changes in climate patterns, biodiversity loss, and resource depletion. Like, the numbers are staggering. But the good news is, you know, we have the tools and knowledge to make a difference...\n\nFirst, let's look at individual actions. Reducing single-use plastics, choosing sustainable transport, and being mindful of energy consumption at home are all meaningful steps. Research shows that collective individual action can account for up to 30% of the emissions reductions we need by 2030...\n\nSecond, systemic change matters. We need to advocate for policies that hold corporations accountable, invest in renewable energy infrastructure, and phase out fossil fuel subsidies. This is where our voices as citizens and future professionals carry real weight...\n\nIn conclusion, saving the environment is not a single person's job — it requires coordinated action at every level. I encourage each of you to start where you are, with what you have, and make your next decision with the planet in mind. Thank you.",
};

export const studentAssessments: Assessment[] = [
  sampleAssessment,
  {
    id: "a2",
    topic: "Mustaqillik kuni nutqi",
    language: "Uzbek",
    submittedAt: "Jun 24, 2026, 03:15 PM",
    status: "completed",
    score: 76,
    verdict: "Solid content with good structure — work on filler words.",
    subscores: {
      pace: { score: 82, detail: "128 words/min — ideal range" },
      fillerWords: { score: 60, count: 19, detail: "19 filler words detected" },
      pausesPacing: { score: 78, detail: "Slightly uneven pause distribution" },
      pronunciation: { score: 88, detail: "Clear and accurate" },
      structure: { score: 84, detail: "Good intro and body, conclusion brief" },
      energy: { score: 72, detail: "Steady but could use more variation" },
    },
    strengths: [
      "Natural pace that keeps the audience engaged without rushing",
      "Strong command of Uzbek pronunciation and intonation",
      "Well-organized body section with distinct supporting points",
    ],
    improvements: [
      "Cut filler words — aim for under 10 per 5-minute speech",
      "Expand the conclusion with a clearer call to action",
      "Add deliberate pauses after key points to let ideas land",
    ],
    fillerWordBreakdown: [
      { word: "ya'ni", count: 9 },
      { word: "shunday", count: 6 },
      { word: "xo'p", count: 4 },
    ],
    relevanceScore: 97,
    transcript:
      "Assalomu alaykum, hurmatli tinglovchilar. Bugun men mustaqillik kuni haqida gaplashmoqchiman. Ya'ni, bu kun bizning milliy tariximizdagi eng muhim sanalardan biridir. Shunday qilib, 1991-yil 31-avgustda...",
  },
  {
    id: "a3",
    topic: "Marketing strategiyasi",
    language: "Uzbek",
    submittedAt: "Jun 23, 2026, 09:00 AM",
    status: "completed",
    score: 68,
    verdict: "Good ideas, but delivery needs more energy and structure.",
    subscores: {
      pace: { score: 65, detail: "158 words/min — too fast" },
      fillerWords: { score: 55, count: 24, detail: "24 filler words detected" },
      pausesPacing: { score: 60, detail: "Rushed sections with few pauses" },
      pronunciation: { score: 80, detail: "Mostly clear with some stumbles" },
      structure: { score: 70, detail: "Intro clear, body and conclusion rushed" },
      energy: { score: 75, detail: "Enthusiastic but uncontrolled" },
    },
    strengths: [
      "High energy and enthusiasm throughout the presentation",
      "Interesting and relevant content on digital marketing trends",
      "Good use of examples from real brand campaigns",
    ],
    improvements: [
      "Slow down significantly — at 158 wpm, key ideas are lost",
      "Restructure the body into 3 clear points with explicit transitions",
      "Practice breathing exercises to reduce filler words under pressure",
    ],
    fillerWordBreakdown: [
      { word: "ya'ni", count: 11 },
      { word: "um", count: 8 },
      { word: "shunday", count: 5 },
    ],
    relevanceScore: 89,
    transcript:
      "Salom hammaga. Bugun ya'ni marketing strategiyasi haqida gaplashaman. Um, zamonaviy marketing juda tez o'zgarmoqda. Shunday, digital platformalar katta rol o'ynamoqda...",
  },
];

export const professorAssignments: Assignment[] = [
  {
    id: "p1",
    title: "Presentation: How to save the environment",
    course: "COMM 301 — Public Speaking",
    language: "English",
    dueDate: "Jun 25, 2026",
    totalStudents: 30,
    submissions: [
      {
        studentId: "s1",
        studentName: "Dilnoza Karimova",
        submittedAt: "Jun 25, 09:12 PM",
        status: "completed",
        assessment: {
          ...sampleAssessment,
          id: "s1-a1",
          score: 91,
          verdict: "Outstanding delivery — clear, confident, and well-paced.",
          subscores: {
            pace: { score: 88, detail: "125 words/min — excellent pace" },
            fillerWords: { score: 92, count: 4, detail: "4 filler words detected" },
            pausesPacing: { score: 93, detail: "Excellent pause placement" },
            pronunciation: { score: 95, detail: "Precise and articulate" },
            structure: { score: 90, detail: "Perfect three-part structure" },
            energy: { score: 88, detail: "Compelling vocal variation" },
          },
          strengths: [
            "Near-flawless pacing with deliberate pauses that command attention",
            "Minimal filler words — only 4 detected across the full speech",
            "Crisp, engaging introduction that immediately established credibility",
          ],
          improvements: [
            "Slightly more vocal energy in the conclusion would elevate impact",
            "Consider adding a memorable closing quote or call to action",
            "A brief anecdote in the body would add personal connection",
          ],
        },
      },
      {
        studentId: "s2",
        studentName: "Jasur Toshev",
        submittedAt: "Jun 25, 08:40 PM",
        status: "completed",
        assessment: {
          ...sampleAssessment,
          id: "s2-a1",
          score: 88,
          verdict: "Strong and well-structured with minor pacing inconsistencies.",
          subscores: {
            pace: { score: 80, detail: "137 words/min — slightly fast" },
            fillerWords: { score: 85, count: 7, detail: "7 filler words detected" },
            pausesPacing: { score: 88, detail: "Good pauses, minor rushing at end" },
            pronunciation: { score: 92, detail: "Very clear pronunciation" },
            structure: { score: 90, detail: "Well-organized throughout" },
            energy: { score: 85, detail: "Good variation and enthusiasm" },
          },
          strengths: [
            "Confident and authoritative tone throughout the presentation",
            "Excellent pronunciation with no significant errors",
            "Strong, memorable opening with a compelling statistic",
          ],
          improvements: [
            "Slow down in the final third — rushing undermines your conclusion",
            "Replace 7 filler words with deliberate pauses",
            "Add more vocal energy at key transition points",
          ],
        },
      },
      {
        studentId: "s3",
        studentName: "Madina Yusupova",
        submittedAt: "Jun 24, 06:05 PM",
        status: "completed",
        assessment: {
          ...sampleAssessment,
          id: "s3-a1",
          score: 84,
          verdict: "Good delivery overall — strengthen the conclusion.",
          subscores: {
            pace: { score: 82, detail: "130 words/min — good pace" },
            fillerWords: { score: 78, count: 10, detail: "10 filler words detected" },
            pausesPacing: { score: 84, detail: "Consistent pacing" },
            pronunciation: { score: 88, detail: "Clear with minor stumbles" },
            structure: { score: 80, detail: "Strong intro, weaker conclusion" },
            energy: { score: 82, detail: "Solid energy throughout" },
          },
          strengths: [
            "Excellent opening hook that drew the audience in immediately",
            "Comfortable and natural speaking pace throughout",
            "Good use of specific data points to support arguments",
          ],
          improvements: [
            "Conclusion feels abrupt — expand with a stronger closing statement",
            "Reduce filler words from 10 to under 7",
            "Add more vocal variation in the middle section to maintain energy",
          ],
        },
      },
      {
        studentId: "s4",
        studentName: "Bobur Rahimov",
        submittedAt: "Jun 25, 07:22 PM",
        status: "completed",
        assessment: {
          ...sampleAssessment,
          id: "s4-a1",
          score: 79,
          verdict: "Competent delivery with noticeable filler word frequency.",
          subscores: {
            pace: { score: 75, detail: "145 words/min — slightly fast" },
            fillerWords: { score: 65, count: 16, detail: "16 filler words detected" },
            pausesPacing: { score: 78, detail: "Uneven pauses in body section" },
            pronunciation: { score: 85, detail: "Mostly clear delivery" },
            structure: { score: 82, detail: "Structured but transitions weak" },
            energy: { score: 80, detail: "Good energy with some monotony" },
          },
          strengths: [
            "Strong factual content demonstrating thorough research",
            "Clear pronunciation with good articulation",
            "Well-prepared transitions between main points",
          ],
          improvements: [
            "Filler words (16) significantly impact fluency — practice with recording",
            "Slow pace to 120–130 wpm to improve comprehension",
            "Work on distinct vocal emphasis at key moments",
          ],
        },
      },
      {
        studentId: "s5",
        studentName: "Sarvinoz Nazarova",
        submittedAt: "Jun 25, 10:11 AM",
        status: "completed",
        assessment: {
          ...sampleAssessment,
          id: "s5-a1",
          score: 74,
          verdict: "Adequate content but pacing and fillers need work.",
          subscores: {
            pace: { score: 68, detail: "152 words/min — fast" },
            fillerWords: { score: 62, count: 18, detail: "18 filler words detected" },
            pausesPacing: { score: 72, detail: "Few meaningful pauses" },
            pronunciation: { score: 82, detail: "Mostly clear delivery" },
            structure: { score: 78, detail: "Basic structure present" },
            energy: { score: 76, detail: "Consistent but flat energy" },
          },
          strengths: [
            "Clear topic focus maintained throughout the speech",
            "Good use of examples from everyday life",
            "Solid vocabulary range for the subject matter",
          ],
          improvements: [
            "Reduce pace to around 120 wpm — slow down and breathe",
            "Practice replacing fillers with pauses (18 fillers is high)",
            "Develop a stronger, more memorable conclusion",
          ],
        },
      },
      {
        studentId: "s6",
        studentName: "Sherzod Mirzayev",
        submittedAt: "Jun 24, 04:55 PM",
        status: "completed",
        assessment: {
          ...sampleAssessment,
          id: "s6-a1",
          score: 67,
          verdict: "Content is present but delivery needs significant improvement.",
          subscores: {
            pace: { score: 60, detail: "162 words/min — very fast" },
            fillerWords: { score: 55, count: 23, detail: "23 filler words detected" },
            pausesPacing: { score: 62, detail: "Very few strategic pauses" },
            pronunciation: { score: 75, detail: "Several unclear moments" },
            structure: { score: 70, detail: "Structure hard to follow" },
            energy: { score: 72, detail: "Nervous energy throughout" },
          },
          strengths: [
            "Clearly understands the topic and cares about the subject",
            "Good attempt at including supporting evidence",
            "Maintained eye contact and spoke clearly at points",
          ],
          improvements: [
            "Drastically slow down — 162 wpm makes comprehension very difficult",
            "23 filler words must be reduced — try recording and listening back",
            "Practice the speech 5–7 more times to build confidence and fluency",
          ],
        },
      },
      {
        studentId: "s7",
        studentName: "Feruza Abdullayeva",
        submittedAt: "Jun 24, 11:30 AM",
        status: "completed",
        assessment: {
          ...sampleAssessment,
          id: "s7-a1",
          score: 58,
          verdict: "Needs significant work on fluency, pace, and structure.",
          subscores: {
            pace: { score: 52, detail: "175 words/min — very fast" },
            fillerWords: { score: 45, count: 31, detail: "31 filler words detected" },
            pausesPacing: { score: 55, detail: "Almost no strategic pauses" },
            pronunciation: { score: 68, detail: "Multiple unclear moments" },
            structure: { score: 60, detail: "Intro unclear, no visible conclusion" },
            energy: { score: 65, detail: "Anxious energy limits impact" },
          },
          strengths: [
            "Shows genuine interest and passion for the topic",
            "Some good examples included in the middle section",
            "Finished the full allotted time showing commitment",
          ],
          improvements: [
            "Slow to 120 wpm — at 175 wpm, nearly all detail is lost",
            "31 filler words is very high — daily practice drills are strongly recommended",
            "Write and memorize a clear 3-sentence opening and closing",
          ],
        },
      },
      {
        studentId: "s8",
        studentName: "Ulugbek Xasanov",
        submittedAt: "Jun 23, 08:00 PM",
        status: "completed",
        assessment: {
          ...sampleAssessment,
          id: "s8-a1",
          score: 55,
          verdict: "Delivery struggles are significant — focused practice is essential.",
          subscores: {
            pace: { score: 48, detail: "180 words/min — extremely fast" },
            fillerWords: { score: 40, count: 37, detail: "37 filler words detected" },
            pausesPacing: { score: 50, detail: "No deliberate pauses detected" },
            pronunciation: { score: 65, detail: "Difficult to follow at points" },
            structure: { score: 58, detail: "No clear beginning or end" },
            energy: { score: 65, detail: "High anxiety evident in delivery" },
          },
          strengths: [
            "Content knowledge appears solid despite delivery challenges",
            "Attempted all required sections despite difficulty",
            "Spoke for the full required duration showing determination",
          ],
          improvements: [
            "Practice slowly — record yourself at 100 wpm before increasing",
            "37 filler words requires daily shadowing and recording exercises",
            "Work with the professor or speaking center before next assessment",
          ],
        },
      },
      {
        studentId: "s9",
        studentName: "Nilufar Qodirova",
        submittedAt: "",
        status: "pending",
      },
      {
        studentId: "s10",
        studentName: "Temur Rajabov",
        submittedAt: "",
        status: "pending",
      },
      {
        studentId: "s11",
        studentName: "Kamola Ergasheva",
        submittedAt: "",
        status: "pending",
      },
    ],
  },
  {
    id: "p2",
    title: "Persuasive Speech: Technology in Education",
    course: "COMM 201 — Intro to Speech",
    language: "Russian",
    dueDate: "Jun 28, 2026",
    totalStudents: 25,
    submissions: [
      {
        studentId: "t1",
        studentName: "Azizbek Tursunov",
        submittedAt: "Jun 25, 02:00 PM",
        status: "completed",
        assessment: { ...sampleAssessment, id: "t1-a1", score: 85 },
      },
    ],
  },
  {
    id: "p3",
    title: "Informative Presentation: Climate Science",
    course: "ENV 101 — Environmental Studies",
    language: "Uzbek",
    dueDate: "Jun 30, 2026",
    totalStudents: 28,
    submissions: [],
  },
];
