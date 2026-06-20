export interface SyllabusPaper {
  title: string;
  badge?: string;
  intro?: string;
  points: string[];
}

export interface PatternRow {
  paper: string;
  marks: string;
  questions?: string;
  duration?: string;
  nature: string;
}

export interface PatternStage {
  title: string;
  description?: string;
  rows: PatternRow[];
  note?: string;
}

export interface ExamSyllabus {
  id: string;
  slug: string;
  shortName: string;
  color: 'blue' | 'gold' | 'orange' | 'green';
  fullName: { en: string; hi: string };
  tagline: { en: string; hi: string };
  description: { en: string; hi: string };
  preliminary: { en: SyllabusPaper[]; hi: SyllabusPaper[] };
  mains: { en: SyllabusPaper[]; hi: SyllabusPaper[] };
  optionals?: { en: string[]; hi: string[]; literatureEn?: string; literatureHi?: string };
  pattern: {
    en: { stages: PatternStage[]; finalMerit: string };
    hi: { stages: PatternStage[]; finalMerit: string };
  };
}

// ─── UPSC IAS ─────────────────────────────────────────────────────────────────
const IAS: ExamSyllabus = {
  id: 'ias',
  slug: 'ias',
  shortName: 'IAS',
  color: 'blue',
  fullName: {
    en: 'UPSC Civil Services Examination (CSE)',
    hi: 'UPSC सिविल सेवा परीक्षा (CSE)',
  },
  tagline: {
    en: 'India\'s Premier Civil Services Examination',
    hi: 'भारत की सर्वोच्च सिविल सेवा परीक्षा',
  },
  description: {
    en: 'The UPSC Civil Services Examination is conducted by the Union Public Service Commission to recruit officers for the IAS, IPS, IFS, and other Group A & B Central Services. It consists of three successive stages — Prelims, Mains, and Interview — with a total merit of 2025 marks.',
    hi: 'यूपीएससी सिविल सेवा परीक्षा संघ लोक सेवा आयोग द्वारा IAS, IPS, IFS और अन्य केन्द्रीय सेवाओं के लिए आयोजित की जाती है। इसमें तीन क्रमिक चरण होते हैं — प्रारंभिक, मुख्य और साक्षात्कार — कुल 2025 अंकों के साथ।',
  },
  preliminary: {
    en: [
      {
        title: 'Paper I: General Studies (200 Marks, 2 Hours)',
        badge: 'Merit-Deciding',
        points: [
          'Current events of national and international importance.',
          'History of India and Indian National Movement.',
          'Indian and World Geography — Physical, Social, Economic Geography of India and the World.',
          'Indian Polity and Governance — Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, etc.',
          'Economic and Social Development — Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives, etc.',
          'General issues on Environmental ecology, Bio-diversity and Climate Change — that do not require subject specialization.',
          'General Science.',
        ],
      },
      {
        title: 'Paper II: CSAT (200 Marks, 2 Hours)',
        badge: 'Qualifying (Min. 33%)',
        points: [
          'Comprehension.',
          'Interpersonal skills including communication skills.',
          'Logical reasoning and analytical ability.',
          'Decision making and problem solving.',
          'General mental ability.',
          'Basic numeracy (numbers and their relations, orders of magnitude, etc.) — Class X level.',
          'Data interpretation (charts, graphs, tables, data sufficiency etc.) — Class X level.',
        ],
      },
    ],
    hi: [
      {
        title: 'प्रश्न पत्र I: सामान्य अध्ययन (200 अंक, 2 घंटे)',
        badge: 'मेरिट निर्धारक',
        points: [
          'समसामयिक घटनाएं: राष्ट्रीय और अंतर्राष्ट्रीय महत्व की समसामयिक घटनाएं।',
          'भारत का इतिहास: भारत का इतिहास और भारतीय राष्ट्रीय आंदोलन।',
          'भूगोल: भारत एवं विश्व का प्राकृतिक, सामाजिक एवं आर्थिक भूगोल।',
          'राजव्यवस्था एवं शासन: भारतीय संविधान, राजनीतिक प्रणाली, पंचायती राज, लोक नीति, अधिकारों संबंधी मुद्दे आदि।',
          'आर्थिक और सामाजिक विकास: सतत विकास, गरीबी, समावेशन, जनसांख्यिकी, सामाजिक क्षेत्र की पहल आदि।',
          'पर्यावरण एवं पारिस्थितिकी: पर्यावरणीय पारिस्थितिकी, जैव विविधता और जलवायु परिवर्तन पर सामान्य मुद्दे (विषय विशेषज्ञता आवश्यक नहीं)।',
          'सामान्य विज्ञान।',
        ],
      },
      {
        title: 'प्रश्न पत्र II: सीसैट / CSAT (200 अंक, 2 घंटे)',
        badge: 'क्वालीफाइंग (न्यूनतम 33%)',
        points: [
          'बोधगम्यता (Comprehension)।',
          'संचार कौशल सहित अंतर-वैयक्तिक कौशल।',
          'तार्किक कौशल एवं विश्लेषणात्मक क्षमता।',
          'निर्णय लेना और समस्या समाधान।',
          'सामान्य मानसिक योग्यता।',
          'आधारभूत संगणन (संख्याएं और उनके संबंध, विस्तार क्रम आदि — दसवीं कक्षा का स्तर)।',
          'आंकड़ों का निर्वचन (चार्ट, ग्राफ, तालिका, आंकड़ों की पर्याप्तता आदि — दसवीं कक्षा का स्तर)।',
        ],
      },
    ],
  },
  mains: {
    en: [
      {
        title: 'Qualifying Papers (300 Marks Each)',
        badge: 'Qualifying',
        points: [
          'Paper A (Indian Language): Comprehension of unseen passages, Precis Writing, Usage and Vocabulary, Short Essays, Translation from English to Indian language and vice-versa.',
          'Paper B (English): Comprehension of unseen passages, Precis Writing, Usage and Vocabulary, Short Essays.',
        ],
      },
      {
        title: 'Paper I: Essay (250 Marks)',
        points: [
          'Candidates will be required to write an essay on multiple topics. They will be expected to keep closely to the subject of the essay, to arrange their ideas in orderly fashion, and to write concisely. Credit will be given for effective and exact expression.',
        ],
      },
      {
        title: 'Paper II: General Studies I (250 Marks)',
        intro: 'Indian Heritage and Culture, History and Geography of the World and Society.',
        points: [
          'Indian culture: Art forms, literature and architecture from ancient to modern times.',
          'Modern Indian history from about the middle of the eighteenth century until the present — significant events, personalities, issues.',
          'The Freedom Struggle — its various stages and important contributors and contributions from different parts of the country.',
          'Post-independence consolidation and reorganisation within the country.',
          'History of the world — Industrial revolution, world wars, redrawal of national boundaries, colonization, decolonization, political philosophies like communism, capitalism, socialism etc. — their forms and effect on society.',
          'Salient features of Indian Society, Diversity of India.',
          'Role of women and women\'s organisation, population and associated issues, poverty and developmental issues, urbanisation, their problems and their remedies.',
          'Distribution of key natural resources across the world (including South Asia and the Indian sub-continent); factors responsible for the location of primary, secondary, and tertiary sector industries in various parts of the world (including India).',
          'Important Geophysical phenomena such as earthquakes, Tsunami, Volcanic activity, cyclone etc. — geographical features and their location — changes in critical geographical features (including waterbodies and ice-caps) and in flora and fauna and the effects of such changes.',
        ],
      },
      {
        title: 'Paper III: General Studies II (250 Marks)',
        intro: 'Governance, Constitution, Polity, Social Justice and International relations.',
        points: [
          'Indian Constitution — historical underpinnings, evolution, features, amendments, significant provisions and basic structure.',
          'Functions and responsibilities of the Union and the States, issues and challenges pertaining to the federal structure, devolution of powers and finances up to local levels and challenges therein.',
          'Separation of powers between various organs, dispute redressal mechanisms and institutions.',
          'Parliament and State Legislatures — structure, functioning, conduct of business, powers and privileges, and issues arising out of these.',
          'Structure, organisation and functioning of the Executive and the Judiciary — Ministries and Departments of the Government; Pressure Groups and formal/informal associations and their role in the Polity.',
          'Salient features of the Representation of People\'s Act.',
          'Appointment to various Constitutional Posts, powers, functions and responsibilities of various Constitutional Bodies.',
          'Statutory, Regulatory and various quasi-judicial bodies.',
          'Government policies and interventions for development in various sectors and issues arising out of their design and implementation.',
          'Development processes and the development industry — the role of NGOs, SHGs, various groups and associations, donors, charities, institutional and other stakeholders.',
          'Welfare schemes for vulnerable sections of the population by the Centre and States and the performance of these schemes; mechanisms, laws, institutions and bodies constituted for the protection and betterment of these vulnerable sections.',
          'Issues relating to development and management of Social Sector/Services relating to Health, Education, Human Resources.',
          'Issues relating to poverty and hunger.',
          'Important aspects of governance, transparency and accountability, e-governance — applications, models, successes, limitations, and potential; citizens charters, transparency and accountability and institutional and other measures.',
          'Role of civil services in a democracy.',
          'India and its neighbourhood — relations.',
          'Bilateral, regional and global groupings and agreements involving India and/or affecting India\'s interests.',
          'Effect of policies and politics of developed and developing countries on India\'s interests, Indian diaspora.',
          'Important International institutions, agencies and fora — their structure, mandate.',
        ],
      },
      {
        title: 'Paper IV: General Studies III (250 Marks)',
        intro: 'Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management.',
        points: [
          'Indian Economy and issues relating to planning, mobilization of resources, growth, development and employment.',
          'Inclusive growth and issues arising from it.',
          'Government Budgeting.',
          'Major crops — cropping patterns in various parts of the country — different types of irrigation and irrigation systems; storage, transport and marketing of agricultural produce and issues and related constraints; e-technology in the aid of farmers.',
          'Issues related to direct and indirect farm subsidies and minimum support prices; Public Distribution System — objectives, functioning, limitations, revamping; issues of buffer stocks and food security; Technology missions; economics of animal-rearing.',
          'Food processing and related industries in India — scope and significance, location, upstream and downstream requirements, supply chain management.',
          'Land reforms in India.',
          'Effects of liberalization on the economy, changes in industrial policy and their effects on industrial growth.',
          'Infrastructure: Energy, Ports, Roads, Airports, Railways etc.',
          'Investment models.',
          'Science and Technology — developments and their applications and effects in everyday life.',
          'Achievements of Indians in science and technology; indigenization of technology and developing new technology.',
          'Awareness in the fields of IT, Space, Computers, robotics, nano-technology, bio-technology and issues relating to intellectual property rights.',
          'Conservation, environmental pollution and degradation, environmental impact assessment.',
          'Disaster and disaster management.',
          'Linkages between development and spread of extremism.',
          'Role of external state and non-state actors in creating challenges to internal security.',
          'Challenges to internal security through communication networks, the role of media and social networking sites in internal security challenges, basics of cyber security; money-laundering and its prevention.',
          'Security challenges and their management in border areas — linkages of organised crime with terrorism.',
          'Various Security forces and agencies and their mandate.',
        ],
      },
      {
        title: 'Paper V: General Studies IV (250 Marks)',
        intro: 'Ethics, Integrity and Aptitude.',
        points: [
          'Ethics and Human Interface: Essence, determinants and consequences of Ethics in human actions; dimensions of ethics; ethics — in private and public relationships.',
          'Human Values — lessons from the lives and teachings of great leaders, reformers and administrators; the role of family, society and educational institutions in inculcating values.',
          'Attitude: content, structure, function; its influence and relation with thought and behaviour; moral and political attitudes; social influence and persuasion.',
          'Aptitude and foundational values for Civil Service, integrity, impartiality and non-partisanship, objectivity, dedication to public service, empathy, tolerance and compassion towards the weaker sections.',
          'Emotional intelligence — concepts, and their utilities and application in administration and governance.',
          'Contributions of moral thinkers and philosophers from India and world.',
          'Public/Civil service values and Ethics in Public administration: Status and problems; ethical concerns and dilemmas in government and private institutions; laws, rules, regulations and conscience as sources of ethical guidance; accountability and ethical governance; strengthening of ethical and moral values in governance; ethical issues in international relations and funding; corporate governance.',
          'Probity in Governance: Concept of public service; Philosophical basis of governance and probity; Information sharing and transparency in government, Right to Information, Codes of Ethics, Codes of Conduct, Citizen\'s Charters, Work culture, Quality of service delivery, Utilization of public funds, challenges of corruption.',
          'Case Studies on the above issues.',
        ],
      },
      {
        title: 'Papers VI & VII: Optional Subject (250 Marks Each)',
        intro: 'Candidate has to choose ONE optional subject from the list provided by UPSC. It comprises two papers (Paper I & Paper II).',
        points: [
          'Agriculture', 'Animal Husbandry and Veterinary Science', 'Anthropology', 'Botany', 'Chemistry',
          'Civil Engineering', 'Commerce and Accountancy', 'Economics', 'Electrical Engineering', 'Geography',
          'Geology', 'History', 'Law', 'Management', 'Mathematics', 'Mechanical Engineering',
          'Medical Science', 'Philosophy', 'Physics', 'Political Science and International Relations (PSIR)',
          'Psychology', 'Public Administration', 'Sociology', 'Statistics', 'Zoology',
          'Literature of any one language: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santhali, Sindhi, Tamil, Telugu, Urdu, and English.',
        ],
      },
    ],
    hi: [
      {
        title: 'क्वालीफाइंग पेपर (प्रत्येक 300 अंक)',
        badge: 'केवल क्वालीफाइंग',
        points: [
          'पेपर A (भारतीय भाषा): दिए गए गद्यांशों को समझना, संक्षेपण, शब्द प्रयोग तथा शब्द भंडार, लघु निबंध, अंग्रेजी से भारतीय भाषा तथा भारतीय भाषा से अंग्रेजी में अनुवाद।',
          'पेपर B (अंग्रेजी): दिए गए गद्यांशों को समझना, संक्षेपण, शब्द प्रयोग तथा शब्द भंडार, लघु निबंध।',
        ],
      },
      {
        title: 'पेपर I: निबंध (250 अंक)',
        points: [
          'उम्मीदवारों को विविध विषयों पर निबंध लिखना होगा। उनसे अपेक्षा की जाएगी कि वे निबंध के विषय पर ही केंद्रित रहें, अपने विचारों को सुनियोजित रूप से व्यक्त करें और संक्षेप में लिखें।',
        ],
      },
      {
        title: 'पेपर II: सामान्य अध्ययन I (250 अंक)',
        intro: 'भारतीय विरासत और संस्कृति, विश्व का इतिहास एवं भूगोल और समाज।',
        points: [
          'भारतीय संस्कृति: प्राचीन काल से आधुनिक काल तक कला के रूप, साहित्य और वास्तुकला।',
          'आधुनिक भारतीय इतिहास: 18वीं सदी के मध्य से वर्तमान तक।',
          'स्वतंत्रता संग्राम।',
          'स्वतंत्रता के पश्चात देश के अंदर एकीकरण और पुनर्गठन।',
          'विश्व का इतिहास: औद्योगिक क्रांति, विश्व युद्ध, राष्ट्रीय सीमाओं का पुनः सीमांकन, उपनिवेशवाद, पूंजीवाद, समाजवाद आदि।',
          'भारतीय समाज की मुख्य विशेषताएं, भारत की विविधता।',
          'महिलाओं की भूमिका, जनसंख्या संबंधी मुद्दे, गरीबी और विकासात्मक विषय, शहरीकरण।',
          'विश्व भर के मुख्य प्राकृतिक संसाधनों का वितरण।',
          'भूकंप, सुनामी, ज्वालामुखीय हलचल, चक्रवात आदि जैसी महत्वपूर्ण भू-भौतिकीय घटनाएं।',
        ],
      },
      {
        title: 'पेपर III: सामान्य अध्ययन II (250 अंक)',
        intro: 'शासन व्यवस्था, संविधान, राजव्यवस्था, सामाजिक न्याय तथा अंतर्राष्ट्रीय संबंध।',
        points: [
          'भारतीय संविधान: ऐतिहासिक आधार, विकास, विशेषताएं, संशोधन।',
          'संघ एवं राज्यों के कार्य तथा उत्तरदायित्व।',
          'शक्तियों का पृथक्करण, विवाद निवारण तंत्र।',
          'संसद और राज्य विधायिका।',
          'कार्यपालिका और न्यायपालिका की संरचना, संगठन और कार्य।',
          'जन प्रतिनिधित्व अधिनियम की मुख्य विशेषताएं।',
          'विभिन्न संवैधानिक पद, वैधानिक, नियामक और अर्ध-न्यायिक निकाय।',
          'सरकारी नीतियां और विकास के लिए हस्तक्षेप।',
          'कमजोर वर्गों के लिए कल्याणकारी योजनाएं।',
          'स्वास्थ्य, शिक्षा, मानव संसाधनों से संबंधित विषय।',
          'भारत एवं इसके पड़ोसी — संबंध।',
          'द्विपक्षीय, क्षेत्रीय और वैश्विक समूह और भारत से जुड़े समझौते।',
        ],
      },
      {
        title: 'पेपर IV: सामान्य अध्ययन III (250 अंक)',
        intro: 'प्रौद्योगिकी, आर्थिक विकास, जैव विविधता, पर्यावरण, सुरक्षा तथा आपदा प्रबंधन।',
        points: [
          'भारतीय अर्थव्यवस्था: योजना, संसाधनों को जुटाने, प्रगति, विकास तथा रोजगार से संबंधित विषय।',
          'समावेशी विकास।',
          'सरकारी बजट।',
          'मुख्य फसलें, सिंचाई प्रणाली, किसानों की सहायता के लिए ई-प्रौद्योगिकी।',
          'भारत में खाद्य प्रसंस्करण एवं संबंधित उद्योग।',
          'भारत में भूमि सुधार।',
          'उदारीकरण का अर्थव्यवस्था पर प्रभाव।',
          'बुनियादी ढांचा: ऊर्जा, बंदरगाह, सड़क, विमानपत्तन, रेलवे आदि।',
          'विज्ञान एवं प्रौद्योगिकी: विकास एवं अनुप्रयोग।',
          'सूचना प्रौद्योगिकी, अंतरिक्ष, कंप्यूटर, रोबोटिक्स, नैनो-टैक्नोलॉजी, बायो-टैक्नोलॉजी के क्षेत्र में जागरूकता।',
          'संरक्षण, पर्यावरण प्रदूषण और क्षरण।',
          'आपदा और आपदा प्रबंधन।',
          'विकास और उग्रवाद के बीच संबंध।',
          'आंतरिक सुरक्षा के लिए चुनौतियां उत्पन्न करने वाले बाहरी राज्य और गैर-राज्य अभिकर्ताओं की भूमिका।',
          'सीमावर्ती क्षेत्रों में सुरक्षा चुनौतियां; साइबर सुरक्षा; मनी-लॉन्ड्रिंग।',
        ],
      },
      {
        title: 'पेपर V: सामान्य अध्ययन IV (250 अंक)',
        intro: 'नीतिशास्त्र, सत्यनिष्ठा और अभिरुचि।',
        points: [
          'नीतिशास्त्र तथा मानवीय सह-संबंध: मानवीय क्रियाकलापों में नीतिशास्त्र का सार तत्व, इसके निर्धारक और परिणाम।',
          'अभिवृत्ति (Attitude): विषयवस्तु, संरचना, कार्य; विचार तथा आचरण के परिप्रेक्ष्य में इसका प्रभाव एवं संबंध।',
          'सिविल सेवा के लिए अभिरुचि तथा बुनियादी मूल्य (सत्यनिष्ठा, भेदभाव रहित तथा गैर-तरफदारी, निष्पक्षता, सहानुभूति, सहिष्णुता)।',
          'भावनात्मक समझ (Emotional intelligence)।',
          'भारत तथा विश्व के नैतिक विचारकों तथा दार्शनिकों के योगदान।',
          'लोक प्रशासन में लोक/सिविल सेवा मूल्य तथा नीतिशास्त्र।',
          'शासन व्यवस्था में ईमानदारी (Probity in Governance): लोक सेवा की अवधारणा; शासन व्यवस्था और ईमानदारी का दार्शनिक आधार; सूचना का अधिकार, आचार संहिता, नागरिक घोषणा पत्र।',
          'उपर्युक्त विषयों पर केस स्टडीज़ (दृष्टांत)।',
        ],
      },
      {
        title: 'पेपर VI और VII: वैकल्पिक विषय (प्रत्येक 250 अंक)',
        intro: 'उम्मीदवार को यूपीएससी द्वारा दी गई सूची में से किसी एक वैकल्पिक विषय का चुनाव करना होता है। इसमें दो प्रश्न पत्र (पेपर I और पेपर II) होते हैं।',
        points: [
          '1. कृषि (Agriculture)', '2. पशुपालन एवं पशुचिकित्सा विज्ञान (Animal Husbandry and Veterinary Science)',
          '3. मानव विज्ञान (Anthropology)', '4. वनस्पति विज्ञान (Botany)', '5. रसायन विज्ञान (Chemistry)',
          '6. सिविल इंजीनियरिंग (Civil Engineering)', '7. वाणिज्य एवं लेखाशास्त्र (Commerce and Accountancy)',
          '8. अर्थशास्त्र (Economics)', '9. इलेक्ट्रिकल इंजीनियरिंग (Electrical Engineering)', '10. भूगोल (Geography)',
          '11. भू-विज्ञान (Geology)', '12. इतिहास (History)', '13. विधि / कानून (Law)',
          '14. प्रबंधन (Management)', '15. गणित (Mathematics)', '16. मैकेनिकल इंजीनियरिंग (Mechanical Engineering)',
          '17. चिकित्सा विज्ञान (Medical Science)', '18. दर्शनशास्त्र (Philosophy)', '19. भौतिकी (Physics)',
          '20. राजनीति विज्ञान और अंतर्राष्ट्रीय संबंध (PSIR)', '21. मनोविज्ञान (Psychology)',
          '22. लोक प्रशासन (Public Administration)', '23. समाजशास्त्र (Sociology)',
          '24. सांख्यिकी (Statistics)', '25. प्राणी विज्ञान (Zoology)',
          'निम्नलिखित भाषाओं में से किसी एक का साहित्य: असमिया, बंगाली, बोडो, डोगरी, गुजराती, हिंदी, कन्नड, कश्मीरी, कोंकणी, मैथिली, मलयालम, मणिपुरी, मराठी, नेपाली, उड़िया, पंजाबी, संस्कृत, संथाली, सिंधी, तमिल, तेलुगु, उर्दू और अंग्रेजी।',
        ],
      },
    ],
  },
  pattern: {
    en: {
      stages: [
        {
          title: 'Stage 1: Preliminary Examination (Objective Type)',
          description: 'The Prelims is a screening test. The marks scored here do not count toward the final merit list. There is a negative marking of 1/3rd for every incorrect answer.',
          rows: [
            { paper: 'Paper I: General Studies (GS)', marks: '200', questions: '100', nature: 'Merit-Deciding (Cutoff for Mains)' },
            { paper: 'Paper II: CSAT', marks: '200', questions: '80', nature: 'Qualifying Only (Min. 33% required)' },
          ],
        },
        {
          title: 'Stage 2: Main Examination (Descriptive Type)',
          description: 'The Main exam consists of 9 papers. Two are qualifying language papers, and the remaining seven are counted for merit ranking.',
          rows: [
            { paper: 'Paper A — Compulsory Indian Language', marks: '300', nature: 'Qualifying (25%)' },
            { paper: 'Paper B — English', marks: '300', nature: 'Qualifying (25%)' },
            { paper: 'Paper I — Essay', marks: '250', nature: 'Merit-Deciding' },
            { paper: 'Paper II — General Studies I', marks: '250', nature: 'Merit-Deciding' },
            { paper: 'Paper III — General Studies II', marks: '250', nature: 'Merit-Deciding' },
            { paper: 'Paper IV — General Studies III', marks: '250', nature: 'Merit-Deciding' },
            { paper: 'Paper V — General Studies IV', marks: '250', nature: 'Merit-Deciding' },
            { paper: 'Paper VI — Optional Subject Paper 1', marks: '250', nature: 'Merit-Deciding' },
            { paper: 'Paper VII — Optional Subject Paper 2', marks: '250', nature: 'Merit-Deciding' },
            { paper: 'Total (7 Merit Papers)', marks: '1750', nature: '—' },
          ],
        },
        {
          title: 'Stage 3: Personality Test (Interview)',
          description: 'Candidates who clear the Main examination cutoff are called for the interview.',
          rows: [
            { paper: 'Personality Test (Interview)', marks: '275', nature: 'Merit-Deciding' },
          ],
        },
      ],
      finalMerit: 'Final Merit Score = Mains Marks (1750) + Interview Marks (275) = 2025 Marks',
    },
    hi: {
      stages: [
        {
          title: 'चरण 1: प्रारंभिक परीक्षा (बहुविकल्पीय)',
          description: 'प्रारंभिक परीक्षा एक स्क्रीनिंग टेस्ट है। इसके अंक अंतिम मेरिट में नहीं जोड़े जाते हैं। इसमें प्रत्येक गलत उत्तर के लिए 1/3 (एक तिहाई) अंकों की नेगेटिव मार्किंग का प्रावधान है।',
          rows: [
            { paper: 'प्रश्न पत्र I: सामान्य अध्ययन (GS)', marks: '200', questions: '100', nature: 'मेरिट निर्धारक (मुख्य परीक्षा का कटऑफ)' },
            { paper: 'प्रश्न पत्र II: सीसैट (CSAT)', marks: '200', questions: '80', nature: 'केवल क्वालीफाइंग (न्यूनतम 33% अनिवार्य)' },
          ],
        },
        {
          title: 'चरण 2: मुख्य परीक्षा (वर्णनात्मक)',
          description: 'मुख्य परीक्षा में कुल 9 प्रश्न पत्र होते हैं। इनमें से दो भाषा के पेपर केवल क्वालीफाइंग प्रकृति के होते हैं, जबकि शेष सात पेपरों के अंक मेरिट रैंकिंग के लिए गिने जाते हैं।',
          rows: [
            { paper: 'पेपर A — अनिवार्य भारतीय भाषा', marks: '300', nature: 'क्वालीफाइंग (25%)' },
            { paper: 'पेपर B — अंग्रेजी', marks: '300', nature: 'क्वालीफाइंग (25%)' },
            { paper: 'पेपर I — निबंध', marks: '250', nature: 'मेरिट निर्धारक' },
            { paper: 'पेपर II — सामान्य अध्ययन I', marks: '250', nature: 'मेरिट निर्धारक' },
            { paper: 'पेपर III — सामान्य अध्ययन II', marks: '250', nature: 'मेरिट निर्धारक' },
            { paper: 'पेपर IV — सामान्य अध्ययन III', marks: '250', nature: 'मेरिट निर्धारक' },
            { paper: 'पेपर V — सामान्य अध्ययन IV', marks: '250', nature: 'मेरिट निर्धारक' },
            { paper: 'पेपर VI — वैकल्पिक विषय पेपर 1', marks: '250', nature: 'मेरिट निर्धारक' },
            { paper: 'पेपर VII — वैकल्पिक विषय पेपर 2', marks: '250', nature: 'मेरिट निर्धारक' },
            { paper: 'कुल भार (7 मेरिट पेपर)', marks: '1750', nature: '—' },
          ],
        },
        {
          title: 'चरण 3: साक्षात्कार (Interview)',
          description: 'मुख्य परीक्षा कटऑफ उत्तीर्ण करने वाले उम्मीदवारों को साक्षात्कार के लिए बुलाया जाता है।',
          rows: [
            { paper: 'व्यक्तित्व परीक्षण (साक्षात्कार)', marks: '275', nature: 'मेरिट निर्धारक' },
          ],
        },
      ],
      finalMerit: 'अंतिम मेरिट = मुख्य परीक्षा के अंक (1750) + साक्षात्कार के अंक (275) = कुल 2025 अंक',
    },
  },
};

