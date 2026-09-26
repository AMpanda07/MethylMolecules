# Chemistry Exploration Platform — Complete Product Specification

> **Document status:** Product concept + UX specification + technical architecture baseline  
> **Purpose:** Single source of truth for designing and implementing the Chemistry Exploration Platform.

---

# 1. Product Identity

## Working Concept

**Chemistry Exploration Platform**

A modern educational chemistry website that makes chemistry easy, visual, interactive, and enjoyable for students.

## Product Positioning

The platform should feel like:

> **An interactive digital chemistry textbook / laboratory notebook rather than a corporate dashboard or overly futuristic science application.**

A useful mental model is:

**Modern textbook + laboratory notebook + scientific sketchbook**

The product should combine:

**Education × Exploration × Interaction × Scientific Visualization × Progressive Learning**

---

# 2. Core Audience

The target audience ranges approximately from:

- 8th-class students
- Secondary-school students
- Higher-secondary students
- College students
- Beginner chemistry learners
- Students who want visual explanations of chemistry

The interface must satisfy two seemingly conflicting requirements:

1. An 8th-class student should be able to open the website and immediately understand what to do.
2. A college student should be able to access deeper scientific information without the product feeling childish.

## Core UX Principle

> **Make chemistry feel understandable before making it feel advanced.**

The product should use **progressive disclosure**:

```text
Simple explanation
        ↓
Visual explanation
        ↓
Example
        ↓
Scientific details
        ↓
Advanced details
```

A beginner can stop at the simple layer while an advanced learner can continue deeper.

---

# 3. Core Product Loop

The overall experience should follow:

```text
Discover
   ↓
Explore
   ↓
Understand
   ↓
Experiment
   ↓
Practice
```

Every major feature should have a clear educational purpose.

---

# 4. Primary Product Goals

The platform should allow students to:

1. Explore the periodic table
2. Discover individual elements
3. Understand element properties
4. Learn real-world uses of elements
5. Discover chemistry in everyday life
6. Build molecules interactively
7. Explore common molecules
8. View molecules in 3D
9. Learn chemistry concepts progressively
10. Practice chemistry through quizzes

Every major feature should have its **own dedicated page**.

Avoid putting all functionality into one dashboard.

---

# 5. Design Philosophy

The interface should prioritize:

```text
Clarity
   ↓
Exploration
   ↓
Understanding
   ↓
Depth
```

Instead of:

```text
Information density
   ↓
Technical complexity
   ↓
Visual decoration
```

The product should be:

- Educational
- Interactive
- Clean
- Mature
- Approachable
- Scientific
- Visual
- Curious
- Easy to understand
- Calm
- Intelligent
- Academic

---

# 6. Visual Identity

## Primary Visual Direction

The visual identity should be inspired by a:

> **Premium paper chemistry notebook**

The experience should feel like a contemporary scientific notebook rather than an old parchment document.

## Visual References

Think:

- Modern textbook
- Laboratory notebook
- Scientific sketchbook
- Premium academic publication

## Background

Use a:

- Warm off-white paper background
- Subtle paper texture
- Very light grain/noise
- Slight tonal variation
- Soft paper-like shadows

Example base colors:

```text
Paper:
#F7F4EC

Secondary paper:
#EFEBDD

Ink:
#242421

Muted ink:
#6F6B60
```

These are starting tokens, not rigid requirements.

## Accent Colors

Use restrained scientific accent colors:

- Blue
- Green
- Yellow
- Violet
- Red

Accent colors should communicate meaning rather than simply decorate the interface.

Possible semantic usage:

```text
Alkali metals       → subtle red
Noble gases         → subtle violet
Halogens            → subtle yellow
Transition metals   → subtle blue
```

Do not turn the interface into a rainbow.

---

# 7. Visual Restrictions

## Avoid

- Cartoon characters
- Anime characters
- Mascots
- Childish illustrations
- Excessive stickers
- Excessive doodles
- Neon colors
- Cyberpunk aesthetics
- Gaming-dashboard aesthetics
- Excessive glassmorphism
- Overly complex interfaces
- Overly futuristic science dashboards
- Corporate SaaS dashboard appearance
- Excessive decorative UI

## Important

The product must **not look like a children's learning app**.

However:

> An 8th-class student must still be able to use it comfortably.

---

# 8. Paper Effect

The paper aesthetic must remain subtle and premium.

Do **not** simply overlay a large paper-texture image across the entire website.

Preferred approach:

```text
Base paper color
      +
Subtle noise
      +
Tiny tonal variation
      +
Soft shadows
      +
Occasional paper-edge treatment
```

The user should feel the paper quality rather than immediately notice a texture effect.

---

# 9. Typography

Use two complementary typography categories.

## Primary Typeface

Modern, highly readable sans-serif.

Use for:

- Navigation
- Body copy
- UI
- Data
- Buttons
- Controls
- Forms

## Secondary Typeface

Restrained editorial serif.

Use for:

- Large page titles
- Educational statements
- Selected section headings

Overall direction:

```text
Modern Sans
+
Editorial Serif
```

The typography should feel contemporary and academic rather than old-fashioned.

---

# 10. Information Architecture

Recommended primary navigation:

```text
CHEMISTRY
│
├── Home
│
├── Explore
│   ├── Periodic Table
│   ├── Discover Elements
│   └── Molecule Library
│
├── Molecule Lab
│
├── Learn
│   ├── Atomic Structure
│   ├── Periodic Table
│   ├── Chemical Bonding
│   ├── States of Matter
│   ├── Chemical Reactions
│   ├── Acids, Bases & Salts
│   ├── Organic Chemistry
│   └── Inorganic Chemistry
│
└── Practice
    └── Quizzes
```

---

# 11. Route Architecture

Suggested routes:

```text
/
├── /elements
├── /elements/[symbol]
│
├── /molecules
├── /molecules/[slug]
│
├── /molecule-lab
│
├── /discover
│
├── /learn
├── /learn/[topic]
│
├── /practice
└── /practice/[topic]
```

Examples:

```text
/elements
/elements/O
/elements/C
/elements/Na

/molecules
/molecules/water
/molecules/glucose

/learn/atomic-structure
/learn/chemical-bonding

/practice/periodic-table
```

---

# 12. HOME PAGE

## Objective

The homepage should immediately communicate:

> **“I can explore chemistry here.”**

It should introduce the chemistry world without overwhelming the learner.

## Main Message

### Headline

**Explore the World of Chemistry**

### Supporting Message

> Discover elements, build molecules, explore real-world examples, and understand how chemistry shapes our world.

## Primary Entry Points

Provide simple access to:

- Periodic Table
- Molecule Playground / Molecule Lab
- Molecule Library
- Learn Chemistry

## Suggested Hero Structure

```text
┌──────────────────────────────────────────────────┐
│ CHEMISTRY                              Explore ↓ │
│                                                  │
│              Explore the                         │
│              World of Chemistry                  │
│                                                  │
│   Discover elements, build molecules,            │
│   and understand the chemistry around you.       │
│                                                  │
│       [ Explore Chemistry ]                      │
│                                                  │
│              subtle scientific visual            │
└──────────────────────────────────────────────────┘
```

The hero should not become an over-engineered 3D spectacle.

## Quick Exploration

Use four clear entry points:

```text
┌──────────────┐ ┌──────────────┐
│ Periodic     │ │ Molecule     │
│ Table        │ │ Lab          │
└──────────────┘ └──────────────┘

┌──────────────┐ ┌──────────────┐
│ Molecule     │ │ Learn        │
│ Library      │ │ Chemistry    │
└──────────────┘ └──────────────┘
```

## Element of the Day

Include a featured element with:

- Element name
- Symbol
- Atomic number
- Short explanation
- One or two interesting facts
- Link to full element page

## Chemistry Around You

Possible examples:

- Water
- Glass
- Salt
- Air
- Medicine
- Food
- Batteries

Purpose:

> Reinforce that chemistry is present in everyday life.

---

# 13. PERIODIC TABLE

## Objective

Create a dedicated interactive periodic-table page containing all **118 elements**.

The periodic table must remain visually recognizable as a real periodic table.

## User Capabilities

Students should be able to:

- Search by element name
- Search by symbol
- Search by atomic number
- Click an element
- Filter elements by category
- Explore groups
- Explore periods
- Switch between simple and detailed views

## Important UX Rule

Do not place excessive scientific data directly inside the table.

The table should primarily act as a:

> **Visual navigation system**

Clicking an element should navigate to its dedicated Element Details page.

## Tile

A tile can contain:

```text
8
O
Oxygen
```

Avoid making each tile a mini data sheet.

## Hover Information

Example:

```text
Oxygen

Atomic number: 8
State: Gas
Category: Non-metal
```

## Filters

Suggested control:

```text
Search elements...

[All]
[Metals]
[Nonmetals]
[Noble gases]
[Halogens]
```

View switch:

```text
Simple view ○
Detailed view ●
```

The **Simple View should be the default**.

---

# 14. ELEMENT DETAILS

## Objective

Provide a dedicated page for every element.

The page should explain the element progressively.

## Example

### Oxygen — O

Simple introduction:

> Oxygen is a gas that we need to breathe.

Then progressively reveal deeper information.

## Information Sections

- What is it?
- Where is it found?
- What is it used for?
- Why is it important?
- Fun facts
- Molecules containing this element
- Real-world examples

## Basic Scientific Data

Display:

- Atomic number
- Atomic mass
- State at room temperature
- Melting point
- Boiling point
- Electron configuration
- Density

## Advanced Details

Hide deeper information behind:

**Show Advanced Scientific Details**

Possible advanced content:

- Electron configuration
- Orbital information
- Oxidation states
- Electronegativity
- Other relevant scientific properties

## Suggested Structure

