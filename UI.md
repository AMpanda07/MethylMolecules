# ChemVerse UI Implementation Specification
## Reference UI → Production-Ready Interactive Website

> **Purpose:** This document is the implementation specification for recreating the provided ChemVerse UI concept as a polished, responsive, production-quality web experience.
>
> **Reference:** The supplied 8-screen ChemVerse UI concept image.
>
> **Primary instruction:** Preserve the visual language, layout hierarchy, proportions, component relationships, paper/scientific-notebook aesthetic, and information architecture of the reference while adding a coherent interaction, animation, transition, responsive, accessibility, and state system.

---

# 1. IMPLEMENTATION OBJECTIVE

Build the Chemistry Exploration Platform UI shown in the reference image.

The implementation should feel like a real product rather than a static mockup.

The visual direction is:

> **Premium chemistry textbook + laboratory notebook + scientific sketchbook**

The implementation must preserve:

- Warm paper background
- Torn/organic paper edges
- Subtle paper texture
- Thin ink-like borders
- Scientific sketches
- Tape/paper details
- Serif editorial headings
- Clean sans-serif interface text
- Restrained scientific accent colors
- Blue active navigation states
- Hand-drawn chemistry annotations
- Realistic molecule imagery / 3D representations
- Spacious information hierarchy
- Mature academic tone

Do **not** turn the design into:

- A corporate SaaS dashboard
- A futuristic science dashboard
- A children's learning app
- An anime interface
- A cartoon UI
- A neon/cyberpunk interface
- A glassmorphism-heavy interface
- A generic Material UI website

---

# 2. REFERENCE SCREEN INVENTORY

The provided reference contains eight major screens:

```text
1. Home Page
2. Periodic Table Page
3. Element Details Page
4. Molecule Playground Page
5. Molecule Library Page
6. Discover Elements Page
7. Learn Page
8. Quiz Page
```

Each should become a real route/page.

---

# 3. GLOBAL VISUAL LANGUAGE

## 3.1 Paper Surface

The entire application should feel like a high-quality chemistry notebook.

Use:

```text
Warm off-white base
+
subtle paper grain
+
very low-opacity noise
+
soft inner/outer shadows
+
organic paper edges
+
occasional tape elements
+
small scientific sketches
```

The texture must remain subtle.

### Important

Do not use a strong repeating texture that makes text difficult to read.

The user should perceive:

> premium paper

not:

> old parchment.

---

# 4. GLOBAL COLOR SYSTEM

Suggested baseline tokens:

```css
--paper: #F7F4EC;
--paper-secondary: #EFEBDD;
--paper-light: #FBF9F2;

--ink: #171B2B;
--ink-soft: #4D4C47;
--muted: #77736A;

--blue: #2166D1;
--blue-soft: #DDE9FF;

--green: #8BBF72;
--yellow: #F2C84B;
--red: #E77D73;
--violet: #A98BE3;

--border: rgba(54, 49, 39, 0.22);
--shadow: rgba(39, 32, 20, 0.12);
```

These are implementation starting points.

Do not blindly apply every accent everywhere.

---

# 5. TYPOGRAPHY SYSTEM

Use a two-family typography system.

## Display / Editorial

Use a serif typeface for:

- Hero headings
- Page titles
- Major section headings
- Large scientific statements

Visual characteristics:

- Editorial
- Academic
- Slightly classic
- High readability
- Strong contrast

## UI / Body

Use a clean sans-serif for:

- Navigation
- Search
- Buttons
- Metadata
- Element properties
- Quiz options
- Labels
- Body copy

## Typography Hierarchy

```text
Hero:
large serif

Page title:
large serif

Section title:
medium serif

Body:
clean sans-serif

Metadata:
small sans-serif

Scientific values:
medium/semibold sans-serif
```

Do not use handwritten fonts for normal UI text.

Handwritten typography should only appear as tiny decorative annotations where appropriate.

---

# 6. GLOBAL NAVIGATION

Every page uses a consistent top navigation.

Reference structure:

```text
[Atom Logo] ChemVerse

Home
Periodic Table
Elements
Molecules
Learn

                         [Search]
```

## Active Navigation

The active route should be visually highlighted with:

- Soft blue background
- Slight rounded shape
- Blue text
- Very subtle transition

Example:

```text
Home
Periodic Table
[ Elements ]
Molecules
Learn
```

## Navigation Animation

On route change:

```text
Old active item
    ↓
fade/scale out

New active item
    ↓
soft background expansion
    ↓
text color transition
```

Do not use aggressive movement.

---

# 7. GLOBAL PAGE TRANSITIONS

Use a shared page-transition system.

Recommended behavior:

```text
Current page
    ↓
subtle opacity reduction
    +
2–6px vertical displacement
    ↓
new page
    ↓
fade in
    +
small upward movement
```

Target duration:

```text
350–550ms
```

Use a smooth ease-out curve.

Avoid dramatic route transitions that slow navigation.

---

