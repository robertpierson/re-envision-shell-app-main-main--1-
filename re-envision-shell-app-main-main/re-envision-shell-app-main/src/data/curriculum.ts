// Frontend placeholder for the full ReEnvision AI Literacy Curriculum.
export interface CourseUnit {
  id: string;
  title: string;
  lessonTitle: string;
  lessonDetail: string;
  lessonId: string;
  status: 'completed' | 'active' | 'upcoming';
  lessons: string[];
}

export interface Course {
  id: string;
  name: string;
  accent: string;
  units: CourseUnit[];
}

export const courses: Course[] = [
  {
    id: 'course-1',
    name: 'Course 1: Intro to AI',
    accent: 'from-blue-500 to-cyan-500',
    units: [
      {
        id: 'c1-u1',
        title: 'Unit 1 — What AI Actually Is',
        lessonTitle: 'Lesson 1 • AI vs Magic',
        lessonDetail: 'Pattern matching, not thinking. Learn the brief history and the black box concept.',
        lessonId: 'c1-l1',
        status: 'completed',
        lessons: ['AI vs. Magic', 'History', "'Black Box'", 'Myths'],
      },
      {
        id: 'c1-u2',
        title: 'Unit 2 — How Models "Read"',
        lessonTitle: 'Lesson 2 • Tokens & Pieces',
        lessonDetail: 'Why typos change answers and how context windows cause AI to forget lines.',
        lessonId: 'c1-l2',
        status: 'active',
        lessons: ['Tokens', 'Typos & Phrasing', 'Context Windows', 'Tokenize Hands-On'],
      },
      {
        id: 'c1-u3',
        title: 'Unit 3 — How Models Learn',
        lessonTitle: 'Lesson 3 • Datasets & Knobs',
        lessonDetail: 'Training on examples, dealing with biased datasets, and tweaking parameters.',
        lessonId: 'c1-l3',
        status: 'upcoming',
        lessons: ['Examples vs. Rules', 'Dataset & Bias', 'Parameters', 'Efficiency'],
      },
      {
        id: 'c1-u4',
        title: 'Unit 4 — Why AI Answers Your Way',
        lessonTitle: 'Lesson 4 • Next-Word Prediction',
        lessonDetail: 'Probability over certainty. Adjusting the temperature or randomness of responses.',
        lessonId: 'c1-l4',
        status: 'upcoming',
        lessons: ['Probability', 'Question Variation', 'Temperature', 'Comparison Hands-On'],
      },
      {
        id: 'c1-u5',
        title: 'Unit 5 — Where AI Breaks',
        lessonTitle: 'Lesson 5 • Hallucinations',
        lessonDetail: 'Why AI confidently makes up facts, fails math, and misses recent news.',
        lessonId: 'c1-l5',
        status: 'upcoming',
        lessons: ['Hallucination', 'Math/Fact Inaccuracy', 'News Lag', 'Spotting Mistakes'],
      },
      {
        id: 'c1-u6',
        title: 'Unit 6 — Algorithms in Your Life',
        lessonTitle: 'Lesson 6 • Content Feeds',
        lessonDetail: 'Personalization vs manipulation. Use "see the trick" to trace recommendation logic.',
        lessonId: 'c1-l6',
        status: 'upcoming',
        lessons: ['Feeds', 'Personalization', 'Recommendation Systems', 'Trace Hands-On'],
      },
      {
        id: 'c1-u7',
        title: 'Unit 7 — Wrap-Up & Mindset',
        lessonTitle: 'Lesson 7 • Capstone Quiz',
        lessonDetail: 'Critical trust framework. Evaluate when to rely on AI as a tool vs an authority.',
        lessonId: 'c1-l7',
        status: 'upcoming',
        lessons: ['Trust', 'AI Tool vs. Authority', 'Ethics', 'Capstone'],
      },
    ],
  },
  {
    id: 'course-2',
    name: 'Course 2: Prompting Effectively',
    accent: 'from-amber-500 to-orange-500',
    units: [
      {
        id: 'c2-u1',
        title: 'Unit 1 — The Basics of a Good Prompt',
        lessonTitle: 'Lesson 1 • Specific vs Vague',
        lessonDetail: 'Setting roles, establishing clear framing, and explicitly listing negative constraints.',
        lessonId: 'c2-l1',
        status: 'upcoming',
        lessons: ['Vague vs. Specific', 'Persona', 'Negative Constraints', 'Rewrite Hands-On'],
      },
      {
        id: 'c2-u2',
        title: 'Unit 2 — Giving Context',
        lessonTitle: 'Lesson 2 • Context Windows',
        lessonDetail: 'Providing missing background details and leveraging few-shot prompt examples.',
        lessonId: 'c2-l2',
        status: 'upcoming',
        lessons: ['Context', 'Background Info', 'Few-Shot', 'Comparison Hands-On'],
      },
      {
        id: 'c2-u3',
        title: 'Unit 3 — Controlling the Output',
        lessonTitle: 'Lesson 3 • Custom Formats',
        lessonDetail: 'Enforcing custom structures, setting maximum response sizes, and handling multi-options.',
        lessonId: 'c2-l3',
        status: 'upcoming',
        lessons: ['Output Formats', 'Length', 'Multiple Options', 'Format Hands-On'],
      },
      {
        id: 'c2-u4',
        title: 'Unit 4 — Iterating and Refining',
        lessonTitle: 'Lesson 4 • Conversations',
        lessonDetail: 'Treating AI as a dialogue layer instead of a basic vending machine.',
        lessonId: 'c2-l4',
        status: 'upcoming',
        lessons: ['Conversation', 'Follow-Up', 'Correction', 'Prompt Chain Hands-On'],
      },
      {
        id: 'c2-u5',
        title: 'Unit 5 — Thinking Step-by-Step',
        lessonTitle: 'Lesson 5 • Work Tracking',
        lessonDetail: 'Using multi-part prompt chains and forcing structural reasoning to block math errors.',
        lessonId: 'c2-l5',
        status: 'upcoming',
        lessons: ['Step-by-Step', 'Explain Reasoning', 'Reduce Mistakes', 'Multi-Part Hands-On'],
      },
      {
        id: 'c2-u6',
        title: 'Unit 6 — Spotting & Fixing Errors',
        lessonTitle: 'Lesson 6 • Double Checking',
        lessonDetail: 'Fact-checking system answers manually and writing clean self-validation loops.',
        lessonId: 'c2-l6',
        status: 'upcoming',
        lessons: ['Hallucination Application', 'Fact-Checking', 'Self-Correction', 'Error Finding Hands-On'],
      },
      {
        id: 'c2-u7',
        title: 'Unit 7 — Capstone Project',
        lessonTitle: 'Lesson 7 • Final Deployment',
        lessonDetail: 'Build a custom workflow execution task from scratch using refined prompt structures.',
        lessonId: 'c2-l7',
        status: 'upcoming',
        lessons: ['Plan Task', 'Draft/Output', 'Refine', 'Present'],
      },
    ],
  },
  {
    id: 'course-3',
    name: 'Course 3: AI/ML Sandbox',
    accent: 'from-violet-600 to-indigo-600',
    units: [
      {
        id: 'c3-u1',
        title: 'Unit 1 — What Training Means',
        lessonTitle: 'Lesson 1 • Sandbox Classifier',
        lessonDetail: 'How custom classifier layers process sample arrays inside our sandbox layout.',
        lessonId: 'c3-l1',
        status: 'upcoming',
        lessons: ['Recap', 'Classifier Definition', 'Interface Tour', 'Model Hands-On'],
      },
      {
        id: 'c3-u2',
        title: 'Unit 2 — Building Your First Model',
        lessonTitle: 'Lesson 2 • Asset Compilation',
        lessonDetail: 'Uploading data bundles and setting up an active baseline tracking run.',
        lessonId: 'c3-l2',
        status: 'upcoming',
        lessons: ['Task Selection', 'Data Collection', 'Model Training', '2-Category Hands-On'],
      },
      {
        id: 'c3-u3',
        title: 'Unit 3 — Testing & Breaking Models',
        lessonTitle: 'Lesson 3 • Bias Discovery',
        lessonDetail: 'Exposing hidden training limits using strict edge cases to watch models fail.',
        lessonId: 'c3-l3',
        status: 'upcoming',
        lessons: ['Testing', 'Error Reasons', 'Bias', 'Failure Hands-On'],
      },
      {
        id: 'c3-u4',
        title: 'Unit 4 — Improving Your Model',
        lessonTitle: 'Lesson 4 • Balance Adjustments',
        lessonDetail: 'Balancing tracking skew and deploying dataset updates safely.',
        lessonId: 'c3-l4',
        status: 'upcoming',
        lessons: ['More/Better Data', 'Category Balancing', 'Re-Testing', 'Accuracy Hands-On'],
      },
      {
        id: 'c3-u5',
        title: 'Unit 5 — Real-World Tie-In',
        lessonTitle: 'Lesson 5 • Algorithm Architecture',
        lessonDetail: 'Applying standard system structures directly to real-world content feeds.',
        lessonId: 'c3-l5',
        status: 'upcoming',
        lessons: ['Real-World Classifiers', 'Ethics', 'Brainstorm Hands-On'],
      },
      {
        id: 'c3-u6',
        title: 'Unit 6 — Capstone Build',
        lessonTitle: 'Lesson 6 • Complete Pipeline',
        lessonDetail: 'Assemble a final sandbox model from scratch and trace its execution tree.',
        lessonId: 'c3-l6',
        status: 'upcoming',
        lessons: ['Original Idea', 'Build/Train', 'Test/Refine', 'Present'],
      },
    ],
  },
];
