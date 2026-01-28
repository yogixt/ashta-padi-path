// Grammar Modules for Sanskrit Learning - Vyākaraṇa System

export interface GrammarExample {
  word?: string;
  transliteration?: string;
  meaning?: string;
  before?: string;
  after?: string;
  rule?: string;
  formation?: string;
  result?: string;
  expanded?: string;
  compound?: string;
  text?: string;
  note?: string;
  derived_words?: string[];
  from?: string;
  breakdown?: string;
  version1?: string;
  version2?: string;
  original?: string;
  anvaya?: string;
  implied?: string;
}

export interface GrammarCase {
  name: string;
  number?: number;
  meaning: string;
  example: string | GrammarExample;
  shows?: string[];
  indicates?: string[];
  frequency?: string;
}

export interface GrammarType {
  type: string;
  meaning?: string;
  examples?: string[] | GrammarExample[];
  example?: string | GrammarExample;
  purpose?: string;
  description?: string;
  understanding?: string;
  importance?: string;
  concept_needed?: string;
  note?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  sanskrit: string;
  transliteration: string;
  definition: string;
  concept?: string;
  purpose?: string[];
  simple_explanation?: string;
  what_it_shows?: string[];
  why_important?: string;
  main_groups?: GrammarType[];
  examples?: GrammarExample[];
  two_main_types?: GrammarType[];
  three_numbers?: GrammarType[];
  three_genders?: GrammarType[];
  cases?: GrammarCase[];
  main_types?: GrammarType[];
  main_lakaras?: GrammarType[];
  key_point?: string;
  main_idea?: string;
  importance?: string;
  // Yoga Sutra specific fields
  characteristics?: string[];
  requirements?: string[];
  key_concept?: string;
  common_types?: GrammarType[];
  key_types?: string[];
  critical_note?: string;
  important_cases?: GrammarCase[];
  types?: GrammarType[];
  mostly_used?: GrammarType[];
  common_endings?: string[];
  shows?: string;
  why_needed?: string[];
  must_perform?: string[];
  characteristic?: string;
  features?: string[];
  requires?: string[];
  core_skills?: string[];
  note?: string;
}

export interface GrammarModule {
  module_id: string;
  module_name: string;
  description: string;
  lessons: GrammarLesson[];
  core_skills?: string[];
}