# 8. GLOBAL MICRO-INTERACTION PRINCIPLES

Interactions should feel physical and paper-like.

## Buttons

Hover:

```text
translateY(-1px)
shadow slightly increases
background subtly changes
```

Pressed:

```text
translateY(0)
shadow decreases
```

## Cards

Hover:

```text
translateY(-2px)
shadow increases slightly
border becomes more visible
```

Do not use excessive scale.

Recommended:

```text
scale: 1.01–1.02
```

## Paper Cards

Cards should feel like physical paper pieces resting on the page.

Use:

- Slight shadow
- Slight irregularity
- Thin border
- Subtle texture
- Optional tiny rotation for selected decorative cards

Do not randomly rotate every component.

---

# 9. HOME PAGE

## Reference Composition

The reference Home page contains:

```text
Top navigation
        ↓
Large hero section
        ↓
Chemistry illustration / laboratory visual
        ↓
Search bar
        ↓
Four feature cards
        ↓
Element of the Day
```

---

# 10. HOME — HERO

## Content

Heading:

> Explore the World of Chemistry

The word:

> Chemistry

should be visually emphasized with a blue accent.

Supporting copy:

> Discover elements, build molecules, explore real-world examples, and learn how chemistry shapes our world.

## Visual

The reference uses a laboratory / scientific composition on the right.

Maintain this composition style.

Possible visual elements:

- Flask
- Molecule sketch
- Scientific notebook
- Botanical/scientific background
- Chemistry notes
- Subtle element labels

The illustration should remain secondary to the heading.

---

# 11. HOME — HERO ANIMATION

On initial page load:

```text
Paper background
      ↓
navigation fades in
      ↓
hero heading rises slightly
      ↓
supporting text fades in
      ↓
search bar appears
      ↓
scientific visual gently settles into position
```

Animation duration:

```text
600–1000ms total sequence
```

Stagger each element by approximately:

```text
60–120ms
```

Avoid simultaneous aggressive animations.

---

# 12. HOME — SEARCH

Search placeholder:

```text
Search elements, molecules or topics...
```

Include search icon.

Include a right-side action/arrow.

## Interaction

Click/focus:

```text
border → blue
shadow → subtle
placeholder → slightly darker
```

Typing should provide autocomplete later.

Search should support:

```text
Element name
Symbol
Atomic number
Molecule name
Formula
Topic
```

---

# 13. HOME — FEATURE CARDS

Four primary cards:

```text
Periodic Table
Molecule Playground
Molecule Library
Learn Chemistry
```

Each card contains:

- Small scientific illustration/icon
- Title
- Short description
- Arrow
- Clickable entire card

## Hover

```text
card rises slightly
illustration moves 2–4px
arrow shifts right
```

The animation should feel tactile, not game-like.

---

# 14. HOME — ELEMENT OF THE DAY

The reference uses a split card:

```text
Element identity
+
description
+
scientific visual
```

Example:

```text
6
C

Carbon

The building block of life
and countless compounds.

[ Explore Carbon ]
```

Add a small handwritten-style annotation such as:

> Found in every living thing!

These annotations should be decorative and sparse.

---

# 15. PERIODIC TABLE PAGE

## Reference Composition

The page contains:

```text
Navigation
Page title
Short description
Search
Filters
Periodic table
Lanthanides
Actinides
Legend
```

The table should dominate the page.

---

# 16. PERIODIC TABLE — HEADER

Heading:

> Periodic Table of Elements

Supporting copy:

> Explore all 118 elements. Click any element to learn more.

Then:

```text
[ Search element... ]

[All]
[Metals]
[Non-metals]
[Noble Gases]
[More filters]
```

---

# 17. PERIODIC TABLE — INTERACTION

Every element cell is interactive.

Hover:

```text
small elevation
slight border emphasis
very subtle scale
```

Tooltip:

```text
Oxygen
O
Atomic number: 8
Non-metal
```

Click:

```text
navigate → /elements/O
```

Use a smooth transition.

---

# 18. PERIODIC TABLE — CATEGORY COLORS

Keep category colors subtle.

The reference uses muted scientific colors.

Possible categories:

```text
Alkali Metals
Alkaline Earth Metals
Transition Metals
Post-transition Metals
Metalloids
Non-metals
Halogens
Noble Gases
Lanthanides
Actinides
```

Do not use saturated neon colors.

---

# 19. PERIODIC TABLE — FILTER ANIMATION

When a category is selected:

```text
selected category
    ↓
relevant elements remain fully visible
    ↓
non-matching cells reduce opacity
```

Do not instantly remove all nonmatching cells unless required.

This preserves the mental model of the periodic table.

Recommended:

```text
matching:
opacity 1

non-matching:
opacity 0.25–0.4
```

Transition:

```text
250–350ms
```

---

# 20. PERIODIC TABLE — CELL DETAILS

Desktop cell:

```text
Atomic number
Symbol
Element name
```

Mobile cell:

Prioritize:

```text
Symbol
Atomic number
```

Move the name into tooltip/detail view if space is insufficient.

---

# 21. ELEMENT DETAILS PAGE

## Reference Composition

Top:

```text
Back to Periodic Table
```

Then:

```text
Element card
+
Element title
+
Category
+
Short description
```

Then tabs:

```text
Overview
Properties
Uses
Occurrence
Fun Facts
Molecules
```

Then:

```text
Main educational content
+
Quick Info card
```

---

# 22. ELEMENT DETAILS — HERO

Example:

```text
8

O

Oxygen

[Non-metal]

A colourless, odourless gas that we
need to breathe. It plays a vital role
in life on Earth.
```

The large element tile should remain visually prominent.

---

# 23. ELEMENT DETAILS — TABS

Tabs should behave like a lightweight content switcher.

```text
Overview
Properties
Uses
Occurrence
Fun Facts
Molecules
```

Selected tab:

```text
soft blue background
blue text
```

Content transition:

```text
opacity 0
translateY(4px)
    ↓
opacity 1
translateY(0)
```

Duration:

```text
250–350ms
```

Do not reanimate the entire page.

Only animate changed content.

---

# 24. ELEMENT DETAILS — CONTENT

The reference uses icon-led educational sections:

```text
What is it?
Where is it found?
What is it used for?
Fun Facts!
```

Keep these sections.

Use small scientific icons:

- Light bulb
- Globe
- Gear
- Star

The icons should be clean and mature.

---

# 25. ELEMENT DETAILS — QUICK INFO

The right-side information card should contain:

```text
Atomic Number
Atomic Mass
State at Room Temp
Melting Point
Boiling Point
Electron Configuration
```

Use a clean two-column layout:

```text
Property             Value
Atomic Number        8
Atomic Mass          15.999
State                Gas
...
```

Do not overcrowd the card.

---

# 26. MOLECULE PLAYGROUND PAGE

This is the most interactive page.

Reference composition:

```text
Header
Page title
Short description

┌─────────────────────┬───────────────────────┐
│ Atom selection      │                       │
│                     │       3D Canvas       │
│ Search atoms        │                       │
│                     │                       │
│ H C N O             │                       │
│ S P Cl F            │                       │
│ ...                 │                       │
└─────────────────────┴───────────────────────┘

Molecule information
```

---

# 27. MOLECULE PLAYGROUND — TOOLBAR

Top controls:

```text
2D
3D
Reset
```

The selected mode should use a blue background.

Example:

```text
[2D] [3D] [Reset]
```

Transition:

```text
background
text
shadow
```

Duration:

```text
180–250ms
```

---

# 28. MOLECULE PLAYGROUND — ATOM PANEL

Include:

```text
Choose Atoms

[Search atom...]

H
C
N
O

S
P
Cl
F

Na
K
Ca
Mg

Fe
Cu
Zn
Br

I
Si
B
Al

+ More Elements
```

The reference uses colored element chips.

Maintain the color coding but keep it restrained.

---

# 29. MOLECULE PLAYGROUND — 3D CANVAS

The canvas should show the molecule prominently.

Controls:

```text
Select
Bond
Erase
Rotate
Zoom
```

The control rail should remain visually secondary.

## 3D interaction

Support:

- Orbit
- Zoom
- Pan where appropriate
- Select atom
- Select bond
- Drag atom
- Remove atom
- Add atom

Touch support:

```text
one finger:
rotate/select

pinch:
zoom

two-finger:
pan
```

---

# 30. MOLECULE PLAYGROUND — INSTRUCTION

The reference contains a small note:

> Drag atoms, connect them and create your own molecule.

Keep this concept.

The instruction should disappear or reduce after the user successfully performs the first interaction.

Example:

```text
First visit:
instruction visible

After first atom:
instruction becomes subtle

After first bond:
instruction disappears
```

This prevents permanent visual clutter.

---

# 31. MOLECULE PLAYGROUND — RESULT CARD

Display:

```text
Your Molecule

H₂O
Water

Atoms
3

Bonds
2

Molecular Mass
18.015 g/mol
```

Tabs:

```text
Properties
Structure
```

Button:

```text
Learn More →
```

The result card should update smoothly whenever the molecule changes.

---

# 32. MOLECULE PLAYGROUND — STATE TRANSITIONS

When a molecule changes:

```text
old molecule
    ↓
subtle scale/opacity transition
    ↓
new molecular structure
```

Do not rebuild the entire UI.

Only update:

- 3D scene
- Formula
- Name
- Atom count
- Bond count
- Mass
- Structure information

---

# 33. MOLECULE LIBRARY PAGE

Reference composition:

```text
Page title
Description
Search
Category filters
Molecule cards
```

Title:

> Molecule Library

Supporting text:

> Explore common and important molecules from everyday life.

---

# 34. MOLECULE LIBRARY — SEARCH

Placeholder:

```text
Search molecules (e.g. water, carbon dioxide)...
```

Search by:

- Name
- Formula
- Category
- Common name

---

# 35. MOLECULE LIBRARY — FILTERS

```text
All
Everyday
Organic
Biological
Industrial
Inorganic
```

Active state:

```text
blue filled
white text
```

Inactive state:

```text
paper/gray
dark text
```

---

# 36. MOLECULE LIBRARY — CARDS

Initial cards:

```text
Water
H₂O

Carbon Dioxide
CO₂

Methane
CH₄

Ammonia
NH₃

Glucose
C₆H₁₂O₆

Sodium Chloride
NaCl

Benzene
C₆H₆

Ethanol
C₂H₅OH
```

Cards should show:

- 3D molecule preview
- Name
- Formula
- Arrow

Hover:

```text
molecule gently rotates
card rises
arrow moves
```

Do not rotate continuously when idle.

---

# 37. DISCOVER ELEMENTS PAGE

Reference composition:

```text
Title
Description
Category filters
Vertical discovery list
Element card
Real-world visual
Arrow
```

Heading:

> Discover Elements

Supporting:

> Learn amazing facts about elements in a simple and engaging way.

---

# 38. DISCOVER FILTERS

Reference categories:

```text
All
Metals
Non-metals
Metalloids
Noble Gases
Recently Added
```

Selected filter:

```text
blue
```

---

# 39. DISCOVER ELEMENT CARD

Each item should include:

```text
Atomic number
Symbol
Element name
Short explanation
Scientific / real-world image
Arrow
```

Example:

```text
Gold
Au

A precious metal known for its beauty,
conductivity and resistance to corrosion.
```

Cards should feel editorial, like entries in a scientific notebook.

---

# 40. DISCOVER LIST ANIMATION

When page loads:

```text
first card
↓
second card
↓
third card
...
```

Use a small stagger.

Recommended:

```text
30–70ms between cards
```

Each card:

```text
opacity 0 → 1
translateY(8px) → 0
```

When filtering:

```text
existing list
↓
fade/position
↓
new list
```

Avoid large layout jumps.

---

# 41. LEARN PAGE

Reference composition:

```text
Page heading
Description

┌────────────────┬─────────────────────────┐
│ Topic list     │ Topic content           │
│                │                         │
│ 1 Atomic       │ Atomic Structure        │
│ 2 Periodic     │ Explanation             │
│ 3 Bonding      │ Diagram                 │
│ ...            │ Key Points              │
└────────────────┴─────────────────────────┘
```

---

# 42. LEARN — TOPIC NAVIGATION

Topics:

```text
1. Atomic Structure
2. Periodic Table
3. Chemical Bonding
4. States of Matter
5. Chemical Reactions
6. Acids, Bases and Salts
7. Organic Chemistry
8. Inorganic Chemistry
9. Molecules and Compounds
10. Types of Reactions
11. Important Concepts
12. Practice Questions
```

The active topic uses:

```text
soft blue background
blue number
blue text
```

---

# 43. LEARN — CONTENT

The content area should include:

- Topic title
- Short explanation
- Diagram
- Key points
- Examples
- Navigation

Example:

```text
Atomic Structure

Atoms are the building blocks of matter.
Every element is made up of atoms.

[Scientific atomic diagram]

Key Points

• Atoms have a nucleus.
• Electrons revolve around the nucleus.
• Protons have a positive charge.
• Neutrons have no charge.
• Electrons have a negative charge.
```

---

# 44. LEARN — DIAGRAM STYLE

Scientific diagrams should match the notebook aesthetic.

Use:

- Thin blue ink-like strokes
- Simple labels
- Clean geometry
- Slight hand-drawn character
- No cartoon faces
- No excessive illustration

The diagram should look like a premium textbook sketch.

---

# 45. LEARN — TOPIC TRANSITION

Changing topic should not reload the entire visual shell.

Use:

```text
topic selection
    ↓
active state changes
    ↓
content fades/slides
    ↓
new diagram enters
```

Keep navigation stable.

---

# 46. QUIZ PAGE

Reference composition:

```text
Heading
Description
Category filters
Progress bar
Question
Options
Previous / Next
```

Heading:

> Chemistry Quiz

Supporting:

> Test your knowledge and learn with practice questions.

---

# 47. QUIZ — CATEGORY FILTERS

Example:

```text
All
Atomic Structure
Periodic Table
Chemical Bonding
```

Selected category:

```text
blue
```

---

# 48. QUIZ — PROGRESS

Display:

```text
Question 1 of 10
```

Use a thin progress bar.

The progress bar should animate smoothly when moving to the next question.

---

# 49. QUIZ — QUESTION CARD

Example:

```text
Which of the following is a noble gas?

A. Oxygen
B. Neon
C. Sodium
D. Chlorine
```

Each option is a full-width clickable paper-like button.

---

# 50. QUIZ — ANSWER INTERACTION

Before selection:

```text
neutral paper
```

Selected:

```text
blue border
blue/soft blue background
```