```text
← Periodic Table

Oxygen
O
Atomic Number 08

"Oxygen is a reactive gas that supports
life and combustion."

────────────────────────────

AT A GLANCE

Atomic mass
15.999

State
Gas

Melting point
−218.79°C

Boiling point
−182.96°C

────────────────────────────

WHERE IS OXYGEN FOUND?

[ Earth ] [ Air ] [ Water ]

────────────────────────────

WHY DOES IT MATTER?

...

────────────────────────────

MOLECULES CONTAINING OXYGEN

H₂O    CO₂    O₂

────────────────────────────

REAL-WORLD USES

...

────────────────────────────

INTERESTING FACTS

...

────────────────────────────

[ Show Advanced Scientific Details ]
```

## Core Design Principle

A beginner should be able to stop after the first sections.

An advanced learner should be able to continue deeper.

---

# 15. MOLECULE PLAYGROUND / MOLECULE LAB

## Objective

Create a dedicated interactive molecule-building environment.

The experience should feel like:

> **A digital chemistry notebook / lightweight laboratory**

Students can:

- Select atoms
- Place atoms
- Connect atoms
- Remove atoms
- Move atoms
- Rotate molecules
- Zoom
- View molecules in 3D

## Beginner-Friendly Feedback

After creating a molecule, show:

- Molecular formula
- Name
- Number of atoms
- Number of bonds
- Molecular mass
- Basic structure information

Also show a simple explanation.

Example:

> Water is made from two hydrogen atoms and one oxygen atom.

## 3D Architecture

The molecule system should use actual molecular data rather than fake decorative 3D objects.

Conceptual pipeline:

```text
Molecule Definition
        ↓
Atom Graph
        ↓
Bond Graph
        ↓
3D Representation
        ↓
React Three Fiber
        ↓
Interaction Layer
```

Example data model:

```ts
{
  name: "Water",
  formula: "H2O",
  atoms: [
    { element: "O", position: [0, 0, 0] },
    { element: "H", position: [0.76, 0.58, 0] },
    { element: "H", position: [-0.76, 0.58, 0] }
  ],
  bonds: [
    { from: 0, to: 1, type: "single" },
    { from: 0, to: 2, type: "single" }
  ]
}
```

## Rendering Model

```text
Atoms
  ↓
Spheres

Bonds
  ↓
Cylinders

Molecule
  ↓
Scene graph

User
  ↓
Rotate / Zoom / Inspect
```

## MVP Construction Strategy

Do **not** immediately attempt a complete professional chemical editor.

Initial version:

```text
Choose atom
    ↓
Place atom
    ↓
Connect compatible atoms
    ↓
Validate
    ↓
Generate molecule
```

Later versions can add:

- Valence
- Bond order
- Geometry
- Formal charge
- Molecular structure
- Chemical validity

This prevents scope explosion.

---

# 16. MOLECULE LIBRARY

## Objective

Create a dedicated library containing common and scientifically important molecules.

## Initial Molecules

- Water — H₂O
- Carbon Dioxide — CO₂
- Methane — CH₄
- Ammonia — NH₃
- Glucose — C₆H₁₂O₆
- Sodium Chloride — NaCl
- Benzene — C₆H₆
- Ethanol — C₂H₅OH

## Categories

- Everyday
- Organic
- Biological
- Industrial
- Inorganic

## Molecule Card

Each molecule should provide:

- 3D representation
- Formula
- Name
- Short explanation
- Real-world uses
- Basic properties
- Explore Molecule action

## UX Objective

The experience should communicate:

> **Molecules are present in the things around us.**

## Suggested Layout

```text
MOLECULE LIBRARY

Explore molecules found in
nature, food, medicine and industry.

Search molecules...

[ Everyday ]
[ Organic ]
[ Biological ]
[ Industrial ]
[ Inorganic ]

────────────────────────────

H₂O
Water

      [3D molecule]

A molecule essential to life.

[ Explore ]
```

---

# 17. MOLECULE DETAILS

Suggested route:

```text
/molecules/[slug]
```

A molecule details page should contain:

- Molecule name
- Molecular formula
- 3D representation
- Short explanation
- Molecular mass
- Basic structure information
- Uses
- Real-world examples
- Related elements
- Related molecules

Example:

```text
Water
H₂O

[ Interactive 3D View ]

A molecule essential to life.

Molecular mass
18.015

Atoms
3

Bonds
2

Real-world uses
...

Related elements
Hydrogen
Oxygen
```

---

# 18. DISCOVER ELEMENTS

## Objective

This page should make students curious about elements.

It should answer:

> **“Why should I care about this element?”**

## Discovery Categories

- Most commonly used elements
- Elements found in everyday objects
- Elements important to life
- Rare elements
- Recently discovered elements
- Interesting elements
- Elements used in technology
- Elements used in medicine
- Elements found naturally on Earth

## Example Collections

### Elements in Your Phone

- Silicon
- Lithium
- Copper
- Gold
- Cobalt
- Indium

### Elements in the Human Body

- Oxygen
- Carbon
- Hydrogen
- Nitrogen
- Calcium
- Phosphorus

### Elements Around Your Home

