# ChemVerse --- Molecule Playground Implementation Specification

## 1. Purpose

This document is the implementation specification for the **ChemVerse
Molecule Playground**.

It combines the existing Molecule Playground UX/feature specification
with the supplied UI reference image.

The target is a production-quality, responsive, interactive chemistry
workspace that feels like:

> **A modern interactive chemistry notebook where students can
> experiment and immediately understand what they are seeing.**

The strongest UX loop is:

**Choose Atom → Build → Get Feedback → See Molecule → Understand →
Experiment Again.**

The page must remain approachable to an 8th-class student while
supporting deeper chemistry information for advanced learners.

------------------------------------------------------------------------

# 2. Design Source of Truth

Use the following hierarchy:

1.  **Reference image** --- visual composition and visual fidelity.
2.  **Molecule Playground specification** --- UX, functionality, content
    hierarchy, and behavior.
3.  Existing ChemVerse `CONCEPT.md` / `UI.md` --- global product
    language and shared design system.

Do not turn the reference image into a static screenshot. Reconstruct it
using real HTML/CSS/React/SVG/WebGL components.

The implementation should closely reproduce the supplied image's:

-   Header
-   Page title area
-   Three-column workspace
-   Left atom/tool panel
-   Central molecule canvas
-   Right molecule information panel
-   Quick Molecules strip
-   Paper background
-   Grid canvas
-   Scientific sketches
-   Typography
-   Borders
-   Shadows
-   Spacing
-   Controls
-   Molecule visualization
-   Educational cards
-   Responsive behavior

------------------------------------------------------------------------

# 3. Core UX Philosophy

The student should be able to create a simple molecule within
approximately **10 seconds without reading a manual**.

The experience follows:

## BUILD

Select atoms and connect them.

## EXPLORE

Rotate, zoom, switch visualization modes, and inspect the molecule.

## UNDERSTAND

Automatically explain what was created.

Do not make this feel like professional molecular modeling software.

Do not make it feel like a children's cartoon game.

It should feel like a calm, interactive scientific notebook.

------------------------------------------------------------------------

# 4. Reference Layout

Desktop composition:

``` text
┌──────────────────────────────────────────────────────────────────────┐
│ ChemVerse   Home  Periodic Table  Elements  Molecules  Playground   │
│                                                Search   Theme Profile│
├──────────────────┬───────────────────────────────┬───────────────────┤
│                  │                               │                   │
│  1. Choose Atoms │                               │  Your Molecule    │
│                  │                               │                   │
│  Search element  │       MOLECULE CANVAS        │       H₂O          │
│                  │                               │                   │
│  H  C  O         │          3D MODEL            │    Properties      │
│  N  S  Cl        │                               │    Explanation     │
│  F  P  Na        │                               │    Uses            │
│  K  Ca  Fe       │                               │                   │
│                  │                               │                   │
│  2. Tools        │                               │                   │
│  Select Bond     │                               │                   │
│  Erase Rotate    │                               │                   │
│  Zoom Reset      │                               │                   │
│                  │                               │                   │
├──────────────────┴───────────────────────────────┴───────────────────┤
│                         QUICK MOLECULES                              │
│              H₂O   CO₂   CH₄   NH₃   C₂H₅OH                         │
└──────────────────────────────────────────────────────────────────────┘
```

The center canvas receives the most visual space.

------------------------------------------------------------------------

# 5. Visual Direction

The page must preserve the ChemVerse paper chemistry notebook aesthetic.

## Background

Use a warm off-white paper surface approximately:

``` text
#F7F3EA
```

Use extremely subtle:

-   paper grain
-   fibers
-   noise
-   paper variation

The texture must remain behind the content and must not reduce
readability.

## Panels

Use slightly lighter paper surfaces with:

-   thin warm-gray/ink borders
-   soft shadows
-   small corner radius
-   subtle tonal variation

Avoid:

-   heavy glassmorphism
-   neon
-   cyberpunk
-   dark futuristic dashboards
-   excessive gradients
-   excessive rounded UI
-   childish decoration