// ─── UPPCS ────────────────────────────────────────────────────────────────────
const UPPCS: ExamSyllabus = {
  id: 'uppsc',
  slug: 'uppsc',
  shortName: 'UPPCS',
  color: 'gold',
  fullName: { en: 'UPPCS — Uttar Pradesh Public Service Commission', hi: 'यूपीपीसीएस — उत्तर प्रदेश लोक सेवा आयोग' },
  tagline: { en: 'UP\'s Premier State Civil Services Examination', hi: 'उत्तर प्रदेश की प्रमुख राज्य सिविल सेवा परीक्षा' },
  description: {
    en: 'The UPPCS examination is conducted by the Uttar Pradesh Public Service Commission to recruit officers for various State services. It includes UP-specific papers on history, governance, economy and society of Uttar Pradesh. Final merit is out of 1600 marks.',
    hi: 'यूपीपीसीएस परीक्षा उत्तर प्रदेश लोक सेवा आयोग द्वारा विभिन्न राज्य सेवाओं के लिए आयोजित की जाती है। इसमें उत्तर प्रदेश के इतिहास, शासन, अर्थव्यवस्था और समाज पर विशेष प्रश्न पत्र होते हैं। अंतिम मेरिट 1600 अंकों की होती है।',
  },
  preliminary: {
    en: [
      {
        title: 'Paper I: General Studies I (200 Marks, 150 Questions)',
        badge: 'Merit-Deciding',
        points: [
          'Current Affairs: Events of national and international importance.',
          'History: History of India and the Indian National Movement.',
          'Geography: Physical, social, and economic geography of India and the world.',
          'Polity & Governance: Constitution, political system, Panchayati Raj, public policy, and rights issues.',
          'Economy: Economic and social development, poverty, inclusion, demographics, and social sector initiatives.',
          'Environment: General issues on environmental ecology, biodiversity, and climate change.',
          'General Science: Basic understanding of science and technology in everyday life.',
        ],
      },
      {
        title: 'Paper II: CSAT (200 Marks, 100 Questions)',
        badge: 'Qualifying (Min. 33%)',
        points: [
          'Comprehension.',
          'Interpersonal skills, including communication skills.',
          'Logical reasoning and analytical ability.',
          'Decision-making and problem-solving.',
          'General mental ability.',
          'Elementary Mathematics — Class X level: Arithmetic, Algebra, Geometry, Statistics.',
          'General English and General Hindi — Class X level.',
        ],
      },
    ],
    hi: [
      {
        title: 'प्रश्न पत्र I: सामान्य अध्ययन I (200 अंक, 150 प्रश्न)',
        badge: 'मेरिट निर्धारण हेतु',
        points: [
          'समसामयिकी: राष्ट्रीय एवं अन्तर्राष्ट्रीय महत्व की समसामयिक घटनायें।',
          'इतिहास: भारत का इतिहास एवं भारतीय राष्ट्रीय आन्दोलन।',
          'भूगोल: भारत एवं विश्व का भौतिक, सामाजिक एवं आर्थिक भूगोल।',
          'राजव्यवस्था एवं शासन: संविधान, राजनीतिक व्यवस्था, पंचायती राज, लोकनीति एवं अधिकाररिक प्रकरण आदि।',
          'अर्थव्यवस्था: आर्थिक एवं सामाजिक विकास, गरीबी, अन्तर्विष्ट (Inclusion), जनसांख्यिकी, सामाजिक क्षेत्र के इनिशिएटिव आदि।',
          'पर्यावरण: पर्यावरण एवं पारिस्थितिकी सम्बन्धी सामान्य विषय, जैव-विविधता एवं जलवायु परिवर्तन।',
          'सामान्य विज्ञान: दैनिक जीवन में विज्ञान की सामान्य समझ।',
        ],
      },
      {
        title: 'प्रश्न पत्र II: सीसैट (CSAT) (200 अंक, 100 प्रश्न)',
        badge: 'क्वालीफाइंग (न्यूनतम 33%)',
        points: [
          'बोधगम्यता (Comprehension)।',
          'संचार कौशल सहित अन्तवैयक्तिक क्षमता।',
          'तार्किक एवं विश्लेषणात्मक योग्यता।',
          'निर्णय क्षमता एवं समस्या समाधान।',
          'सामान्य बौद्धिक योग्यता।',
          'प्रारंभिक गणित (हाईस्कूल स्तर तक: अंकगणित, बीजगणित, रेखागणित, सांख्यिकी)।',
          'सामान्य अंग्रेजी एवं सामान्य हिन्दी (हाईस्कूल स्तर तक)।',
        ],
      },
    ],
  },
  mains: {
    en: [
      {
        title: 'Paper 1: General Hindi (150 Marks)',
        points: [
          'Comprehension of unseen passages.',
          'Precis writing.',
          'Government and semi-official letter writing.',
          'Grammar — prefixes, suffixes, antonyms, synonyms.',
          'Idioms and phrases.',
        ],
      },
      {
        title: 'Paper 2: Essay (150 Marks)',
        points: [
          'Three essays (700 words each) chosen from three sections:',
          'Section A — Literature, Culture, and Society.',
          'Section B — Science, Economy, and Agriculture.',
          'Section C — National/International Events and Disasters.',
        ],
      },
      {
        title: 'Paper 3: General Studies I (200 Marks)',
        points: [
          'Indian Heritage and Culture.',
          'Modern Indian History (post-mid-18th century).',
          'Post-independence consolidation and reorganisation.',
          'World History.',
          'Indian Society and Diversity.',
          'World and Physical Geography.',
        ],
      },
      {
        title: 'Paper 4: General Studies II (200 Marks)',
        points: [
          'Indian Constitution — evolution, features, amendments.',
          'Polity — Union and State functions, separation of powers.',
          'Parliament and State legislatures.',
          'Governance — e-governance, transparency and accountability.',
          'Social Justice — welfare schemes, vulnerable sections.',
          'International Relations — bilateral, regional and global groupings.',
        ],
      },
      {
        title: 'Paper 5: General Studies III (200 Marks)',
        points: [
          'Indian Economy — planning, growth, employment.',
          'Agriculture — crops, irrigation, e-technology.',
          'Science and Technology — applications in everyday life.',
          'Environment and Biodiversity.',
          'Disaster Management.',
          'Internal Security.',
        ],
      },
      {
        title: 'Paper 6: General Studies IV (200 Marks)',
        points: [
          'Ethics and Human Interface.',
          'Attitude — content, structure, function.',
          'Aptitude and foundational values for Civil Service.',
          'Emotional Intelligence.',
          'Contributions of moral thinkers and philosophers.',
          'Probity in Governance.',
          'Case Studies on ethics in public administration.',
        ],
      },
      {
        title: 'Paper 7: General Studies V — UP Special (200 Marks)',
        points: [
          'History of Uttar Pradesh from ancient to modern times.',
          'Architecture and local culture of UP.',
          'Social structure of UP.',
          'Political system and governance of UP.',
          'UP-specific polity and constitutional developments.',
        ],
      },
      {
        title: 'Paper 8: General Studies VI — UP Special (200 Marks)',
        points: [
          'Economy of Uttar Pradesh.',
          'Geography of UP — physical, economic, social.',
          'Natural resources of UP.',
          'Agriculture in UP.',
          'Environment of UP.',
          'Internal security challenges in UP.',
        ],
      },
    ],
    hi: [
      {
        title: 'पेपर 1: सामान्य हिन्दी (150 अंक)',
        points: [
          'अपठित गद्यांश का अवबोध।',
          'संक्षेपण।',
          'सरकारी/अर्धसरकारी पत्र लेखन।',
          'व्याकरण — उपसर्ग, प्रत्यय, विलोम, पर्यायवाची शब्द।',
          'मुहावरे एवं लोकोक्तियां।',
        ],
      },
      {
        title: 'पेपर 2: निबंध (Essay) (150 अंक)',
        points: [
          'तीन खण्डों (साहित्य/संस्कृति/समाज, विज्ञान/अर्थव्यवस्था/कृषि, और राष्ट्रीय/अंतर्राष्ट्रीय घटनाक्रम/आपदा) से एक-एक विषय चुनकर 700 शब्दों में तीन निबंध।',
        ],
      },
      {
        title: 'पेपर 3: सामान्य अध्ययन I (200 अंक)',
        points: [
          'भारतीय विरासत और संस्कृति।',
          'आधुनिक भारतीय इतिहास।',
          'स्वतंत्रता के पश्चात भारत।',
          'विश्व का इतिहास।',
          'भारतीय समाज और विश्व/भौतिक भूगोल।',
        ],
      },
      {
        title: 'पेपर 4: सामान्य अध्ययन II (200 अंक)',
        points: [
          'शासन व्यवस्था, संविधान, राजव्यवस्था।',
          'सामाजिक न्याय।',
          'कल्याणकारी योजनाएं।',
          'अंतर्राष्ट्रीय संबंध।',
        ],
      },
      {
        title: 'पेपर 5: सामान्य अध्ययन III (200 अंक)',
        points: [
          'भारतीय अर्थव्यवस्था, कृषि।',
          'विज्ञान एवं प्रौद्योगिकी।',
          'पर्यावरण और जैव विविधता।',
          'आपदा प्रबंधन तथा आंतरिक सुरक्षा।',
        ],
      },
      {
        title: 'पेपर 6: सामान्य अध्ययन IV (200 अंक)',
        points: [
          'नीतिशास्त्र, सत्यनिष्ठा और अभिरुचि।',
          'भावनात्मक बुद्धिमत्ता।',
          'नैतिक विचारक।',
          'शासन में ईमानदारी (केस स्टडीज सहित)।',
        ],
      },
      {
        title: 'पेपर 7: सामान्य अध्ययन V — उत्तर प्रदेश विशेष (200 अंक)',
        points: [
          'उत्तर प्रदेश का प्राचीन से आधुनिक इतिहास।',
          'वास्तुकला, स्थानीय संस्कृति, सामाजिक संरचना।',
          'राजनीतिक व्यवस्था और शासन।',
        ],
      },
      {
        title: 'पेपर 8: सामान्य अध्ययन VI — उत्तर प्रदेश विशेष (200 अंक)',
        points: [
          'उत्तर प्रदेश की राज्य अर्थव्यवस्था।',
          'भूगोल, प्राकृतिक संसाधन, कृषि।',
          'पर्यावरण और आंतरिक सुरक्षा।',
        ],
      },
    ],
  },
  pattern: {
    en: {
      stages: [
        {
          title: 'Stage 1: Preliminary Examination (Objective Type)',
          description: 'The Prelims exam is a screening test. Marks scored here are not counted for final merit. There is a negative marking of 1/3rd (0.33%) for every incorrect answer.',
          rows: [
            { paper: 'Paper I: General Studies (GS)', marks: '200', questions: '150', nature: 'Merit-Deciding (Cutoff based on this)' },
            { paper: 'Paper II: CSAT', marks: '200', questions: '100', nature: 'Qualifying Only (Min. 33% required)' },
          ],
        },
        {
          title: 'Stage 2: Main Examination (Descriptive Type)',
          description: 'The Main exam is a descriptive written test. Optional subjects have been permanently removed and replaced with UP-specific General Studies papers.',
          rows: [
            { paper: 'Paper 1 — General Hindi', marks: '150', nature: '—' },
            { paper: 'Paper 2 — Essay', marks: '150', nature: '—' },
            { paper: 'Paper 3 — General Studies I', marks: '200', nature: '—' },
            { paper: 'Paper 4 — General Studies II', marks: '200', nature: '—' },
            { paper: 'Paper 5 — General Studies III', marks: '200', nature: '—' },
            { paper: 'Paper 6 — General Studies IV', marks: '200', nature: '—' },
            { paper: 'Paper 7 — General Studies V (UP Special)', marks: '200', nature: '—' },
            { paper: 'Paper 8 — General Studies VI (UP Special)', marks: '200', nature: '—' },
            { paper: 'Total (8 Papers)', marks: '1500', nature: '—' },
          ],
        },
        {
          title: 'Stage 3: Personality Test (Interview)',
          description: 'Candidates who clear the Mains cutoff are called for the interview. It carries 100 Marks.',
          rows: [
            { paper: 'Personality Test (Interview)', marks: '100', nature: 'Merit-Deciding' },
          ],
        },
      ],
      finalMerit: 'Final Merit Score = Mains Marks (1500) + Interview Marks (100) = 1600 Marks',
    },
    hi: {
      stages: [
        {
          title: 'चरण 1: प्रारंभिक परीक्षा (बहुविकल्पीय)',
          description: 'प्रारंभिक परीक्षा एक स्क्रीनिंग टेस्ट है। इसके अंक अंतिम मेरिट में नहीं जोड़े जाते हैं। प्रत्येक गलत उत्तर के लिए 1/3 (0.33%) अंकों की नेगेटिव मार्किंग (नकारात्मक अंकन) का प्रावधान है।',
          rows: [
            { paper: 'प्रश्न पत्र I: सामान्य अध्ययन (GS)', marks: '200', questions: '150', nature: 'मेरिट निर्धारक (कटऑफ इसी पर आधारित)' },
            { paper: 'प्रश्न पत्र II: सीसैट (CSAT)', marks: '200', questions: '100', nature: 'केवल क्वालीफाइंग (न्यूनतम 33% अंक अनिवार्य)' },
          ],
        },
        {
          title: 'चरण 2: मुख्य परीक्षा (वर्णनात्मक)',
          description: 'मुख्य परीक्षा एक वर्णनात्मक (Descriptive) लिखित परीक्षा है। अब वैकल्पिक विषयों (Optional Subjects) को पूरी तरह से हटा दिया गया है और उनके स्थान पर उत्तर प्रदेश विशेष के दो नए सामान्य अध्ययन पेपर जोड़े गए हैं।',
          rows: [
            { paper: 'पेपर 1 — सामान्य हिन्दी', marks: '150', nature: '—' },
            { paper: 'पेपर 2 — निबंध (Essay)', marks: '150', nature: '—' },
            { paper: 'पेपर 3 — सामान्य अध्ययन I', marks: '200', nature: '—' },
            { paper: 'पेपर 4 — सामान्य अध्ययन II', marks: '200', nature: '—' },
            { paper: 'पेपर 5 — सामान्य अध्ययन III', marks: '200', nature: '—' },
            { paper: 'पेपर 6 — सामान्य अध्ययन IV', marks: '200', nature: '—' },
            { paper: 'पेपर 7 — सामान्य अध्ययन V (यूपी विशेष)', marks: '200', nature: '—' },
            { paper: 'पेपर 8 — सामान्य अध्ययन VI (यूपी विशेष)', marks: '200', nature: '—' },
            { paper: 'कुल भार (8 प्रश्न पत्र)', marks: '1500', nature: '—' },
          ],
        },
        {
          title: 'चरण 3: साक्षात्कार (Interview)',
          description: 'मुख्य परीक्षा की कटऑफ पास करने वाले उम्मीदवारों को साक्षात्कार (Interview) के लिए बुलाया जाता है। यह 100 अंकों का होता है।',
          rows: [
            { paper: 'साक्षात्कार (Interview)', marks: '100', nature: 'मेरिट निर्धारक' },
          ],
        },
      ],
      finalMerit: 'अंतिम मेरिट = मुख्य परीक्षा के अंक (1500) + साक्षात्कार के अंक (100) = कुल 1600 अंक',
    },
  },
};