- Iron
- Aluminium
- Copper
- Carbon
- Silicon

## Discovery Card

Each card should provide:

1. Element
2. Why it matters
3. Short explanation
4. Link to deeper information

The user should naturally think:

> **“I want to know more about this element.”**

---

# 19. LEARN CHEMISTRY

## Objective

Create a dedicated learning section.

## Initial Topics

- Atomic Structure
- Periodic Table
- Chemical Bonding
- States of Matter
- Chemical Reactions
- Acids, Bases and Salts
- Organic Chemistry
- Inorganic Chemistry
- Molecules and Compounds
- Important Chemistry Concepts

## Learning Structure

Every topic should follow:

```text
Simple explanation
        ↓
Visual explanation
        ↓
Example
        ↓
Scientific details
        ↓
Practice
```

Avoid textbook-style walls of text.

Use:

- Diagrams
- Small examples
- Formulas
- Interactive explanations
- Short sections
- Visual relationships

---

# 20. Example Learning Page

Example: Atomic Structure

```text
ATOMIC STRUCTURE

What is an atom?

[Simple explanation]

       Proton
          +
      ┌───────┐
      │       │
 e⁻ → │ Nucleus │ ← e⁻
      │       │
      └───────┘
          +
       Neutron

[ Explore the atom ]

──────────────────

Try this

What happens when the
number of protons changes?

[A] The element changes
[B] The atom disappears
[C] Nothing changes
```

Then provide:

```text
Scientific explanation
        ↓
Example
        ↓
Interactive element
        ↓
Practice
```

---

# 21. QUIZ / PRACTICE

## Objective

Provide a dedicated chemistry practice experience.

## Topics

- Periodic Table
- Elements
- Atomic Structure
- Molecules
- Chemical Bonding
- Chemical Reactions

## Difficulty

Use:

```text
Beginner
Intermediate
Advanced
```

Avoid unnecessarily complicated gamification.

## Question UI

```text
CHEMISTRY PRACTICE

Periodic Table
Question 4 of 10

Which element has
atomic number 8?

○ Carbon
○ Oxygen
○ Nitrogen
○ Fluorine

                    [ Check ]
```

## Feedback

After answering:

```text
✓ Correct

Oxygen has atomic number 8.

Why?

Atomic number = number of protons.

                    [ Next ]
```

The explanation is important. Do not merely display right/wrong.

---

# 22. 3D STRATEGY

3D should be purposeful.

## 3D Usage by Page

| Page | 3D Intensity |
|---|---|
| Home | Subtle |
| Periodic Table | None |
| Element Details | Optional |
| Molecule Playground | Heavy |
| Molecule Library | Yes |
| Molecule Details | Yes |
| Discover Elements | Optional |
| Learn | Selective |
| Quiz | None |

## Core Rule

> **Do not let 3D become the product.**

The education is the product.

3D, animation, paper aesthetics, and interaction are mechanisms that make education easier to understand and more memorable.

---

# 23. 3D Engineering Principles

Treat the 3D experience as a real rendering system.

Consider:

## Scene

- Scene graph
- Camera
- Renderer
- Lights
- Environment
- Objects
- Materials

## Camera

Use based on requirements:

- Perspective camera
- Orthographic camera
- Fixed camera
- Scroll-controlled camera
- Orbit controls
- Cinematic camera

For molecule exploration, an orbit-style camera is likely appropriate.

## Lighting

Use only what is necessary:

- Ambient lighting
- Directional lights
- Point lights
- Spot lights
- HDR environment where useful

Avoid excessive dynamic lights.

---

# 24. 3D Asset Optimization

Optimize all assets before shipping.

Consider:

- Polygon count
- Draw calls
- Texture resolution
- Texture compression
- Mesh compression
- Draco
- KTX2/Basis
- LOD
- Instancing
- Frustum culling
- Lazy loading

Preferred formats/approaches:

```text
GLB / GLTF
Compressed textures
Optimized geometry
Reusable materials
Instanced objects
```

Never ship unnecessarily large assets.

---

# 25. Molecule 3D Loading Strategy

The molecule system is one of the largest performance risks.

Do not load hundreds of 3D models immediately.

Use:

```text
Molecule Library
        ↓
Lightweight cards
        ↓
User selects molecule
        ↓
Load 3D asset
        ↓
Cache asset
        ↓
Render
```

For common molecules, later optimization may include:

- GLB
- Draco
- KTX2
- Compressed textures
- Procedurally generated molecular geometry

---

# 26. DOM vs WebGL

Use DOM for:

- Navigation
- Forms
- Text-heavy content
- Accessibility-sensitive controls
- Buttons
- Search
- Tables
- Educational explanations

Use WebGL for:

- 3D molecules
- Interactive molecular environments
- Particles when educationally useful
- Visual simulations
- Spatial interactions

Use both together where appropriate.

---

# 27. Responsive Design

The platform must work naturally on:

- Desktop
- Laptop
- Tablet
- Mobile
- Small mobile screens

Do not simply shrink desktop layouts.

