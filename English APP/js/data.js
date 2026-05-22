  const CATEGORIES = [
  {
    "id": "common",
    "name": "Common Words",
    "icon": "💬",
    "color": "#8b5cf6"
  },
  {
    "id": "academic",
    "name": "Academic English",
    "icon": "🎓",
    "color": "#3b82f6"
  },
  {
    "id": "business",
    "name": "Business English",
    "icon": "💼",
    "color": "#06b6d4"
  },
  {
    "id": "travel",
    "name": "Travel & Culture",
    "icon": "✈️",
    "color": "#10b981"
  },
  {
    "id": "idioms",
    "name": "Idioms & Phrases",
    "icon": "🎭",
    "color": "#f59e0b"
  },
  {
    "id": "phrasal_verbs",
    "name": "Phrasal Verbs",
    "icon": "🔗",
    "color": "#ef4444"
  }
];

  const VOCABULARY = [
  {
    "id": "c1",
    "word": "Meticulous",
    "phonetic": "/məˈtɪk.jə.ləs/",
    "partOfSpeech": "adjective",
    "definition": "Showing great attention to detail; very careful and precise.",
    "example": "The designer paid meticulous attention to every pixel of the application.",
    "synonyms": [
      "diligent",
      "precise",
      "scrupulous"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c2",
    "word": "Resilient",
    "phonetic": "/rɪˈzɪl.jənt/",
    "partOfSpeech": "adjective",
    "definition": "Able to withstand or recover quickly from difficult conditions.",
    "example": "Despite multiple setbacks, the team remained resilient and finished the project.",
    "synonyms": [
      "strong",
      "tough",
      "adaptable"
    ],
    "category": "common",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "c3",
    "word": "Candid",
    "phonetic": "/ˈkæn.dɪd/",
    "partOfSpeech": "adjective",
    "definition": "Truthful and straightforward; frank.",
    "example": "During the interview, he gave a candid account of his previous mistakes.",
    "synonyms": [
      "honest",
      "sincere",
      "frank"
    ],
    "category": "common",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "c4",
    "word": "Eloquent",
    "phonetic": "/ˈel.ə.kwənt/",
    "partOfSpeech": "adjective",
    "definition": "Fluent or persuasive in speaking or writing.",
    "example": "The president delivered an eloquent speech that moved the entire audience.",
    "synonyms": [
      "persuasive",
      "expressive",
      "fluent"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c5",
    "word": "Pragmatic",
    "phonetic": "/præɡˈmæt.ɪk/",
    "partOfSpeech": "adjective",
    "definition": "Dealing with things sensibly and realistically in a way that is based on practical considerations.",
    "example": "We need to take a pragmatic approach to solve this coding error.",
    "synonyms": [
      "practical",
      "realistic",
      "sensible"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c6",
    "word": "Ambiguous",
    "phonetic": "/æmˈbɪɡ.ju.əs/",
    "partOfSpeech": "adjective",
    "definition": "Open to more than one interpretation; having a double meaning.",
    "example": "The instructions were ambiguous, leaving the students confused about the task.",
    "synonyms": [
      "unclear",
      "vague",
      "equivocal"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c7",
    "word": "Versatile",
    "phonetic": "/ˈvɜː.sə.taɪl/",
    "partOfSpeech": "adjective",
    "definition": "Able to adapt or be adapted to many different functions or activities.",
    "example": "A leather jacket is a versatile piece of clothing that fits many styles.",
    "synonyms": [
      "adaptable",
      "flexible",
      "all-around"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c8",
    "word": "Diligent",
    "phonetic": "/ˈdɪl.ɪ.dʒənt/",
    "partOfSpeech": "adjective",
    "definition": "Having or showing care and conscientiousness in one's work or duties.",
    "example": "She is a diligent student who always finishes her homework on time.",
    "synonyms": [
      "industrious",
      "hardworking",
      "assiduous"
    ],
    "category": "common",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "c9",
    "word": "Empathy",
    "phonetic": "/ˈem.pə.θi/",
    "partOfSpeech": "noun",
    "definition": "The ability to understand and share the feelings of another.",
    "example": "Great teachers show empathy and treat their students with kindness.",
    "synonyms": [
      "compassion",
      "sympathy",
      "understanding"
    ],
    "category": "common",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "c10",
    "word": "Integrity",
    "phonetic": "/ɪnˈteɡ.rə.ti/",
    "partOfSpeech": "noun",
    "definition": "The quality of being honest and having strong moral principles.",
    "example": "The politician was respected by everyone for his absolute integrity.",
    "synonyms": [
      "honesty",
      "probity",
      "rectitude"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c11",
    "word": "Subtle",
    "phonetic": "/ˈsʌt.əl/",
    "partOfSpeech": "adjective",
    "definition": "So delicate or precise as to be difficult to analyze or describe.",
    "example": "There was a subtle difference in the color shades of the two paintings.",
    "synonyms": [
      "delicate",
      "elusive",
      "understated"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c12",
    "word": "Vivid",
    "phonetic": "/ˈvɪv.ɪd/",
    "partOfSpeech": "adjective",
    "definition": "Producing powerful feelings or strong, clear images in the mind.",
    "example": "She gave a vivid description of her childhood home in Japan.",
    "synonyms": [
      "bright",
      "graphic",
      "lifelike"
    ],
    "category": "common",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "c13",
    "word": "Inevitable",
    "phonetic": "/ɪˈnev.ɪ.tə.bəl/",
    "partOfSpeech": "adjective",
    "definition": "Certain to happen; unavoidable.",
    "example": "As technology evolves, changes in the workforce are completely inevitable.",
    "synonyms": [
      "unavoidable",
      "certain",
      "escapable"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c14",
    "word": "Profound",
    "phonetic": "/prəˈfaʊnd/",
    "partOfSpeech": "adjective",
    "definition": "Very great or intense; having or showing great knowledge or insight.",
    "example": "His grandfather's advice had a profound influence on his career choice.",
    "synonyms": [
      "deep",
      "intense",
      "insightful"
    ],
    "category": "common",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "c15",
    "word": "Comprehensive",
    "phonetic": "/ˌkɒm.prɪˈhen.sɪv/",
    "partOfSpeech": "adjective",
    "definition": "Complete; including all or nearly all elements or aspects of something.",
    "example": "The handbook provides a comprehensive guide to English grammar.",
    "synonyms": [
      "thorough",
      "complete",
      "all-inclusive"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c16",
    "word": "Spontaneous",
    "phonetic": "/spɒnˈteɪ.ni.əs/",
    "partOfSpeech": "adjective",
    "definition": "Performed or occurring as a result of a sudden impulse or inclination.",
    "example": "The crowd erupted into spontaneous applause at the end of the concert.",
    "synonyms": [
      "impulsive",
      "unplanned",
      "extempore"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c17",
    "word": "Authentic",
    "phonetic": "/ɔːˈθen.tɪk/",
    "partOfSpeech": "adjective",
    "definition": "Of undisputed origin; genuine and real.",
    "example": "This restaurant serves authentic Italian pasta made from scratch.",
    "synonyms": [
      "genuine",
      "real",
      "bona fide"
    ],
    "category": "common",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "c18",
    "word": "Innovative",
    "phonetic": "/ˈɪn.ə.və.tɪv/",
    "partOfSpeech": "adjective",
    "definition": "Featuring new methods; advanced and original.",
    "example": "The startup won an award for its highly innovative mobile app design.",
    "synonyms": [
      "novel",
      "groundbreaking",
      "original"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "c19",
    "word": "Perspective",
    "phonetic": "/pəˈspek.tɪv/",
    "partOfSpeech": "noun",
    "definition": "A particular attitude toward or way of regarding something; a point of view.",
    "example": "Traveling is wonderful because it gives you a fresh perspective on life.",
    "synonyms": [
      "viewpoint",
      "outlook",
      "stance"
    ],
    "category": "common",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "c20",
    "word": "Fundamental",
    "phonetic": "/ˌfʌn.dəˈmen.təl/",
    "partOfSpeech": "adjective",
    "definition": "Serving as a primary source or basis; of central importance.",
    "example": "Reading books is fundamental to developing a strong English vocabulary.",
    "synonyms": [
      "basic",
      "essential",
      "core"
    ],
    "category": "common",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "c21",
    "word": "Alleviate",
    "phonetic": "/əˈliː.vi.eɪt/",
    "partOfSpeech": "verb",
    "definition": "Make suffering or a problem less severe.",
    "example": "A hot cup of chamomile tea will help alleviate your stress.",
    "synonyms": [
      "ease",
      "relieve",
      "mitigate"
    ],
    "category": "common",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "a1",
    "word": "Aberration",
    "phonetic": "/ˌæb.əˈreɪ.ʃən/",
    "partOfSpeech": "noun",
    "definition": "A departure from what is normal, usual, or expected, typically an unwelcome one.",
    "example": "The severe snowstorm in July was a weather aberration.",
    "synonyms": [
      "anomaly",
      "deviation",
      "irregularity"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a2",
    "word": "Paradigm",
    "phonetic": "/ˈpær.ə.daɪm/",
    "partOfSpeech": "noun",
    "definition": "A typical example or pattern of something; a model or archetype.",
    "example": "The scientist introduced a new paradigm that shifted how we view quantum fields.",
    "synonyms": [
      "model",
      "pattern",
      "standard"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "a3",
    "word": "Empirical",
    "phonetic": "/ɪmˈpɪr.ɪ.kəl/",
    "partOfSpeech": "adjective",
    "definition": "Based on, concerned with, or verifiable by observation or experience rather than theory.",
    "example": "We must collect empirical data before drawing a scientific conclusion.",
    "synonyms": [
      "observational",
      "factual",
      "experimental"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "a4",
    "word": "Hypothesis",
    "phonetic": "/haɪˈpɒθ.ə.sɪs/",
    "partOfSpeech": "noun",
    "definition": "A proposed explanation made on the basis of limited evidence as a starting point for investigation.",
    "example": "Our lab tests proved that our initial hypothesis was completely correct.",
    "synonyms": [
      "theory",
      "premise",
      "supposition"
    ],
    "category": "academic",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "a5",
    "word": "Ubiquitous",
    "phonetic": "/juːˈbɪk.wɪ.təs/",
    "partOfSpeech": "adjective",
    "definition": "Present, appearing, or found everywhere.",
    "example": "Computers and internet cafes have become completely ubiquitous in modern cities.",
    "synonyms": [
      "omnipresent",
      "pervasive",
      "widespread"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a6",
    "word": "Methodology",
    "phonetic": "/ˌmeθ.əˈdɒl.ə.dʒi/",
    "partOfSpeech": "noun",
    "definition": "A system of methods used in a particular area of study or activity.",
    "example": "The research paper detailed a rigorous methodology for collecting user feedback.",
    "synonyms": [
      "procedure",
      "technique",
      "strategy"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "C1"
  },
  {
    "id": "a7",
    "word": "Synthesis",
    "phonetic": "/ˈsɪn.θə.sɪs/",
    "partOfSpeech": "noun",
    "definition": "The combination of ideas to form a theory or system.",
    "example": "The essay was a beautiful synthesis of classical history and modern politics.",
    "synonyms": [
      "combination",
      "integration",
      "amalgamation"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "a8",
    "word": "Epistemology",
    "phonetic": "/ɪˌpɪs.təˈmɒl.ə.dʒi/",
    "partOfSpeech": "noun",
    "definition": "The theory of knowledge, especially with regard to its methods, validity, and scope.",
    "example": "Her philosophical dissertation focused on the epistemology of scientific theories.",
    "synonyms": [
      "philosophy of knowledge",
      "cognition theory"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C2"
  },
  {
    "id": "a9",
    "word": "Correlation",
    "phonetic": "/ˌcɒr.əˈleɪ.ʃən/",
    "partOfSpeech": "noun",
    "definition": "A mutual relationship or connection between two or more things.",
    "example": "There is a strong correlation between speaking practice and language fluency.",
    "synonyms": [
      "connection",
      "link",
      "association"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "a10",
    "word": "Dichotomy",
    "phonetic": "/daɪˈkɒt.ə.mi/",
    "partOfSpeech": "noun",
    "definition": "A division or contrast between two things that are represented as being opposed or entirely different.",
    "example": "He explored the rigid dichotomy between logic and human emotion.",
    "synonyms": [
      "division",
      "split",
      "gulf"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a11",
    "word": "Extrapolate",
    "phonetic": "/ɪkˈstræp.ə.leɪt/",
    "partOfSpeech": "verb",
    "definition": "Extend the application of a method or conclusion to an unknown situation by assuming that existing trends will continue.",
    "example": "We can extrapolate future sales based on our current database metrics.",
    "synonyms": [
      "project",
      "infer",
      "estimate"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a12",
    "word": "Juxtapose",
    "phonetic": "/ˌdʒʌk.stəˈpəʊz/",
    "partOfSpeech": "verb",
    "definition": "Place or deal with close together for contrasting effect.",
    "example": "The artist chose to juxtapose bright modern colors with dark ancient portraits.",
    "synonyms": [
      "contrast",
      "collocate",
      "compare"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a13",
    "word": "Proliferate",
    "phonetic": "/prəˈlɪf.ər.eɪt/",
    "partOfSpeech": "verb",
    "definition": "Increase rapidly in numbers; multiply.",
    "example": "Mobile educational apps continue to proliferate in the app marketplace.",
    "synonyms": [
      "multiply",
      "burgeon",
      "mushroom"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a14",
    "word": "Substantiate",
    "phonetic": "/səbˈstæn.ʃi.eɪt/",
    "partOfSpeech": "verb",
    "definition": "Provide evidence to support or prove the truth of.",
    "example": "You must provide references to substantiate the claims in your academic essay.",
    "synonyms": [
      "prove",
      "verify",
      "authenticate"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a15",
    "word": "Unprecedented",
    "phonetic": "/ʌnˈpres.ɪ.den.tɪd/",
    "partOfSpeech": "adjective",
    "definition": "Never done or known before.",
    "example": "The sudden surge in language learners was completely unprecedented in history.",
    "synonyms": [
      "unparalleled",
      "matchless",
      "novel"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "a16",
    "word": "Ameliorate",
    "phonetic": "/əˈmiː.li.ə.reɪt/",
    "partOfSpeech": "verb",
    "definition": "Make something bad or unsatisfactory better.",
    "example": "The local government implemented reform programs to ameliorate poverty.",
    "synonyms": [
      "improve",
      "better",
      "enhance"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a17",
    "word": "Conundrum",
    "phonetic": "/kəˈnʌn.drəm/",
    "partOfSpeech": "noun",
    "definition": "A confusing and difficult problem or question.",
    "example": "How to balance rapid economic growth with environmental safety is a major conundrum.",
    "synonyms": [
      "riddle",
      "puzzle",
      "enigma"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "a18",
    "word": "Delineate",
    "phonetic": "/dɪˈlɪn.i.eɪt/",
    "partOfSpeech": "verb",
    "definition": "Describe or portray something precisely.",
    "example": "The contract clearly delineates the duties and rights of each level.",
    "synonyms": [
      "outline",
      "depict",
      "define"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a19",
    "word": "Elucidate",
    "phonetic": "/iˈluː.sɪ.deɪt/",
    "partOfSpeech": "verb",
    "definition": "Make something clear; explain.",
    "example": "The professor gave a lecture to elucidate the complex theories of relativity.",
    "synonyms": [
      "explain",
      "clarify",
      "expound"
    ],
    "category": "academic",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "a20",
    "word": "Facilitate",
    "phonetic": "/fəˈsɪl.ɪ.teɪt/",
    "partOfSpeech": "verb",
    "definition": "Make an action or process easy or easier.",
    "example": "Structured grammar guidelines facilitate natural language acquisition.",
    "synonyms": [
      "assist",
      "aid",
      "promote"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "a21",
    "word": "Cohort",
    "phonetic": "/ˈkəʊ.hɔːt/",
    "partOfSpeech": "noun",
    "definition": "A group of people banded together or treated as a group.",
    "example": "The researcher tracked a cohort of 500 bilingual children over ten years.",
    "synonyms": [
      "group",
      "category",
      "band"
    ],
    "category": "academic",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b1",
    "word": "Leverage",
    "phonetic": "/ˈliː.vər.ɪdʒ/",
    "partOfSpeech": "verb",
    "definition": "Use something to maximum advantage.",
    "example": "We can leverage our marketing resources to expand our user base quickly.",
    "synonyms": [
      "utilize",
      "exploit",
      "use"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b2",
    "word": "Synergy",
    "phonetic": "/ˈsɪn.ə.dʒi/",
    "partOfSpeech": "noun",
    "definition": "The interaction or cooperation of two or more organizations or substances to produce a combined effect greater than the sum of their separate effects.",
    "example": "The synergy between the designers and engineers resulted in an extraordinary app.",
    "synonyms": [
      "cooperation",
      "collaboration",
      "alliance"
    ],
    "category": "business",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "b3",
    "word": "Scalable",
    "phonetic": "/ˈskeɪ.lə.bəl/",
    "partOfSpeech": "adjective",
    "definition": "Able to grow or adapt without losing efficiency.",
    "example": "Our database structure needs to be highly scalable as traffic increases.",
    "synonyms": [
      "expandable",
      "adaptable",
      "flexible"
    ],
    "category": "business",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "b4",
    "word": "Benchmark",
    "phonetic": "/ˈbentʃ.mɑːk/",
    "partOfSpeech": "noun",
    "definition": "A standard or point of reference against which things may be compared or assessed.",
    "example": "This new software sets a benchmark for all future applications.",
    "synonyms": [
      "standard",
      "criterion",
      "touchstone"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b5",
    "word": "Pivot",
    "phonetic": "/ˈpɪv.ət/",
    "partOfSpeech": "verb",
    "definition": "Completely change direction or strategy, especially in business.",
    "example": "The company decided to pivot from a desktop-only app to a mobile-first app.",
    "synonyms": [
      "turn",
      "shift",
      "redirect"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b6",
    "word": "Stakeholder",
    "phonetic": "/ˈsteɪkˌhəʊl.dər/",
    "partOfSpeech": "noun",
    "definition": "A person with an interest or concern in something, especially a business.",
    "example": "We held a conference to gather feedback from every key corporate stakeholder.",
    "synonyms": [
      "shareholder",
      "partner",
      "investor"
    ],
    "category": "business",
    "difficulty": 1,
    "level": "B2"
  },
  {
    "id": "b7",
    "word": "ROI",
    "phonetic": "/ˌɑːr.oʊˈaɪ/",
    "partOfSpeech": "noun",
    "definition": "Return on Investment; a measure of the profitability of an investment.",
    "example": "Investing in employee language training yields an impressive ROI.",
    "synonyms": [
      "profit",
      "return",
      "yield"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b8",
    "word": "Acquisition",
    "phonetic": "/ˌæk.wɪˈzɪʃ.ən/",
    "partOfSpeech": "noun",
    "definition": "An asset or object bought or obtained, typically by a library or museum.",
    "example": "The merger and acquisition of the smaller startup was completed yesterday.",
    "synonyms": [
      "purchase",
      "buyout",
      "merger"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b9",
    "word": "Diversify",
    "phonetic": "/daɪˈvɜː.sɪ.faɪ/",
    "partOfSpeech": "verb",
    "definition": "Enlarge or vary the range of products or field of operation.",
    "example": "The company decided to diversify its portfolio by launching a coffee-house line.",
    "synonyms": [
      "vary",
      "expand",
      "branch out"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b10",
    "word": "Equity",
    "phonetic": "/ˈek.wɪ.ti/",
    "partOfSpeech": "noun",
    "definition": "The value of the shares issued by a company; fairness and justice.",
    "example": "Early developers received significant equity in the growing startup company.",
    "synonyms": [
      "ownership",
      "shares",
      "fairness"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b11",
    "word": "Forecast",
    "phonetic": "/ˈfɔː.kɑːst/",
    "partOfSpeech": "noun",
    "definition": "A calculation or prediction of future events, especially business or weather.",
    "example": "Our revenue forecast shows a steady growth of ten percent over the next quarter.",
    "synonyms": [
      "prediction",
      "projection",
      "outlook"
    ],
    "category": "business",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "b12",
    "word": "Incentivize",
    "phonetic": "/ɪnˈsen.tɪ.vaɪz/",
    "partOfSpeech": "verb",
    "definition": "Provide someone with an incentive for doing something.",
    "example": "Startups often incentivize employees by offering flexible working hours.",
    "synonyms": [
      "encourage",
      "motivate",
      "stimulate"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b13",
    "word": "Logistics",
    "phonetic": "/ləˈdʒɪs.tɪks/",
    "partOfSpeech": "noun",
    "definition": "The detailed coordination of a complex operation involving many people, facilities, or supplies.",
    "example": "The logistics of delivering fresh coffee beans across the country are challenging.",
    "synonyms": [
      "organization",
      "coordination",
      "management"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b14",
    "word": "Monetize",
    "phonetic": "/ˈmʌn.ɪ.taɪz/",
    "partOfSpeech": "verb",
    "definition": "Convert into or express in the form of currency.",
    "example": "Many free mobile games monetize their platforms through in-app ads.",
    "synonyms": [
      "commercialize",
      "capitalize"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b15",
    "word": "Outsource",
    "phonetic": "/ˈaʊt.sɔːs/",
    "partOfSpeech": "verb",
    "definition": "Obtain goods or a service from an outside or foreign supplier.",
    "example": "We decided to outsource our customer support to a specialized foreign agency.",
    "synonyms": [
      "contract out",
      "delegate"
    ],
    "category": "business",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "b16",
    "word": "Portfolio",
    "phonetic": "/pɔːtˈfəʊ.li.ə/",
    "partOfSpeech": "noun",
    "definition": "A range of investments held by a person or organization.",
    "example": "You should build a strong design portfolio to showcase your creative skills.",
    "synonyms": [
      "credentials",
      "assets",
      "collection"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b17",
    "word": "Revenue",
    "phonetic": "/ˈrev.ən.juː/",
    "partOfSpeech": "noun",
    "definition": "Income, especially when of a company or organization.",
    "example": "The corporate revenue spiked after the launch of the new product.",
    "synonyms": [
      "income",
      "earnings",
      "turnover"
    ],
    "category": "business",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "b18",
    "word": "Turnaround",
    "phonetic": "/ˈtɜːn.ə.raʊnd/",
    "partOfSpeech": "noun",
    "definition": "An abrupt or unexpected change, especially one that results in a more favorable situation.",
    "example": "The company achieved a dramatic turnaround and became highly profitable.",
    "synonyms": [
      "recovery",
      "reversal",
      "improvement"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "b19",
    "word": "Venture",
    "phonetic": "/ˈven.tʃər/",
    "partOfSpeech": "noun",
    "definition": "A risky or daring journey or undertaking.",
    "example": "They launched a new joint venture to develop custom neural engines.",
    "synonyms": [
      "enterprise",
      "undertaking",
      "project"
    ],
    "category": "business",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "b20",
    "word": "Workflow",
    "phonetic": "/ˈwɜːk.fləʊ/",
    "partOfSpeech": "noun",
    "definition": "The sequence of industrial, administrative, or other processes through which a piece of work passes from initiation to completion.",
    "example": "Using a kanban board dramatically improved the engineering workflow.",
    "synonyms": [
      "operations",
      "procedure",
      "schedule"
    ],
    "category": "business",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "b21",
    "word": "Liability",
    "phonetic": "/ˌlaɪ.əˈbɪl.ə.ti/",
    "partOfSpeech": "noun",
    "definition": "The state of being responsible for something, especially by law.",
    "example": "The company accepted full liability for the defective batteries.",
    "synonyms": [
      "responsibility",
      "obligation",
      "debt"
    ],
    "category": "business",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "t1",
    "word": "Itinerary",
    "phonetic": "/aɪˈtɪn.ər.ər.i/",
    "partOfSpeech": "noun",
    "definition": "A planned route or journey.",
    "example": "We mapped out our detailed itinerary for the trip across Europe.",
    "synonyms": [
      "schedule",
      "route",
      "travel plan"
    ],
    "category": "travel",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "t2",
    "word": "Sojourn",
    "phonetic": "/ˈsɒdʒ.ɜːn/",
    "partOfSpeech": "noun",
    "definition": "A temporary stay.",
    "example": "Our quick sojourn in Paris was filled with art galleries and amazing food.",
    "synonyms": [
      "stay",
      "visit",
      "stopover"
    ],
    "category": "travel",
    "difficulty": 3,
    "level": "C1"
  },
  {
    "id": "t3",
    "word": "Wanderlust",
    "phonetic": "/ˈwɒn.də.lʌst/",
    "partOfSpeech": "noun",
    "definition": "A strong desire to travel.",
    "example": "Seeing pictures of the Himalayas rekindled my deep wanderlust.",
    "synonyms": [
      "restlessness",
      "travel bug"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "t4",
    "word": "Excursion",
    "phonetic": "/ɪkˈskɜː.ʃən/",
    "partOfSpeech": "noun",
    "definition": "A short journey or trip, especially one engaged in as a leisure activity.",
    "example": "We took a day-long excursion to the ancient Roman ruins.",
    "synonyms": [
      "outing",
      "trip",
      "expedition"
    ],
    "category": "travel",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "t5",
    "word": "Embark",
    "phonetic": "/ɪmˈbɑːk/",
    "partOfSpeech": "verb",
    "definition": "Go on board a ship, aircraft, or other vehicle; begin a course of action.",
    "example": "They are about to embark on a journey around the globe.",
    "synonyms": [
      "board",
      "commence",
      "start"
    ],
    "category": "travel",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "t6",
    "word": "Customs",
    "phonetic": "/ˈkʌs.təmz/",
    "partOfSpeech": "noun",
    "definition": "The official department that administers and collects duties on imported goods.",
    "example": "We had to pass through customs and declare our goods at the airport.",
    "synonyms": [
      "import taxes",
      "border control"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "t7",
    "word": "Layover",
    "phonetic": "/ˈleɪ.əʊ.vər/",
    "partOfSpeech": "noun",
    "definition": "A period of waiting between connections in travel.",
    "example": "I had a six-hour layover in Heathrow Airport and slept in the lounge.",
    "synonyms": [
      "stopover",
      "break",
      "connection"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "t8",
    "word": "Accommodation",
    "phonetic": "/əˌkɒm.əˈdeɪ.ʃən/",
    "partOfSpeech": "noun",
    "definition": "A room, group of rooms, or building in which someone may live or stay.",
    "example": "Finding affordable accommodation in London is extremely difficult.",
    "synonyms": [
      "lodging",
      "housing",
      "hotel"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "t9",
    "word": "Expedition",
    "phonetic": "/ˌek.spəˈdɪʃ.ən/",
    "partOfSpeech": "noun",
    "definition": "A journey or voyage undertaken by a group of people with a particular purpose.",
    "example": "The scientific expedition discovered three new species of deep-sea fish.",
    "synonyms": [
      "exploration",
      "safari",
      "crusade"
    ],
    "category": "travel",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "t10",
    "word": "Nomadic",
    "phonetic": "/nəʊˈmæd.ɪk/",
    "partOfSpeech": "adjective",
    "definition": "Living the life of a nomad; wandering.",
    "example": "Many software developers enjoy a nomadic lifestyle, traveling while working online.",
    "synonyms": [
      "wandering",
      "roving",
      "itinerant"
    ],
    "category": "travel",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "t11",
    "word": "Passport",
    "phonetic": "/ˈpɑːs.pɔːt/",
    "partOfSpeech": "noun",
    "definition": "An official document issued by a government, certifying the holder's identity.",
    "example": "Don't forget to pack your passport and boarding passes.",
    "synonyms": [
      "travel document",
      "ID"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "A1"
  },
  {
    "id": "t12",
    "word": "Destination",
    "phonetic": "/ˌdes.tɪˈneɪ.ʃən/",
    "partOfSpeech": "noun",
    "definition": "The place to which someone or something is going or being sent.",
    "example": "The tropical island of Bali is a highly popular holiday destination.",
    "synonyms": [
      "landing-place",
      "goal",
      "terminal"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "t13",
    "word": "Boarding",
    "phonetic": "/ˈbɔː.dɪŋ/",
    "partOfSpeech": "noun",
    "definition": "The action of getting on a ship, train, or plane.",
    "example": "Boarding will begin at gate number twelve in fifteen minutes.",
    "synonyms": [
      "embarking",
      "mounting"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "t14",
    "word": "Currency",
    "phonetic": "/ˈkʌr.ən.si/",
    "partOfSpeech": "noun",
    "definition": "A system of money in common use in a country.",
    "example": "The local currency in Japan is the Yen.",
    "synonyms": [
      "money",
      "cash",
      "coinage"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "t15",
    "word": "Luggage",
    "phonetic": "/ˈlʌɡ.ɪdʒ/",
    "partOfSpeech": "noun",
    "definition": "Suitcases or bags containing personal belongings.",
    "example": "The airline lost my luggage on my flight to Berlin.",
    "synonyms": [
      "baggage",
      "suitcases",
      "gear"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "t16",
    "word": "Reservation",
    "phonetic": "/ˌrez.əˈveɪ.ʃən/",
    "partOfSpeech": "noun",
    "definition": "An arrangement, especially in a hotel or restaurant, to have a room or table kept.",
    "example": "We made a dinner reservation at a cozy local coffee house.",
    "synonyms": [
      "booking",
      "appointment"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "t17",
    "word": "Terminal",
    "phonetic": "/ˈtɜː.mɪ.nəl/",
    "partOfSpeech": "noun",
    "definition": "A departure and arrival building at an airport.",
    "example": "International flights arrive at terminal three of Dubai Airport.",
    "synonyms": [
      "station",
      "depot"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "t18",
    "word": "Transit",
    "phonetic": "/ˈtræn.zɪt/",
    "partOfSpeech": "noun",
    "definition": "The carrying of people or goods from one place to another.",
    "example": "We are currently in transit, waiting for our connection in Doha.",
    "synonyms": [
      "transportation",
      "passage",
      "travel"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "t19",
    "word": "Visa",
    "phonetic": "/ˈviː.zə/",
    "partOfSpeech": "noun",
    "definition": "An endorsement on a passport indicating that the holder is allowed to enter, leave, or stay.",
    "example": "He applied for a tourist visa to visit New York City.",
    "synonyms": [
      "permit",
      "endorsement"
    ],
    "category": "travel",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "t20",
    "word": "Voyage",
    "phonetic": "/ˈvɔɪ.ɪdʒ/",
    "partOfSpeech": "noun",
    "definition": "A long journey involving travel by sea or in space.",
    "example": "The titanic set sail on its maiden voyage across the Atlantic in 1912.",
    "synonyms": [
      "cruise",
      "journey",
      "passage"
    ],
    "category": "travel",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "t21",
    "word": "Hospitality",
    "phonetic": "/ˌhɒs.pɪˈtæl.ə.ti/",
    "partOfSpeech": "noun",
    "definition": "The friendly and generous reception and entertainment of guests, visitors, or strangers.",
    "example": "We were blown away by the incredible warmth and hospitality of the locals.",
    "synonyms": [
      "friendliness",
      "generosity",
      "welcome"
    ],
    "category": "travel",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i1",
    "word": "Bite the bullet",
    "phonetic": "/baɪt ðə ˈbʊl.ɪt/",
    "partOfSpeech": "idiom",
    "definition": "Decide to do something difficult or unpleasant that one has been putting off.",
    "example": "I had to bite the bullet and tell the boss that we lost the project data.",
    "synonyms": [
      "face the music",
      "tough it out"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i2",
    "word": "Break the ice",
    "phonetic": "/breɪk ðə aɪs/",
    "partOfSpeech": "idiom",
    "definition": "Do or say something to relieve tension or get conversation started in a social situation.",
    "example": "He told a funny joke to break the ice at the start of the meeting.",
    "synonyms": [
      "start a conversation",
      "warm up"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i3",
    "word": "Cost an arm and a leg",
    "phonetic": "/kɒst ən ɑːm ænd ə leɡ/",
    "partOfSpeech": "idiom",
    "definition": "Be extremely expensive.",
    "example": "Buying a ticket to the final match is going to cost an arm and a leg.",
    "synonyms": [
      "exorbitant",
      "pricey"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i4",
    "word": "Once in a blue moon",
    "phonetic": "/wʌns ɪn ə bluː muːn/",
    "partOfSpeech": "idiom",
    "definition": "Very rarely.",
    "example": "My brother lives abroad, so we only see him once in a blue moon.",
    "synonyms": [
      "rarely",
      "seldom"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i5",
    "word": "Burn the midnight oil",
    "phonetic": "/bɜːn ðə ˈmɪd.naɪt ɔɪl/",
    "partOfSpeech": "idiom",
    "definition": "Read or work late into the night.",
    "example": "She was burning the midnight oil to prepare for her final presentation.",
    "synonyms": [
      "work late",
      "stay up late"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i6",
    "word": "Hit the nail on the head",
    "phonetic": "/hɪt ðə neɪl ɒn ðə hed/",
    "partOfSpeech": "idiom",
    "definition": "Describe exactly what is causing a situation or problem.",
    "example": "Your explanation of the bug completely hit the nail on the head.",
    "synonyms": [
      "be spot on",
      "be exactly right"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i7",
    "word": "Piece of cake",
    "phonetic": "/piːs ɒv keɪk/",
    "partOfSpeech": "idiom",
    "definition": "Something that is very easy to do.",
    "example": "Don't worry about the English test; it's going to be a piece of cake.",
    "synonyms": [
      "easy",
      "cinch",
      "breeze"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "i8",
    "word": "Under the weather",
    "phonetic": "/ˈʌn.dər ðə ˈweð.ər/",
    "partOfSpeech": "idiom",
    "definition": "Slightly unwell or in low spirits.",
    "example": "I'm feeling a bit under the weather today, so I won't make it to class.",
    "synonyms": [
      "ill",
      "unwell",
      "sick"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i9",
    "word": "Let the cat out of the bag",
    "phonetic": "/let ðə kæt aʊt ɒv ðə bæɡ/",
    "partOfSpeech": "idiom",
    "definition": "Reveal a secret, usually unintentionally.",
    "example": "We wanted the party to be a surprise, but my sister let the cat out of the bag.",
    "synonyms": [
      "reveal secret",
      "spill the beans"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i10",
    "word": "Speak of the devil",
    "phonetic": "/spiːk ɒv ðə ˈdev.əl/",
    "partOfSpeech": "idiom",
    "definition": "Said when a person appears just after being mentioned.",
    "example": "Did you hear about Tom? Oh, speak of the devil, here he comes!",
    "synonyms": [
      "on cue"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i11",
    "word": "The ball is in your court",
    "phonetic": "/ðə bɔːl ɪz ɪn jɔːr kɔːrt/",
    "partOfSpeech": "idiom",
    "definition": "It is up to you to take the next decision or step.",
    "example": "I offered my final proposal; now the ball is in your court.",
    "synonyms": [
      "your turn",
      "your move"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i12",
    "word": "Cut corners",
    "phonetic": "/cʌt ˈcɔː.nərz/",
    "partOfSpeech": "idiom",
    "definition": "Do something perfunctorily so as to save time or money.",
    "example": "Never cut corners when writing security code for the database.",
    "synonyms": [
      "skimp",
      "take shortcut"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i13",
    "word": "Get cold feet",
    "phonetic": "/ɡet kəʊld fiːt/",
    "partOfSpeech": "idiom",
    "definition": "Become nervous and lose courage to do something.",
    "example": "He wanted to do the bungee jump, but got cold feet at the last second.",
    "synonyms": [
      "chicken out",
      "back out"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i14",
    "word": "Go the extra mile",
    "phonetic": "/ɡəʊ ði ˈek.strə maɪl/",
    "partOfSpeech": "idiom",
    "definition": "Do more than what is expected to achieve something.",
    "example": "Cozy cafes succeed because they go the extra mile for customer service.",
    "synonyms": [
      "do utmost",
      "try harder"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i15",
    "word": "It takes two to tango",
    "phonetic": "/ɪt teɪks tuː tuː ˈtæŋ.ɡəʊ/",
    "partOfSpeech": "idiom",
    "definition": "Both parties involved in a difficult situation must share the blame.",
    "example": "They are blaming him for the argument, but it takes two to tango.",
    "synonyms": [
      "mutual blame",
      "co-operation"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i16",
    "word": "Jump on the bandwagon",
    "phonetic": "/dʒʌmp ɒn ðə ˈbændˌwæɡ.ən/",
    "partOfSpeech": "idiom",
    "definition": "Join a growing movement or trend that has become fashionable.",
    "example": "Many companies jump on the bandwagon of AI development without a clear plan.",
    "synonyms": [
      "follow fashion",
      "follow crowd"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i17",
    "word": "Kill two birds with one stone",
    "phonetic": "/kɪl tuː bɜːdz wɪð wʌn stəʊn/",
    "partOfSpeech": "idiom",
    "definition": "Achieve two objectives at the same time with a single action.",
    "example": "By reading books in English, you enjoy a good story and kill two birds with one stone.",
    "synonyms": [
      "dual reward",
      "double efficiency"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i18",
    "word": "Miss the boat",
    "phonetic": "/mɪs ðə bəʊt/",
    "partOfSpeech": "idiom",
    "definition": "Be too slow to take advantage of an opportunity.",
    "example": "If you don't buy the flight tickets now, you will completely miss the boat.",
    "synonyms": [
      "lose opportunity",
      "fail to act"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i19",
    "word": "Pull someone's leg",
    "phonetic": "/pʊl ˈsʌm.wʌnz leɡ/",
    "partOfSpeech": "idiom",
    "definition": "Tease or deceive someone playfully.",
    "example": "I didn't really win the lottery, I was just pulling your leg!",
    "synonyms": [
      "tease",
      "kid",
      "joke"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "i20",
    "word": "See eye to eye",
    "phonetic": "/siː aɪ tuː aɪ/",
    "partOfSpeech": "idiom",
    "definition": "Be in full agreement with someone.",
    "example": "My business partner and I rarely see eye to eye on corporate investments.",
    "synonyms": [
      "agree",
      "harmonize",
      "align"
    ],
    "category": "idioms",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "i21",
    "word": "Spill the beans",
    "phonetic": "/spɪl ðə biːnz/",
    "partOfSpeech": "idiom",
    "definition": "Reveal secret information, typically unintentionally.",
    "example": "Tell me what they bought me for my birthday! Come on, spill the beans!",
    "synonyms": [
      "let cat out of bag",
      "reveal secret"
    ],
    "category": "idioms",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "p1",
    "word": "Figure out",
    "phonetic": "/ˈfɪɡ.ər aʊt/",
    "partOfSpeech": "phrasal verb",
    "definition": "Solve or understand something after thinking about it.",
    "example": "I need to figure out why this javascript loop is running infinitely.",
    "synonyms": [
      "solve",
      "understand",
      "resolve"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "p2",
    "word": "Carry out",
    "phonetic": "/ˈcær.i aʊt/",
    "partOfSpeech": "phrasal verb",
    "definition": "Perform or complete a task, activity, or order.",
    "example": "The laboratory is ready to carry out the critical DNA experiments.",
    "synonyms": [
      "execute",
      "perform",
      "conduct"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "p3",
    "word": "Come across",
    "phonetic": "/kʌm əˈkrɒs/",
    "partOfSpeech": "phrasal verb",
    "definition": "Find or meet by chance.",
    "example": "While searching the old archives, I came across an ancient map.",
    "synonyms": [
      "encounter",
      "find",
      "discover"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "p4",
    "word": "Put off",
    "phonetic": "/pʊt ɒf/",
    "partOfSpeech": "phrasal verb",
    "definition": "Postpone an activity; delay doing something.",
    "example": "Don't put off studying until the night before the major exam.",
    "synonyms": [
      "postpone",
      "delay",
      "defer"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "p5",
    "word": "Look forward to",
    "phonetic": "/lʊk ˈfɔː.wəd tuː/",
    "partOfSpeech": "phrasal verb",
    "definition": "Await something with excitement or pleasure.",
    "example": "I am looking forward to hearing your presentation tomorrow.",
    "synonyms": [
      "anticipate",
      "await"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "p6",
    "word": "Break down",
    "phonetic": "/breɪk daʊn/",
    "partOfSpeech": "phrasal verb",
    "definition": "Stop functioning, especially a machine or vehicle.",
    "example": "Our espresso machine decided to break down right during the morning rush hour.",
    "synonyms": [
      "fail",
      "stop",
      "collapse"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "p7",
    "word": "Bring up",
    "phonetic": "/brɪŋ ʌp/",
    "partOfSpeech": "phrasal verb",
    "definition": "Raise a child; introduce a topic in conversation.",
    "example": "Why did you have to bring up our previous failures during the meeting?",
    "synonyms": [
      "introduce",
      "mention",
      "raise"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "p8",
    "word": "Cut off",
    "phonetic": "/cʌt ɒf/",
    "partOfSpeech": "phrasal verb",
    "definition": "Disconnect or interrupt someone speaking.",
    "example": "The phone connection cut off in the middle of our conversation.",
    "synonyms": [
      "disconnect",
      "interrupt",
      "sever"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B1"
  },
  {
    "id": "p9",
    "word": "Get along",
    "phonetic": "/ɡet əˈlɒŋ/",
    "partOfSpeech": "phrasal verb",
    "definition": "Have a harmonious or friendly relationship.",
    "example": "Our design and development teams get along exceptionally well.",
    "synonyms": [
      "harmonize",
      "be friendly"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "p10",
    "word": "Give up",
    "phonetic": "/ɡɪv ʌp/",
    "partOfSpeech": "phrasal verb",
    "definition": "Stop making an effort; resign oneself to failure.",
    "example": "Don't give up on learning English; consistency is key to fluency!",
    "synonyms": [
      "quit",
      "surrender",
      "concede"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "p11",
    "word": "Hold on",
    "phonetic": "/həʊld ɒn/",
    "partOfSpeech": "phrasal verb",
    "definition": "Wait for a short time.",
    "example": "Hold on a second, let me check the database query logs.",
    "synonyms": [
      "wait",
      "hang on"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "p12",
    "word": "Keep up",
    "phonetic": "/kiːp ʌp/",
    "partOfSpeech": "phrasal verb",
    "definition": "Move or progress at the same rate as someone or something.",
    "example": "It is hard to keep up with all the rapid innovations in AI technology.",
    "synonyms": [
      "maintain",
      "match",
      "continue"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "p13",
    "word": "Make up",
    "phonetic": "/meɪk ʌp/",
    "partOfSpeech": "phrasal verb",
    "definition": "Invent a story or excuse; reconcile after a quarrel.",
    "example": "He had to make up an excuse for why he was late to the interview.",
    "synonyms": [
      "invent",
      "fabricate",
      "reconcile"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "p14",
    "word": "Pass out",
    "phonetic": "/pɑːs aʊt/",
    "partOfSpeech": "phrasal verb",
    "definition": "Lose consciousness; distribute cards or flyers.",
    "example": "It was so hot inside the crowded subway that she almost passed out.",
    "synonyms": [
      "faint",
      "swoon",
      "distribute"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "p15",
    "word": "Pick up",
    "phonetic": "/pɪk ʌp/",
    "partOfSpeech": "phrasal verb",
    "definition": "Collect someone or something; acquire a skill easily.",
    "example": "Children pick up foreign languages much faster than adults.",
    "synonyms": [
      "collect",
      "acquire",
      "gather"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "p16",
    "word": "Run into",
    "phonetic": "/rʌn ˈɪn.tuː/",
    "partOfSpeech": "phrasal verb",
    "definition": "Meet someone by chance.",
    "example": "I was surprised to run into my old high school teacher at the library.",
    "synonyms": [
      "bump into",
      "encounter"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B1"
  },
  {
    "id": "p17",
    "word": "Set up",
    "phonetic": "/set ʌp/",
    "partOfSpeech": "phrasal verb",
    "definition": "Establish or organize a business, system, or meeting.",
    "example": "The technician is here to set up the new video conference equipment.",
    "synonyms": [
      "establish",
      "arrange",
      "install"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "B1"
  },
  {
    "id": "p18",
    "word": "Take off",
    "phonetic": "/teɪk ɒf/",
    "partOfSpeech": "phrasal verb",
    "definition": "Leave the ground and fly; become successful quickly.",
    "example": "The plane will take off as soon as the rainstorm stops.",
    "synonyms": [
      "depart",
      "soar",
      "succeed"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "p19",
    "word": "Turn down",
    "phonetic": "/tɜːn daʊn/",
    "partOfSpeech": "phrasal verb",
    "definition": "Reject an offer or proposal; decrease volume or heat.",
    "example": "She decided to turn down the job offer because the salary was too low.",
    "synonyms": [
      "reject",
      "refuse",
      "decline"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B2"
  },
  {
    "id": "p20",
    "word": "Work out",
    "phonetic": "/wɜːk aʊt/",
    "partOfSpeech": "phrasal verb",
    "definition": "Solve a problem; perform physical exercise.",
    "example": "I need to work out regular exercises to keep myself physically fit.",
    "synonyms": [
      "solve",
      "exercise",
      "resolve"
    ],
    "category": "phrasal_verbs",
    "difficulty": 1,
    "level": "A2"
  },
  {
    "id": "p21",
    "word": "Call off",
    "phonetic": "/cɔːl ɒf/",
    "partOfSpeech": "phrasal verb",
    "definition": "Cancel an event or agreement.",
    "example": "They had to call off the soccer match due to a torrential downpour.",
    "synonyms": [
      "cancel",
      "abort"
    ],
    "category": "phrasal_verbs",
    "difficulty": 2,
    "level": "B1"
  }
];

  const GRAMMAR_LESSONS = [
  {
    "id": "g1",
    "title": "Present Simple vs Present Continuous",
    "level": "beginner",
    "cefr": "A1",
    "description": "Master routines versus ongoing actions.",
    "icon": "🕒",
    "content": [
      {
        "type": "explanation",
        "title": "Present Simple",
        "text": "Used for permanent states, habits, routines, and universal truths. Keywords: always, usually, every day."
      },
      {
        "type": "explanation",
        "title": "Present Continuous",
        "text": "Used for temporary activities happening right now or around the present time. Keywords: now, at the moment, look!."
      },
      {
        "type": "tip",
        "text": "Stative verbs (like know, believe, understand, love) are never used in the continuous form! Say \"I know you,\" not \"I am knowing you.\""
      }
    ],
    "examples": [
      {
        "correct": "She drinks coffee every morning.",
        "incorrect": "She is drinking coffee every morning.",
        "explanation": "Drinking coffee in the morning is a habit/routine."
      },
      {
        "correct": "I am coding this app right now.",
        "incorrect": "I code this app right now.",
        "explanation": "The action is occurring at the current moment."
      }
    ],
    "exercises": [
      {
        "id": "g1_ex1",
        "type": "fill-blank",
        "sentence": "He usually ___ (play) football on Saturdays.",
        "answer": "plays",
        "options": [
          "plays",
          "is playing",
          "play",
          "played"
        ]
      },
      {
        "id": "g1_ex2",
        "type": "fill-blank",
        "sentence": "Listen! The phone ___ (ring).",
        "answer": "is ringing",
        "options": [
          "rings",
          "is ringing",
          "ring",
          "rang"
        ]
      },
      {
        "id": "g1_ex3",
        "type": "fill-blank",
        "sentence": "I ___ (know) the solution to this bug.",
        "answer": "know",
        "options": [
          "know",
          "am knowing",
          "knows",
          "knowing"
        ]
      },
      {
        "id": "g1_ex4",
        "type": "error-correction",
        "sentence": "I am wanting a slice of cake right now.",
        "corrected": "I want a slice of cake right now.",
        "explanation": "\"Want\" is a stative verb and shouldn't be in present continuous."
      }
    ]
  },
  {
    "id": "g2",
    "title": "Past Simple vs Past Continuous",
    "level": "beginner",
    "cefr": "A2",
    "description": "Describe actions in the past and background details.",
    "icon": "⏳",
    "content": [
      {
        "type": "explanation",
        "title": "Past Simple",
        "text": "Used for completed actions in the past. Shows a sequential story."
      },
      {
        "type": "explanation",
        "title": "Past Continuous",
        "text": "Used to describe a background activity in progress when another shorter action interrupted it."
      }
    ],
    "examples": [
      {
        "correct": "I was sleeping when the alarm went off.",
        "incorrect": "I slept when the alarm was going off.",
        "explanation": "Sleeping was in progress; the alarm interrupted it."
      }
    ],
    "exercises": [
      {
        "id": "g2_ex1",
        "type": "fill-blank",
        "sentence": "They ___ (watch) TV when I arrived.",
        "answer": "were watching",
        "options": [
          "watched",
          "were watching",
          "are watching",
          "watch"
        ]
      },
      {
        "id": "g2_ex2",
        "type": "fill-blank",
        "sentence": "She ___ (buy) a new laptop yesterday.",
        "answer": "bought",
        "options": [
          "buys",
          "bought",
          "buying",
          "was buying"
        ]
      },
      {
        "id": "g2_ex3",
        "type": "fill-blank",
        "sentence": "While I ___ (walk) down the street, it started to rain.",
        "answer": "was walking",
        "options": [
          "walked",
          "was walking",
          "walks",
          "walking"
        ]
      },
      {
        "id": "g2_ex4",
        "type": "error-correction",
        "sentence": "He was write a letter when I entered the room.",
        "corrected": "He was writing a letter when I entered the room.",
        "explanation": "Past continuous needs the -ing form of the verb."
      }
    ]
  },
  {
    "id": "g3",
    "title": "First and Second Conditionals",
    "level": "intermediate",
    "cefr": "B2",
    "description": "Express real possibilities and imaginary scenarios.",
    "icon": "🔀",
    "content": [
      {
        "type": "explanation",
        "title": "First Conditional (Real/Likely)",
        "text": "Form: If + Present Simple, Will + Verb. Expresses a highly possible future event."
      },
      {
        "type": "explanation",
        "title": "Second Conditional (Imaginary/Unlikely)",
        "text": "Form: If + Past Simple, Would + Verb. Expresses a hypothetical or unreal situation."
      }
    ],
    "examples": [
      {
        "correct": "If it rains tomorrow, we will stay home.",
        "incorrect": "If it will rain tomorrow, we will stay home.",
        "explanation": "The \"if\" clause uses present simple, not \"will\"."
      },
      {
        "correct": "If I won the lottery, I would travel the world.",
        "incorrect": "If I win the lottery, I would travel the world.",
        "explanation": "Hypothetical past matches \"would\"."
      }
    ],
    "exercises": [
      {
        "id": "g3_ex1",
        "type": "fill-blank",
        "sentence": "If I ___ (be) you, I would study harder.",
        "answer": "were",
        "options": [
          "am",
          "was",
          "were",
          "be"
        ]
      },
      {
        "id": "g3_ex2",
        "type": "fill-blank",
        "sentence": "If she has free time, she ___ (visit) us.",
        "answer": "will visit",
        "options": [
          "visits",
          "will visit",
          "would visit",
          "visited"
        ]
      },
      {
        "id": "g3_ex3",
        "type": "fill-blank",
        "sentence": "We will miss the train if we ___ (not hurry).",
        "answer": "don't hurry",
        "options": [
          "won't hurry",
          "don't hurry",
          "didn't hurry",
          "aren't hurrying"
        ]
      },
      {
        "id": "g3_ex4",
        "type": "error-correction",
        "sentence": "If I would have more money, I would buy that car.",
        "corrected": "If I had more money, I would buy that car.",
        "explanation": "In the \"if\" clause of second conditional, use past simple, not \"would\"."
      }
    ]
  },
  {
    "id": "g4",
    "title": "The Passive Voice",
    "level": "advanced",
    "cefr": "C1",
    "description": "Shifting the focus from the agent to the action.",
    "icon": "🛡️",
    "content": [
      {
        "type": "explanation",
        "title": "Active vs Passive",
        "text": "In the active voice, the subject performs the action. In the passive voice (Form: Be + Past Participle), the subject receives the action."
      },
      {
        "type": "tip",
        "text": "Use the passive voice when the agent is unknown, obvious, or less important than the action itself."
      }
    ],
    "examples": [
      {
        "correct": "The code was written by the lead developer.",
        "incorrect": "The code wrote by the lead developer.",
        "explanation": "The code is acted upon, requiring the passive voice."
      }
    ],
    "exercises": [
      {
        "id": "g4_ex1",
        "type": "fill-blank",
        "sentence": "The Mona Lisa ___ (paint) by Leonardo da Vinci.",
        "answer": "was painted",
        "options": [
          "painted",
          "was painted",
          "is painted",
          "has painted"
        ]
      },
      {
        "id": "g4_ex2",
        "type": "fill-blank",
        "sentence": "All database requests ___ (log) automatically.",
        "answer": "are logged",
        "options": [
          "log",
          "are logging",
          "are logged",
          "have logged"
        ]
      },
      {
        "id": "g4_ex3",
        "type": "fill-blank",
        "sentence": "This ancient temple ___ (build) thousands of years ago.",
        "answer": "was built",
        "options": [
          "built",
          "was built",
          "has been built",
          "is built"
        ]
      },
      {
        "id": "g4_ex4",
        "type": "error-correction",
        "sentence": "English is speak all over the world.",
        "corrected": "English is spoken all over the world.",
        "explanation": "Passive voice requires \"be\" + past participle (spoken)."
      }
    ]
  },
  {
    "id": "g5",
    "title": "Present Perfect vs Past Simple",
    "level": "beginner",
    "cefr": "B1",
    "description": "Connect the past to the present or specify a finished time.",
    "icon": "🔗",
    "content": [
      {
        "type": "explanation",
        "title": "Present Perfect Simple",
        "text": "Used for actions that happened at an unspecified time in the past, or have a direct result in the present. Form: Has/Have + Past Participle."
      },
      {
        "type": "explanation",
        "title": "Past Simple",
        "text": "Used for completed actions at a specific time in the past. Keywords: yesterday, in 2020, last year."
      }
    ],
    "examples": [
      {
        "correct": "I have lost my passport! I cannot travel.",
        "incorrect": "I lost my passport yesterday! I cannot travel.",
        "explanation": "If it just happened or has present consequence, use present perfect."
      }
    ],
    "exercises": [
      {
        "id": "g5_ex1",
        "type": "fill-blank",
        "sentence": "I ___ (live) in Rome for three years, but now I live in Paris.",
        "answer": "lived",
        "options": [
          "have lived",
          "lived",
          "am living",
          "was living"
        ]
      },
      {
        "id": "g5_ex2",
        "type": "fill-blank",
        "sentence": "They ___ (not arrive) yet; the plane is delayed.",
        "answer": "haven't arrived",
        "options": [
          "didn't arrive",
          "haven't arrived",
          "don't arrive",
          "hadn't arrived"
        ]
      },
      {
        "id": "g5_ex3",
        "type": "fill-blank",
        "sentence": "She ___ (visit) London twice this year.",
        "answer": "has visited",
        "options": [
          "visited",
          "has visited",
          "visits",
          "visiting"
        ]
      },
      {
        "id": "g5_ex4",
        "type": "error-correction",
        "sentence": "I have seen him yesterday at the coffee house.",
        "corrected": "I saw him yesterday at the coffee house.",
        "explanation": "Yesterday specifies a finished past time, which requires past simple."
      }
    ]
  },
  {
    "id": "g6",
    "title": "Future Forms: Will vs Going To",
    "level": "beginner",
    "cefr": "A2",
    "description": "Talk about future plans, predictions, and sudden decisions.",
    "icon": "🔮",
    "content": [
      {
        "type": "explanation",
        "title": "Future with \"Will\"",
        "text": "Used for spontaneous decisions made at the moment of speaking, or general predictions without concrete proof."
      },
      {
        "type": "explanation",
        "title": "Future with \"Going To\"",
        "text": "Used for predefined plans/intentions, or predictions based on clear, present physical evidence."
      }
    ],
    "examples": [
      {
        "correct": "Look at those dark clouds! It is going to rain.",
        "incorrect": "Look at those dark clouds! It will rain.",
        "explanation": "Physical evidence (dark clouds) requires \"going to\"."
      }
    ],
    "exercises": [
      {
        "id": "g6_ex1",
        "type": "fill-blank",
        "sentence": "Oh, you don't have money? I ___ (lend) you some.",
        "answer": "will lend",
        "options": [
          "will lend",
          "am going to lend",
          "lend",
          "lending"
        ]
      },
      {
        "id": "g6_ex2",
        "type": "fill-blank",
        "sentence": "We ___ (buy) a new car next month; we've saved up for it.",
        "answer": "are going to buy",
        "options": [
          "will buy",
          "are going to buy",
          "buy",
          "buying"
        ]
      },
      {
        "id": "g6_ex3",
        "type": "fill-blank",
        "sentence": "I think that humans ___ (land) on Mars in the next decade.",
        "answer": "will land",
        "options": [
          "will land",
          "are going to land",
          "lands",
          "landed"
        ]
      },
      {
        "id": "g6_ex4",
        "type": "error-correction",
        "sentence": "I decided. I will study English tonight.",
        "corrected": "I decided. I am going to study English tonight.",
        "explanation": "Pre-planned intentions use \"going to\"."
      }
    ]
  },
  {
    "id": "g7",
    "title": "Articles: A, An, The",
    "level": "intermediate",
    "cefr": "B1",
    "description": "Use definite and indefinite articles accurately.",
    "icon": "📰",
    "content": [
      {
        "type": "explanation",
        "title": "Indefinite Articles (A / An)",
        "text": "Used for non-specific, singular countable nouns. \"An\" is used before vowel sounds."
      },
      {
        "type": "explanation",
        "title": "Definite Article (The)",
        "text": "Used when both the speaker and listener know exactly which specific item is referred to, or when it is unique."
      }
    ],
    "examples": [
      {
        "correct": "He ordered a coffee. The coffee was delicious.",
        "incorrect": "He ordered the coffee. A coffee was delicious.",
        "explanation": "First mention uses \"a\"; second mention uses \"the\" as it is now specific."
      }
    ],
    "exercises": [
      {
        "id": "g7_ex1",
        "type": "fill-blank",
        "sentence": "She has ___ (honest) opinion about the merger.",
        "answer": "an honest",
        "options": [
          "a honest",
          "an honest",
          "the honest",
          "honest"
        ]
      },
      {
        "id": "g7_ex2",
        "type": "fill-blank",
        "sentence": "Look up at ___ (moon) tonight!",
        "answer": "the moon",
        "options": [
          "a moon",
          "an moon",
          "the moon",
          "moon"
        ]
      },
      {
        "id": "g7_ex3",
        "type": "fill-blank",
        "sentence": "I would love to buy ___ (new computer).",
        "answer": "a new computer",
        "options": [
          "a new computer",
          "an new computer",
          "the new computer",
          "new computer"
        ]
      },
      {
        "id": "g7_ex4",
        "type": "error-correction",
        "sentence": "He is a engineer working at the startup.",
        "corrected": "He is an engineer working at the startup.",
        "explanation": "\"Engineer\" starts with a vowel sound, requiring \"an\"."
      }
    ]
  },
  {
    "id": "g8",
    "title": "Prepositions of Time and Place",
    "level": "intermediate",
    "cefr": "A2",
    "description": "Perfect your usage of in, on, and at for time and locations.",
    "icon": "📍",
    "content": [
      {
        "type": "explanation",
        "title": "Time Prepositions",
        "text": "IN: centuries, decades, years, months, parts of the day. ON: days, dates. AT: specific clock times, holiday periods."
      },
      {
        "type": "explanation",
        "title": "Place Prepositions",
        "text": "IN: enclosed spaces, cities, countries. ON: surfaces, streets, public transport. AT: specific points, events, addresses."
      }
    ],
    "examples": [
      {
        "correct": "I will meet you at the cafe on Friday.",
        "incorrect": "I will meet you in the cafe in Friday.",
        "explanation": "Specific location points use \"at\"; days of the week use \"on\"."
      }
    ],
    "exercises": [
      {
        "id": "g8_ex1",
        "type": "fill-blank",
        "sentence": "The meeting starts ___ (9:00 AM).",
        "answer": "at 9:00 AM",
        "options": [
          "in 9:00 AM",
          "on 9:00 AM",
          "at 9:00 AM",
          "by 9:00 AM"
        ]
      },
      {
        "id": "g8_ex2",
        "type": "fill-blank",
        "sentence": "We went for a walk ___ (a sunny afternoon).",
        "answer": "on a sunny afternoon",
        "options": [
          "in a sunny afternoon",
          "on a sunny afternoon",
          "at a sunny afternoon",
          "during a sunny afternoon"
        ]
      },
      {
        "id": "g8_ex3",
        "type": "fill-blank",
        "sentence": "She lives ___ (Berlin, Germany).",
        "answer": "in Berlin",
        "options": [
          "at Berlin",
          "on Berlin",
          "in Berlin",
          "to Berlin"
        ]
      },
      {
        "id": "g8_ex4",
        "type": "error-correction",
        "sentence": "My birthday is at July 12th.",
        "corrected": "My birthday is on July 12th.",
        "explanation": "Calendar dates require \"on\"."
      }
    ]
  },
  {
    "id": "g9",
    "title": "Modal Verbs: Ability, Obligation & Advice",
    "level": "intermediate",
    "cefr": "B2",
    "description": "Use modal auxiliary verbs for permission, duty, and possibilities.",
    "icon": "🗣️",
    "content": [
      {
        "type": "explanation",
        "title": "Obligation and Advice",
        "text": "MUST/HAVE TO express strong obligation. SHOULD expresses recommendation or advice."
      },
      {
        "type": "explanation",
        "title": "Permission and Possibility",
        "text": "CAN/MAY represent ability or permission. MIGHT/COULD represent remote future possibility."
      }
    ],
    "examples": [
      {
        "correct": "You should study vocabulary daily if you want to improve.",
        "incorrect": "You must to study vocabulary daily if you want to improve.",
        "explanation": "\"Must\" is modal and takes the bare infinitive without \"to\"."
      }
    ],
    "exercises": [
      {
        "id": "g9_ex1",
        "type": "fill-blank",
        "sentence": "You ___ (not smoke) inside the library.",
        "answer": "must not",
        "options": [
          "should not",
          "must not",
          "don't have to",
          "could not"
        ]
      },
      {
        "id": "g9_ex2",
        "type": "fill-blank",
        "sentence": "If you feel sick, you ___ (see) a doctor.",
        "answer": "should see",
        "options": [
          "should see",
          "must to see",
          "ought see",
          "will to see"
        ]
      },
      {
        "id": "g9_ex3",
        "type": "fill-blank",
        "sentence": "I ___ (speak) three languages fluently.",
        "answer": "can speak",
        "options": [
          "can speak",
          "must speak",
          "should to speak",
          "may to speak"
        ]
      },
      {
        "id": "g9_ex4",
        "type": "error-correction",
        "sentence": "She can writes very clean JavaScript code.",
        "corrected": "She can write very clean JavaScript code.",
        "explanation": "Modal verbs must be followed by a bare infinitive without \"-s\"."
      }
    ]
  },
  {
    "id": "g10",
    "title": "Third and Mixed Conditionals",
    "level": "advanced",
    "cefr": "C1",
    "description": "Talk about past regrets and hypothetical present results.",
    "icon": "🌀",
    "content": [
      {
        "type": "explanation",
        "title": "Third Conditional (Past Hypotheses)",
        "text": "Form: If + Past Perfect, Would Have + Past Participle. Expresses imaginary past situations and their past results."
      },
      {
        "type": "explanation",
        "title": "Mixed Conditionals",
        "text": "Combines different times. Example: If + Past Perfect, Would + Verb. Expresses a hypothetical past condition with a present impact."
      }
    ],
    "examples": [
      {
        "correct": "If I had studied harder, I would have passed the exam.",
        "incorrect": "If I would have studied harder, I would pass the exam.",
        "explanation": "Third conditional requires past perfect in the \"if\" clause."
      }
    ],
    "exercises": [
      {
        "id": "g10_ex1",
        "type": "fill-blank",
        "sentence": "If we ___ (leave) earlier, we wouldn't have missed our flight.",
        "answer": "had left",
        "options": [
          "left",
          "had left",
          "have left",
          "would have left"
        ]
      },
      {
        "id": "g10_ex2",
        "type": "fill-blank",
        "sentence": "If she had won the award, she ___ (be) famous now.",
        "answer": "would be",
        "options": [
          "would be",
          "would have been",
          "will be",
          "is"
        ]
      },
      {
        "id": "g10_ex3",
        "type": "fill-blank",
        "sentence": "I ___ (help) you if you had asked me.",
        "answer": "would have helped",
        "options": [
          "would help",
          "would have helped",
          "helped",
          "had helped"
        ]
      },
      {
        "id": "g10_ex4",
        "type": "error-correction",
        "sentence": "If you would have told me about the meeting, I would have come.",
        "corrected": "If you had told me about the meeting, I would have come.",
        "explanation": "Do not use \"would\" in the \"if\" clause of conditionals."
      }
    ]
  },
  {
    "id": "g11",
    "title": "Reported Speech",
    "level": "advanced",
    "cefr": "B2",
    "description": "Transform direct speech into indirect speech reports.",
    "icon": "🗣️",
    "content": [
      {
        "type": "explanation",
        "title": "Tense Backshift",
        "text": "When reporting what someone said in the past, tenses shift backward. Present Simple becomes Past Simple, Present Perfect becomes Past Perfect, will becomes would."
      },
      {
        "type": "tip",
        "text": "Pronouns, place, and time markers must also shift. \"Yesterday\" becomes \"the day before\"; \"here\" becomes \"there\"."
      }
    ],
    "examples": [
      {
        "correct": "He said he was writing a new app.",
        "incorrect": "He said I am writing a new app.",
        "explanation": "\"I am\" shifts backward in reported speech to \"he was\"."
      }
    ],
    "exercises": [
      {
        "id": "g11_ex1",
        "type": "fill-blank",
        "sentence": "\"I live in Tokyo.\" -> He told me that he ___ in Tokyo.",
        "answer": "lived",
        "options": [
          "lives",
          "lived",
          "had lived",
          "was living"
        ]
      },
      {
        "id": "g11_ex2",
        "type": "fill-blank",
        "sentence": "\"We have finished the task.\" -> They said they ___ the task.",
        "answer": "had finished",
        "options": [
          "finished",
          "have finished",
          "had finished",
          "would finish"
        ]
      },
      {
        "id": "g11_ex3",
        "type": "fill-blank",
        "sentence": "\"Where do you work?\" -> She asked me where I ___.",
        "answer": "worked",
        "options": [
          "work",
          "do work",
          "worked",
          "had worked"
        ]
      },
      {
        "id": "g11_ex4",
        "type": "error-correction",
        "sentence": "He asked me where was the subway station.",
        "corrected": "He asked me where the subway station was.",
        "explanation": "Indirect or reported questions do not use subject-verb inversion."
      }
    ]
  },
  {
    "id": "g12",
    "title": "Relative Clauses",
    "level": "advanced",
    "cefr": "C1",
    "description": "Join sentences together using relative pronouns like who, which, and that.",
    "icon": "🔗",
    "content": [
      {
        "type": "explanation",
        "title": "Defining Relative Clauses",
        "text": "Provide essential information about a noun. Do not use commas. Example: \"The developer who wrote this code is brilliant.\""
      },
      {
        "type": "explanation",
        "title": "Non-Defining Relative Clauses",
        "text": "Provide extra, non-essential details enclosed in commas. \"That\" cannot be used. Example: \"Our database, which is highly scalable, is very secure.\""
      }
    ],
    "examples": [
      {
        "correct": "The laptop which I bought yesterday is super fast.",
        "incorrect": "The laptop whom I bought yesterday is super fast.",
        "explanation": "Use \"which\" or \"that\" for inanimate objects, not \"whom\"."
      }
    ],
    "exercises": [
      {
        "id": "g12_ex1",
        "type": "fill-blank",
        "sentence": "The doctor ___ (treat) me was extremely kind.",
        "answer": "who treated",
        "options": [
          "which treated",
          "who treated",
          "whom treated",
          "whose treated"
        ]
      },
      {
        "id": "g12_ex2",
        "type": "fill-blank",
        "sentence": "Paris, ___ (be) my favorite city, is beautiful.",
        "answer": "which is",
        "options": [
          "which is",
          "that is",
          "who is",
          "where is"
        ]
      },
      {
        "id": "g12_ex3",
        "type": "fill-blank",
        "sentence": "This is the coffee house ___ (they serve) amazing lattes.",
        "answer": "where they serve",
        "options": [
          "which they serve",
          "where they serve",
          "that they serve",
          "who serve"
        ]
      },
      {
        "id": "g12_ex4",
        "type": "error-correction",
        "sentence": "The book, that you lent me, was really fascinating.",
        "corrected": "The book, which you lent me, was really fascinating.",
        "explanation": "You cannot use the relative pronoun \"that\" in a non-defining relative clause (with commas)."
      }
    ]
  }
];

  const QUIZ_QUESTIONS = [
  {
    "id": "vq1_1",
    "type": "vocabulary",
    "question": "What does \"Resilient\" mean?",
    "options": [
      "Easily broken or damaged",
      "Able to recover quickly from difficulties",
      "Extremely loud and disturbing",
      "Bright and colorful"
    ],
    "correct": 1,
    "explanation": "\"Resilient\" means able to withstand or recover quickly from difficult conditions.",
    "difficulty": 1
  },
  {
    "id": "vq1_2",
    "type": "vocabulary",
    "question": "Choose the correct synonym for \"Candid\":",
    "options": [
      "Dishonest",
      "Frank and honest",
      "Vague",
      "Slow"
    ],
    "correct": 1,
    "explanation": "\"Candid\" means truthful and straightforward; frank.",
    "difficulty": 1
  },
  {
    "id": "vq1_3",
    "type": "vocabulary",
    "question": "What is the meaning of \"Wanderlust\"?",
    "options": [
      "Fear of traveling",
      "A strong desire to travel",
      "An expensive ticket",
      "A type of suitcase"
    ],
    "correct": 1,
    "explanation": "\"Wanderlust\" means a strong desire to travel.",
    "difficulty": 1
  },
  {
    "id": "vq1_4",
    "type": "vocabulary",
    "question": "Complete: \"Our flight has a three-hour ___ in Munich.\"",
    "options": [
      "layover",
      "voyage",
      "excursion",
      "customs"
    ],
    "correct": 0,
    "explanation": "A \"layover\" is a temporary stop during a flight connection.",
    "difficulty": 1
  },
  {
    "id": "vq1_5",
    "type": "vocabulary",
    "question": "What phrasal verb means \"to cancel an event\"?",
    "options": [
      "Set up",
      "Call off",
      "Work out",
      "Look forward to"
    ],
    "correct": 1,
    "explanation": "To \"call off\" means to cancel an event.",
    "difficulty": 1
  },
  {
    "id": "vq1_6",
    "type": "vocabulary",
    "question": "What phrasal verb means \"to wait a short time\"?",
    "options": [
      "Give up",
      "Hold on",
      "Break down",
      "Carry out"
    ],
    "correct": 1,
    "explanation": "To \"hold on\" means to wait.",
    "difficulty": 1
  },
  {
    "id": "vq1_7",
    "type": "vocabulary",
    "question": "What idiom means \"very easy\"?",
    "options": [
      "Once in a blue moon",
      "A piece of cake",
      "Under the weather",
      "Bite the bullet"
    ],
    "correct": 1,
    "explanation": "A \"piece of cake\" is an idiom meaning something is very easy.",
    "difficulty": 1
  },
  {
    "id": "vq1_8",
    "type": "vocabulary",
    "question": "If something \"costs an arm and a leg\", it is:",
    "options": [
      "Very cheap",
      "Extremely expensive",
      "Dangerous",
      "Useless"
    ],
    "correct": 1,
    "explanation": "\"Costs an arm and a leg\" means it is very expensive.",
    "difficulty": 1
  },
  {
    "id": "vq1_9",
    "type": "vocabulary",
    "question": "What does \"Diligent\" mean?",
    "options": [
      "Lazy and inactive",
      "Showing care and conscientiousness in one's work",
      "Confused and messy",
      "Fast but careless"
    ],
    "correct": 1,
    "explanation": "\"Diligent\" means showing care and effort in duties.",
    "difficulty": 1
  },
  {
    "id": "vq1_10",
    "type": "vocabulary",
    "question": "What phrasal verb means \"to stop making an effort; quit\"?",
    "options": [
      "Get along",
      "Give up",
      "Pick up",
      "Take off"
    ],
    "correct": 1,
    "explanation": "To \"give up\" means to stop trying or quit.",
    "difficulty": 1
  },
  {
    "id": "vq1_11",
    "type": "vocabulary",
    "question": "Complete: \"I need to ___ how to solve this bug.\"",
    "options": [
      "carry out",
      "figure out",
      "put off",
      "come across"
    ],
    "correct": 1,
    "explanation": "To \"figure out\" means to solve or understand something.",
    "difficulty": 1
  },
  {
    "id": "vq1_12",
    "type": "vocabulary",
    "question": "What is \"Luggage\"?",
    "options": [
      "A travel document",
      "Suitcases or bags containing personal belongings",
      "Local currency",
      "Airport terminal"
    ],
    "correct": 1,
    "explanation": "\"Luggage\" represents suitcases or bags used in traveling.",
    "difficulty": 1
  },
  {
    "id": "vq1_13",
    "type": "vocabulary",
    "question": "What does \"Vivid\" mean?",
    "options": [
      "Vague and unclear",
      "Producing clear, bright, and powerful mental images",
      "Cold and gloomy",
      "Extremely heavy"
    ],
    "correct": 1,
    "explanation": "\"Vivid\" means producing powerful, clear images in the mind.",
    "difficulty": 1
  },
  {
    "id": "vq1_14",
    "type": "vocabulary",
    "question": "What phrasal verb means \"to have a friendly relationship\"?",
    "options": [
      "Get along",
      "Break down",
      "Set up",
      "Run into"
    ],
    "correct": 0,
    "explanation": "To \"get along\" means to have a friendly relationship.",
    "difficulty": 1
  },
  {
    "id": "vq2_1",
    "type": "vocabulary",
    "question": "What is the definition of \"Meticulous\"?",
    "options": [
      "Fast and sloppy",
      "Showing great attention to detail; very precise",
      "Heavy and structured",
      "Extremely loud"
    ],
    "correct": 1,
    "explanation": "\"Meticulous\" means showing great care and attention to details.",
    "difficulty": 2
  },
  {
    "id": "vq2_2",
    "type": "vocabulary",
    "question": "What does \"Eloquent\" mean?",
    "options": [
      "Fluent or persuasive in speaking or writing",
      "Difficult to understand",
      "Very aggressive",
      "Short and concise"
    ],
    "correct": 0,
    "explanation": "\"Eloquent\" means fluent and persuasive in expression.",
    "difficulty": 2
  },
  {
    "id": "vq2_3",
    "type": "vocabulary",
    "question": "Complete: \"We need to ___ our database to support more users.\"",
    "options": [
      "outsource",
      "leverage",
      "scale",
      "pivot"
    ],
    "correct": 2,
    "explanation": "To scale a database means to increase its capacity without losing efficiency.",
    "difficulty": 2
  },
  {
    "id": "vq2_4",
    "type": "vocabulary",
    "question": "Which word means \"a standard against which things may be compared\"?",
    "options": [
      "Synergy",
      "Benchmark",
      "Venture",
      "Acquisition"
    ],
    "correct": 1,
    "explanation": "A \"benchmark\" is a standard or reference point.",
    "difficulty": 2
  },
  {
    "id": "vq2_5",
    "type": "vocabulary",
    "question": "What idiom means \"to decide to do something difficult that you have been putting off\"?",
    "options": [
      "Break the ice",
      "Bite the bullet",
      "Cost an arm and a leg",
      "Spill the beans"
    ],
    "correct": 1,
    "explanation": "\"Bite the bullet\" means to face a difficult situation with courage.",
    "difficulty": 2
  },
  {
    "id": "vq2_6",
    "type": "vocabulary",
    "question": "If you \"burn the midnight oil\", you:",
    "options": [
      "Sleep early",
      "Work or study late into the night",
      "Waste fuel",
      "Cook a meal"
    ],
    "correct": 1,
    "explanation": "\"Burn the midnight oil\" means to work late into the night.",
    "difficulty": 2
  },
  {
    "id": "vq2_7",
    "type": "vocabulary",
    "question": "What phrasal verb means \"to postpone or delay doing something\"?",
    "options": [
      "Carry out",
      "Put off",
      "Come across",
      "Bring up"
    ],
    "correct": 1,
    "explanation": "To \"put off\" means to postpone.",
    "difficulty": 2
  },
  {
    "id": "vq2_8",
    "type": "vocabulary",
    "question": "Complete: \"She decided to ___ the offer due to a low salary.\"",
    "options": [
      "turn down",
      "set up",
      "keep up",
      "bring up"
    ],
    "correct": 0,
    "explanation": "To \"turn down\" means to reject an offer.",
    "difficulty": 2
  },
  {
    "id": "vq2_9",
    "type": "vocabulary",
    "question": "What is the meaning of \"Pragmatic\"?",
    "options": [
      "Highly emotional",
      "Sensible and realistic; practical",
      "Slow and lazy",
      "Extremely scientific"
    ],
    "correct": 1,
    "explanation": "\"Pragmatic\" means dealing with things practically and realistically.",
    "difficulty": 2
  },
  {
    "id": "vq2_10",
    "type": "vocabulary",
    "question": "What does \"Ambiguous\" mean?",
    "options": [
      "Clear and definite",
      "Open to more than one interpretation; unclear",
      "Very energetic",
      "Highly academic"
    ],
    "correct": 1,
    "explanation": "\"Ambiguous\" means open to multiple interpretations or vague.",
    "difficulty": 2
  },
  {
    "id": "vq2_11",
    "type": "vocabulary",
    "question": "What is an \"Itinerary\"?",
    "options": [
      "A legal travel document",
      "A planned route or journey schedule",
      "A local souvenir",
      "A financial transaction"
    ],
    "correct": 1,
    "explanation": "An \"itinerary\" is a planned route or travel schedule.",
    "difficulty": 2
  },
  {
    "id": "vq2_12",
    "type": "vocabulary",
    "question": "Complete: \"We must ___ our strengths to succeed in this project.\"",
    "options": [
      "diversify",
      "outsource",
      "leverage",
      "monetize"
    ],
    "correct": 2,
    "explanation": "To \"leverage\" means to use something to its maximum advantage.",
    "difficulty": 2
  },
  {
    "id": "vq2_13",
    "type": "vocabulary",
    "question": "What phrasal verb means \"to meet someone by chance\"?",
    "options": [
      "Run into",
      "Work out",
      "Pick up",
      "Give up"
    ],
    "correct": 0,
    "explanation": "To \"run into\" means to meet someone unexpectedly.",
    "difficulty": 2
  },
  {
    "id": "vq2_14",
    "type": "vocabulary",
    "question": "What is the meaning of \"Integrity\"?",
    "options": [
      "Physical strength",
      "Moral uprightness and honesty",
      "High speed",
      "Technical expertise"
    ],
    "correct": 1,
    "explanation": "\"Integrity\" is the quality of being honest and having strong morals.",
    "difficulty": 2
  },
  {
    "id": "vq3_1",
    "type": "vocabulary",
    "question": "What is the meaning of \"Aberration\"?",
    "options": [
      "A standard routine",
      "A departure from what is normal or expected",
      "A type of surgical procedure",
      "A mathematical constant"
    ],
    "correct": 1,
    "explanation": "An \"aberration\" is an anomaly or departure from what is normal.",
    "difficulty": 3
  },
  {
    "id": "vq3_2",
    "type": "vocabulary",
    "question": "Which word describes a division or contrast between two entirely different things?",
    "options": [
      "Methodology",
      "Synthesis",
      "Dichotomy",
      "Paradigm"
    ],
    "correct": 2,
    "explanation": "A \"dichotomy\" is a division or contrast between two opposed things.",
    "difficulty": 3
  },
  {
    "id": "vq3_3",
    "type": "vocabulary",
    "question": "Complete: \"They formed a joint venture to maximize creative ___.\"",
    "options": [
      "equity",
      "synergy",
      "liability",
      "portfolio"
    ],
    "correct": 1,
    "explanation": "\"Synergy\" is the cooperative interaction of elements to produce a greater combined effect.",
    "difficulty": 3
  },
  {
    "id": "vq3_4",
    "type": "vocabulary",
    "question": "What is the definition of \"Sojourn\"?",
    "options": [
      "A permanent relocation",
      "A temporary stay",
      "A fast travel route",
      "A severe flight delay"
    ],
    "correct": 1,
    "explanation": "A \"sojourn\" is a temporary stay.",
    "difficulty": 3
  },
  {
    "id": "vq3_5",
    "type": "vocabulary",
    "question": "What does \"Ubiquitous\" mean?",
    "options": [
      "Very rare and expensive",
      "Found or appearing everywhere",
      "Extremely dangerous",
      "Highly intellectual"
    ],
    "correct": 1,
    "explanation": "\"Ubiquitous\" means present or found everywhere.",
    "difficulty": 3
  },
  {
    "id": "vq3_6",
    "type": "vocabulary",
    "question": "Complete: \"We can ___ future trends based on our empirical database.\"",
    "options": [
      "juxtapose",
      "substantiate",
      "extrapolate",
      "delineate"
    ],
    "correct": 2,
    "explanation": "To \"extrapolate\" means to project or estimate unknown situations based on existing data.",
    "difficulty": 3
  },
  {
    "id": "vq3_7",
    "type": "vocabulary",
    "question": "What does \"Ameliorate\" mean?",
    "options": [
      "To make something bad better",
      "To destroy completely",
      "To delay indefinitely",
      "To explain clearly"
    ],
    "correct": 0,
    "explanation": "To \"ameliorate\" means to make a bad situation better.",
    "difficulty": 3
  },
  {
    "id": "vq3_8",
    "type": "vocabulary",
    "question": "Which word means \"to place close together for contrasting effect\"?",
    "options": [
      "Substantiate",
      "Juxtapose",
      "Proliferate",
      "Elucidate"
    ],
    "correct": 1,
    "explanation": "To \"juxtapose\" means to place items side-by-side to highlight contrasts.",
    "difficulty": 3
  },
  {
    "id": "vq3_9",
    "type": "vocabulary",
    "question": "What is the meaning of \"Profound\"?",
    "options": [
      "Shallow and simple",
      "Very intense, deep, or showing great insight",
      "Loud and disturbing",
      "Unimportant"
    ],
    "correct": 1,
    "explanation": "\"Profound\" means having or showing great depth, intensity, or insight.",
    "difficulty": 3
  },
  {
    "id": "vq3_10",
    "type": "vocabulary",
    "question": "What does \"Substantiate\" mean?",
    "options": [
      "To replace something",
      "To provide evidence to prove the truth of",
      "To make lighter",
      "To write in detail"
    ],
    "correct": 1,
    "explanation": "To \"substantiate\" means to support or verify with evidence.",
    "difficulty": 3
  },
  {
    "id": "vq3_11",
    "type": "vocabulary",
    "question": "What does \"Epistemology\" mean?",
    "options": [
      "The study of bird species",
      "The theory of knowledge and its validity",
      "The history of coffee brewing",
      "The science of digital databases"
    ],
    "correct": 1,
    "explanation": "\"Epistemology\" is the branch of philosophy concerned with the theory of knowledge.",
    "difficulty": 3
  },
  {
    "id": "vq3_12",
    "type": "vocabulary",
    "question": "Which word means \"describe or portray something precisely\"?",
    "options": [
      "Ameliorate",
      "Delineate",
      "Extrapolate",
      "Proliferate"
    ],
    "correct": 1,
    "explanation": "To \"delineate\" means to outline or describe precisely.",
    "difficulty": 3
  },
  {
    "id": "vq3_13",
    "type": "vocabulary",
    "question": "Complete: \"The internet has caused digital startups to ___ rapidly.\"",
    "options": [
      "delineate",
      "elucidate",
      "proliferate",
      "ameliorate"
    ],
    "correct": 2,
    "explanation": "To \"proliferate\" means to increase rapidly in numbers.",
    "difficulty": 3
  },
  {
    "id": "vq3_14",
    "type": "vocabulary",
    "question": "What is a \"Conundrum\"?",
    "options": [
      "A legal contract",
      "A confusing and difficult problem",
      "A scientific experiment",
      "A travel itinerary"
    ],
    "correct": 1,
    "explanation": "A \"conundrum\" is a confusing riddle or difficult problem.",
    "difficulty": 3
  },
  {
    "id": "gq1_1",
    "type": "grammar",
    "question": "Complete: \"Look! It ___ outside right now.\"",
    "options": [
      "snows",
      "is snowing",
      "snow",
      "snowed"
    ],
    "correct": 1,
    "explanation": "\"Look!\" indicates that the action is in progress at the moment of speaking, requiring present continuous.",
    "difficulty": 1
  },
  {
    "id": "gq1_2",
    "type": "grammar",
    "question": "Identify the stative verb that CANNOT be used in continuous tenses:",
    "options": [
      "Run",
      "Learn",
      "Understand",
      "Listen"
    ],
    "correct": 2,
    "explanation": "\"Understand\" is a stative verb representing a cognitive state, which is not used in progressive forms.",
    "difficulty": 1
  },
  {
    "id": "gq1_3",
    "type": "grammar",
    "question": "Complete: \"He usually ___ coffee in the morning, but today he is drinking tea.\"",
    "options": [
      "is drinking",
      "drinks",
      "drink",
      "drank"
    ],
    "correct": 1,
    "explanation": "Routines and habits are expressed using present simple (\"drinks\").",
    "difficulty": 1
  },
  {
    "id": "gq1_4",
    "type": "grammar",
    "question": "Complete: \"I ___ to Paris three times in my life.\"",
    "options": [
      "was",
      "have been",
      "went",
      "am being"
    ],
    "correct": 1,
    "explanation": "Unspecified past experiences in a lifetime use present perfect (\"have been\").",
    "difficulty": 1
  },
  {
    "id": "gq1_5",
    "type": "grammar",
    "question": "Complete: \"She ___ her keys yesterday evening.\"",
    "options": [
      "lost",
      "has lost",
      "loses",
      "was losing"
    ],
    "correct": 0,
    "explanation": "\"Yesterday evening\" is a completed past time, requiring past simple (\"lost\").",
    "difficulty": 1
  },
  {
    "id": "gq1_6",
    "type": "grammar",
    "question": "Complete: \"They ___ TV when the power suddenly went out.\"",
    "options": [
      "watched",
      "were watching",
      "are watching",
      "have watched"
    ],
    "correct": 1,
    "explanation": "The background action in progress (watching TV) is in past continuous, interrupted by a past simple action.",
    "difficulty": 1
  },
  {
    "id": "gq1_7",
    "type": "grammar",
    "question": "Complete: \"Don't worry, I ___ you with your homework tonight.\"",
    "options": [
      "will help",
      "am going to help",
      "helped",
      "help"
    ],
    "correct": 0,
    "explanation": "Spontaneous offers made at the moment of speaking use \"will\".",
    "difficulty": 1
  },
  {
    "id": "gq1_8",
    "type": "grammar",
    "question": "Complete: \"We ___ buy a new house next year. We have already started saving.\"",
    "options": [
      "will",
      "are going to",
      "shall",
      "would"
    ],
    "correct": 1,
    "explanation": "Predefined future plans and intentions require \"going to\".",
    "difficulty": 1
  },
  {
    "id": "gq1_9",
    "type": "grammar",
    "question": "Which sentence is grammatically correct?",
    "options": [
      "I am knowing the answer.",
      "I know the answer.",
      "I have been knowing the answer.",
      "I knowing the answer."
    ],
    "correct": 1,
    "explanation": "\"Know\" is a stative verb of cognition and should be used in simple tenses.",
    "difficulty": 1
  },
  {
    "id": "gq1_10",
    "type": "grammar",
    "question": "Complete: \"While she ___ a book, she fell asleep.\"",
    "options": [
      "read",
      "was reading",
      "has read",
      "is reading"
    ],
    "correct": 1,
    "explanation": "An action that was in progress in the past uses past continuous (\"was reading\").",
    "difficulty": 1
  },
  {
    "id": "gq1_11",
    "type": "grammar",
    "question": "Complete: \"They ___ their homework yet.\"",
    "options": [
      "haven't finished",
      "didn't finish",
      "don't finish",
      "hadn't finished"
    ],
    "correct": 0,
    "explanation": "\"Yet\" in negative sentences is a classic marker for present perfect (\"haven't finished\").",
    "difficulty": 1
  },
  {
    "id": "gq1_12",
    "type": "grammar",
    "question": "Complete: \"Oh, it's raining! I ___ an umbrella.\"",
    "options": [
      "am going to take",
      "will take",
      "took",
      "takes"
    ],
    "correct": 1,
    "explanation": "A spontaneous decision made at the moment of speaking uses \"will\".",
    "difficulty": 1
  },
  {
    "id": "gq1_13",
    "type": "grammar",
    "question": "Complete: \"He ___ in London since 2018.\"",
    "options": [
      "lived",
      "has lived",
      "is living",
      "lives"
    ],
    "correct": 1,
    "explanation": "Actions starting in the past and continuing to the present use present perfect (\"has lived\").",
    "difficulty": 1
  },
  {
    "id": "gq1_14",
    "type": "grammar",
    "question": "Complete: \"At 10:00 PM last night, I ___.\"",
    "options": [
      "slept",
      "was sleeping",
      "have slept",
      "had slept"
    ],
    "correct": 1,
    "explanation": "An action in progress at a specific point in the past requires past continuous.",
    "difficulty": 1
  },
  {
    "id": "gq2_1",
    "type": "grammar",
    "question": "Complete: \"If I ___ a billionaire, I would fund space exploration.\"",
    "options": [
      "am",
      "was",
      "were",
      "would be"
    ],
    "correct": 2,
    "explanation": "In the second conditional (hypothetical/unreal), we use \"were\" for all subjects in formal grammar.",
    "difficulty": 2
  },
  {
    "id": "gq2_2",
    "type": "grammar",
    "question": "Complete: \"If it rains tomorrow, we ___ go to the park.\"",
    "options": [
      "wouldn't",
      "won't",
      "didn't",
      "don't"
    ],
    "correct": 1,
    "explanation": "The first conditional uses: If + Present Simple, Will/Won't + Verb.",
    "difficulty": 2
  },
  {
    "id": "gq2_3",
    "type": "grammar",
    "question": "Complete: \"The novel ___ in 1954.\"",
    "options": [
      "published",
      "was published",
      "is published",
      "has published"
    ],
    "correct": 1,
    "explanation": "The novel was acted upon in the past, so we use past simple passive (\"was published\").",
    "difficulty": 2
  },
  {
    "id": "gq2_4",
    "type": "grammar",
    "question": "Complete: \"She has ___ honest opinion about the design.\"",
    "options": [
      "a",
      "an",
      "the",
      "no article"
    ],
    "correct": 1,
    "explanation": "\"Honest\" begins with a silent \"h\" and a vowel sound, so it takes \"an\".",
    "difficulty": 2
  },
  {
    "id": "gq2_5",
    "type": "grammar",
    "question": "Complete: \"The telescope is pointing ___ the sky.\"",
    "options": [
      "in",
      "on",
      "at",
      "into"
    ],
    "correct": 2,
    "explanation": "Pointing at a specific direction or target uses the preposition \"at\".",
    "difficulty": 2
  },
  {
    "id": "gq2_6",
    "type": "grammar",
    "question": "Complete: \"You ___ touch that wire! It is extremely dangerous.\"",
    "options": [
      "don't have to",
      "must not",
      "should not",
      "might not"
    ],
    "correct": 1,
    "explanation": "\"Must not\" expresses a strong negative obligation or prohibition.",
    "difficulty": 2
  },
  {
    "id": "gq2_7",
    "type": "grammar",
    "question": "Complete: \"We will miss the flight unless we ___.\"",
    "options": [
      "will hurry",
      "hurry",
      "don't hurry",
      "hurried"
    ],
    "correct": 1,
    "explanation": "\"Unless\" means \"if not\", and is followed by a present simple verb in first conditional.",
    "difficulty": 2
  },
  {
    "id": "gq2_8",
    "type": "grammar",
    "question": "Complete: \"The email ___ sent by tomorrow morning.\"",
    "options": [
      "will be",
      "is being",
      "has been",
      "was"
    ],
    "correct": 0,
    "explanation": "Future passive uses \"will be\" + past participle.",
    "difficulty": 2
  },
  {
    "id": "gq2_9",
    "type": "grammar",
    "question": "Complete: \"She works ___ an office in downtown Chicago.\"",
    "options": [
      "at",
      "on",
      "in",
      "to"
    ],
    "correct": 2,
    "explanation": "Working inside an enclosed workplace uses the preposition \"in\".",
    "difficulty": 2
  },
  {
    "id": "gq2_10",
    "type": "grammar",
    "question": "Complete: \"He asked me where I ___.\"",
    "options": [
      "work",
      "do work",
      "worked",
      "working"
    ],
    "correct": 2,
    "explanation": "In reported speech, tenses backshift from present simple (\"work\") to past simple (\"worked\").",
    "difficulty": 2
  },
  {
    "id": "gq2_11",
    "type": "grammar",
    "question": "Complete: \"The laptop, ___ I bought yesterday, is very fast.\"",
    "options": [
      "whom",
      "which",
      "where",
      "whose"
    ],
    "correct": 1,
    "explanation": "A non-defining relative clause about an inanimate object uses \"which\".",
    "difficulty": 2
  },
  {
    "id": "gq2_12",
    "type": "grammar",
    "question": "Complete: \"You ___ study daily to maintain your streak.\"",
    "options": [
      "should",
      "ought",
      "must to",
      "should to"
    ],
    "correct": 0,
    "explanation": "\"Should\" is followed by a bare infinitive, expressing good advice.",
    "difficulty": 2
  },
  {
    "id": "gq2_13",
    "type": "grammar",
    "question": "Complete: \"He is ___ engineer who designed this database.\"",
    "options": [
      "a",
      "an",
      "the",
      "no article"
    ],
    "correct": 2,
    "explanation": "Since he is a specific engineer (the one who designed this database), we use \"the\".",
    "difficulty": 2
  },
  {
    "id": "gq2_14",
    "type": "grammar",
    "question": "Complete: \"If I ___ more free time, I would learn play guitar.\"",
    "options": [
      "have",
      "had",
      "would have",
      "will have"
    ],
    "correct": 1,
    "explanation": "Second conditional uses past simple in the \"if\" clause (\"had\").",
    "difficulty": 2
  },
  {
    "id": "gq3_1",
    "type": "grammar",
    "question": "Complete: \"If you had studied harder, you ___ the test yesterday.\"",
    "options": [
      "would pass",
      "would have passed",
      "passed",
      "had passed"
    ],
    "correct": 1,
    "explanation": "Third conditional (imaginary past result) uses: If + Past Perfect, Would Have + Past Participle.",
    "difficulty": 3
  },
  {
    "id": "gq3_2",
    "type": "grammar",
    "question": "Complete: \"If she had won the lottery last week, she ___ rich now.\"",
    "options": [
      "would be",
      "would have been",
      "will be",
      "is"
    ],
    "correct": 0,
    "explanation": "A mixed conditional expressing a past condition with a present result uses: If + Past Perfect, Would + Verb.",
    "difficulty": 3
  },
  {
    "id": "gq3_3",
    "type": "grammar",
    "question": "Complete: \"He told me that he ___ the report the day before.\"",
    "options": [
      "finished",
      "has finished",
      "had finished",
      "would finish"
    ],
    "correct": 2,
    "explanation": "In reported speech, present perfect or past simple shifts backward to past perfect (\"had finished\").",
    "difficulty": 3
  },
  {
    "id": "gq3_4",
    "type": "grammar",
    "question": "Which sentence is grammatically correct for a non-defining relative clause?",
    "options": [
      "The book, that you lent me, is great.",
      "The book, which you lent me, is great.",
      "The book whom you lent me is great.",
      "The book whose you lent me is great."
    ],
    "correct": 1,
    "explanation": "Non-defining clauses (with commas) cannot use \"that\"; they must use \"which\".",
    "difficulty": 3
  },
  {
    "id": "gq3_5",
    "type": "grammar",
    "question": "Complete: \"By the time we arrived at the terminal, the plane ___ already taken off.\"",
    "options": [
      "has",
      "had",
      "was",
      "would"
    ],
    "correct": 1,
    "explanation": "An action completed before another past action requires past perfect (\"had\").",
    "difficulty": 3
  },
  {
    "id": "gq3_6",
    "type": "grammar",
    "question": "Complete: \"She denied ___ the confidential corporate database.\"",
    "options": [
      "to access",
      "accessing",
      "accessed",
      "having to access"
    ],
    "correct": 1,
    "explanation": "The verb \"deny\" is followed by a gerund (\"accessing\").",
    "difficulty": 3
  },
  {
    "id": "gq3_7",
    "type": "grammar",
    "question": "Complete: \"It is essential that he ___ the contract immediately.\"",
    "options": [
      "signs",
      "sign",
      "signed",
      "will sign"
    ],
    "correct": 1,
    "explanation": "The subjunctive mood in English requires the bare form of the verb (\"sign\") after adjectives like \"essential that\".",
    "difficulty": 3
  },
  {
    "id": "gq3_8",
    "type": "grammar",
    "question": "Complete: \"Rarely ___ such an eloquent public speech.\"",
    "options": [
      "I have heard",
      "have I heard",
      "I heard",
      "did I heard"
    ],
    "correct": 1,
    "explanation": "Negative adverbials at the beginning of a sentence require subject-verb inversion (\"have I heard\").",
    "difficulty": 3
  },
  {
    "id": "gq3_9",
    "type": "grammar",
    "question": "Complete: \"He would have come to the party if he ___ to work late.\"",
    "options": [
      "didn't have",
      "hadn't had",
      "wouldn't have",
      "doesn't have"
    ],
    "correct": 1,
    "explanation": "The conditional clause of the third conditional requires past perfect (\"hadn't had\").",
    "difficulty": 3
  },
  {
    "id": "gq3_10",
    "type": "grammar",
    "question": "Complete: \"We had the database ___ by an external cybersecurity agency.\"",
    "options": [
      "audit",
      "audited",
      "to audit",
      "auditing"
    ],
    "correct": 1,
    "explanation": "The causative structure \"have something done\" uses have + object + past participle (\"audited\").",
    "difficulty": 3
  },
  {
    "id": "gq3_11",
    "type": "grammar",
    "question": "Complete: \"I wish I ___ those stocks before they crashed yesterday.\"",
    "options": [
      "sold",
      "had sold",
      "would sell",
      "have sold"
    ],
    "correct": 1,
    "explanation": "Past regrets using \"wish\" require past perfect (\"had sold\").",
    "difficulty": 3
  },
  {
    "id": "gq3_12",
    "type": "grammar",
    "question": "Complete: \"No sooner ___ the platform than a major crash occurred.\"",
    "options": [
      "we had launched",
      "had we launched",
      "we launched",
      "have we launched"
    ],
    "correct": 1,
    "explanation": "\"No sooner\" at the start of a clause requires subject-verb inversion (\"had we launched\").",
    "difficulty": 3
  },
  {
    "id": "gq3_13",
    "type": "grammar",
    "question": "Complete: \"She was accused of ___ secrets to a competitor.\"",
    "options": [
      "spilling",
      "to spill",
      "spilt",
      "having spilt"
    ],
    "correct": 0,
    "explanation": "Prepositions are followed by gerunds (\"of spilling\").",
    "difficulty": 3
  },
  {
    "id": "gq3_14",
    "type": "grammar",
    "question": "Complete: \"I would rather you ___ the meeting until tomorrow.\"",
    "options": [
      "postpone",
      "postponed",
      "will postpone",
      "postponing"
    ],
    "correct": 1,
    "explanation": "\"Would rather you\" is followed by past simple when referring to present or future preference.",
    "difficulty": 3
  }
];

  const SPEAKING_DRILLS = {
  "minimalPairs": [
    {
      "id": "mp1",
      "pair": "Ship vs Sheep",
      "word1": "Ship",
      "word2": "Sheep",
      "ipa1": "/ʃɪp/",
      "ipa2": "/ʃiːp/",
      "focus": "Short /ɪ/ vs Long /iː/",
      "tip": "Pull your lips back like a smile for \"sheep\", keep them relaxed for \"ship\"."
    },
    {
      "id": "mp2",
      "pair": "Thin vs Tin",
      "word1": "Thin",
      "word2": "Tin",
      "ipa1": "/θɪn/",
      "ipa2": "/tɪn/",
      "focus": "Voiceless dental /θ/ vs Alveolar plosive /t/",
      "tip": "Put the tip of your tongue between your teeth and blow air for \"thin\"."
    },
    {
      "id": "mp3",
      "pair": "Bat vs Bet",
      "word1": "Bat",
      "word2": "Bet",
      "ipa1": "/bæt/",
      "ipa2": "/bet/",
      "focus": "Open /æ/ vs Mid-open /e/",
      "tip": "Drop your jaw lower and flatten your tongue for \"bat\"."
    },
    {
      "id": "mp4",
      "pair": "Vat vs Wet",
      "word1": "Vat",
      "word2": "Wet",
      "ipa1": "/væt/",
      "ipa2": "/wet/",
      "focus": "Labiodental fricative /v/ vs Bilabial semivowel /w/",
      "tip": "Bite your bottom lip for \"vat\", round your lips for \"wet\"."
    }
  ],
  "tongueTwisters": [
    {
      "id": "tt1",
      "text": "She sells sea shells by the sea shore.",
      "title": "Sibilant Sounds",
      "difficulty": "Easy",
      "tip": "Focus on switching cleanly between /ʃ/ (\"she\", \"shells\", \"shore\") and /s/ (\"sells\", \"sea\")."
    },
    {
      "id": "tt2",
      "text": "Peter Piper picked a peck of pickled peppers.",
      "title": "Plosive /p/",
      "difficulty": "Medium",
      "tip": "Focus on producing crisp, aspirated /p/ sounds by releasing air rapidly."
    },
    {
      "id": "tt3",
      "text": "Red lory, yellow lory, red lory, yellow lory.",
      "title": "Liquid /r/ and /l/",
      "difficulty": "Hard",
      "tip": "Keep the tongue tip up for /l/ but curled back without touching the roof for /r/."
    },
    {
      "id": "tt4",
      "text": "Thirty-three thousand people thought the throne was thrilling.",
      "title": "Dental Fricative /θ/",
      "difficulty": "Hard",
      "tip": "Ensure your tongue tip comes forward to kiss your front teeth on every \"th\" sound."
    }
  ],
  "shadowingSentences": [
    {
      "id": "ss1",
      "text": "Could you recommend a good local restaurant nearby?",
      "context": "Travel & Navigation",
      "ipa": "/kʊd juː ˌrek.əˈmend ə ɡʊd ˈləʊ.kəl ˈres.trɒnt ˌnɪəˈbaɪ/"
    },
    {
      "id": "ss2",
      "text": "We need to leverage our strengths to maximize synergy.",
      "context": "Business Meeting",
      "ipa": "/wiː niːd tuː ˈliː.vər.ɪdʒ ˈaʊə streŋθs tuː ˈmæk.sɪ.maɪz ˈsɪn.ə.dʒi/"
    },
    {
      "id": "ss3",
      "text": "The paradigm shift occurred due to empirical observations.",
      "context": "Academic Presentation",
      "ipa": "/ðə ˈpær.ə.daɪm ʃɪft əˈkɜːd djuː tuː ɪmˈpɪr.ɪ.kəl ˌɒb.zəˈveɪ.ʃənz/"
    },
    {
      "id": "ss4",
      "text": "It's raining cats and dogs, so we'll have to put off the game.",
      "context": "Daily Idiomatic",
      "ipa": "/ɪts ˈreɪ.nɪŋ kæts ænd dɒɡz səʊ wiːl hæv tuː pʊt ɒf ðə ɡeɪm/"
    }
  ],
  "roleplays": [
    {
      "id": "rp1",
      "title": "☕ Cafe Order",
      "description": "Practice ordering coffee and pastries at a local cafe with the Barista.",
      "avatar": "💁‍♂️",
      "barista": "Barista",
      "turns": [
        {
          "index": 0,
          "speaker": "Barista",
          "audioText": "Hello! Welcome to Lingua Cafe. What can I get started for you today?",
          "userPrompt": "Hi there! I would like a large iced latte and a chocolate croissant, please."
        },
        {
          "index": 1,
          "speaker": "Barista",
          "audioText": "Sure thing! What kind of milk would you prefer for the latte: whole, oat, or almond milk?",
          "userPrompt": "I would prefer oat milk in my latte, please."
        },
        {
          "index": 2,
          "speaker": "Barista",
          "audioText": "Perfect. That comes to seven dollars and fifty cents. Will you be paying with cash or card?",
          "userPrompt": "I will pay with card. Here you go."
        },
        {
          "index": 3,
          "speaker": "Barista",
          "audioText": "Thank you! You can tap your card right there. Your order will be ready at the counter in just a moment!",
          "userPrompt": "Awesome! Thank you so much and have a wonderful day."
        }
      ]
    },
    {
      "id": "rp2",
      "title": "💼 Job Interview",
      "description": "Test your business English under pressure with a formal job interviewer.",
      "avatar": "👩‍💼",
      "barista": "Interviewer",
      "turns": [
        {
          "index": 0,
          "speaker": "Interviewer",
          "audioText": "Thank you for coming in today. To start, could you please tell me a little bit about yourself?",
          "userPrompt": "Certainly. I am a passionate developer with three years of experience building responsive web applications."
        },
        {
          "index": 1,
          "speaker": "Interviewer",
          "audioText": "Excellent. What would you say is your greatest strength, and how do you leverage it in your daily work?",
          "userPrompt": "My greatest strength is my problem-solving ability. I meticulously analyze bugs to find clean, scalable solutions."
        },
        {
          "index": 2,
          "speaker": "Interviewer",
          "audioText": "Very well. Can you describe a challenging situation you faced at work and how you handled it?",
          "userPrompt": "Once, we had a major database outage. I remained resilient, coordinated with the team, and restored the service within an hour."
        }
      ]
    }
  ]
};

  const ACHIEVEMENTS = [
  {
    "id": "first_word",
    "name": "First Step",
    "description": "Learn your first vocabulary word",
    "icon": "🌱"
  },
  {
    "id": "ten_words",
    "name": "Word Collector",
    "description": "Learn 10 words",
    "icon": "📚"
  },
  {
    "id": "fifty_words",
    "name": "Vocabulary Builder",
    "description": "Learn 50 words",
    "icon": "📖"
  },
  {
    "id": "hundred_words",
    "name": "Word Master",
    "description": "Learn 100 words",
    "icon": "👑"
  },
  {
    "id": "first_quiz",
    "name": "Quiz Taker",
    "description": "Complete your first quiz",
    "icon": "✅"
  },
  {
    "id": "perfect_quiz",
    "name": "Perfect Score",
    "description": "Get 100% on a quiz",
    "icon": "💯"
  },
  {
    "id": "ten_quizzes",
    "name": "Quiz Champion",
    "description": "Complete 10 quizzes",
    "icon": "🏆"
  },
  {
    "id": "first_lesson",
    "name": "Grammar Student",
    "description": "Complete a grammar lesson",
    "icon": "📝"
  },
  {
    "id": "all_beginner",
    "name": "Beginner Complete",
    "description": "Complete all beginner lessons",
    "icon": "🎓"
  },
  {
    "id": "streak_3",
    "name": "On Fire",
    "description": "Maintain a 3-day streak",
    "icon": "🔥"
  },
  {
    "id": "streak_7",
    "name": "Week Warrior",
    "description": "Maintain a 7-day streak",
    "icon": "⚡"
  },
  {
    "id": "streak_30",
    "name": "Monthly Master",
    "description": "Maintain a 30-day streak",
    "icon": "🌟"
  },
  {
    "id": "all_categories",
    "name": "Explorer",
    "description": "Learn words from all categories",
    "icon": "🗺️"
  },
  {
    "id": "speaking_novice",
    "name": "Vocal Initiate",
    "description": "Complete your first speech drill",
    "icon": "🎙️"
  },
  {
    "id": "speaking_expert",
    "name": "Fluent Orator",
    "description": "Perform 10 speaking drills with >90% accuracy",
    "icon": "🗣️"
  },
  {
    "id": "roleplay_complete",
    "name": "Active Conversationalist",
    "description": "Finish an interactive voice roleplay scenario",
    "icon": "💬"
  }
];

  export const APP_DATA = {
    CATEGORIES,
    VOCABULARY,
    GRAMMAR_LESSONS,
    QUIZ_QUESTIONS,
    SPEAKING_DRILLS,
    ACHIEVEMENTS
  };