// ─── UKPCS ────────────────────────────────────────────────────────────────────
const UKPCS: ExamSyllabus = {
  id: 'ukpsc',
  slug: 'ukpsc',
  shortName: 'UKPCS',
  color: 'orange',
  fullName: { en: 'UKPCS — Uttarakhand Public Service Commission', hi: 'यूकेपीसीएस — उत्तराखंड लोक सेवा आयोग' },
  tagline: { en: 'Uttarakhand State Civil Services Examination', hi: 'उत्तराखंड राज्य सिविल सेवा परीक्षा' },
  description: {
    en: 'The UKPCS examination is conducted by the Uttarakhand Public Service Commission. It has a unique Uttarakhand-specific knowledge component in Prelims and two dedicated Uttarakhand Special papers in Mains. Final merit is out of 1650 marks.',
    hi: 'यूकेपीसीएस परीक्षा उत्तराखंड लोक सेवा आयोग द्वारा आयोजित की जाती है। इसमें प्रारंभिक परीक्षा में उत्तराखंड विशेष ज्ञान और मुख्य परीक्षा में दो समर्पित उत्तराखंड विशेष पेपर होते हैं। अंतिम मेरिट 1650 अंकों की होती है।',
  },
  preliminary: {
    en: [
      {
        title: 'Paper I: General Studies (150 Marks, 150 Questions)',
        badge: 'Merit-Deciding',
        points: [
          'History: Indian History, Culture, and the Indian National Movement.',
          'Geography: Physical, social, and economic geography of India and the World.',
          'Polity & Governance: Indian Constitution, political system, Panchayati Raj, public policy, and rights issues.',
          'Economy: Economic and social development, poverty, inclusion, and demographics.',
          'General Science: Basic understanding of science, technology, and environment/ecology.',
          'Current Affairs: Events of national and international importance.',
          'Uttarakhand Specific Knowledge: History, geography, polity, economy, and culture of Uttarakhand.',
        ],
      },
      {
        title: 'Paper II: General Aptitude Test (150 Marks, 100 Questions)',
        badge: 'Qualifying (Min. 33%)',
        points: [
          'Comprehension and Interpersonal skills.',
          'Logical reasoning and analytical ability.',
          'Decision-making and problem-solving.',
          'General mental ability.',
          'Basic numeracy and data interpretation — Class X level.',
        ],
      },
    ],
    hi: [
      {
        title: 'प्रश्न पत्र I: सामान्य अध्ययन (150 अंक, 150 प्रश्न)',
        badge: 'मेरिट निर्धारक',
        points: [
          'इतिहास: भारत का इतिहास, संस्कृति और भारतीय राष्ट्रीय आंदोलन।',
          'भूगोल: भारत एवं विश्व का भौतिक, सामाजिक और आर्थिक भूगोल।',
          'राजव्यवस्था एवं शासन: भारतीय संविधान, राजनीतिक व्यवस्था, पंचायती राज, लोकनीति और अधिकाररिक मुद्दे।',
          'अर्थव्यवस्था: आर्थिक और सामाजिक विकास, गरीबी, समावेशन और जनसांख्यिकी।',
          'सामान्य विज्ञान: विज्ञान, प्रौद्योगिकी और पर्यावरण/पारिस्थितिकी की सामान्य समझ।',
          'समसामयिकी: राष्ट्रीय और अंतर्राष्ट्रीय महत्व की समसामयिक घटनाएं।',
          'उत्तराखंड विशेष ज्ञान: उत्तराखंड का इतिहास, भूगोल, राजव्यवस्था, अर्थव्यवस्था और संस्कृति।',
        ],
      },
      {
        title: 'प्रश्न पत्र II: सामान्य बुद्धिमत्ता परीक्षा / CSAT (150 अंक, 100 प्रश्न)',
        badge: 'क्वालीफाइंग (न्यूनतम 33%)',
        points: [
          'बोधगम्यता (Comprehension) और संचार कौशल।',
          'तार्किक एवं विश्लेषणात्मक क्षमता।',
          'निर्णय क्षमता और समस्या समाधान।',
          'सामान्य मानसिक योग्यता।',
          'प्रारंभिक गणित और आंकड़ों की व्याख्या (कक्षा X स्तर)।',
        ],
      },
    ],
  },
  mains: {
    en: [
      {
        title: 'Paper 1: General Hindi (150 Marks, 3 Hours)',
        points: [
          'Unseen passages and comprehension.',
          'Precis writing.',
          'Grammar — prefixes, suffixes, antonyms, synonyms.',
          'Official letter drafting.',
          'English-to-Hindi translation.',
        ],
      },
      {
        title: 'Paper 2: Essay (150 Marks, 3 Hours)',
        points: [
          'Three essays (700–800 words each) chosen from distinct sections:',
          'Section on Literature/Culture.',
          'Section on Social/Political issues.',
          'Section on Science/Environment.',
          'Section on National/International events.',
        ],
      },
      {
        title: 'Paper 3: General Studies I (200 Marks, 3 Hours)',
        points: [
          'Indian Heritage and Culture.',
          'History of India and the World.',
          'Indian Society.',
          'World and Physical Geography.',
        ],
      },
      {
        title: 'Paper 4: General Studies II (200 Marks, 3 Hours)',
        points: [
          'Indian Constitution and Polity.',
          'Governance — structure, functioning, e-governance.',
          'Social Justice — welfare policies, vulnerable sections.',
          'International Relations.',
        ],
      },
      {
        title: 'Paper 5: General Studies III (200 Marks, 3 Hours)',
        points: [
          'Indian Economy and planning.',
          'Science and Technology — applications.',
          'Environment and Biodiversity.',
          'Disaster Management.',
          'Internal Security.',
        ],
      },
      {
        title: 'Paper 6: General Studies IV (200 Marks, 3 Hours)',
        points: [
          'Ethics, Integrity and Aptitude.',
          'Emotional Intelligence.',
          'Moral dilemmas in public administration.',
        ],
      },
      {
        title: 'Paper 7: General Studies V — Uttarakhand Special Part 1 (200 Marks, 3 Hours)',
        points: [
          'Uttarakhand\'s ancient to modern history.',
          'Architecture, local culture and art of Uttarakhand.',
          'Social structure of Uttarakhand.',
          'Political system and governance of Uttarakhand.',
        ],
      },
      {
        title: 'Paper 8: General Studies VI — Uttarakhand Special Part 2 (200 Marks, 3 Hours)',
        points: [
          'State economy of Uttarakhand.',
          'Geography of Uttarakhand — physical, economic, social.',
          'Natural resources of Uttarakhand.',
          'Agriculture in Uttarakhand.',
          'Environment, tourism, and disaster management challenges of Uttarakhand.',
        ],
      },
    ],
    hi: [
      {
        title: 'पेपर 1: सामान्य हिंदी (150 अंक, 3 घंटे)',
        points: [
          'अपठित गद्यांश का बोध।',
          'संक्षेपण।',
          'व्याकरण (उपसर्ग, प्रत्यय, विलोम, पर्यायवाची)।',
          'सरकारी पत्र लेखन और अनुवाद।',
        ],
      },
      {
        title: 'पेपर 2: निबंध (150 अंक, 3 घंटे)',
        points: [
          'साहित्य/संस्कृति, सामाजिक/राजनीतिक क्षेत्र, विज्ञान/पर्यावरण, और राष्ट्रीय/अंतर्राष्ट्रीय घटनाओं से जुड़े तीन निबंध (प्रत्येक 700-800 शब्द)।',
        ],
      },
      {
        title: 'पेपर 3: सामान्य अध्ययन I (200 अंक, 3 घंटे)',
        points: [
          'भारतीय विरासत और संस्कृति।',
          'भारत और विश्व का इतिहास।',
          'भारतीय समाज, और विश्व/भौतिक भूगोल।',
        ],
      },
      {
        title: 'पेपर 4: सामान्य अध्ययन II (200 अंक, 3 घंटे)',
        points: [
          'भारतीय संविधान, राजव्यवस्था, शासन व्यवस्था।',
          'सामाजिक न्याय, कल्याणकारी नीतियां।',
          'अंतर्राष्ट्रीय संबंध।',
        ],
      },
      {
        title: 'पेपर 5: सामान्य अध्ययन III (200 अंक, 3 घंटे)',
        points: [
          'भारतीय अर्थव्यवस्था, विज्ञान एवं प्रौद्योगिकी।',
          'पर्यावरण और जैव विविधता।',
          'आपदा प्रबंधन तथा आंतरिक सुरक्षा।',
        ],
      },
      {
        title: 'पेपर 6: सामान्य अध्ययन IV (200 अंक, 3 घंटे)',
        points: [
          'नीतिशास्त्र, सत्यनिष्ठा, अभिरुचि।',
          'भावनात्मक बुद्धिमत्ता।',
          'लोक प्रशासन में नैतिक चुनौतियां।',
        ],
      },
      {
        title: 'पेपर 7: सामान्य अध्ययन V (उत्तराखंड विशेष - भाग 1) (200 अंक, 3 घंटे)',
        points: [
          'उत्तराखंड का प्राचीन से आधुनिक इतिहास।',
          'वास्तुकला, स्थानीय संस्कृति, सामाजिक संरचना।',
          'राजनीतिक व्यवस्था और शासन।',
        ],
      },
      {
        title: 'पेपर 8: सामान्य अध्ययन VI (उत्तराखंड विशेष - भाग 2) (200 अंक, 3 घंटे)',
        points: [
          'उत्तराखंड की राज्य अर्थव्यवस्था।',
          'भूगोल, प्राकृतिक संसाधन, कृषि।',
          'पर्यावरण, पर्यटन और आपदा प्रबंधन की चुनौतियां।',
        ],
      },
    ],
  },
  pattern: {
    en: {
      stages: [
        {
          title: 'Stage 1: Preliminary Examination (Objective Type)',
          description: 'The Preliminary exam is a screening test. Marks obtained here are not added to the final merit list. There is a negative marking of 1/4th (0.25) for every incorrect answer.',
          rows: [
            { paper: 'Paper I: General Studies', marks: '150', questions: '150', nature: 'Merit-Deciding (Cutoff based on this)' },
            { paper: 'Paper II: General Aptitude Test', marks: '150', questions: '100', nature: 'Qualifying Only (Min. 33% required)' },
          ],
        },
        {
          title: 'Stage 2: Main Examination (Descriptive Type)',
          description: 'The Main exam consists of 8 compulsory descriptive papers. Note: Candidates must score a minimum of 35% in the General Hindi paper to qualify.',
          rows: [
            { paper: 'Paper 1 — General Hindi', marks: '150', duration: '3 Hours', nature: 'Min. 35% required' },
            { paper: 'Paper 2 — Essay', marks: '150', duration: '3 Hours', nature: '—' },
            { paper: 'Paper 3 — General Studies I', marks: '200', duration: '3 Hours', nature: '—' },
            { paper: 'Paper 4 — General Studies II', marks: '200', duration: '3 Hours', nature: '—' },
            { paper: 'Paper 5 — General Studies III', marks: '200', duration: '3 Hours', nature: '—' },
            { paper: 'Paper 6 — General Studies IV', marks: '200', duration: '3 Hours', nature: '—' },
            { paper: 'Paper 7 — General Studies V (Uttarakhand Special)', marks: '200', duration: '3 Hours', nature: '—' },
            { paper: 'Paper 8 — General Studies VI (Uttarakhand Special)', marks: '200', duration: '3 Hours', nature: '—' },
            { paper: 'Total (8 Papers)', marks: '1500', nature: '—' },
          ],
        },
        {
          title: 'Stage 3: Personality Test (Interview)',
          description: 'Candidates who clear the Main examination are called for the interview. It carries 150 Marks.',
          rows: [
            { paper: 'Personality Test (Interview)', marks: '150', nature: 'Merit-Deciding' },
          ],
        },
      ],
      finalMerit: 'Final Merit Score = Mains Marks (1500) + Interview Marks (150) = 1650 Marks',
    },
    hi: {
      stages: [
        {
          title: 'चरण 1: प्रारंभिक परीक्षा (बहुविकल्पीय)',
          description: 'प्रारंभिक परीक्षा एक स्क्रीनिंग टेस्ट है। इसके अंक अंतिम मेरिट में नहीं जोड़े जाते हैं। इसमें प्रत्येक गलत उत्तर के लिए 1/4 (0.25) अंकों की नेगेटिव मार्किंग का प्रावधान है।',
          rows: [
            { paper: 'प्रश्न पत्र I: सामान्य अध्ययन', marks: '150', questions: '150', nature: 'मेरिट निर्धारक (कटऑफ इसी पर आधारित)' },
            { paper: 'प्रश्न पत्र II: सामान्य बुद्धिमत्ता परीक्षा', marks: '150', questions: '100', nature: 'केवल क्वालीफाइंग (न्यूनतम 33% अनिवार्य)' },
          ],
        },
        {
          title: 'चरण 2: मुख्य परीक्षा (वर्णनात्मक)',
          description: 'मुख्य परीक्षा में 8 अनिवार्य वर्णनात्मक प्रश्न पत्र होते हैं। नोट: उम्मीदवारों को सामान्य हिंदी के पेपर में न्यूनतम 35% अंक प्राप्त करना अनिवार्य है।',
          rows: [
            { paper: 'पेपर 1 — सामान्य हिन्दी', marks: '150', duration: '3 घंटे', nature: 'न्यूनतम 35% अनिवार्य' },
            { paper: 'पेपर 2 — निबंध', marks: '150', duration: '3 घंटे', nature: '—' },
            { paper: 'पेपर 3 — सामान्य अध्ययन I', marks: '200', duration: '3 घंटे', nature: '—' },
            { paper: 'पेपर 4 — सामान्य अध्ययन II', marks: '200', duration: '3 घंटे', nature: '—' },
            { paper: 'पेपर 5 — सामान्य अध्ययन III', marks: '200', duration: '3 घंटे', nature: '—' },
            { paper: 'पेपर 6 — सामान्य अध्ययन IV', marks: '200', duration: '3 घंटे', nature: '—' },
            { paper: 'पेपर 7 — सामान्य अध्ययन V (उत्तराखंड विशेष)', marks: '200', duration: '3 घंटे', nature: '—' },
            { paper: 'पेपर 8 — सामान्य अध्ययन VI (उत्तराखंड विशेष)', marks: '200', duration: '3 घंटे', nature: '—' },
            { paper: 'कुल भार (8 प्रश्न पत्र)', marks: '1500', nature: '—' },
          ],
        },
        {
          title: 'चरण 3: साक्षात्कार (Interview)',
          description: 'मुख्य परीक्षा उत्तीर्ण करने वाले उम्मीदवारों को साक्षात्कार के लिए बुलाया जाता है। यह 150 अंकों का होता है।',
          rows: [
            { paper: 'साक्षात्कार (Interview)', marks: '150', nature: 'मेरिट निर्धारक' },
          ],
        },
      ],
      finalMerit: 'अंतिम मेरिट = मुख्य परीक्षा के अंक (1500) + साक्षात्कार के अंक (150) = कुल 1650 अंक',
    },
  },
};