---

# 28. Responsive 3D

## Desktop

Use:

- Full 3D scene
- More visual effects
- Larger workspace
- Cinematic presentation where useful

## Tablet

Use:

- Reduced geometry
- Reduced post-processing
- Simplified controls

## Mobile

Use:

- Simplified scene
- Optimized camera
- Fewer objects
- Reduced post-processing
- Touch-first controls

If necessary, replace a complex WebGL scene with:

- Static render
- Video
- CSS animation
- Lightweight canvas

This is valid engineering.

---

# 29. Molecule Lab Responsive Design

## Desktop

```text
┌─────────────┬────────────────────────┐
│ Atom tools  │                        │
│             │       3D Canvas        │
│ H           │                        │
│ O           │                        │
│ C           │                        │
│ N           │                        │
└─────────────┴────────────────────────┘
                  ↓
             Molecule info
```

## Mobile

```text
Molecule Lab

┌──────────────────────────┐
│                          │
│       3D molecule        │
│                          │
└──────────────────────────┘

[ H ] [ C ] [ O ] [ N ]

Formula: H₂O
Mass: 18.015

[ Rotate ] [ Reset ]
```

Touch should become the primary interaction model.

---

# 30. Accessibility

3D does not excuse poor accessibility.

Provide:

- Semantic HTML
- Keyboard navigation
- Screen-reader-friendly content
- Proper focus states
- Accessible controls
- Reduced-motion support
- Alternative content for important 3D information

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Users must still understand and use the platform without relying entirely on animation.

---

# 31. Motion Design

Motion should support understanding.

Possible motion:

- Page transitions
- Element reveals
- Hover states
- Molecular rotation
- Smooth camera movement
- Scroll-linked educational transitions
- Loading transitions
- Subtle paper-layer movement

Avoid:

- Constant movement
- Excessive parallax
- Decorative animation everywhere
- Heavy effects that reduce readability

Every effect should have a UX or educational purpose.

---

# 32. Scroll-Based Experiences

For cinematic sections, use:

```text
Scroll position
      ↓
Timeline
      ↓
Camera movement
      ↓
Object animation
      ↓
DOM transitions
```

Synchronize:

- Camera
- 3D objects
- Text
- Images
- Background
- Progress indicators

Avoid expensive calculations directly inside every scroll event.

Use optimized animation loops and appropriate observers.

---

# 33. Recommended Technology Stack

## Frontend

Recommended baseline:

- Next.js
- React
- TypeScript
- Tailwind CSS

## 3D

- Three.js
- React Three Fiber
- Drei
- GLTF / GLB

## Animation

- Motion / Framer Motion
- GSAP where timeline-based animation is genuinely useful
- React Spring where appropriate

## State

- Zustand where application state requires it

Separate:

### UI State

Menus, modals, tabs, animations.

### Application State

User preferences, saved items, authentication.

### Server State

API data, caching, synchronization.

### 3D State

Camera, object selection, scene interaction, animation state.

Do not put everything into one global store.

---

# 34. Backend Architecture

When backend functionality becomes necessary:

```text
Frontend
    ↓
API Layer
    ↓
Business Logic
    ↓
Database
    ↓
External Services
```

Potential stack:

## Backend

- Next.js Route Handlers
- Node.js
- Express if a separate backend becomes necessary

## Database

- PostgreSQL
- Prisma

MongoDB may be considered if document-oriented chemistry data or project requirements make it preferable, but PostgreSQL is a strong default for structured relationships.

## Authentication

Only add authentication when the product actually needs accounts.

Potential approaches:

- OAuth
- Session-based authentication
- Secure authentication provider

## Deployment

Potential infrastructure:

- Vercel
- Cloudflare
- Render
- Railway
- AWS

Choose based on actual requirements rather than preference.

---

# 35. API Engineering

If APIs are introduced, consider:

- REST vs GraphQL
- Request validation
- Authentication
- Authorization
- Pagination
- Filtering
- Sorting
- Rate limiting
- Caching
- Error handling
- Retry strategies
- API versioning
- Logging

Never put secrets inside frontend code.

Use environment variables.

---

# 36. Database Design

Design the database around domain entities and access patterns rather than UI components.

Important entities:

```text
Element
Molecule
Topic
Quiz
Question
Category
```

## Element

Conceptual structure:

```text
Element
├── identity
├── physical properties
├── chemical properties
├── discovery
├── uses
├── facts
└── relationships
```

## Molecule

```text
Molecule
├── identity
├── formula
├── atoms
├── bonds
├── geometry
├── properties
├── uses
└── related elements
```

## Topic

```text
Topic
├── explanation
├── examples
├── diagrams
├── interactive content
└── questions
```

Consider:

- Entities
- Relationships
- Constraints
- Indexes
- Query patterns
- Data lifecycle
- Pagination

---

# 37. Content Architecture

The content system should support different depths.

Example:

```text
Element
│
├── Beginner Summary
├── Basic Facts
├── Visual Explanation
├── Real-world Uses
├── Interesting Facts
└── Advanced Scientific Details
```