## Typography

Use:

-   editorial/textbook-inspired serif for major headings
-   clean sans-serif for UI/body
-   restrained handwritten style only for tiny scientific annotations

The page title should visually resemble the reference:

**Molecule Playground**

Subtitle:

> Build, edit and explore molecules in 3D. Drag atoms, connect them, and
> learn their properties in real-time.

------------------------------------------------------------------------

# 6. Global Header

Implement a reusable ChemVerse header.

Reference structure:

``` text
[ChemVerse Logo]

Home
Periodic Table
Elements
Molecules
Playground
Learn

[Search elements, molecules or topics...]

[Theme]
[Profile]
```

## Behavior

-   Playground is the active route.
-   Active state uses a subtle blue highlight/underline.
-   Search is visually integrated into the header.
-   Theme and profile controls remain compact.
-   Header stays consistent with other ChemVerse pages.

## Accessibility

-   Semantic navigation
-   Keyboard navigation
-   Visible focus
-   Accessible labels
-   Active route announced appropriately

------------------------------------------------------------------------

# 7. Page Header

Below the global navigation:

``` text
Molecule Playground

Build, edit and explore molecules in 3D.
Drag atoms, connect them, and learn their properties in real-time.
```

On the right side of this region, reproduce the reference's restrained
scientific visual:

-   molecular sketch
-   paper annotation
-   subtle arrow
-   "Explore / Build / Visualize / Learn" style note
-   "How to use?" action

These are decorative/educational elements and must not compete with the
actual molecule canvas.

------------------------------------------------------------------------

# 8. Main Workspace

Use a three-area desktop layout:

``` text
Left Panel
≈ 300–330px

Center Canvas
flexible / dominant

Right Panel
≈ 330–370px
```

The canvas must receive the largest visual area.

Use CSS Grid or an equivalent layout system.

Do not hardcode a layout that breaks at smaller desktop widths.

------------------------------------------------------------------------

# 9. LEFT PANEL --- CHOOSE ATOMS

Heading:

**1. Choose Atoms**

Supporting text:

> Drag atoms to the canvas

Search:

``` text
Search element...
```

## Category controls

``` text
Common
All Elements
Organic
```

The reference uses compact segmented controls.

The selected state should use the ChemVerse blue accent.

------------------------------------------------------------------------

# 10. Atom Palette

Initially expose common elements rather than all 118 elements.

Reference palette:

``` text
H   C   O
N   S   Cl
F   P   Na
K   Ca  Fe
```

Each atom tile contains:

-   symbol
-   full element name
-   chemistry-inspired color
-   accessible label

Example:

``` text
H
Hydrogen
```

## Suggested visual convention

Use restrained, recognizable chemistry colors:

-   H --- light neutral
-   C --- charcoal/gray
-   O --- red
-   N --- blue
-   S --- yellow
-   Cl --- green
-   F --- cyan/green
-   P --- orange
-   Na --- violet
-   K --- pink
-   Ca --- pale blue
-   Fe --- warm brown

Do not turn the entire interface into a rainbow.

The atom color should communicate element identity.

------------------------------------------------------------------------

# 11. Atom Interaction

Support:

### Desktop

-   click atom → select/place
-   drag atom → move/place into canvas
-   selected atom → visible focus state

### Mobile

-   tap atom → select
-   tap canvas → place
-   touch-friendly controls

Adding an atom should have a subtle:

``` text
opacity 0 → 1
scale 0.94 → 1
```

animation.

Do not use exaggerated bounce effects.

------------------------------------------------------------------------

# 12. Atom Discovery

Do not display all 118 elements in the default palette.

Use:

``` text
Common
All Elements
Organic
More
```

### Common

Show frequently used elements.

### All Elements

Open a searchable selector containing all 118 elements.

### Organic

Prioritize elements commonly encountered in organic chemistry.

This keeps the first interaction simple.

------------------------------------------------------------------------

