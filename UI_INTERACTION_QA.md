# ZPeriod Interaction QA Matrix

| Component | Default | Hover | Focus | Active | Disabled | Animation | Functional | Mobile | Status |
|---|---|---|---|---|---|---|---|---|---|
| **Element Card** | Category color tint, subtle border | `translateY(-2px)`, border glow, category highlight | `outline: 2px solid #0284c7` | Immediate click feedback, active scale | N/A | 120ms cubic-bezier transition | Opens Element Detail Modal with exact data | Touch tap opens modal | PASS |
| **Global Nav Pills** | Transparent background, clear font | Background overlay, subtle lift | Focus ring visible | Dark blue background pill, high contrast | N/A | 180ms smooth transition | Switches active view route | Scaled height (56px) with horizontal scroll | PASS |
| **Theme Toggle** | Circular button (36px), border tint | `translateY(-1px)`, elevated shadow | Focus ring visible | Icon morph / active click effect | N/A | Fast fade/transform | Toggles light / dark mode state | Touch target 36px | PASS |
| **Search Trigger** | Circular button (36px) | `translateY(-1px)`, shadow elevation | Focus ring visible | Modal opens | N/A | Modal overlay fade in (180ms) | Triggers search modal with focus on input | Responsive full-width modal | PASS |
| **Modal 2D/3D Tabs** | Pill container (`Structure`, `Orbitals`, `Archive`) | Accent highlight | Keyboard tab selectable (`1/2/3`) | Active highlight background | N/A | 180ms tab slide indicator | Switches visual pane renderer | Stacked tab buttons on narrow screens | PASS |
| **Prev/Next Elem Nav** | Circle navigation arrows | Hover background lift | Visible focus outline | Arrow click transitions element | Disabled at bounds (H:1, Og:118) | 120ms icon shift | Navigates element sequence smoothly | Accessible overlay placement | PASS |
| **Ion Category Cards** | Distinct charge badge, clean border | Card lift, shadow elevation | Focus outline | Modal detail trigger | N/A | Smooth lift | Opens Ion detail modal | Responsive 1/2-column grid | PASS |
| **Titration Slider** | Standard track & thumb | Thumb highlight | Visible outline | Real-time pH & indicator color recalculation | N/A | Real-time reactive updates | Updates beaker liquid & chart line | Touch draggable | PASS |
| **SPDF Quantum Selector**| Orbital subshell pills (s, p, d, f) | Pill highlight | Focus outline | Renders 3D orbital cloud | Disabled for invalid quantum levels | Smooth WebGL re-render | Displays subshell geometry | Responsive canvas | PASS |
| **Settings Toggles** | Custom toggle track + thumb | Track hover tint | Focus outline | Thumb moves right, background turns accent | Opacity 0.5 when disabled | 180ms smooth thumb slide | Mutates global store settings | Touch toggleable | PASS |