Likewise:

```text
Topic
│
├── Simple Explanation
├── Visual
├── Example
├── Scientific Explanation
└── Practice
```

This allows the same content model to serve multiple education levels.

---

# 38. State Management Principles

Separate state by responsibility.

## UI State

Examples:

- Navigation open/closed
- Modal visibility
- Active tab
- Selected filter
- Animation state

## Application State

Examples:

- Preferences
- Saved molecules
- Quiz progress
- Authentication

## Server State

Examples:

- Elements
- Molecules
- Topics
- Quiz data
- Search results

## 3D State

Examples:

- Selected atom
- Camera position
- Molecule rotation
- Object selection
- Scene mode

Do not create one massive global state store.

---

# 39. Code Quality

Use production-grade TypeScript.

Prioritize:

- Strong typing
- Reusable components
- Clear interfaces
- Small cohesive modules
- Predictable state
- Error boundaries
- Loading states
- Error states
- Clean abstractions

Avoid:

- Giant components
- Duplicate logic
- Magic numbers everywhere
- Unnecessary abstractions
- Global variables
- Random z-index values
- Excessive `useEffect`
- Uncontrolled animation loops
- Memory leaks
- Unnecessary re-renders

---

# 40. Suggested Project Structure

```text
chemistry-platform/
│
├── app/
│   ├── page.tsx
│   │
│   ├── elements/
│   │   ├── page.tsx
│   │   └── [symbol]/
│   │       └── page.tsx
│   │
│   ├── molecules/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── molecule-lab/
│   │   └── page.tsx
│   │
│   ├── discover/
│   │   └── page.tsx
│   │
│   ├── learn/
│   │   ├── page.tsx
│   │   └── [topic]/
│   │       └── page.tsx
│   │
│   └── practice/
│       ├── page.tsx
│       └── [topic]/
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
├── lib/
│   ├── chemistry/
│   ├── validation/
│   └── utilities/
│
├── hooks/
├── stores/
├── types/
└── styles/
```

Do not create folders simply to make the repository look professional. Adapt structure to actual complexity.

---

# 41. Performance Requirements

A beautiful website running at 20 FPS on an average laptop is not considered successful.

Monitor:

- FPS
- Frame time
- Memory usage
- GPU workload
- CPU workload
- Draw calls
- Triangle count
- Texture memory
- JavaScript bundle size
- Initial page load
- Largest Contentful Paint
- Interaction latency

## Device Strategy

```text
High-end device
→ Full 3D experience

Mid-range device
→ Reduced effects

Low-end device
→ Simplified scene

Mobile
→ Optimized/mobile-specific experience
```

Do not assume every user has a powerful GPU.

---

# 42. Loading Experience

3D assets can be heavy.

Use:

- Asset preloading
- Progressive loading
- Skeleton UI
- Loading indicators
- Suspense
- Lazy loading
- Progressive model loading
- Caching where appropriate

The user should understand what is happening.

Never leave the screen apparently frozen while a large model loads.

---

# 43. Error Handling

Important system states:

```text
Loading
Success
Empty
Error
Offline
Unauthorized
Not Found
Retry
```

3D-specific states:

```text
WebGL unavailable
Asset failed
Texture failed
Model failed
GPU limitations
Mobile limitations
```

Always provide graceful fallbacks.

---

# 44. Security

If backend functionality is introduced, consider:

- Authentication
- Authorization
- Input validation
- XSS prevention
- CSRF protection
- CORS configuration
- Rate limiting
- Secure cookies
- Password hashing
- API protection
- File-upload validation
- Environment secrets

Never expose:

- API secrets
- Database credentials
- Private keys
- Authentication secrets

---

# 45. Scope Control — What NOT to Build Initially

Do not begin with:

- User accounts
- Social profiles
- Leaderboards
- Complex achievements
- AI chemistry tutor
- Multiplayer molecule building
- Real-time collaboration
- Full chemical reaction simulator
- Arbitrary professional molecular editor
- Advanced molecular physics
- Hundreds of interactive 3D assets

These can become future features.

They should not delay the core product.

---

# 46. Recommended MVP

The first production-minded MVP should include:

```text
HOME
  ↓
PERIODIC TABLE
  ↓
ELEMENT DETAILS

MOLECULE LIBRARY
  ↓
MOLECULE DETAILS
  ↓
3D VIEWER

MOLECULE PLAYGROUND
  ↓
Basic molecule construction

LEARN
  ↓
Core chemistry topics

PRACTICE
  ↓
Topic-based quizzes
```

This is already a substantial product.

---

# 47. Suggested Development Phases

## Phase 1 — Product Foundation

Build:

- Project setup
- Design tokens
- Global typography
- Paper visual system
- Navigation
- Responsive layout foundation

## Phase 2 — Element System

Build:

- Element data model
- 118-element dataset
- Periodic table
- Search
- Filters
- Element details
- Progressive disclosure

## Phase 3 — Molecule System

Build:

- Molecule data model
- Molecule library
- Molecule details
- 3D viewer
- Basic molecule rendering

## Phase 4 — Molecule Lab

Build:

- Atom selection
- Atom placement
- Bond creation
- Basic validation
- Formula generation
- Molecular mass
- 3D manipulation

## Phase 5 — Learning

Build:

- Topic model
- Topic pages
- Visual explanations
- Examples
- Practice integration

## Phase 6 — Quiz

Build:

- Question model
- Difficulty levels
- Quiz engine
- Answer validation
- Explanations
- Progress

## Phase 7 — Discover

Build:

- Discovery collections
- Everyday chemistry
- Technology elements
- Life-related elements
- Medicine-related elements

## Phase 8 — Performance

Audit:

- WebGL performance
- Asset size
- Rendering
- Bundle size
- Loading
- Mobile performance

## Phase 9 — Accessibility

Audit:

- Keyboard
- Focus
- Screen readers
- Semantic structure
- Reduced motion
- Accessible 3D alternatives

## Phase 10 — Production QA

Test:

- Desktop
- Laptop
- Tablet
- Mobile
- Small mobile
- Slow network
- Low-end hardware
- WebGL failure
- Empty states
- Error states
- Navigation
- Search
- Forms
- Quiz behavior

---

# 48. Reverse Engineering / Reference Cloning Rules

If a reference website is later provided, do not immediately start coding.

First analyze:

## Product

1. Purpose
2. Target users
3. Primary user journey
4. Core functionality
5. User goals
6. Content hierarchy

## UI

1. Layout
2. Grid
3. Typography
4. Color system
5. Spacing
6. Components
7. Navigation
8. Cards
9. Forms
10. Modals
11. Tables
12. Responsive behavior

## Motion

Analyze:

- Page transitions
- Scroll animations
- Hover effects
- Parallax
- Cursor interactions
- Element reveals
- Loading animations
- 3D transitions
- Camera movement

## 3D

Determine:

- What is actually 3D
- What is simulated using CSS
- WebGL usage
- Canvas placement
- Camera type
- Lighting
- Materials
- Models
- Textures
- Environment maps
- Post-processing
- Particle systems
- Physics
- Interaction model

Never turn a simple CSS effect into WebGL without a reason.

---

# 49. Reference-Site Fidelity

When recreating a reference website, evaluate:

## Structure

- Sections
- Layout
- Navigation

## Visual

- Typography
- Colors
- Spacing
- Assets
- Proportions

## Motion

- Timing
- Easing
- Transitions
- Scroll behavior

## 3D

- Camera
- Lighting
- Materials
- Geometry
- Environment
- Effects

## Responsive

- Desktop
- Tablet
- Mobile

Do not claim high fidelity without checking these areas.

---

# 50. Development Workflow

The default implementation workflow is:

## PHASE 1 — DISCOVERY

Understand the product.

## PHASE 2 — REVERSE ENGINEERING

Analyze reference material where applicable.

## PHASE 3 — TECHNICAL ARCHITECTURE

Choose stack and architecture.

## PHASE 4 — DESIGN SYSTEM

Extract tokens and components.

## PHASE 5 — 3D PROTOTYPE

Build core 3D scenes separately.

Validate:

- FPS
- Camera
- Lighting
- Assets
- Interaction

## PHASE 6 — UI

Build DOM/UI layers.

## PHASE 7 — FULL-STACK

Connect APIs, database and authentication only where required.

## PHASE 8 — INTEGRATION

Connect UI + 3D + backend.

## PHASE 9 — RESPONSIVE

Optimize every viewport.

## PHASE 10 — PERFORMANCE

Profile and optimize.

## PHASE 11 — QA

Test functionality, visuals, accessibility and responsiveness.

## PHASE 12 — DEPLOYMENT

Prepare production configuration and deployment.

---

# 51. Technical Decision Rule

Never add technology merely because it is impressive.

For every technology or visual effect, ask:

```text
Does it improve the educational experience?
        ↓
Does it improve usability?
        ↓
Can the device handle it?
        ↓
Can the team maintain it?
        ↓
Does the complexity justify the benefit?
```

If the answer is no, simplify.

---

# 52. Handling Technically Bad Ideas

When an implementation decision is technically weak, use this format:

> **Problem → Why it is a problem → Consequence → Better solution**

Example:

> Using a high-poly 3D model directly in the browser will increase GPU workload and loading time. For this scene, optimize the model, compress textures and use LOD instead.

Do not blindly implement poor architecture.

---

# 53. Product Quality Principles

The platform should balance:

```text
Visual Impact
      ×
User Experience
      ×
Technical Quality
      ×
Performance
      ×
Maintainability
```

No single factor should dominate.

---

# 54. Final Product Experience

The final product should feel like:

> **“A modern interactive chemistry textbook that students actually want to explore.”**

It should feel:

- Calm
- Intelligent
- Scientific
- Approachable
- Curious
- Interactive
- Academic
- Mature
- Visual
- Easy to understand

---

# 55. Core Product Statement