// ─── BPSC ─────────────────────────────────────────────────────────────────────
const BPSC: ExamSyllabus = {
  id: 'bpsc',
  slug: 'bpsc',
  shortName: 'BPSC',
  color: 'green',
  fullName: { en: 'BPSC — Bihar Public Service Commission', hi: 'बीपीएससी — बिहार लोक सेवा आयोग' },
  tagline: { en: 'Bihar State Civil Services Examination', hi: 'बिहार राज्य सिविल सेवा परीक्षा' },
  description: {
    en: 'The BPSC examination is conducted by the Bihar Public Service Commission. The Prelims has only a single General Studies paper. Mains has Bihar-specific content integrated into GS papers. Final merit is out of 1020 marks.',
    hi: 'बीपीएससी परीक्षा बिहार लोक सेवा आयोग द्वारा आयोजित की जाती है। प्रारंभिक परीक्षा में केवल एक सामान्य अध्ययन पेपर होता है। मुख्य परीक्षा के GS पेपरों में बिहार-विशेष सामग्री एकीकृत है। अंतिम मेरिट 1020 अंकों की होती है।',
  },
  preliminary: {
    en: [
      {
        title: 'General Studies (150 Marks, 150 Questions, 2 Hours)',
        badge: 'Merit-Deciding',
        points: [
          'General Science: General appreciation and understanding of science, including matters of everyday observation and experience.',
          'Current Events: Events of national and international importance.',
          'History of India & Bihar: Broad general understanding of the subject in its social, economic, and political aspects. Special emphasis on the broad aspects of the history of Bihar.',
          'Geography & Geography of Bihar: General geography, geographical division of Bihar, and its major river systems.',
          'Indian Polity & Economy: Indian political system, Panchayati Raj, community development, and planning in India and Bihar. Major changes in the economy of Bihar post-independence.',
          'Indian National Movement: Nature and character of the 19th-century resurgence, growth of nationalism, and attainment of Independence, with special reference to the role of Bihar in the Indian National Movement.',
          'General Mental Ability: Questions to test reasoning and basic analytical aptitude.',
        ],
      },
    ],
    hi: [
      {
        title: 'सामान्य अध्ययन (150 अंक, 150 प्रश्न, 2 घंटे)',
        badge: 'मेरिट निर्धारक',
        points: [
          'सामान्य विज्ञान: दैनिक अनुभव तथा प्रेक्षण से संबंधित विषयों सहित विज्ञान की सामान्य जानकारी तथा परिबोध।',
          'समसामयिक घटनाएं: राष्ट्रीय तथा अन्तर्राष्ट्रीय महत्त्व की समसामयिक घटनाएं।',
          'भारत का इतिहास तथा बिहार के इतिहास की प्रमुख विशेषताएं: इतिहास की सामाजिक, आर्थिक और राजनीतिक परिप्रेक्ष्य में विषय की सामान्य जानकारी। इसमें बिहार के इतिहास पर विशेष बल दिया जाएगा।',
          'सामान्य भूगोल एवं बिहार का भूगोल: सामान्य भूगोल, बिहार के प्रमुख भौगोलिक प्रभाग तथा यहाँ की महत्त्वपूर्ण नदियाँ।',
          'भारतीय राज्य व्यवस्था और अर्थव्यवस्था: देश की राजनीतिक प्रणाली, पंचायती राज, सामुदायिक विकास, तथा भारत और बिहार की योजनाएं। आजादी के पश्चात् बिहार की अर्थव्यवस्था के प्रमुख परिवर्तन।',
          'भारतीय राष्ट्रीय आन्दोलन: 19वीं शताब्दी के पुनरुत्थान का स्वरूप और स्वभाव, राष्ट्रीयता का विकास तथा स्वतंत्रता प्राप्ति। इसमें बिहार का योगदान विशेष रूप से पूछा जाएगा।',
          'सामान्य मानसिक योग्यता: तर्क और विश्लेषणात्मक क्षमता की जांच करने वाले प्रश्न।',
        ],
      },
    ],
  },
  mains: {
    en: [
      {
        title: 'General Hindi (100 Marks, 3 Hours)',
        badge: 'Qualifying (Min. 30%)',
        points: [
          'Essay — 30 Marks.',
          'Grammar — 30 Marks.',
          'Syntax — 25 Marks.',
          'Precis/Summary — 15 Marks.',
          'Minimum 30% marks required to qualify.',
        ],
      },
      {
        title: 'General Studies Paper I (300 Marks, 3 Hours)',
        badge: 'Merit-Deciding',
        points: [
          'Modern History of India and Indian Culture: Mid-19th century onwards, including Santhal Uprising, 1857 in Bihar, Birsa Movement, Champaran Satyagrah, and Quit India Movement. Arts of Mauryan and Pal periods, Patna Qalam Paintings.',
          'Current events of national and international importance.',
          'Statistical analysis, graphs, and diagrams.',
        ],
      },
      {
        title: 'General Studies Paper II (300 Marks, 3 Hours)',
        badge: 'Merit-Deciding',
        points: [
          'Indian Polity (including political system in Bihar).',
          'Indian Economy and Geography of India — planning, physical/economic/social geography of India and Bihar.',
          'The role and impact of science and technology in the development of India and Bihar.',
        ],
      },
      {
        title: 'Essay Paper (300 Marks, 3 Hours)',
        badge: 'Merit-Deciding',
        points: [
          'Candidates must write three essays from three different sections.',
          'Section III will specifically focus on Bihar-related proverbs, idioms, and cultural themes.',
        ],
      },
      {
        title: 'Optional Subject (100 Marks, 3 Hours)',
        badge: 'Qualifying (MCQ Based)',
        points: [
          'Candidates choose one subject from the list of optional subjects.',
          'It is objective in nature and only minimum qualifying marks are required.',
        ],
      },
    ],
    hi: [
      {
        title: 'सामान्य हिन्दी (100 अंक, 3 घंटे)',
        badge: 'क्वालीफाइंग (न्यूनतम 30%)',
        points: [
          'निबंध — 30 अंक।',
          'व्याकरण — 30 अंक।',
          'वाक्य विन्यास — 25 अंक।',
          'संक्षेपण — 15 अंक।',
          'न्यूनतम 30% अंक लाना अनिवार्य है।',
        ],
      },
      {
        title: 'सामान्य अध्ययन प्रश्न पत्र I (300 अंक, 3 घंटे)',
        badge: 'मेरिट निर्धारक',
        points: [
          'भारत का आधुनिक इतिहास और भारतीय संस्कृति: 19वीं शताब्दी के मध्य से, संथाल विद्रोह, बिहार में 1857 का विद्रोह, बिरसा आंदोलन, चंपारण सत्याग्रह और भारत छोड़ो आंदोलन। मौर्य एवं पाल कला, पटना कलम चित्रकला।',
          'राष्ट्रीय तथा अन्तर्राष्ट्रीय महत्त्व का वर्तमान घटना चक्र।',
          'सांख्यिकीय विश्लेषण, आरेखन और चित्रण।',
        ],
      },
      {
        title: 'सामान्य अध्ययन प्रश्न पत्र II (300 अंक, 3 घंटे)',
        badge: 'मेरिट निर्धारक',
        points: [
          'भारतीय राजव्यवस्था (बिहार की राजनीतिक व्यवस्था सहित)।',
          'भारतीय अर्थव्यवस्था और भारत का भूगोल (भारत तथा बिहार के भौतिक, आर्थिक और सामाजिक भूगोल से संबंधित)।',
          'भारत एवं बिहार के विकास में विज्ञान और प्रौद्योगिकी की भूमिका और प्रभाव।',
        ],
      },
      {
        title: 'निबंध (Essay) (300 अंक, 3 घंटे)',
        badge: 'मेरिट निर्धारक',
        points: [
          'उम्मीदवारों को तीन अलग-अलग खंडों से तीन निबंध लिखने होंगे।',
          'खंड III विशेष रूप से बिहार से संबंधित कहावतों, मुहावरों और सांस्कृतिक विषयों पर केंद्रित होगा।',
        ],
      },
      {
        title: 'वैकल्पिक विषय (100 अंक, 3 घंटे)',
        badge: 'क्वालीफाइंग (MCQ आधारित)',
        points: [
          'उम्मीदवारों को वैकल्पिक विषयों की सूची में से एक विषय चुनना होगा।',
          'यह बहुविकल्पीय प्रकृति का है और इसमें केवल न्यूनतम क्वालीफाइंग अंक आवश्यक हैं।',
        ],
      },
    ],
  },
  pattern: {
    en: {
      stages: [
        {
          title: 'Stage 1: Preliminary Examination (Objective Type)',
          description: 'The Prelims is a screening test. The marks scored here do not count toward the final merit list. There is a negative marking of 1/3rd for every incorrect answer.',
          rows: [
            { paper: 'General Studies', marks: '150', questions: '150', duration: '2 Hours', nature: 'Merit-Deciding (Cutoff for Mains)' },
          ],
        },
        {
          title: 'Stage 2: Main Examination (Descriptive & Objective)',
          description: 'The Mains exam consists of 5 papers. General Hindi and the Optional Subject are qualifying in nature. Merit is calculated out of 900 marks (GS I, GS II, and Essay).',
          rows: [
            { paper: 'General Hindi', marks: '100', duration: '3 Hours', nature: 'Qualifying (Min. 30%)' },
            { paper: 'General Studies I', marks: '300', duration: '3 Hours', nature: 'Merit-Deciding' },
            { paper: 'General Studies II', marks: '300', duration: '3 Hours', nature: 'Merit-Deciding' },
            { paper: 'Essay', marks: '300', duration: '3 Hours', nature: 'Merit-Deciding' },
            { paper: 'Optional Subject', marks: '100', duration: '3 Hours', nature: 'Qualifying (MCQ Based)' },
            { paper: 'Total Merit Weightage', marks: '900', nature: 'Only GS I, GS II & Essay' },
          ],
        },
        {
          title: 'Stage 3: Personality Test (Interview)',
          description: 'Candidates who clear the Main examination cutoff are called for the interview. The interview carries 120 Marks.',
          rows: [
            { paper: 'Personality Test (Interview)', marks: '120', nature: 'Merit-Deciding' },
          ],
        },
      ],
      finalMerit: 'Final Merit Score = Mains Marks (900) + Interview Marks (120) = 1020 Marks',
    },
    hi: {
      stages: [
        {
          title: 'चरण 1: प्रारंभिक परीक्षा (बहुविकल्पीय)',
          description: 'प्रारंभिक परीक्षा एक स्क्रीनिंग टेस्ट है। इसके अंक अंतिम मेरिट में नहीं जोड़े जाते हैं। प्रत्येक गलत उत्तर के लिए 1/3 (एक तिहाई) अंकों की नेगेटिव मार्किंग का प्रावधान है।',
          rows: [
            { paper: 'सामान्य अध्ययन', marks: '150', questions: '150', duration: '2 घंटे', nature: 'मेरिट निर्धारक (कटऑफ के लिए)' },
          ],
        },
        {
          title: 'चरण 2: मुख्य परीक्षा (वर्णनात्मक एवं वस्तुनिष्ठ)',
          description: 'मुख्य परीक्षा में 5 पेपर होते हैं। सामान्य हिंदी और वैकल्पिक विषय केवल क्वालीफाइंग प्रकृति के हैं। मेरिट 900 अंकों (GS I, GS II और निबंध) के आधार पर तैयार की जाती है।',
          rows: [
            { paper: 'सामान्य हिन्दी', marks: '100', duration: '3 घंटे', nature: 'क्वालीफाइंग (न्यूनतम 30%)' },
            { paper: 'सामान्य अध्ययन I', marks: '300', duration: '3 घंटे', nature: 'मेरिट निर्धारक' },
            { paper: 'सामान्य अध्ययन II', marks: '300', duration: '3 घंटे', nature: 'मेरिट निर्धारक' },
            { paper: 'निबंध (Essay)', marks: '300', duration: '3 घंटे', nature: 'मेरिट निर्धारक' },
            { paper: 'वैकल्पिक विषय', marks: '100', duration: '3 घंटे', nature: 'क्वालीफाइंग (बहुविकल्पीय/MCQ)' },
            { paper: 'कुल मेरिट अंक', marks: '900', nature: 'केवल GS I, GS II और निबंध' },
          ],
        },
        {
          title: 'चरण 3: साक्षात्कार (Interview)',
          description: 'मुख्य परीक्षा उत्तीर्ण करने वाले उम्मीदवारों को साक्षात्कार के लिए बुलाया जाता है। यह 120 अंकों का होता है।',
          rows: [
            { paper: 'साक्षात्कार (Interview)', marks: '120', nature: 'मेरिट निर्धारक' },
          ],
        },
      ],
      finalMerit: 'अंतिम मेरिट = मुख्य परीक्षा के अंक (900) + साक्षात्कार के अंक (120) = कुल 1020 अंक',
    },
  },
};

export const ALL_EXAMS: ExamSyllabus[] = [IAS, UPPCS, UKPCS, BPSC];
export const EXAM_MAP: Record<string, ExamSyllabus> = { ias: IAS, uppsc: UPPCS, ukpsc: UKPCS, bpsc: BPSC };