# 13. LEFT PANEL --- TOOLS

Heading:

**2. Tools**

Supporting text:

> Use tools to edit your molecule

Reference controls:

``` text
Select
Bond
Erase

Rotate
Zoom
Reset
```

Controls should include:

-   icon
-   text label
-   active state
-   keyboard accessibility

Do not rely on unfamiliar icons without labels.

------------------------------------------------------------------------

# 14. Tool Semantics

## Select

Select an atom or bond.

## Bond

Connect two atoms.

## Erase

Remove selected atoms or bonds.

## Rotate

Enable/assist molecule rotation.

## Zoom

Enable/assist zoom interaction.

## Reset

Return the camera/view to its default state.

Important:

**Reset View** and **Clear Molecule** must remain separate actions.

------------------------------------------------------------------------

# 15. Bond Type

Include:

``` text
Bond Type

Single
Double
Triple
```

The selected bond type should be visually obvious.

Default:

**Single**

Bond creation must visually reflect the selected order.

------------------------------------------------------------------------

# 16. Undo / Redo

Implement:

``` text
Undo
Redo
```

This is a core usability feature.

Every meaningful molecule mutation should be undoable:

-   add atom
-   remove atom
-   move atom
-   add bond
-   remove bond
-   change bond order

Use a command/history model rather than trying to reconstruct history
from UI state.

------------------------------------------------------------------------

# 17. CENTER --- MOLECULE CANVAS

This is the most important area.

The canvas should feel like a chemistry notebook workspace.

Use:

-   very subtle square/grid lines
-   scientific sketches
-   faint molecular diagrams
-   faint annotations
-   paper texture
-   small measurement-like guides

All decorative graphics must remain low contrast.

The molecule must always dominate.

------------------------------------------------------------------------

# 18. Canvas Controls

Top toolbar:

``` text
3D View
2D View
```

Default:

**3D View**

Also provide visualization mode:

``` text
Ball & Stick
Space Filling
Wireframe
```

The reference initially shows Ball & Stick.

Additional compact controls:

-   fullscreen
-   reset/utility control where appropriate

Avoid exposing excessive technical rendering settings.

------------------------------------------------------------------------

# 19. 3D Molecule Viewer

Preferred implementation:

``` text
React
TypeScript
Three.js
React Three Fiber
Drei
```

Use the existing project stack when compatible.

Architecture:

``` text
Molecule Definition
        ↓
Atom Graph
        ↓
Bond Graph
        ↓
Molecular Geometry
        ↓
3D Renderer
        ↓
Interaction Layer
```

Represent:

``` text
Atoms → spheres
Bonds → cylinders
```

Materials should be clean and readable.

------------------------------------------------------------------------

# 20. Molecule Manipulation

Natural interaction:

### Mouse

``` text
Drag
→ rotate molecule

Scroll
→ zoom

Click atom
→ select atom

Click two atoms
→ connect

Double click atom
→ inspect

Delete
→ remove selected object
```

### Touch

``` text
One finger
→ rotate

Pinch
→ zoom

Tap
→ select

Tap two atoms
→ bond
```

Avoid interactions that require a manual.

------------------------------------------------------------------------

# 21. Camera

Use a perspective camera for the 3D experience unless the molecule
representation requires another approach.

Camera should:

-   frame the molecule automatically
-   smoothly transition after major changes
-   avoid clipping
-   maintain sensible zoom limits
-   support reset
-   preserve user control

Do not constantly auto-rotate the molecule.

User control should be primary.

------------------------------------------------------------------------

# 22. Automatic Molecule Framing

When a molecule changes:

-   calculate its bounding box
-   adjust camera framing if necessary
-   preserve a comfortable margin
-   animate the camera rather than snapping where practical

Do not unexpectedly throw the molecule off-screen.

------------------------------------------------------------------------

# 23. 2D View

2D mode should show a clean chemical structure representation.

For example:

``` text
H
 \
  O
 /
H
```

For more complex molecules, use a proper structural diagram.