> **A calm, interactive digital chemistry textbook where students can discover elements, understand molecules, experiment in 3D, learn concepts progressively, and test what they've learned.**

---

# 56. Final Design Principle

## Scientific Notebook, Not Notebook Simulator

The platform should use:

**Paper**
→ Subtle

**Sketches**
→ Occasional

**Scientific annotations**
→ Functional

**3D**
→ Purposeful

**Motion**
→ Informative

**Typography**
→ Editorial + readable

**Color**
→ Semantic

**Whitespace**
→ Generous

**Content**
→ Progressive

**Interaction**
→ Discoverable

---

# 57. Final Quality Gate

Before considering the platform complete, audit every area.

## UI

- [ ] Layout accurate
- [ ] Typography consistent
- [ ] Spacing consistent
- [ ] Components reusable
- [ ] Paper aesthetic subtle
- [ ] Navigation consistent
- [ ] Visual hierarchy clear

## Educational UX

- [ ] Beginner-friendly
- [ ] Advanced information available
- [ ] Progressive disclosure implemented
- [ ] Complex concepts explained simply
- [ ] Examples included
- [ ] Visual explanations included
- [ ] Practice integrated

## Periodic Table

- [ ] All 118 elements available
- [ ] Search works
- [ ] Symbol search works
- [ ] Atomic-number search works
- [ ] Category filters work
- [ ] Groups/periods understandable
- [ ] Element navigation works
- [ ] Simple view works
- [ ] Detailed view works

## Elements

- [ ] Element pages available
- [ ] Basic properties available
- [ ] Real-world uses available
- [ ] Facts available
- [ ] Related molecules available
- [ ] Advanced details expandable

## Molecules

- [ ] Molecule library works
- [ ] Categories work
- [ ] Search works
- [ ] Molecule details work
- [ ] 3D rendering works
- [ ] Molecular data is accurate
- [ ] Related elements work

## Molecule Lab

- [ ] Atom selection
- [ ] Atom placement
- [ ] Bond creation
- [ ] Atom removal
- [ ] Molecule manipulation
- [ ] Zoom
- [ ] Rotation
- [ ] Formula generation
- [ ] Molecular mass
- [ ] Basic validation
- [ ] Error handling
- [ ] Mobile controls

## Learning

- [ ] Topic pages work
- [ ] Simple explanations
- [ ] Visual explanations
- [ ] Examples
- [ ] Scientific details
- [ ] Practice integration

## Quiz

- [ ] Beginner
- [ ] Intermediate
- [ ] Advanced
- [ ] Topic filtering
- [ ] Answer validation
- [ ] Explanations
- [ ] Progress tracking

## 3D

- [ ] Scene optimized
- [ ] Camera correct
- [ ] Lighting correct
- [ ] Materials correct
- [ ] Assets optimized
- [ ] Interaction smooth
- [ ] Low-end fallback
- [ ] Mobile optimization
- [ ] WebGL fallback

## Performance

- [ ] Fast initial load
- [ ] Good FPS
- [ ] Optimized assets
- [ ] No unnecessary requests
- [ ] No memory leaks
- [ ] Lazy loading
- [ ] Bundle reviewed
- [ ] WebGL profiling completed

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
- [ ] Screen-reader support
- [ ] Reduced motion
- [ ] Accessible controls
- [ ] Alternative content for important 3D information

## Backend

- [ ] API architecture clean
- [ ] Database optimized
- [ ] Validation implemented
- [ ] Authentication secure if required
- [ ] Authorization secure if required
- [ ] Rate limiting where necessary
- [ ] Error handling
- [ ] Logging
- [ ] Caching where useful

## Security

- [ ] Environment variables
- [ ] No exposed secrets
- [ ] Input validation
- [ ] XSS protections
- [ ] CSRF protections where applicable
- [ ] CORS configured
- [ ] Secure authentication
- [ ] Upload validation where applicable

## Production

- [ ] Environment configuration
- [ ] Deployment configuration
- [ ] Error monitoring
- [ ] Performance review
- [ ] Accessibility review
- [ ] Responsive review
- [ ] Final QA
- [ ] Production-ready fallback behavior

---

# 58. Final Operating Principle

This project should not be treated as:

> “A website with some chemistry pages.”

It should be engineered as:

> **A complete interactive educational product.**

Think simultaneously as:

- Principal Software Architect
- Senior Full-Stack Engineer
- 3D/WebGL Engineer
- Creative Technologist
- UI/UX Engineer
- Performance Engineer
- Technical Product Designer
- Educational UX designer

Every decision must balance:

**Visual Impact × User Experience × Technical Quality × Performance × Maintainability**

The final product should look impressive enough for a professional portfolio while being engineered well enough to survive a serious code review.

---

# 59. One-Sentence Product Definition

> **The Chemistry Exploration Platform is a mature, paper-inspired, interactive digital chemistry textbook that lets students discover elements, explore molecules in 3D, learn chemistry progressively, experiment safely, and practice their understanding — from approximately 8th class through college level.**
