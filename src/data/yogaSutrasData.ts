// Yoga Sutras Demo Data - Patanjali's Yoga Sutras for Ashta Padi platform

export interface VocabularyTerm {
  id: string;
  term: string;
  transliteration: string;
  meanings: string[];
  root: string;
  partOfSpeech: string;
  relatedTerms: string[];
  exampleUsage?: string;
}

export interface WordBreakdown {
  word: string;
  transliteration: string;
  meaning: string;
  grammar: string;
}

export interface Sutra {
  id: number;
  chapter: string;
  number: string;
  sanskrit: string;
  transliteration: string;
  wordBreakdown: WordBreakdown[];
  translation: string;
  commentary: string;
  keyTerms: string[];
}

export interface GrammarLesson {
  id: string;
  title: string;
  titleSanskrit: string;
  concept: string;
  examples: {
    rule: string;
    demonstration: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  type: 'vocabulary' | 'grammar';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const vocabulary: VocabularyTerm[] = [
  {
    id: "yoga",
    term: "योग",
    transliteration: "yoga",
    meanings: ["Union", "Connection", "Discipline", "Yoking"],
    root: "√yuj (to join, to yoke)",
    partOfSpeech: "Masculine noun",
    relatedTerms: ["yukta", "saṃyoga", "viyoga"],
    exampleUsage: "yogaḥ citta-vṛtti-nirodhaḥ (1.2)"
  },
  {
    id: "chitta",
    term: "चित्त",
    transliteration: "citta",
    meanings: ["Mind-stuff", "Consciousness", "Mind-field", "Heart-mind"],
    root: "√cit (to perceive, to think)",
    partOfSpeech: "Neuter noun",
    relatedTerms: ["cetana", "caitanya", "citta-bhūmi"],
    exampleUsage: "citta-vṛtti-nirodhaḥ (1.2)"
  },
  {
    id: "vritti",
    term: "वृत्ति",
    transliteration: "vṛtti",
    meanings: ["Fluctuation", "Modification", "Activity", "Whirlpool"],
    root: "√vṛt (to turn, to revolve)",
    partOfSpeech: "Feminine noun",
    relatedTerms: ["pravṛtti", "nivṛtti", "vartate"],
    exampleUsage: "vṛttayaḥ pañcatayyaḥ (1.5)"
  },
  {
    id: "nirodha",
    term: "निरोध",
    transliteration: "nirodha",
    meanings: ["Cessation", "Restraint", "Control", "Stilling"],
    root: "ni + √rudh (to obstruct, to stop)",
    partOfSpeech: "Masculine noun",
    relatedTerms: ["nirodhaka", "ruddha", "niruddha"],
    exampleUsage: "citta-vṛtti-nirodhaḥ (1.2)"
  },
  {
    id: "abhyasa",
    term: "अभ्यास",
    transliteration: "abhyāsa",
    meanings: ["Practice", "Repetition", "Discipline", "Effort"],
    root: "abhi + √as (to throw, to apply)",
    partOfSpeech: "Masculine noun",
    relatedTerms: ["abhyāsin", "abhyasta", "āsevita"],
    exampleUsage: "abhyāsa-vairāgyābhyāṃ tan-nirodhaḥ (1.12)"
  },
  {
    id: "vairagya",
    term: "वैराग्य",
    transliteration: "vairāgya",
    meanings: ["Non-attachment", "Dispassion", "Detachment", "Renunciation"],
    root: "vi + rāga (without passion)",
    partOfSpeech: "Neuter noun",
    relatedTerms: ["virāga", "virāgin", "tyāga"],
    exampleUsage: "abhyāsa-vairāgyābhyāṃ tan-nirodhaḥ (1.12)"
  }
];

export const sutras: Sutra[] = [
  {
    id: 1,
    chapter: "Samādhi Pāda",
    number: "1.1",
    sanskrit: "अथ योगानुशासनम्",
    transliteration: "atha yogānuśāsanam",
    wordBreakdown: [
      { word: "अथ", transliteration: "atha", meaning: "Now", grammar: "Auspicious particle (maṅgala)" },
      { word: "योग", transliteration: "yoga", meaning: "Yoga/Union", grammar: "Masculine noun, compound form" },
      { word: "अनुशासनम्", transliteration: "anuśāsanam", meaning: "Instruction/Teaching", grammar: "Neuter noun, nominative singular" }
    ],
    translation: "Now begins the instruction on Yoga.",
    commentary: "The word 'atha' is traditionally used to mark an auspicious beginning. This sutra establishes that the student is now ready for the teaching of yoga, implying prerequisite qualifications and mental readiness.",
    keyTerms: ["yoga", "anuśāsana"]
  },
  {
    id: 2,
    chapter: "Samādhi Pāda",
    number: "1.2",
    sanskrit: "योगश्चित्तवृत्तिनिरोधः",
    transliteration: "yogaś citta-vṛtti-nirodhaḥ",
    wordBreakdown: [
      { word: "योगः", transliteration: "yogaḥ", meaning: "Yoga", grammar: "Masculine noun, nominative singular" },
      { word: "चित्त", transliteration: "citta", meaning: "Mind-stuff", grammar: "Neuter noun, compound form" },
      { word: "वृत्ति", transliteration: "vṛtti", meaning: "Fluctuations", grammar: "Feminine noun, compound form" },
      { word: "निरोधः", transliteration: "nirodhaḥ", meaning: "Cessation", grammar: "Masculine noun, nominative singular" }
    ],
    translation: "Yoga is the cessation of the fluctuations of the mind.",
    commentary: "This is the defining sutra of yoga. It establishes that yoga is not merely physical postures but the stilling of mental modifications. When the mind becomes still, the true self is revealed.",
    keyTerms: ["yoga", "chitta", "vritti", "nirodha"]
  },
  {
    id: 3,
    chapter: "Samādhi Pāda",
    number: "1.3",
    sanskrit: "तदा द्रष्टुः स्वरूपेऽवस्थानम्",
    transliteration: "tadā draṣṭuḥ svarūpe 'vasthānam",
    wordBreakdown: [
      { word: "तदा", transliteration: "tadā", meaning: "Then", grammar: "Adverb" },
      { word: "द्रष्टुः", transliteration: "draṣṭuḥ", meaning: "Of the Seer", grammar: "Masculine noun, genitive singular" },
      { word: "स्वरूपे", transliteration: "svarūpe", meaning: "In own nature", grammar: "Neuter noun, locative singular" },
      { word: "अवस्थानम्", transliteration: "avasthānam", meaning: "Abiding", grammar: "Neuter noun, nominative singular" }
    ],
    translation: "Then the Seer abides in its own true nature.",
    commentary: "When the mind is stilled, the witness consciousness (puruṣa) rests in its own pure awareness, no longer identified with the contents of the mind.",
    keyTerms: ["draṣṭṛ", "svarūpa"]
  },
  {
    id: 4,
    chapter: "Samādhi Pāda",
    number: "1.12",
    sanskrit: "अभ्यासवैराग्याभ्यां तन्निरोधः",
    transliteration: "abhyāsa-vairāgyābhyāṃ tan-nirodhaḥ",
    wordBreakdown: [
      { word: "अभ्यास", transliteration: "abhyāsa", meaning: "Practice", grammar: "Masculine noun, compound form" },
      { word: "वैराग्याभ्याम्", transliteration: "vairāgyābhyām", meaning: "By non-attachment", grammar: "Neuter noun, instrumental dual" },
      { word: "तत्", transliteration: "tat", meaning: "That (cessation)", grammar: "Pronoun, compound form" },
      { word: "निरोधः", transliteration: "nirodhaḥ", meaning: "Cessation", grammar: "Masculine noun, nominative singular" }
    ],
    translation: "That cessation is achieved through practice and non-attachment.",
    commentary: "The twin pillars of yoga practice: abhyāsa (persistent effort) and vairāgya (letting go). Both are essential—effort without detachment leads to strain, while detachment without effort leads to stagnation.",
    keyTerms: ["abhyasa", "vairagya", "nirodha"]
  },
  {
    id: 5,
    chapter: "Samādhi Pāda",
    number: "1.13",
    sanskrit: "तत्र स्थितौ यत्नोऽभ्यासः",
    transliteration: "tatra sthitau yatno 'bhyāsaḥ",
    wordBreakdown: [
      { word: "तत्र", transliteration: "tatra", meaning: "There/In that", grammar: "Adverb" },
      { word: "स्थितौ", transliteration: "sthitau", meaning: "In steadiness", grammar: "Feminine noun, locative singular" },
      { word: "यत्नः", transliteration: "yatnaḥ", meaning: "Effort", grammar: "Masculine noun, nominative singular" },
      { word: "अभ्यासः", transliteration: "abhyāsaḥ", meaning: "Practice", grammar: "Masculine noun, nominative singular" }
    ],
    translation: "Practice is the effort to be steady in that state.",
    commentary: "Abhyāsa is defined as the persistent effort to maintain the state of mental stillness. It requires continuous, uninterrupted practice with dedication over a long period.",
    keyTerms: ["abhyasa", "sthiti", "yatna"]
  }
];

export const grammarLessons: GrammarLesson[] = [
  {
    id: "vyakarana",
    title: "The Science of Grammar",
    titleSanskrit: "व्याकरण",
    concept: "Vyākaraṇa (grammar) is one of the six Vedāṅgas (limbs of the Vedas). It provides the systematic analysis of Sanskrit language, enabling precise interpretation of sacred texts.",
    examples: [
      { rule: "Grammar preserves meaning", demonstration: "Without proper grammar, 'yoga' could be confused with 'yogī' (practitioner)" },
      { rule: "Pāṇini's Aṣṭādhyāyī", demonstration: "The foundational text containing ~4,000 sūtras describing Sanskrit grammar" }
    ]
  },
  {
    id: "varna",
    title: "Sounds and Letters",
    titleSanskrit: "वर्ण",
    concept: "Sanskrit has 50 varṇas (sounds/letters) organized scientifically by point of articulation. The alphabet moves from throat (kaṇṭhya) to lips (oṣṭhya).",
    examples: [
      { rule: "Vowels (svara): 14 sounds", demonstration: "अ आ इ ई उ ऊ ऋ ॠ ए ऐ ओ औ अं अः" },
      { rule: "Consonants (vyañjana): 36 sounds", demonstration: "क ख ग घ ङ (guttural) → च छ ज झ ञ (palatal) → etc." }
    ]
  },
  {
    id: "sandhi",
    title: "Joining of Sounds",
    titleSanskrit: "सन्धि",
    concept: "Sandhi refers to the euphonic combination of sounds at word boundaries. It creates the flowing nature of Sanskrit and is essential for reading texts correctly.",
    examples: [
      { rule: "Vowel sandhi (svara-sandhi)", demonstration: "yoga + anuśāsanam → yogānuśāsanam (a + a = ā)" },
      { rule: "Consonant sandhi (vyañjana-sandhi)", demonstration: "yogaḥ + citta → yogaś citta (visarga becomes ś before c)" }
    ]
  },
  {
    id: "pada",
    title: "Word",
    titleSanskrit: "पद",
    concept: "A pada is a complete word form including root and endings. Sanskrit words change their endings based on grammatical function (case, number, gender).",
    examples: [
      { rule: "Eight cases (vibhakti)", demonstration: "yogaḥ (nominative), yogam (accusative), yogena (instrumental), yogāya (dative)" },
      { rule: "Three numbers", demonstration: "yogaḥ (singular), yogau (dual), yogāḥ (plural)" }
    ]
  },
  {
    id: "dhatu",
    title: "Verb Root",
    titleSanskrit: "धातु",
    concept: "Dhātus are the root forms of verbs from which all verbal forms and many nouns are derived. Understanding dhātus unlocks the meaning of countless words.",
    examples: [
      { rule: "√yuj (to join) → yoga", demonstration: "The root yuj means 'to yoke' or 'to join', giving us yoga (union)" },
      { rule: "√cit (to perceive) → citta", demonstration: "The root cit means 'to think/perceive', giving us citta (mind)" }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: 'vocabulary',
    question: "What is the primary meaning of 'yoga' (योग)?",
    options: ["Breathing", "Union/Connection", "Posture", "Meditation"],
    correctAnswer: 1,
    explanation: "Yoga comes from the root √yuj meaning 'to join' or 'to yoke'. It signifies the union of individual consciousness with universal consciousness."
  },
  {
    id: 2,
    type: 'vocabulary',
    question: "What does 'citta' (चित्त) refer to?",
    options: ["Body", "Breath", "Mind-stuff/Consciousness", "Soul"],
    correctAnswer: 2,
    explanation: "Citta refers to the mind-stuff or consciousness field. It includes the thinking mind, emotions, and subconscious impressions."
  },
  {
    id: 3,
    type: 'vocabulary',
    question: "What does 'vṛtti' (वृत्ति) mean?",
    options: ["Stillness", "Fluctuation/Modification", "Wisdom", "Energy"],
    correctAnswer: 1,
    explanation: "Vṛtti means fluctuation, modification, or whirlpool. It describes the movements or patterns that arise in the mind."
  },
  {
    id: 4,
    type: 'vocabulary',
    question: "What is the meaning of 'nirodha' (निरोध)?",
    options: ["Activation", "Expansion", "Cessation/Restraint", "Movement"],
    correctAnswer: 2,
    explanation: "Nirodha means cessation, restraint, or stilling. In yoga, it refers to the stilling of mental fluctuations."
  },
  {
    id: 5,
    type: 'vocabulary',
    question: "What does 'abhyāsa' (अभ्यास) represent?",
    options: ["Rest", "Practice/Effort", "Sleep", "Dream"],
    correctAnswer: 1,
    explanation: "Abhyāsa means practice, repetition, or persistent effort. It is one of the two pillars of yoga practice."
  },
  {
    id: 6,
    type: 'vocabulary',
    question: "What is 'vairāgya' (वैराग्य)?",
    options: ["Passion", "Attachment", "Non-attachment/Dispassion", "Anger"],
    correctAnswer: 2,
    explanation: "Vairāgya means non-attachment or dispassion. It complements abhyāsa as the second pillar of yoga practice."
  },
  {
    id: 7,
    type: 'grammar',
    question: "What type of sandhi occurs in 'yogānuśāsanam'?",
    options: ["Consonant sandhi", "Vowel sandhi (a + a = ā)", "Visarga sandhi", "No sandhi"],
    correctAnswer: 1,
    explanation: "When yoga (ending in 'a') combines with anuśāsanam (starting with 'a'), the two 'a' sounds combine to form 'ā' - this is vowel sandhi."
  },
  {
    id: 8,
    type: 'grammar',
    question: "In 'yogaś citta', what caused the 'ś' to appear?",
    options: ["Vowel sandhi", "Visarga sandhi", "Consonant sandhi", "No change occurred"],
    correctAnswer: 1,
    explanation: "The visarga (ḥ) in 'yogaḥ' becomes 'ś' when followed by 'c'. This is visarga sandhi - the visarga changes based on the following consonant."
  },
  {
    id: 9,
    type: 'grammar',
    question: "What is the root (dhātu) of the word 'citta'?",
    options: ["√yuj", "√cit", "√vṛt", "√rudh"],
    correctAnswer: 1,
    explanation: "The word 'citta' comes from the root √cit which means 'to perceive' or 'to think'. Understanding dhātus helps in comprehending word meanings."
  },
  {
    id: 10,
    type: 'grammar',
    question: "What grammatical case is 'nirodhaḥ' in Sutra 1.2?",
    options: ["Accusative", "Instrumental", "Nominative", "Genitive"],
    correctAnswer: 2,
    explanation: "The word 'nirodhaḥ' ends in visarga with nominative singular masculine ending, making it the subject of the sentence defining yoga."
  }
];

export const professions = [
  {
    id: "yoga",
    name: "Yoga Practitioner",
    nameHindi: "योग साधक",
    description: "Explore sutras with focus on practice, meditation, and spiritual growth",
    icon: "🧘",
    available: true
  },
  {
    id: "economist",
    name: "Economist / Accountant",
    nameHindi: "अर्थशास्त्री",
    description: "Connect Sanskrit wisdom with economic principles from Arthashastra",
    icon: "📊",
    available: false
  },
  {
    id: "philosopher",
    name: "Philosopher",
    nameHindi: "दार्शनिक",
    description: "Deep dive into metaphysical concepts and logical analysis",
    icon: "📚",
    available: false
  },
  {
    id: "psychologist",
    name: "Psychologist",
    nameHindi: "मनोवैज्ञानिक",
    description: "Explore mind sciences through ancient wisdom traditions",
    icon: "🧠",
    available: false
  },
  {
    id: "wellness",
    name: "Wellness Coach",
    nameHindi: "कल्याण प्रशिक्षक",
    description: "Integrate holistic health principles into modern coaching",
    icon: "💚",
    available: false
  }
];