Do not simply flatten the 3D canvas.

The 2D representation should communicate bonding and connectivity
clearly.

------------------------------------------------------------------------

# 24. Intelligent Bond Guidance

When a student selects two atoms, provide guidance.

Example:

``` text
H + H

Possible bond:
H—H
```

If a proposed structure is chemically unusual:

Do NOT simply display:

``` text
ERROR
```

Instead show:

> This combination may not form a stable molecule.

Then:

**Why?**

This should become an educational explanation.

------------------------------------------------------------------------

# 25. Chemical Validation Engine

Create a dedicated chemistry validation layer.

It should monitor:

-   valence
-   bond order
-   atom count
-   bond compatibility
-   molecular stability where supported
-   formula generation
-   recognized structures

Example:

``` text
H—H—H—H
```

should not silently be presented as a valid ordinary stable molecule.

Instead:

> This structure isn't normally stable.

Then:

**Learn why →**

Do not implement a fake validator that claims scientific certainty where
the rule engine cannot support it.

------------------------------------------------------------------------

# 26. Molecule Recognition

When a recognized structure is created, identify it in real time.

Example:

``` text
H
 \
  O
 /
H
```

Automatically recognize:

``` text
H₂O

Water
```

The right information panel updates immediately.

Recognition should be based on structured molecular connectivity rather
than string matching alone.

------------------------------------------------------------------------

# 27. MOLECULE GRAPH MODEL

Use a structured internal representation.

Conceptually:

``` ts
Atom {
  id
  element
  position
  charge?
  selected?
}

Bond {
  id
  atomA
  atomB
  order
}

Molecule {
  atoms[]
  bonds[]
  formula
  name?
}
```

Keep chemistry state independent from presentation state.

------------------------------------------------------------------------

# 28. Formula Generation

Generate molecular formulas from the atom graph.

Examples:

``` text
H₂O
CO₂
CH₄
NH₃
C₂H₅OH
```

Formatting should support chemical subscripts.

Do not hardcode the formula after a molecule is recognized.

------------------------------------------------------------------------

# 29. RIGHT PANEL --- YOUR MOLECULE

Heading:

**Your Molecule**

The panel should answer:

> What did I just make?

Reference example:

``` text
H₂O

Water
```

Include a compact molecule preview.

Include edit/interaction affordances where shown in the reference.

------------------------------------------------------------------------

# 30. Molecule Information Tabs

Implement:

``` text
Overview
Structure
3D Info
```

## Overview

Beginner-friendly information.

## Structure

Chemistry-focused structure details.

## 3D Info

Spatial/molecular geometry information.

Switching tabs should not cause the whole panel to jump.

Animate only the content region subtly.

------------------------------------------------------------------------

# 31. Quick Properties

Initially display:

``` text
Molecular Formula
Molecular Mass
Number of Atoms
Number of Bonds
Bond Type(s)
Geometry
State at Room Temperature
Common Name
```

For H₂O:

``` text
Molecular Formula: H₂O
Molecular Mass: 18.015 g/mol
Number of Atoms: 3
Number of Bonds: 2
Bond Type(s): Single
Geometry: Bent (V-shaped)
State at Room Temp: Liquid
Common Name: Water
```

Do not dump dozens of properties into the primary view.

------------------------------------------------------------------------

# 32. Progressive Scientific Detail

Beginner information comes first.

Example:

### Overview

> Water has two hydrogen atoms joined to one oxygen atom.

### Structure

> The molecule has a bent geometry with an H--O--H bond angle of
> approximately 104.5°.

### 3D Info

Expose deeper spatial information.

The interface should not force beginners to understand advanced
terminology.

------------------------------------------------------------------------

# 33. ABOUT THIS MOLECULE

Use a blue educational card.

Example:

### About This Molecule

> Water is made from two hydrogen atoms and one oxygen atom. It is
> essential for life.

This card should be visually distinct but consistent with the paper
design.

------------------------------------------------------------------------