Correct:

```text
subtle green treatment
```

Incorrect:

```text
subtle red treatment
```

Do not use huge checkmarks or error animations.

---

# 51. QUIZ — FEEDBACK

After answering, reveal:

```text
Correct / Incorrect

Short explanation
```

Example:

> Neon is a noble gas because it belongs to Group 18 of the periodic table.

Then:

```text
[ Next → ]
```

The explanation should be educational rather than merely evaluative.

---

# 52. QUIZ — QUESTION TRANSITION

When moving between questions:

```text
current question
opacity 1
translateX(0)

       ↓

opacity 0
translateX(-10px)

       ↓

new question
opacity 1
translateX(0)
```

Duration:

```text
250–350ms
```

Avoid long transitions that make quizzes feel slow.

---

# 53. GLOBAL SCROLL BEHAVIOR

The website should have smooth but restrained scrolling.

Do not force smooth scrolling globally if it harms accessibility.

For supported environments:

- Smooth anchor navigation
- Subtle section reveal
- Small parallax on decorative paper/scientific elements

Decorative elements should move less than content.

Example:

```text
Content: 1.0 movement
Decoration: 0.2–0.4 movement
```

---

# 54. PAGE REVEAL SYSTEM

Every page should use a consistent entrance pattern.

Recommended:

```text
Page shell
opacity: 0 → 1

Header
translateY(8px) → 0

Main title
translateY(10px) → 0

Controls
translateY(8px) → 0

Main content
translateY(12px) → 0
```

Duration:

```text
400–700ms
```

Use stagger carefully.

---

# 55. PAPER / TAPE DECORATION ANIMATION

Decorative elements can have extremely subtle movement.

Examples:

```text
paper note:
rotate ±0.2deg

scientific sketch:
opacity pulse

tape:
no movement or extremely subtle parallax

background drawing:
slow 10–20px movement over long duration
```

Do not make paper elements float around constantly.

---

# 56. REDUCED MOTION

Respect:

```css
prefers-reduced-motion: reduce
```

When enabled:

- Disable parallax
- Disable large page transitions
- Remove continuous 3D auto-rotation
- Reduce hover transforms
- Keep only essential state transitions

The application must remain fully usable.

---

# 57. RESPONSIVE DESIGN

## Desktop

Target:

```text
1440px+
```

Use:

- Full navigation
- Multi-column layouts
- Large hero
- Full periodic table
- Large molecule workspace

## Laptop

Target:

```text
1024–1439px
```

Reduce:

- Padding
- Card widths
- Hero illustration size
- 3D canvas dimensions

## Tablet

Target:

```text
768–1023px
```

Convert complex layouts where necessary.

Example:

```text
two-column
↓
stacked sections
```

## Mobile

Target:

```text
<768px
```

Prioritize:

1. Content
2. Navigation
3. Search
4. Primary action
5. Scientific information

---

# 58. MOBILE NAVIGATION

Desktop:

```text
Logo
Home
Periodic Table
Elements
Molecules
Learn
Search
```

Mobile:

```text
Logo
Search
Menu
```

Menu opens a paper-style navigation sheet.

Animation:

```text
overlay opacity
+
menu translateX
```

Avoid a full-screen futuristic drawer.

---

# 59. MOBILE PERIODIC TABLE

Do not simply shrink the full table until it becomes unreadable.

Options:

### Strategy A

Horizontally scroll the table.

### Strategy B

Provide a mobile-optimized periodic table.

### Strategy C

Allow category/group exploration through a simplified mobile representation.

The preferred implementation can use:

```text
horizontal scroll
+
sticky search/filter controls
+
tap-to-open element details
```

---

# 60. MOBILE MOLECULE LAB

The mobile version must be touch-first.

Use:

```text
3D canvas
↓
atom toolbar
↓
molecule information
```

Controls should be large enough for touch.

Avoid tiny desktop tool buttons.

---

# 61. ACCESSIBILITY REQUIREMENTS

All interactive elements must have:

- Keyboard access
- Visible focus
- Accessible labels
- Appropriate semantic HTML
- Sufficient contrast
- Screen-reader-friendly text

Canvas interactions must have DOM alternatives where the information is important.

Example:

A 3D molecule must still expose:

```text
Name
Formula
Atoms
Bonds
Basic structure
```

outside the canvas.

---

# 62. PERFORMANCE STRATEGY

The visual quality must not come at the expense of usability.

Target:

```text
60 FPS
```

where realistically achievable.

Monitor:

- Frame time
- Draw calls
- Triangle count
- Texture memory
- JavaScript bundle
- Initial load
- Largest Contentful Paint
- Interaction latency

---

# 63. 3D PERFORMANCE

Use:

- Lazy loading
- Asset caching
- GLB/GLTF
- Draco where appropriate
- KTX2/Basis where appropriate
- Reusable materials
- Instancing
- Frustum culling
- Reduced post-processing

Avoid:

- Huge textures
- High-poly models
- Excessive dynamic lights
- Unnecessary shadows
- Multiple post-processing passes

---

# 64. DEVICE-AWARE 3D

Use quality tiers.

```text
High
├── Full geometry
├── Shadows
├── Higher resolution
└── More visual effects

Medium
├── Reduced geometry
├── Reduced shadows
└── Minimal post-processing

Low
├── Simplified geometry
├── No expensive effects
└── Reduced render resolution

Mobile
├── Mobile-specific camera
├── Simplified scene
└── Touch controls
```

---

# 65. 3D FALLBACK

If WebGL is unavailable:

```text
3D viewer
   ↓
fallback
   ↓
static molecular image
   +
formula
   +
structure information
```

The user should never see a broken empty canvas.

---

# 66. COMPONENT SYSTEM

Build reusable components rather than eight independent pages.

Recommended components:

```text
AppShell
Navbar
MobileNavigation
PageContainer
PaperSurface
PaperCard
SectionHeader
SearchBar
FilterGroup
FilterChip
ElementTile
ElementCard
MoleculeCard
MoleculeViewer
MoleculeToolbar
AtomPalette
ElementInfoCard
InfoTable
ContentTabs
TopicSidebar
TopicContent
QuizOption
QuizProgress
PrimaryButton
SecondaryButton
ScientificAnnotation
ScientificSketch
EmptyState
LoadingState
ErrorState
```

---

# 67. COMPONENT DESIGN PRINCIPLE

Components should have clear responsibilities.

Bad:

```text
ChemistryEverythingPage.tsx
```

Good:

```text
PeriodicTable.tsx
ElementTile.tsx
ElementFilters.tsx
ElementSearch.tsx
```

Avoid giant components.

---

# 68. DESIGN TOKENS

Create a centralized design token system.

Include:

```text
Colors
Typography
Spacing
Radius
Shadows
Borders
Motion durations
Motion easings
Breakpoints
Z-index layers
```

Example:

```text
spacing:
4
8
12
16
24
32
48
64
80
```

Do not scatter arbitrary pixel values everywhere.

---

# 69. Z-INDEX SYSTEM

Do not use random values.

Suggested layers:

```text
base: 0
content: 10
floating: 20
navigation: 30
dropdown: 40
modal: 50
toast: 60
```

---

# 70. MOTION TOKEN SYSTEM

Suggested:

```text
instant: 120ms
fast: 180ms
normal: 250ms
medium: 350ms
slow: 500ms
cinematic: 800–1200ms
```

Easing:

```text
ease-out for entrance
ease-in-out for state changes
spring only where tactile feedback is useful
```

Do not use spring animation for every element.

---

# 71. ROUTE FLOW

Primary user flow:

```text
Home
 │
 ├── Periodic Table
 │      └── Element Details
 │
 ├── Molecule Playground
 │      └── Molecule Details
 │
 ├── Molecule Library
 │      └── Molecule Details
 │
 ├── Discover Elements
 │      └── Element Details
 │
 ├── Learn
 │      └── Topic
 │
 └── Quiz
        └── Results
```

---

# 72. CROSS-PAGE FLOW

## Element discovery

```text
Home
 ↓
Periodic Table
 ↓
Hover element
 ↓
Click
 ↓
Element Details
 ↓
Molecules containing element
 ↓
Molecule Details
```

## Molecule discovery

```text
Home
 ↓
Molecule Library
 ↓
Molecule Card
 ↓
Molecule Details
 ↓
Open in Molecule Lab
```

## Learning

```text
Home
 ↓
Learn
 ↓
Topic
 ↓
Interactive explanation
 ↓
Practice
 ↓
Quiz
```

## Quiz

```text
Quiz
 ↓
Choose topic
 ↓
Choose difficulty
 ↓
Question
 ↓
Answer
 ↓
Explanation
 ↓
Next
 ↓
Results
```

---

# 73. ELEMENT → MOLECULE RELATIONSHIP

Element pages should link naturally to molecules.

Example:

```text
Oxygen
 ↓
Molecules containing oxygen
 ↓
Water
Carbon Dioxide
Oxygen
Glucose
Ethanol
```

This creates a knowledge graph rather than isolated pages.

---

# 74. MOLECULE → ELEMENT RELATIONSHIP

Molecule pages should also link back to constituent elements.

Example:

```text
Water
H₂O

Contains:
Hydrogen
Oxygen
```

Clicking either element:

```text
→ /elements/H
→ /elements/O
```

---

# 75. LEARN → PRACTICE RELATIONSHIP

Every learning topic should eventually have:

```text
[ Practice this topic → ]
```

This should route to:

```text
/practice/[topic]
```

---

# 76. LOADING STATES

Use skeletons that visually resemble the paper UI.

Do not use generic dark-gray skeletons.

Example:

```text
paper card
████████
██████
██████████
```

Use low-contrast warm-gray placeholders.

---

# 77. ERROR STATES

Example:

```text
Something went wrong.

We couldn't load this chemistry data.

[ Try Again ]
```

Maintain the same paper aesthetic.

Avoid generic browser-looking error screens.

---

# 78. EMPTY STATES

Example:

```text
No molecules found.

Try another molecule name or formula.

[ Clear Search ]
```

Keep empty states educational and useful.

---

# 79. SEARCH EXPERIENCE

Global search should eventually support:

```text
Elements
Molecules
Topics
```

Example:

```text
Search: oxygen

Elements
Oxygen — O

Molecules
Water — H₂O
Carbon Dioxide — CO₂

Topics
Oxygen and Combustion
```

Use grouped results.

---

# 80. IMAGE / ASSET DIRECTION

The reference uses:

- Scientific illustrations
- Molecular renders
- Element photos
- Paper textures
- Tape
- Hand-drawn annotations
- Laboratory objects

Assets should be consistent.

Do not mix:

```text
photorealistic image
+
cartoon icon
+
3D glossy icon
+
flat vector
```

without an intentional reason.

---

# 81. SCIENTIFIC ILLUSTRATION STYLE

Scientific sketches should look:

- Hand-drawn
- Thin-line
- Academic
- Slightly imperfect
- Clean
- Restrained

Avoid:

- Cartoon faces
- Cute mascots
- Emoji-style science
- Excessive doodles

---

# 82. IMAGE TREATMENT

Images should feel integrated into the notebook.

Possible treatment:

```text
image
+
paper frame
+
thin border
+
soft shadow
```

Avoid heavy card effects.

---

# 83. 3D MOLECULE VISUAL STYLE

Molecule rendering should remain scientifically recognizable.

Use:

- Sphere atoms
- Cylindrical bonds
- Appropriate element colors
- Soft lighting
- Neutral background
- Subtle shadowing
- Clear silhouettes

Do not use exaggerated glossy game-style materials.

---

# 84. INTERACTION PRIORITY

When multiple interactions compete, prioritize:

```text
Primary action
    ↓
Secondary action
    ↓
Exploration
    ↓
Decoration
```

For example, in Molecule Lab:

```text
Build molecule
    >
Rotate
    >
Inspect
    >
Decorative motion
```

---

# 85. DO NOT OVER-ANIMATE

Avoid:

- Continuous floating cards
- Constant parallax
- Aggressive page transitions
- Excessive hover scaling
- Animated text everywhere
- Infinite molecular spinning
- Excessive particle effects

The website should feel calm.

---

# 86. MOTION CHARACTER

Motion should feel:

> **Soft, physical, deliberate, academic**

Think:

```text
Paper moving
Ink appearing
A textbook page changing
A scientific object being examined
```

Not:

```text
Gaming UI
Cyberpunk HUD
Social-media animation
```

---

# 87. IMPLEMENTATION PRIORITY

Build in this order:

```text
1. Global shell
2. Navigation
3. Typography
4. Paper system
5. Home
6. Periodic Table
7. Element Details
8. Molecule Library
9. Molecule Details
10. Molecule Lab
11. Discover
12. Learn
13. Quiz
14. Responsive
15. Accessibility
16. Performance
17. QA
```

---

# 88. FIRST IMPLEMENTATION MILESTONE

The first milestone should establish the visual identity.

Build only:

```text
Navbar
+
Home Hero
+
Feature Cards
+
Element of Day
+
Paper system
+
Typography
+
Buttons
+
Search
```

Before continuing, validate:

- Typography
- Paper texture
- Spacing
- Colors
- Card shadows
- Navigation
- Responsive behavior
- Animation quality

Do not build the entire application before validating the visual foundation.

---

# 89. SECOND IMPLEMENTATION MILESTONE

Build:

```text
Periodic Table
+
Element Details
```

Validate:

- Element data
- Search
- Filters
- Navigation
- Responsive periodic table
- Detail page
- Tabs

---

# 90. THIRD IMPLEMENTATION MILESTONE

Build:

```text
Molecule Library
+
Molecule Details
+
3D Viewer
```

Validate:

- 3D performance
- Asset loading
- Camera
- Lighting
- Mobile behavior
- Fallback

---

# 91. FOURTH IMPLEMENTATION MILESTONE

Build:

```text
Molecule Playground
```

Validate:

- Atom selection
- Placement
- Bonding
- Selection
- Erasing
- Rotation
- Zoom
- Molecule state
- Formula
- Mass
- Mobile touch interaction

---

# 92. FIFTH IMPLEMENTATION MILESTONE

Build:

```text
Discover
+
Learn
+
Quiz
```

Then integrate cross-page relationships.

---

# 93. TECHNICAL STACK

Recommended:

```text
Next.js
React
TypeScript
Tailwind CSS
Three.js
React Three Fiber
Drei
Motion / Framer Motion
GSAP where justified
Zustand where needed
Zod
```

Backend if required:

```text
Next.js Route Handlers
PostgreSQL
Prisma
```

Do not add backend complexity until content/state requirements justify it.