export const grammarModules: GrammarModule[] = [
  {
    module_id: "foundations",
    module_name: "Vyākaraṇa Foundations",
    description: "Core grammatical concepts for Sanskrit learning",
    lessons: [
      {
        id: "vyakarana_intro",
        title: "1. Vyākaraṇa - The Science of Grammar",
        sanskrit: "व्याकरण",
        transliteration: "Vyākaraṇa",
        definition: "The science of grammar",
        purpose: [
          "To understand correct form, correct meaning, and correct usage of words in Sanskrit",
          "It protects the meaning of the Veda and Śāstra from distortion"
        ],
        simple_explanation: "Vyākaraṇa teaches how words are formed and how sentences work.",
        what_it_shows: [
          "How sounds combine (Sandhi)",
          "How words are formed (Dhātu + Pratyaya)",
          "How nouns change (Vibhakti, Vacana, Liṅga)",
          "How verbs work (Lakāra)",
          "How compounds form (Samāsa)",
          "How sentences mean (Anvaya)"
        ]
      },
      {
        id: "varna",
        title: "2. Varṇa - Sounds and Letters",
        sanskrit: "वर्ण",
        transliteration: "Varṇa",
        definition: "Sound / letter",
        concept: "Sanskrit is based on precise pronunciation",
        main_groups: [
          {
            type: "स्वर (Svaras)",
            meaning: "vowels",
            example: "अ आ इ ई उ ऊ ऋ etc."
          },
          {
            type: "व्यञ्जन (Vyañjana)",
            meaning: "consonants",
            example: "क ख ग…, च…, ट…, त…, प…"
          }
        ],
        why_important: "Change in sound = change in meaning",
        examples: [
          { word: "फल", transliteration: "phala", meaning: "fruit" },
          { word: "फला", transliteration: "phalā", meaning: "fruitful woman" }
        ]
      },
      {
        id: "sandhi",
        title: "3. Sandhi - Joining of Sounds",
        sanskrit: "सन्धि",
        transliteration: "Sandhi",
        definition: "Joining of sounds when words come together",
        concept: "When two words meet, their sounds change smoothly",
        examples: [
          { before: "योग + अनुशासनम्", after: "योगानुशासनम्", rule: "a + a = ā" },
          { before: "सत् + चित्", after: "सच्चित्", rule: "consonant assimilation" }
        ],
        purpose: ["Ease of pronunciation", "Euphonic beauty"]
      },
      {
        id: "pada",
        title: "4. Pada - Word",
        sanskrit: "पद",
        transliteration: "Pada",
        definition: "A usable word in a sentence",
        two_main_types: [
          {
            type: "सुप्-पद (Sup-pada)",
            meaning: "noun forms",
            example: "रामः, रामम्, रामेण etc."
          },
          {
            type: "तिङ्-पद (Tiṅ-pada)",
            meaning: "verb forms",
            example: "गच्छति (he goes), पठति (he reads)"
          }
        ]
      },
      {
        id: "dhatu",
        title: "5. Dhātu - Verb Root",
        sanskrit: "धातु",
        transliteration: "Dhātu",
        definition: "Root of a verb",
        concept: "All actions come from dhātus",
        examples: [
          { word: "√गम्", transliteration: "gam", meaning: "to go", derived_words: ["गच्छति (he goes)", "गमनम् (going)"] },
          { word: "√भू", transliteration: "bhū", meaning: "to be" },
          { word: "√कृ", transliteration: "kṛ", meaning: "to do" },
          { word: "√शास्", transliteration: "śās", meaning: "to teach" }
        ],
        key_point: "From one dhātu, many words are formed"
      },
      {
        id: "pratyaya",
        title: "6. Pratyaya - Suffix",
        sanskrit: "प्रत्यय",
        transliteration: "Pratyaya",
        definition: "Suffix added to root to form a word",
        two_main_types: [
          {
            type: "Kṛt-pratyaya",
            purpose: "to form nouns from verbs",
            examples: [
              { formation: "√कृ + त", result: "कृत", meaning: "done" },
              { formation: "√गम् + अन", result: "गमनम्", meaning: "going" }
            ]
          },
          {
            type: "Tiṅ-pratyaya",
            purpose: "to form verb forms",
            examples: [
              { formation: "गच्छ + ति", result: "गच्छति", meaning: "he goes" }
            ]
          }
        ],
        key_point: "Pratyaya gives shape and function to the root"
      },
      {
        id: "vibhakti",
        title: "7. Vibhakti - Case Endings",
        sanskrit: "विभक्ति",
        transliteration: "Vibhakti",
        definition: "Case endings of nouns",
        concept: "They show the role of a word in a sentence",
        cases: [
          { name: "प्रथमा (Prathamā)", number: 1, meaning: "subject", example: "रामः गच्छति (Rama goes)" },
          { name: "द्वितीया (Dvitīyā)", number: 2, meaning: "object", example: "रामं पश्यति (sees Rama)" },
          { name: "तृतीया (Tṛtīyā)", number: 3, meaning: "by/with", example: "रामेण (by Rama)" },
          { name: "चतुर्थी (Caturthī)", number: 4, meaning: "for/to", example: "रामाय (for Rama)" },
          { name: "पञ्चमी (Pañcamī)", number: 5, meaning: "from", example: "रामात् (from Rama)" },
          { name: "षष्ठी (Ṣaṣṭhī)", number: 6, meaning: "of", example: "रामस्य (Rama's)" },
          { name: "सप्तमी (Saptamī)", number: 7, meaning: "in/on", example: "रामे (in Rama)" },
          { name: "संबोधन (Sambodhana)", number: 8, meaning: "calling", example: "हे राम! (O Rama!)" }
        ]
      },
      {
        id: "vacana",
        title: "8. Vacana - Number",
        sanskrit: "वचन",
        transliteration: "Vacana",
        definition: "Number",
        three_numbers: [
          { type: "एकवचन (Ekavacana)", meaning: "singular - one", example: "बालः (one boy)" },
          { type: "द्विवचन (Dvivacana)", meaning: "dual - two", example: "बालौ (two boys)" },
          { type: "बहुवचन (Bahuvacana)", meaning: "plural - many", example: "बालाः (many boys)" }
        ]
      },
      {
        id: "linga",
        title: "9. Liṅga - Gender",
        sanskrit: "लिङ्ग",
        transliteration: "Liṅga",
        definition: "Gender",
        three_genders: [
          { type: "पुल्लिङ्ग (Pulliṅga)", meaning: "Masculine", example: "रामः" },
          { type: "स्त्रीलिङ्ग (Strīliṅga)", meaning: "Feminine", example: "सीता" },
          { type: "नपुंसकलिङ्ग (Napuṃsakaliṅga)", meaning: "Neuter", example: "फलम्" }
        ],
        key_point: "Gender decides the form of endings"
      },
      {
        id: "samasa",
        title: "10. Samāsa - Compound Words",
        sanskrit: "समास",
        transliteration: "Samāsa",
        definition: "Combining two or more words into one",
        importance: "Very common in Yoga and philosophy",
        main_idea: "Shorten a long expression into one compact word",
        examples: [
          { expanded: "योगस्य अनुशासनम्", compound: "योगानुशासनम्" },
          { expanded: "राज्ञः पुत्रः", compound: "राजपुत्रः" }
        ],
        main_types: [
          { type: "तत्पुरुष (Tatpuruṣa)", meaning: "'of / to / by' relation" },
          { type: "द्वन्द्व (Dvandva)", meaning: "Rama and Krishna" },
          { type: "बहुव्रीहि (Bahuvrīhi)", meaning: "one who has…" },
          { type: "अव्ययीभाव (Avyayībhāva)", meaning: "adverbial compound" }
        ]
      },
      {
        id: "lakara",
        title: "11. Lakāra - Tense & Mood",
        sanskrit: "लकार",
        transliteration: "Lakāra",
        definition: "Tense/mood of verb",
        main_lakaras: [
          { type: "लट् (Laṭ)", meaning: "present", example: "गच्छति (goes)" },
          { type: "लङ् (Laṅ)", meaning: "past", example: "अगच्छत् (went)" },
          { type: "लृट् (Lṛṭ)", meaning: "future", example: "गमिष्यति (will go)" },
          { type: "विधिलिङ् (Vidhiliṅ)", meaning: "should", example: "should go" },
          { type: "लोट् (Loṭ)", meaning: "command", example: "go!" }
        ]
      },
      {
        id: "anvaya",
        title: "12. Anvaya - Sentence Meaning",
        sanskrit: "अन्वय",
        transliteration: "Anvaya",
        definition: "Logical word order and meaning",
        concept: "Sanskrit word order is free, so we reconstruct meaning by grammar",
        examples: [
          { version1: "रामः वनं गच्छति", version2: "वनं रामः गच्छति", meaning: "Rama goes to the forest", note: "Both mean the same thing" }
        ]
      }
    ]
  },
  {
    module_id: "yoga_sutra_specific",
    module_name: "Vyākaraṇa for Yoga Sūtras",
    description: "Specific grammatical tools needed for Yoga Sutra study",
    core_skills: [
      "Sandhi-viccheda",
      "Samāsa-vigraha (compound analysis)",
      "Case analysis (especially Ṣaṣṭhī & Saptamī)",
      "Kṛdanta forms (verbal nouns & participles)",
      "Prefix (upasarga) interpretation",
      "Supplying implied verbs",
      "Anvaya reconstruction"
    ],
    lessons: [
      {
        id: "nominal_style",
        title: "1. Nominal Style (Noun-Based Sentences)",
        sanskrit: "नाम-प्रधान",
        transliteration: "Nāma-pradhāna",
        definition: "Most Yoga Sūtras are nāma-pradhāna (noun-centered), not verb-centered",
        characteristics: ["Verbs are often omitted", "Meaning is carried by nouns and compounds"],
        examples: [
          { text: "योगश्चित्तवृत्तिनिरोधः (1.2)", note: "No verb is stated", implied: "अस्ति / भवति (is)" }
        ],
        requirements: ["Understanding case endings", "Supplying implied verbs"],
        key_concept: "Elliptical nominal sentences (क्रियालोप)"
      },
      {
        id: "extensive_samasa",
        title: "2. Extensive Use of Samāsa (Compounds)",
        sanskrit: "समास-विग्रह",
        transliteration: "Samāsa-vigraha",
        definition: "This is the most dominant grammatical feature of Yoga Sūtras",
        common_types: [
          {
            type: "Ṣaṣṭhī Tatpuruṣa",
            purpose: "Used to show 'of' relation",
            examples: [
              { expanded: "योगस्य अनुशासनम्", compound: "योगानुशासनम् (1.1)" },
              { expanded: "चित्तस्य वृत्तिः", compound: "चित्तवृत्ति" }
            ],
            concept_needed: "Breaking compounds into vigraha-vākya"
          },
          {
            type: "Karmadhāraya",
            description: "Adjective + noun, same case",
            examples: ["विपर्ययज्ञानम्", "धर्ममेघसमाधिः"],
            understanding: "Both members refer to one entity"
          },
          {
            type: "Bahuvrīhi",
            description: "Describes 'one who has …'",
            example: { compound: "क्लेशमूलः कर्माशयः (2.12)", meaning: "Whose root is kleśa" },
            importance: "Crucial for philosophical interpretation"
          }
        ]
      },
      {
        id: "sandhi_mastery",
        title: "3. Sandhi Mastery is Essential",
        sanskrit: "सन्धि-ज्ञान",
        transliteration: "Sandhi-jñāna",
        definition: "Almost every sūtra involves sandhi",
        examples: [
          { before: "योगः + च", after: "योगश्च (1.2)" },
          { before: "तदा + द्रष्टुः", after: "तदा द्रष्टुः (1.3)" },
          { before: "स्वरूपे + अवस्थानम्", after: "स्वरूपेऽवस्थानम्" }
        ],
        key_types: ["Vowel sandhi (स्वर सन्धि)", "Visarga sandhi (विसर्ग सन्धि)"],
        critical_note: "Without sandhi knowledge, padaccheda becomes impossible"
      },
      {
        id: "case_usage",
        title: "4. Case Usage (Vibhakti) in Philosophical Precision",
        sanskrit: "विभक्ति-प्रयोग",
        transliteration: "Vibhakti-prayoga",
        definition: "Patañjali uses cases very deliberately",
        important_cases: [
          {
            name: "Ṣaṣṭhī – Genitive (of)",
            meaning: "Very frequent",
            example: { text: "द्रष्टुः स्वरूपेऽवस्थानम् (1.3)", meaning: "The abiding of the seer in his own nature" },
            shows: ["Possession", "Ontological relation"]
          },
          {
            name: "Saptamī – Locative (in)",
            meaning: "State or locus",
            example: "स्वरूपे अवस्थानम्, चित्ते",
            indicates: ["State", "Locus of experience"]
          },
          {
            name: "Pañcamī – Ablative (from)",
            meaning: "Cause and source",
            example: { text: "ततः क्लेशकर्मनिवृत्तिः (2.25)", meaning: "From that arises cessation…" },
            shows: ["Cause and source"]
          }
        ]
      },
      {
        id: "participles_krdanta",
        title: "5. Participles and Kṛdanta Forms",
        sanskrit: "कृदन्त",
        transliteration: "Kṛdanta",
        definition: "Instead of finite verbs, Patañjali uses participles and verbal nouns",
        types: [
          {
            type: "Kta / Ktavatu (Past participles)",
            examples: [
              { word: "दृष्ट", meaning: "seen", from: "√दृश्" },
              { word: "क्लिष्ट / अक्लिष्ट", from: "√क्लिश्" }
            ],
            note: "These describe states, not actions"
          },
          {
            type: "Tumun Infinitive",
            purpose: "Used for purpose",
            examples: [
              { text: "तस्य वाचकः प्रणवः (1.27)" },
              { text: "तज्जपस्तदर्थभावनम् (1.28)", note: "भावनम् = from √भू + ल्युट्" }
            ]
          }
        ],
        key_point: "Understanding verbal nouns is essential"
      },
      {
        id: "lakara_limited",
        title: "6. Lakāra (Tense/Mood) - Very Limited Use",
        sanskrit: "लकार-प्रयोग",
        transliteration: "Lakāra-prayoga",
        definition: "Yoga Sūtras rarely use full verb paradigms",
        mostly_used: [
          {
            type: "Laṭ – Present tense",
            examples: ["वर्तते (exists)", "भवति (becomes)"]
          },
          {
            type: "Liṅ – Potential / should",
            example: { text: "अभ्यासवैराग्याभ्यां तन्निरोधः (1.12)", implied: "निवारणं भवेत्" }
          }
        ],
        key_point: "Often the verb is implied, not stated"
      },
      {
        id: "upasargas",
        title: "7. Use of Technical Prefixes (Upasargas)",
        sanskrit: "उपसर्ग",
        transliteration: "Upasarga",
        definition: "Many philosophical terms are built with prefixes",
        examples: [
          { word: "निरोध", breakdown: "नि + रुध्" },
          { word: "प्रत्याहार", breakdown: "प्रति + आ + √हृ" },
          { word: "अभ्यासन", breakdown: "अभि + √अस्" },
          { word: "वैराग्य", breakdown: "वि + राग" }
        ],
        key_point: "Understanding upasarga meaning changes the philosophy"
      },
      {
        id: "abstract_nouns",
        title: "8. Use of Abstract Nouns",
        sanskrit: "भाववाचक संज्ञा",
        transliteration: "Bhāvavācaka saṃjñā",
        definition: "Yoga Sūtras heavily use abstract nouns",
        common_endings: ["ता (tā)", "त्व (tva)", "अन (ana)", "इ (i)"],
        examples: [
          { word: "अस्मिता" },
          { word: "अविद्या" },
          { word: "कैवल्य" },
          { word: "विवेकख्याति" },
          { word: "निरोधः" }
        ],
        shows: "Yoga Sūtras speak in terms of states and principles, not actions"
      },
      {
        id: "anvaya_reconstruction",
        title: "9. Anvaya Reconstruction is Essential",
        sanskrit: "अन्वय-रचना",
        transliteration: "Anvaya-racanā",
        definition: "Reconstructing logical word order",
        why_needed: ["Word order is flexible", "Verbs are omitted", "Compounds are dense"],
        must_perform: ["पदच्छेद (padaccheda) - word separation", "अन्वय (logical re-ordering)"],
        examples: [
          { original: "तदा द्रष्टुः स्वरूपे अवस्थानम्", anvaya: "तदा द्रष्टुः स्वरूपे अवस्थानम् भवति", note: "Verb 'भवति' is supplied" }
        ]
      },
      {
        id: "sutra_style",
        title: "10. Minimal Use of Finite Verbs – Sūtra Style",
        sanskrit: "सूत्र-शैली",
        transliteration: "Sūtra-śailī",
        definition: "Characteristic of sūtra language",
        features: ["Maximum meaning", "Minimum words", "Grammar compressed"],
        requires: ["Supplying implied verbs", "Expanding compounds", "Restoring case relations"]
      }
    ]
  }
];