# 34. DID YOU KNOW?

Use a warm yellow educational card.

Example:

### Did You Know?

> Water molecules are polar, which means they have slightly positive and
> negative sides.

The card should add knowledge without interrupting the construction
workflow.

------------------------------------------------------------------------

# 35. REAL-WORLD USES

Include a paper/card section:

### Real World Uses

For H₂O:

-   Drinking
-   Agriculture
-   Industrial processes
-   Temperature regulation
-   Essential for all living organisms

For CO₂:

-   Human respiration
-   Plants
-   Fire extinguishers
-   Carbonated drinks

For other molecules, use molecule-specific data.

Do not invent uses.

------------------------------------------------------------------------

# 36. QUICK MOLECULES

At the bottom of the canvas, reproduce the reference's horizontal
quick-molecule strip.

Heading:

**Quick Molecules**

Initial items:

``` text
H₂O — Water
CO₂ — Carbon Dioxide
CH₄ — Methane
NH₃ — Ammonia
C₂H₅OH — Ethanol
```

Each card includes:

-   3D preview
-   formula
-   name
-   selected state

Clicking a card instantly loads that molecule into the playground.

This allows students to explore before learning how to build.

------------------------------------------------------------------------

# 37. Quick Molecule Loading

When selecting a quick molecule:

1.  Replace the current molecule after appropriate confirmation if
    unsaved work matters.
2.  Load the molecule graph.
3.  Calculate/display its formula.
4.  Frame the camera.
5.  Animate the molecule assembling if practical.
6.  Update the right panel.
7.  Preserve the same visual state.

The transition should feel smooth rather than like a page reload.

------------------------------------------------------------------------

# 38. Guided Mode

Add a Guided Mode architecture.

Example:

### Let's build water

**Step 1**

> Add one Oxygen atom.

**Step 2**

> Add two Hydrogen atoms.

**Step 3**

> Connect each Hydrogen to Oxygen.

**Step 4**

> Rotate the molecule.

Completion:

> 🎉 You built Water!

Guided mode should highlight the relevant UI control without taking
control away from the student.

------------------------------------------------------------------------

# 39. Challenge Mode

Add a Challenge Mode architecture.

Example:

### Build Challenge

> Can you build CO₂?

Requirements:

``` text
Carbon atoms: 1
Oxygen atoms: 2
```

On completion:

> ✓ Correct!

If incorrect:

> Almost! Check the number of oxygen atoms.

Challenge mode should teach rather than punish.

------------------------------------------------------------------------

# 40. Beginner / Advanced Modes

This is a major UX requirement.

## Beginner

Show:

-   atoms
-   bonds
-   molecule name
-   formula
-   simple explanation
-   3D model
-   fun facts
-   real-world uses

## Advanced

Add:

-   bond angles
-   electron configuration
-   valence electrons
-   molecular geometry
-   polarity
-   hybridization
-   bond energy
-   formal charge
-   deeper structural information

The advanced mode should reveal more information without redesigning the
entire interface.

------------------------------------------------------------------------

# 41. Micro-interactions

Keep the playground alive but restrained.

## Adding atom

Small scale/fade-in.

## Connecting atoms

Bond grows smoothly between atoms.

## Selecting atom

Subtle outline/highlight.

## Changing molecule

Right panel updates smoothly.

## 2D → 3D

Smooth representation/camera transition.

## Loading molecule

Molecule may assemble atom-by-atom.

## Invalid bond

Small shake plus explanatory message.

No:

-   neon glow explosions
-   particles everywhere
-   cinematic camera effects
-   excessive parallax

------------------------------------------------------------------------

# 42. Animation System

Animation should communicate state.

Recommended ranges:

``` text
Micro interaction: 120–220ms
UI transition: 200–350ms
Panel/content transition: 250–400ms
Page transition: 300–500ms
```

Use easing that feels natural and physical.

Respect:

``` css
prefers-reduced-motion
```

Reduced-motion users should receive minimal opacity/state changes
without unnecessary movement.