---

# 94. FOLDER STRUCTURE

Recommended:

```text
src/
├── app/
│   ├── page.tsx
│   ├── elements/
│   ├── molecules/
│   ├── molecule-lab/
│   ├── discover/
│   ├── learn/
│   └── practice/
│
├── components/
│   ├── ui/
│   ├── navigation/
│   ├── elements/
│   ├── molecules/
│   ├── learning/
│   └── quiz/
│
├── scenes/
│   ├── molecule/
│   ├── atoms/
│   ├── materials/
│   ├── lighting/
│   └── controls/
│
├── data/
│   ├── elements/
│   ├── molecules/
│   ├── topics/
│   └── quizzes/
│
├── hooks/
├── lib/
├── stores/
├── types/
└── styles/
```

Adapt the structure according to actual project complexity.

---

# 95. IMPLEMENTATION RULES

## Rule 1

Do not treat the reference as eight disconnected mockups.

Create one coherent design system.

## Rule 2

Do not replace the visual concept with generic components.

The paper notebook identity is a core product characteristic.

## Rule 3

Do not overuse 3D.

3D is primarily for molecular exploration.

## Rule 4

Do not sacrifice accessibility for visual fidelity.

## Rule 5

Do not sacrifice performance for visual effects.

## Rule 6

Do not make every interaction animated.

## Rule 7

Do not use random decorative elements.

Every sketch, annotation, tape, texture, or motion should have a visual role.

## Rule 8

Keep content readable before making it visually impressive.

---

# 96. FINAL UI QUALITY GATE

Before declaring the UI complete:

## Visual Fidelity

- [ ] Overall composition matches reference
- [ ] Paper background feels correct
- [ ] Typography hierarchy matches
- [ ] Navigation matches
- [ ] Card proportions match
- [ ] Scientific illustrations fit
- [ ] Colors are restrained
- [ ] Borders and shadows match
- [ ] Decorative elements are consistent

## Interaction

- [ ] Buttons respond
- [ ] Cards respond
- [ ] Navigation responds
- [ ] Filters animate
- [ ] Tabs work
- [ ] Search works
- [ ] Periodic table cells work
- [ ] Molecule controls work
- [ ] Quiz options work

## Motion

- [ ] Page transitions
- [ ] Hero entrance
- [ ] Card hover
- [ ] Filter transitions
- [ ] Tab transitions
- [ ] Quiz transitions
- [ ] Molecule transitions
- [ ] Reduced-motion support

## Responsive

- [ ] Desktop
- [ ] Laptop
- [ ] Tablet
- [ ] Mobile
- [ ] Small mobile

## Accessibility

- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Semantic HTML
- [ ] Screen-reader labels
- [ ] Reduced motion
- [ ] Accessible 3D alternatives

## Performance

- [ ] No unnecessary renders
- [ ] 3D assets lazy-loaded
- [ ] Images optimized
- [ ] No huge textures
- [ ] No memory leaks
- [ ] Good mobile performance
- [ ] WebGL fallback

---

# 97. FINAL IMPLEMENTATION DIRECTIVE

The provided image is the **visual source of truth for the UI direction**.

Recreate the concept faithfully in a real application, but do not make the result a static screenshot recreation.

The implementation should transform the reference into a functional system:

```text
Reference UI
      ↓
Design System
      ↓
Reusable Components
      ↓
Interactive Pages
      ↓
Navigation
      ↓
State Management
      ↓
3D Experiences
      ↓
Responsive Behavior
      ↓
Animation System
      ↓
Accessibility
      ↓
Performance Optimization
      ↓
Production-Ready Chemistry Platform
```

The final result should feel like the same product shown in the reference image — not merely a website that happens to use the same colors.

---

# 98. PRIMARY DESIGN TARGET

The final experience should communicate:

> **“This is a chemistry notebook I can explore.”**

It should not communicate:

> “This is a dashboard.”

or:

> “This is a children's game.”

or:

> “This is a futuristic WebGL demo.”

The ideal balance is:

**Academic × Interactive × Warm × Scientific × Modern × Calm**

---

# 99. FINAL PRODUCT EXPERIENCE

The complete user journey should feel like:

```text
OPEN CHEMVERSE
       ↓
See chemistry as an approachable world
       ↓
Choose something interesting
       ↓
Explore an element / molecule / concept
       ↓
Interact with scientific content
       ↓
Move naturally into deeper information
       ↓
Experiment in the Molecule Lab
       ↓
Learn a concept
       ↓
Practice it
       ↓
Discover something else
```

The UI should continuously encourage **curiosity without creating cognitive overload**.

---

# 100. FINAL ENGINEERING PRINCIPLE

Do not merely reproduce pixels.

Reproduce the **design intent**:

```text
Visual hierarchy
+
Information hierarchy
+
Interaction hierarchy
+
Motion hierarchy
+
Educational hierarchy
```

The UI should preserve the reference's identity while behaving like a professionally engineered application.

