# ZPeriod Visual Alignment & Responsive Audit

## 1. Grid & Page Alignment
- **Home Periodic Table**: Aligned on standard 18-column grid with lanthanide/actinide series offset. Scaled layout with minimum width handling (`min-width: 900px` on tablets, `min-width: 780px` on mobile with touch scroll).
- **Element Detail Modal Layout**:
  - Desktop (>992px): Fixed 2-column layout (`min(1480px, calc(100vw - 64px))` by `min(840px, calc(100vh - 64px))`). Left info pane fixed width (`380px`), right visual pane flexible (`flex: 1`).
  - Tablet/Mobile (<992px): Stacked vertical layout with responsive height allocation (44% info scroll, 56% visual canvas).
- **Ions View Grid**: CSS grid (`grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`) with 16px gap.
- **Chemistry Tools Layout**: Unified card grid with two-column responsive split (Input Controls on Left, Real-Time Chart/Visualizer on Right).

## 2. Typography Hierarchy
- Display Titles: `36px` (`font-weight: 800`) for main view headers.
- Section Headers: `18px` (`font-weight: 700`) for card and modal sub-headings.
- Body / Property Values: `14px` (`font-weight: 500`) for general text.
- Metadata / Labels: `11px` (`font-weight: 700`, `letter-spacing: 1px`, uppercase) for chemical property labels (`TYPE`, `GROUP / PERIOD`, `PHASE @ STP`, `ELECTRON BLOCK`, `SHELL POPULATION`).

## 3. Micro-Animations & Responsive Behavior
- **Hover Micro-Interactions**: All clickable buttons and interactive cards utilize `--transition-fast` (120ms) with subtle `translateY(-1px)` lift and shadow elevation.
- **Page & View Transitions**: Smooth view switches between Table, Ions, Tools, Playground, and Settings without layout shifts.
- **Reduced Motion Accessibility**: Full compliance via `@media (prefers-reduced-motion: reduce)` which zeroes animation durations while preserving functional state changes.