------------------------------------------------------------------------

# 43. Loading States

3D assets can take time to load.

Provide:

-   subtle molecule loading state
-   lightweight skeleton for the information panel
-   clear loading indication
-   no frozen screen

Do not use a giant branded loading animation.

------------------------------------------------------------------------

# 44. Error States

Support:

``` text
WebGL unavailable
Model/asset failed
Molecule data unavailable
Invalid structure
Unsupported structure
```

For WebGL failure, provide a useful fallback:

``` text
2D structure
+
formula
+
properties
+
explanation
```

Never leave the student with a blank canvas.

------------------------------------------------------------------------

# 45. Mobile Layout

Do not shrink the desktop three-column layout.

Recompose it.

Target mobile hierarchy:

``` text
┌────────────────────────┐
│ Molecule Playground    │
├────────────────────────┤
│                        │
│      3D MOLECULE       │
│                        │
├────────────────────────┤
│ H C O N S Cl           │
├────────────────────────┤
│ Select Bond Erase      │
├────────────────────────┤
│ H₂O · Water            │
│ Mass: 18.015 g/mol     │
├────────────────────────┤
│ About this molecule    │
└────────────────────────┘
```

The molecule must remain the dominant object.

------------------------------------------------------------------------

# 46. Mobile Controls

Use large touch targets.

Support:

-   one-finger rotate
-   pinch zoom
-   tap selection
-   touch atom placement
-   bottom/compact tool controls

Avoid tiny desktop controls.

------------------------------------------------------------------------

# 47. Responsive Breakpoints

Test at:

``` text
1440px
1280px
1024px
768px
480px
390px
360px
```

The layout should gracefully transition from:

``` text
3 columns
→
2 columns / adaptive panels
→
single-column mobile workspace
```

------------------------------------------------------------------------

# 48. Accessibility

Implement:

-   semantic HTML
-   keyboard-accessible controls
-   visible focus states
-   ARIA labels where needed
-   proper heading hierarchy
-   accessible tabs
-   accessible buttons
-   accessible atom selection
-   screen-reader-readable molecule properties

Do not make important chemistry information available only inside the
WebGL canvas.

For example, the selected molecule must also have:

``` text
name
formula
mass
atom count
bond count
description
```

in normal DOM text.

------------------------------------------------------------------------

# 49. Performance

The 3D viewer is the most performance-sensitive part.

Optimize:

-   geometry
-   materials
-   draw calls
-   textures
-   animation loops
-   rerenders
-   event handlers
-   asset loading

Avoid creating unnecessary React state updates on every render frame.

Keep high-frequency 3D state inside the rendering layer where
appropriate.

Use memoization and instancing where justified.

Do not introduce post-processing unless it materially improves the
reference fidelity.

------------------------------------------------------------------------

# 50. State Architecture

Separate:

## Chemistry State

``` text
atoms
bonds
molecule identity
formula
validation
history
```

## UI State

``` text
selected tool
selected atom
selected bond
active tab
active atom category
mobile panel
```

## 3D State

``` text
camera
controls
render mode
zoom
rotation
```

Do not put all of these into one global store.

------------------------------------------------------------------------

# 51. Suggested Component Structure

Adapt to the project's actual architecture, but a reasonable structure
is:

``` text
components/
├── molecule-playground/
│   ├── MoleculePlayground.tsx
│   ├── PlaygroundHeader.tsx
│   ├── AtomPanel.tsx
│   ├── AtomSearch.tsx
│   ├── AtomPalette.tsx
│   ├── ToolPanel.tsx
│   ├── BondTypeSelector.tsx
│   ├── MoleculeCanvas.tsx
│   ├── CanvasToolbar.tsx
│   ├── MoleculeViewer.tsx
│   ├── MoleculeToolbar.tsx
│   ├── MoleculeInfoPanel.tsx
│   ├── MoleculeTabs.tsx
│   ├── MoleculeProperties.tsx
│   ├── MoleculeExplanation.tsx
│   ├── DidYouKnowCard.tsx
│   ├── RealWorldUses.tsx
│   ├── QuickMolecules.tsx
│   ├── GuidedMode.tsx
│   ├── ChallengeMode.tsx
│   └── MobileControls.tsx
│
├── molecule-3d/
│   ├── MoleculeScene.tsx
│   ├── AtomMesh.tsx
│   ├── BondMesh.tsx
│   ├── CameraController.tsx
│   ├── MoleculeControls.tsx
│   └── render-modes/
│
└── ui/
    ├── PaperCard.tsx
    ├── Tabs.tsx
    ├── Button.tsx
    ├── SearchBar.tsx
    └── SegmentedControl.tsx
```

