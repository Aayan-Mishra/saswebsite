export const faqCategories = [
  "All",
  "Enrolment",
  "Programs",
  "Fees",
  "Sessions",
  "Policies",
] as const;

export interface FaqItem {
  question: string;
  answer: string;
  category: (typeof faqCategories)[number];
}

export const faqItems: FaqItem[] = [
  {
    question: "How much do your tutoring programs cost?",
    answer:
      "Program fees range from $420 to $560 per term depending on the subject and program type. We also offer holiday intensives and one-on-one sessions at separate rates. All prices include lesson materials, progress reports, and access to our online learning portal.",
    category: "Fees",
  },
  {
    question: "What class formats do you offer?",
    answer:
      "We offer small-group classes (max 8 students per group), one-on-one private tutoring, and intensive holiday workshops. Each format is designed to suit different learning styles, goals, and schedules. Our team can help you choose the right format for your child.",
    category: "Programs",
  },
  {
    question: "Can my child try a session before enrolling?",
    answer:
      "Absolutely. We offer a free first session with no obligation. This gives your child the chance to meet their tutor, experience our teaching approach, and decide if we are the right fit — all before any commitment.",
    category: "Enrolment",
  },
  {
    question: "What year levels do you cater for?",
    answer:
      "We support students from Kindergarten through to Year 12. Our programs span early literacy and numeracy foundations through to HSC preparation. Each program is tailored to the specific developmental stage and academic requirements of the year level.",
    category: "Programs",
  },
  {
    question: "Do you help with OC Test preparation?",
    answer:
      "Yes. Our OC Preparation program is one of our flagship offerings. It covers all four test domains — reading, mathematical reasoning, thinking skills, and writing — with structured curriculum, regular mock tests, and personalised feedback. Many of our students secure placements at leading OC schools.",
    category: "Programs",
  },
  {
    question: "Do you prepare students for NAPLAN?",
    answer:
      "Our NAPLAN Success program targets students in Years 3, 5, 7, and 9. We provide test-specific practice, skill gap analysis, writing mastery coaching, and time management strategies. Our goal is not just strong results but genuine skill development that lasts beyond the test.",
    category: "Programs",
  },
  {
    question: "What about Selective High School preparation?",
    answer:
      "Our Selective Preparation program is our most comprehensive offering. It includes weekly 2-hour mastery sessions, full-length mock tests every 4-6 weeks, detailed performance analytics, and targeted feedback. With a 94% offer success rate, it is our most proven program.",
    category: "Programs",
  },
  {
    question: "What happens if my child misses a session?",
    answer:
      "We understand that life happens. Students can attend a make-up session in another class of the same level, subject to availability. We also provide lesson catch-up materials and summaries so no learning is lost. Please notify us at least 24 hours in advance where possible.",
    category: "Sessions",
  },
  {
    question: "Do you have a parent portal?",
    answer:
      "Yes. All enrolled families receive access to our online parent portal, where you can view lesson schedules, progress reports, performance data, invoices, and communicate directly with your child's tutor. We believe transparency is key to a successful tutoring partnership.",
    category: "Policies",
  },
  {
    question: "What is your refund and cancellation policy?",
    answer:
      "We offer a full 14-day satisfaction guarantee from the start of your first term. After this period, cancellations require 2 weeks' notice. Refunds for remaining prepaid sessions are processed within 5 business days. Holiday programs and intensives have a separate cancellation policy outlined at enrolment.",
    category: "Policies",
  },
  {
    question: "What qualifications do your tutors have?",
    answer:
      "All our tutors hold at minimum a bachelor's degree in their teaching subject, and many hold postgraduate qualifications. Each tutor undergoes a rigorous selection process, background checks, and ongoing professional development. Many are current or former classroom teachers who bring real school experience.",
    category: "Programs",
  },
  {
    question: "How much homework do students receive?",
    answer:
      "Students receive targeted homework after each session, typically requiring 30-60 minutes depending on the program and year level. Homework reinforces lesson content and builds independent study habits. We are mindful of balance and never assign busy work.",
    category: "Sessions",
  },
  {
    question: "How do you track and report student progress?",
    answer:
      "We provide detailed progress reports every term, including performance data, skill domain breakdowns, tutor comments, and recommended focus areas. Parents also receive weekly lesson summaries and can access real-time updates through the parent portal at any time.",
    category: "Sessions",
  },
  {
    question: "Do you run programs during school holidays?",
    answer:
      "Yes. We offer intensive holiday workshops that condense key learning into focused multi-day sessions. These are particularly popular for exam preparation (OC, Selective, NAPLAN) and for students who want to get ahead before the next term. Holiday programs are announced 6 weeks before each break.",
    category: "Programs",
  },
  {
    question: "How do I enrol my child?",
    answer:
      "Enrolling is simple. You can enrol online through our website, call our team, or visit any campus. We recommend booking a free assessment first so we can place your child in the right program and level. Start by booking a free session through our enrolment page.",
    category: "Enrolment",
  },
];
