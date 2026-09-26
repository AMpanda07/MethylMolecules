export interface LearnTopic {
  slug: string;
  number: number;
  title: string;
  shortDescription: string;
  introduction: string;
  keyPoints: string[];
  sections: LearnSection[];
}

export interface LearnSection {
  heading: string;
  content: string;
  diagramType?: 'atom' | 'periodic' | 'bond' | 'reaction' | 'molecule' | 'states' | 'acid-base' | 'organic';
}

export const LEARN_TOPICS: LearnTopic[] = [
  {
    slug: 'atomic-structure',
    number: 1,
    title: 'Atomic Structure',
    shortDescription: 'Understand what atoms are made of and how they are structured.',
    introduction: 'Atoms are the building blocks of matter. Every element is made up of atoms. Everything you see, touch, and breathe is made of atoms — from the air to the chair you\'re sitting on.',
    keyPoints: [
      'Atoms have a central nucleus containing protons and neutrons.',
      'Electrons move around the nucleus in energy levels (shells).',
      'Protons carry a positive charge (+).',
      'Neutrons have no charge (neutral).',
      'Electrons carry a negative charge (−).',
      'The atomic number = number of protons.',
      'The mass number = protons + neutrons.',
    ],
    sections: [
      {
        heading: 'What is an Atom?',
        content: 'An atom is the smallest particle of an element that still has the chemical properties of that element. Atoms are incredibly small — a single atom is about 0.1 nanometres across. You could fit about a million atoms across the width of a human hair.',
        diagramType: 'atom',
      },
      {
        heading: 'The Nucleus',
        content: 'At the centre of every atom is the nucleus. The nucleus is tiny compared to the overall size of the atom but contains most of its mass. The nucleus contains protons (positive charge) and neutrons (no charge). The number of protons defines which element the atom is.',
      },
      {
        heading: 'Electrons',
        content: 'Electrons are negatively charged particles that orbit the nucleus in regions called electron shells or energy levels. The first shell holds up to 2 electrons, the second up to 8, and the third up to 18. Electrons are responsible for chemical bonding.',
      },
      {
        heading: 'Isotopes',
        content: 'Atoms of the same element always have the same number of protons, but they can have different numbers of neutrons. Atoms with the same number of protons but different numbers of neutrons are called isotopes. For example, carbon-12 and carbon-14 are both carbon atoms.',
      },
    ],
  },
  {
    slug: 'periodic-table',
    number: 2,
    title: 'Periodic Table',
    shortDescription: 'Learn how elements are organised and why the periodic table is so powerful.',
    introduction: 'The periodic table is one of the greatest achievements in science. It organises all known elements in a logical pattern that reveals their properties and relationships.',
    keyPoints: [
      'Elements are arranged by increasing atomic number.',
      'Elements in the same column (group) have similar properties.',
      'The rows are called periods.',
      'The table reveals patterns in element properties.',
      'Dmitri Mendeleev created the first widely accepted periodic table in 1869.',
      'Mendeleev predicted undiscovered elements that were later found.',
    ],
    sections: [
      {
        heading: 'How the Table is Organised',
        content: 'Elements are arranged in order of increasing atomic number (number of protons). Elements in the same vertical column (group) have the same number of electrons in their outer shell, giving them similar chemical properties.',
        diagramType: 'periodic',
      },
      {
        heading: 'Groups (Columns)',
        content: 'The 18 vertical columns are called groups. Group 1 (alkali metals like sodium and potassium) are very reactive. Group 18 (noble gases like helium and neon) are extremely unreactive. The group number tells you how many electrons are in the outer shell.',
      },
      {
        heading: 'Periods (Rows)',
        content: 'The 7 horizontal rows are called periods. The period number tells you which electron shell the outermost electrons are in. As you move across a period, the atomic number increases by 1 each time.',
      },
      {
        heading: 'Periodic Trends',
        content: 'The periodic table reveals important trends. Atomic radius decreases across a period and increases down a group. Ionisation energy increases across a period. Electronegativity increases across a period and decreases down a group.',
      },
    ],
  },
  {
    slug: 'chemical-bonding',
    number: 3,
    title: 'Chemical Bonding',
    shortDescription: 'Discover how atoms join together to form compounds.',
    introduction: 'Chemical bonding is what holds atoms together to form molecules and compounds. The type of bond that forms depends on the types of atoms involved and how they share or transfer electrons.',
    keyPoints: [
      'Ionic bonds form between metals and non-metals.',
      'Covalent bonds form between non-metals.',
      'Metallic bonds occur in metals.',
      'Atoms form bonds to achieve a full outer electron shell.',
      'The number of bonds an atom can form depends on its valence electrons.',
      'Bond strength affects the properties of substances.',
    ],
    sections: [
      {
        heading: 'Why Do Atoms Bond?',
        content: 'Atoms form chemical bonds to become more stable. Atoms with full outer electron shells (like noble gases) are stable and unreactive. Other atoms bond to achieve a full outer shell, either by sharing electrons (covalent bond) or transferring them (ionic bond).',
        diagramType: 'bond',
      },
      {
        heading: 'Ionic Bonds',
        content: 'Ionic bonds form when one atom gives electrons to another. Metals tend to lose electrons and become positively charged ions (cations). Non-metals tend to gain electrons and become negatively charged ions (anions). The opposite charges attract each other — this is the ionic bond. Example: NaCl (sodium chloride / table salt).',
      },
      {
        heading: 'Covalent Bonds',
        content: 'Covalent bonds form when atoms share electrons. This typically occurs between two non-metals. A single bond shares one pair of electrons, a double bond shares two pairs, and a triple bond shares three pairs. Example: H₂O (water), O₂ (oxygen), CO₂.',
      },
      {
        heading: 'Metallic Bonds',
        content: 'In metals, the electrons in the outer shell are delocalised — they can move freely through the structure. This creates a "sea of electrons" surrounding positive metal ions. This explains why metals conduct electricity, are malleable, and have high melting points.',
      },
    ],
  },
  {
    slug: 'states-of-matter',
    number: 4,
    title: 'States of Matter',
    shortDescription: 'Explore how matter exists in different physical states and why.',
    introduction: 'Matter exists in three main states: solid, liquid, and gas. The state depends on how strongly particles attract each other and how much energy (heat) they have.',
    keyPoints: [
      'Solids have particles in fixed positions (vibrating).',
      'Liquids have particles free to move but still close together.',
      'Gases have particles far apart, moving freely and quickly.',
      'Melting: solid → liquid (gains heat).',
      'Freezing: liquid → solid (loses heat).',
      'Evaporation/Boiling: liquid → gas.',
      'Condensation: gas → liquid.',
      'Sublimation: solid → gas directly (e.g. dry ice).',
    ],
    sections: [
      {
        heading: 'The Three States',
        content: 'In a solid, particles are held in fixed positions by strong forces — they vibrate but cannot move past each other. In a liquid, particles can flow past each other but remain close. In a gas, particles move quickly and randomly with large spaces between them.',
        diagramType: 'states',
      },
      {
        heading: 'Changing State',
        content: 'States of matter can change by adding or removing heat energy. When ice (solid water) is heated, it melts to water (liquid). Heated further, water evaporates to steam (gas). These changes are physical — no new substances are formed.',
      },
      {
        heading: 'Melting and Boiling Points',
        content: 'Every substance has a specific melting point (solid → liquid) and boiling point (liquid → gas). These are physical properties useful for identifying substances. At the melting or boiling point, temperature stays constant even as heat is added (latent heat).',
      },
    ],
  },
  {
    slug: 'chemical-reactions',
    number: 5,
    title: 'Chemical Reactions',
    shortDescription: 'Learn how substances transform into new substances.',
    introduction: 'A chemical reaction occurs when substances (reactants) transform into new substances (products). During a reaction, chemical bonds are broken and new ones are formed.',
    keyPoints: [
      'Reactants → Products',
      'Atoms are conserved — they rearrange, not disappear.',
      'Chemical equations must be balanced.',
      'Exothermic reactions release energy (heat).',
      'Endothermic reactions absorb energy (heat).',
      'Catalysts speed up reactions without being consumed.',
    ],
    sections: [
      {
        heading: 'What Happens in a Chemical Reaction?',
        content: 'In a chemical reaction, the bonds between atoms in the reactants are broken, and new bonds form to create the products. No atoms are created or destroyed — they are simply rearranged. This is the Law of Conservation of Mass.',
        diagramType: 'reaction',
      },
      {
        heading: 'Exothermic Reactions',
        content: 'Exothermic reactions release energy — usually as heat and sometimes light. Combustion (burning) is an exothermic reaction. When methane burns: CH₄ + 2O₂ → CO₂ + 2H₂O + energy. The reaction releases more energy than it takes to break the initial bonds.',
      },
      {
        heading: 'Endothermic Reactions',
        content: 'Endothermic reactions absorb energy from the surroundings. Photosynthesis is an endothermic process: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Thermal decomposition reactions are also endothermic.',
      },
      {
        heading: 'Reaction Rates',
        content: 'The rate of a reaction depends on temperature (higher = faster), concentration (higher = faster), surface area (larger = faster), and the presence of a catalyst. A catalyst provides an alternative reaction pathway with lower activation energy.',
      },
    ],
  },
  {
    slug: 'acids-bases-salts',
    number: 6,
    title: 'Acids, Bases & Salts',
    shortDescription: 'Understand pH, acids, bases, and how they react to form salts.',
    introduction: 'Acids and bases are everywhere — in the food we eat, the products we use, and our own bodies. Understanding acid-base chemistry is fundamental to biology, medicine, and industry.',
    keyPoints: [
      'Acids produce H⁺ ions in water.',
      'Bases produce OH⁻ ions in water.',
      'pH scale: 0-14. Below 7 = acidic, 7 = neutral, above 7 = alkaline.',
      'Acids + bases → salt + water (neutralisation).',
      'Strong acids/bases fully dissociate in water.',
      'Weak acids/bases partially dissociate.',
    ],
    sections: [
      {
        heading: 'The pH Scale',
        content: 'pH measures how acidic or alkaline a solution is. The scale runs from 0 (most acidic) to 14 (most alkaline), with 7 being neutral (pure water). Each unit represents a 10-fold change in acidity. Lemon juice (pH ~2) is 100× more acidic than vinegar (pH ~4).',
        diagramType: 'acid-base',
      },
      {
        heading: 'Common Acids',
        content: 'Hydrochloric acid (HCl) is found in the stomach and used industrially. Sulfuric acid (H₂SO₄) is used in car batteries and chemical production. Citric acid is in citrus fruits. Carbonic acid (H₂CO₃) makes fizzy drinks acidic.',
      },
      {
        heading: 'Bases and Alkalis',
        content: 'Alkalis are bases that dissolve in water. Sodium hydroxide (NaOH) is a strong alkali used in soap making. Ammonia solution is a weak alkali. Calcium hydroxide (lime water) is used in agriculture to neutralise acidic soils.',
      },
      {
        heading: 'Neutralisation and Salts',
        content: 'When an acid reacts with a base, they neutralise each other to produce a salt and water. Example: HCl + NaOH → NaCl + H₂O. Salts are ionic compounds. The type of salt formed depends on which acid and base were used.',
      },
    ],
  },
  {
    slug: 'organic-chemistry',
    number: 7,
    title: 'Organic Chemistry',
    shortDescription: 'Explore the chemistry of carbon compounds — the chemistry of life.',
    introduction: 'Organic chemistry is the study of carbon-containing compounds. Carbon\'s ability to form 4 bonds allows it to create an enormous variety of molecules — the molecules of life.',
    keyPoints: [
      'Organic molecules contain carbon (C).',
      'Alkanes: single bonds only (CₙH₂ₙ₊₂).',
      'Alkenes: contain at least one double bond (CₙH₂ₙ).',
      'Alkynes: contain a triple bond.',
      'Alcohols: contain -OH group.',
      'Carboxylic acids: contain -COOH group.',
      'Functional groups determine chemical properties.',
    ],
    sections: [
      {
        heading: 'Why Carbon is Special',
        content: 'Carbon can form 4 covalent bonds, allowing it to chain together in long molecules, form rings, and create branches. This structural versatility means carbon forms more compounds than all other elements combined. Life is carbon-based for this reason.',
        diagramType: 'organic',
      },
      {
        heading: 'Hydrocarbons',
        content: 'Hydrocarbons contain only carbon and hydrogen. Alkanes (like methane CH₄, ethane C₂H₆) have only single bonds. Alkenes (like ethene C₂H₄) have at least one double bond. Alkynes (like ethyne C₂H₂) have a triple bond.',
      },
      {
        heading: 'Functional Groups',
        content: 'Functional groups are specific atom groupings that give organic molecules particular properties. The -OH (hydroxyl) group makes alcohols. The -COOH (carboxyl) group makes carboxylic acids. The -NH₂ group makes amines and amino acids.',
      },
      {
        heading: 'Polymers',
        content: 'Polymers are large molecules made from repeating units (monomers). Addition polymers are made from alkenes — polyethylene, polypropylene. Condensation polymers include nylon, polyester, and biological polymers like DNA and proteins.',
      },
    ],
  },
  {
    slug: 'inorganic-chemistry',
    number: 8,
    title: 'Inorganic Chemistry',
    shortDescription: 'Study non-carbon compounds — metals, minerals, and industrial chemicals.',
    introduction: 'Inorganic chemistry covers all elements and compounds except most carbon-containing ones. It includes metals, minerals, acids, bases, salts, and complex industrial chemicals.',
    keyPoints: [
      'Most elements are metals (left and centre of periodic table).',
      'Metals are usually shiny, malleable, and conduct electricity.',
      'Non-metals have diverse properties.',
      'Metalloids have intermediate properties.',
      'Transition metals have variable oxidation states and form coloured compounds.',
    ],
    sections: [
      {
        heading: 'Metals and Their Properties',
        content: 'Metals are on the left side of the periodic table. They tend to be solid at room temperature (except mercury), shiny, ductile (can be drawn into wires), malleable (can be hammered into sheets), and good conductors of heat and electricity. These properties come from metallic bonding.',
      },
      {
        heading: 'Transition Metals',
        content: 'Transition metals (in the middle of the periodic table) have special properties. They can form ions with different charges (variable oxidation states). They form coloured compounds — iron compounds are yellow/orange/green, copper compounds are blue/green. They make excellent catalysts.',
      },
      {
        heading: 'Reactions of Metals',
        content: 'Metals vary in reactivity. The most reactive metals (like potassium, sodium, calcium) react violently with water. Less reactive metals react with dilute acids. Gold and platinum are so unreactive that they occur naturally as pure metals.',
      },
      {
        heading: 'Important Inorganic Compounds',
        content: 'Industrial inorganic chemistry produces vast quantities of sulfuric acid (most produced chemical), ammonia, sodium hydroxide, and chlorine. These are feedstocks for fertilisers, plastics, pharmaceuticals, and countless other products.',
      },
    ],
  },
  {
    slug: 'molecules-and-compounds',
    number: 9,
    title: 'Molecules and Compounds',
    shortDescription: 'Understand the difference between elements, molecules, and compounds.',
    introduction: 'Matter is made of elements, and elements can combine to form molecules and compounds. Understanding these distinctions is fundamental to all chemistry.',
    keyPoints: [
      'Elements: pure substances made of one type of atom.',
      'Molecules: two or more atoms bonded together.',
      'Compounds: molecules made of different elements.',
      'Mixtures: substances that are physically combined, not chemically bonded.',
      'Molecular formula shows which atoms and how many.',
      'Structural formula shows how atoms are arranged.',
    ],
    sections: [
      {
        heading: 'Elements, Molecules, and Compounds',
        content: 'An element is a pure substance made of one type of atom only (like iron, oxygen, carbon). A molecule forms when two or more atoms bond together (O₂, H₂, N₂). A compound is a molecule made of two or more different elements bonded together (H₂O, NaCl, CO₂).',
        diagramType: 'molecule',
      },
      {
        heading: 'Chemical Formulae',
        content: 'A chemical formula shows which elements are in a compound and in what ratio. H₂O means two hydrogen atoms and one oxygen atom. CO₂ means one carbon and two oxygen atoms. C₆H₁₂O₆ (glucose) has 6 carbons, 12 hydrogens, and 6 oxygens.',
      },
      {
        heading: 'Mixtures',
        content: 'A mixture contains two or more substances that are not chemically combined. The components can be separated by physical means (filtration, distillation, chromatography). Air is a mixture of gases. Seawater is a mixture of water and dissolved salts.',
      },
    ],
  },
  {
    slug: 'types-of-reactions',
    number: 10,
    title: 'Types of Reactions',
    shortDescription: 'Classify and understand different types of chemical reactions.',
    introduction: 'Chemical reactions can be classified into different types based on what happens to the reactants and products. Knowing the type of reaction helps predict the products.',
    keyPoints: [
      'Synthesis: A + B → AB',
      'Decomposition: AB → A + B',
      'Single displacement: A + BC → AC + B',
      'Double displacement: AB + CD → AD + CB',
      'Combustion: fuel + O₂ → CO₂ + H₂O',
      'Redox: transfer of electrons',
      'Acid-base: transfer of protons',
    ],
    sections: [
      {
        heading: 'Synthesis and Decomposition',
        content: 'In a synthesis (combination) reaction, two or more substances combine to form a single product: 2H₂ + O₂ → 2H₂O. In decomposition, a single compound breaks into simpler substances: 2H₂O₂ → 2H₂O + O₂.',
      },
      {
        heading: 'Combustion Reactions',
        content: 'Combustion reactions occur when a fuel burns in oxygen. Complete combustion produces CO₂ and H₂O. Incomplete combustion (insufficient O₂) produces carbon monoxide (CO) and soot. CH₄ + 2O₂ → CO₂ + 2H₂O is methane combustion.',
      },
      {
        heading: 'Redox Reactions',
        content: 'Redox (reduction-oxidation) reactions involve the transfer of electrons between substances. Oxidation: loss of electrons. Reduction: gain of electrons. (OIL RIG — Oxidation Is Loss, Reduction Is Gain). Rusting of iron and charging of batteries are redox reactions.',
      },
    ],
  },
  {
    slug: 'important-concepts',
    number: 11,
    title: 'Important Concepts',
    shortDescription: 'Master key chemistry concepts like the mole, concentration, and equilibrium.',
    introduction: 'Certain fundamental concepts underpin all of chemistry. Understanding them gives you the tools to tackle advanced topics.',
    keyPoints: [
      'The mole: 6.022 × 10²³ particles (Avogadro\'s number).',
      'Molar mass: mass of one mole of a substance in grams.',
      'Concentration: amount of solute per unit volume.',
      'Equilibrium: forward and reverse reactions at the same rate.',
      'Le Chatelier\'s Principle: systems resist change.',
      'Activation energy: minimum energy for a reaction to occur.',
    ],
    sections: [
      {
        heading: 'The Mole Concept',
        content: 'The mole is the chemist\'s counting unit. One mole contains 6.022 × 10²³ particles (Avogadro\'s number). This lets chemists count atoms by weighing them. One mole of carbon-12 has exactly 12g. One mole of water (H₂O) has a molar mass of 18g.',
      },
      {
        heading: 'Chemical Equilibrium',
        content: 'Many reactions are reversible. At equilibrium, the rates of the forward and reverse reactions are equal, so the concentrations of reactants and products stay constant (but are not necessarily equal). Le Chatelier\'s Principle states that a system at equilibrium will respond to minimise any disturbance.',
      },
    ],
  },
  {
    slug: 'practice-questions',
    number: 12,
    title: 'Practice Questions',
    shortDescription: 'Test your understanding with worked examples and practice problems.',
    introduction: 'The best way to master chemistry is through practice. Work through these questions and check your understanding.',
    keyPoints: [
      'Read the question carefully.',
      'Write down what you know.',
      'Apply the relevant concept.',
      'Check your units and significant figures.',
      'Verify your answer makes chemical sense.',
    ],
    sections: [
      {
        heading: 'How to Approach Chemistry Problems',
        content: 'Start by identifying what the question is asking. Write down the relevant equation or formula. Substitute the values. Calculate and include units. Check the answer is chemically reasonable. Practice is the key to confidence.',
      },
    ],
  },
];

export const TOPIC_BY_SLUG: Record<string, LearnTopic> = Object.fromEntries(
  LEARN_TOPICS.map(t => [t.slug, t])
);