Do not create all folders if the existing architecture has a cleaner
equivalent.

------------------------------------------------------------------------

# 52. Data Architecture

Chemistry data must be separated from presentation.

Suggested:

``` text
data/
├── elements/
├── molecules/
├── moleculeRules/
├── challenges/
└── guidedLessons/
```

A molecule definition should contain enough information for:

-   recognition
-   rendering
-   formula
-   properties
-   educational content
-   quick molecule loading

------------------------------------------------------------------------

# 53. Chemistry Rule Engine

Keep chemistry validation separate from React components.

Conceptually:

``` text
chemistry/
├── formula.ts
├── valence.ts
├── bonding.ts
├── validation.ts
├── recognition.ts
├── geometry.ts
└── molecularMass.ts
```

The UI should ask the chemistry layer questions rather than implementing
chemical rules directly.

------------------------------------------------------------------------

# 54. Scientific Accuracy

Do not invent chemistry facts.

For known molecules, use accurate values for:

-   molecular mass
-   formula
-   bond count
-   geometry
-   state
-   descriptions
-   uses
-   educational facts

If the application cannot scientifically validate something reliably,
explain the limitation rather than presenting a false certainty.

------------------------------------------------------------------------

# 55. Reference Visual Fidelity

Use the supplied reference image as the visual regression target.

Pay special attention to:

### Header

-   exact relative height
-   logo scale
-   navigation spacing
-   active Playground state
-   search width
-   theme/profile controls

### Page title

-   large editorial serif
-   subtitle placement
-   scientific visual to the right

### Left panel

-   section hierarchy
-   atom grid
-   element colors
-   tool grid
-   bond controls
-   panel proportions

### Center canvas

-   largest area
-   paper grid
-   faint scientific sketches
-   3D molecule centered
-   toolbar at top
-   quick molecule strip at bottom

### Right panel

-   molecule identity
-   large formula
-   3D preview
-   tabs
-   property table
-   educational cards

Do not approximate these casually.

------------------------------------------------------------------------

# 56. Paper/Notebook Details

The reference uses subtle physical-paper cues.

Reproduce them with restraint:

-   faint grid
-   paper grain
-   scientific sketches
-   taped-note appearance
-   hand-drawn arrows
-   subtle pencil annotations
-   slightly imperfect visual lines

Do not make the interface look dirty or antique.

The paper aesthetic should feel premium and contemporary.

------------------------------------------------------------------------

# 57. What NOT To Do

Do not:

-   replace the UI with a dashboard
-   use a dark theme for the playground
-   turn the paper into parchment
-   make every card heavily rounded
-   add random gradients
-   use neon chemistry effects
-   add unnecessary particle systems
-   create a giant WebGL scene for decorative purposes
-   hide basic information behind complex interactions
-   expose all 118 atoms immediately
-   overwhelm beginners with scientific data
-   create fake chemistry calculations
-   make controls icon-only without context
-   treat mobile as an afterthought
-   use a screenshot as the implementation

------------------------------------------------------------------------

# 58. Implementation Order

Follow this sequence:

## Phase 1 --- Structure

Build:

-   page
-   header
-   three-column layout
-   left panel
-   canvas
-   right panel
-   quick molecules

## Phase 2 --- Design

Implement:

-   paper system
-   typography
-   spacing
-   colors
-   borders
-   shadows
-   notebook decorations

## Phase 3 --- Atom Interaction

Implement:

-   atom palette
-   search
-   categories
-   placement
-   selection

## Phase 4 --- Tools

Implement:

-   Select
-   Bond
-   Erase
-   Rotate
-   Zoom
-   Reset
-   Bond type

## Phase 5 --- Molecule Engine

Implement:

-   atom graph
-   bond graph
-   formula
-   molecular mass
-   validation
-   recognition

## Phase 6 --- 3D

Implement:

-   molecule renderer
-   atom meshes
-   bond meshes
-   camera
-   controls
-   render modes

## Phase 7 --- Information Layer

Implement:

-   molecule tabs
-   properties
-   explanation
-   did-you-know
-   real-world uses

## Phase 8 --- Quick Molecules

Implement:

-   predefined molecule data
-   loading
-   camera framing
-   animated transition

## Phase 9 --- Learning Features

Implement:

-   guided mode
-   challenge mode
-   beginner/advanced mode

## Phase 10 --- Polish

Implement:

-   micro-interactions
-   page transitions
-   loading states
-   errors
-   accessibility
-   reduced motion

## Phase 11 --- Responsive

Test and optimize:

-   desktop
-   tablet
-   mobile
-   small mobile

## Phase 12 --- Performance

Profile:

-   FPS
-   renders
-   draw calls
-   memory
-   asset size
-   initial load

## Phase 13 --- Visual QA

Compare implementation against the supplied reference image and correct
visual differences.

------------------------------------------------------------------------

# 59. Final Quality Gate

Before considering the Molecule Playground complete:

## Visual

-   [ ] Matches reference composition
-   [ ] Paper aesthetic is correct
-   [ ] Typography hierarchy matches
-   [ ] Spacing is consistent
-   [ ] Panels have correct proportions
-   [ ] Scientific decorations are subtle
-   [ ] Molecule is visually dominant

## UX

-   [ ] Student can add an atom quickly
-   [ ] Atom placement is obvious
-   [ ] Bond creation is obvious
-   [ ] Tools are understandable
-   [ ] Molecule information updates automatically
-   [ ] Quick molecules work
-   [ ] Undo/redo works
-   [ ] Reset and clear are distinct

## Chemistry

-   [ ] Formula generation works
-   [ ] Molecular mass works
-   [ ] Atom count works
-   [ ] Bond count works
-   [ ] Bond order works
-   [ ] Recognition works for supported molecules
-   [ ] Validation does not make unsupported scientific claims

## 3D

-   [ ] Rotate works
-   [ ] Zoom works
-   [ ] Selection works
-   [ ] 2D/3D works
-   [ ] Visualization modes work
-   [ ] Camera framing works
-   [ ] WebGL fallback exists

## Responsive

-   [ ] Desktop
-   [ ] Tablet
-   [ ] Mobile
-   [ ] Small mobile

## Accessibility

-   [ ] Keyboard navigation
-   [ ] Focus states
-   [ ] Accessible controls
-   [ ] Semantic structure
-   [ ] Reduced motion
-   [ ] DOM fallback for important molecule information

## Performance

-   [ ] No uncontrolled animation loops
-   [ ] No unnecessary React rerenders
-   [ ] 3D assets optimized
-   [ ] Canvas remains responsive
-   [ ] Mobile rendering is reduced appropriately
-   [ ] No obvious memory leaks

------------------------------------------------------------------------

# 60. Final Product Definition

The Molecule Playground should ultimately feel like:

> **A modern interactive chemistry notebook where students can
> experiment and immediately understand what they are seeing.**

The core loop is:

**Choose Atom → Build → Get Feedback → See Molecule → Understand →
Experiment Again.**

Every major UI and engineering decision should strengthen this loop.

The implementation should reproduce the supplied reference image closely
while remaining:

**Functional × Educational × Responsive × Accessible × Performant ×
Maintainable.**
