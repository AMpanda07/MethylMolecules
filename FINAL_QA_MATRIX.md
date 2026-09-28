# Final Quality Assurance Matrix

## 1. Element Verification Suite
| Element | Atomic Number | Symbol | Category | Structure View | Orbitals View | Archive View | Status |
|---|---|---|---|---|---|---|---|
| Hydrogen | 1 | H | Other Nonmetal | PASS (1p⁺, 0n⁰, 1e⁻) | PASS (K Shell) | PASS (specimen image) | PASS |
| Helium | 2 | He | Noble Gas | PASS (2p⁺, 2n⁰, 2e⁻) | PASS (K Shell) | PASS (glowing gas vial) | PASS |
| Carbon | 6 | C | Other Nonmetal | PASS (6p⁺, 6n⁰, 6e⁻) | PASS (L Shell) | PASS (diamond/graphite) | PASS |
| Nitrogen | 7 | N | Other Nonmetal | PASS (7p⁺, 7n⁰, 7e⁻) | PASS (L Shell) | PASS (liquid nitrogen) | PASS |
| Oxygen | 8 | O | Other Nonmetal | PASS (8p⁺, 8n⁰, 8e⁻) | PASS (L Shell) | PASS (liquid oxygen) | PASS |
| Sodium | 11 | Na | Alkali Metal | PASS (11p⁺, 12n⁰, 11e⁻) | PASS (M Shell) | PASS (sodium cube) | PASS |
| Chlorine | 17 | Cl | Halogen | PASS (17p⁺, 18n⁰, 17e⁻) | PASS (M Shell) | PASS (chlorine gas) | PASS |
| Iron | 26 | Fe | Transition Metal | PASS (26p⁺, 30n⁰, 26e⁻) | PASS (N Shell) | PASS (iron crystal) | PASS |
| Copper | 29 | Cu | Transition Metal | PASS (29p⁺, 35n⁰, 29e⁻) | PASS (N Shell) | PASS (copper disc) | PASS |
| Silver | 47 | Ag | Transition Metal | PASS (47p⁺, 61n⁰, 47e⁻) | PASS (O Shell) | PASS (silver crystal) | PASS |
| Gold | 79 | Au | Transition Metal | PASS (79p⁺, 118n⁰, 79e⁻) | PASS (P Shell) | PASS (gold nugget) | PASS |
| Uranium | 92 | U | Actinides | PASS (92p⁺, 146n⁰, 92e⁻) | PASS (Q Shell) | PASS (uranium glass) | PASS |
| Oganesson | 118 | Og | Noble Gas | PASS (118p⁺, 176n⁰, 118e⁻)| PASS (Q Shell) | PASS (decay chain) | PASS |

## 2. URL & Navigation Matrix
| URL Route / Query | Action / Trigger | Expected Render | Result |
|---|---|---|---|
| `/?element=C` | Direct page load / refresh | Opens Carbon detail modal directly | PASS |
| `/?element=Fe` | Direct page load | Opens Iron detail modal directly | PASS |
| `/?element=C&tab=orbitals` | Direct page load | Opens Carbon detail modal with Orbitals view active | PASS |
| `/?element=H&tab=archive` | Direct page load | Opens Hydrogen detail modal with Archive view active | PASS |
| Back / Forward | Browser `popstate` | Synchronizes modal selection and active tab | PASS |

## 3. Responsive Viewport Matrix
| Viewport Width | Device Target | Table Layout | Modal Layout | Visual Canvas | Overflow | Status |
|---|---|---|---|---|---|---|
| 320px | Small Mobile | Horizontal scroll | Stacked 1-col | Responsive 3D | 0px horizontal overflow | PASS |
| 375px | Mobile | Horizontal scroll | Stacked 1-col | Responsive 3D | 0px horizontal overflow | PASS |
| 390px | iPhone 12/13/14 | Horizontal scroll | Stacked 1-col | Responsive 3D | 0px horizontal overflow | PASS |
| 430px | iPhone Pro Max | Horizontal scroll | Stacked 1-col | Responsive 3D | 0px horizontal overflow | PASS |
| 768px | iPad Portrait | Scaled grid (900px min) | Stacked 1-col | Responsive 3D | Controlled scroll | PASS |
| 1024px | iPad Landscape | 18-col full grid | 2-column modal | Centered 3D | Clean container | PASS |
| 1280px | Laptop | 18-col full grid | 2-column modal | Centered 3D | Clean container | PASS |
| 1440px | Desktop | 18-col full grid | 2-column modal | Centered 3D | Clean container | PASS |
| 1920px | Full HD / Ultrawide | 18-col full grid | 2-column modal | Centered 3D | Clean container | PASS |

## 4. Hand Gesture Control Matrix
| Gesture Feature | User Action | System Action | Status |
|---|---|---|---|
| **Toggle Activation** | Click Hand icon in Header | Prompts camera permission, launches HUD | PASS |
| **Pointer Tracking** | Move hand in front of camera | Virtual glowing cursor follows hand motion | PASS |
| **Dwell Selection** | Hold pointer over element for 1.8s | Selects element and opens detail modal | PASS |
| **Swipe Left** | Rapid leftward motion | Navigates to Next Element (`+1`) | PASS |
| **Swipe Right** | Rapid rightward motion | Navigates to Previous Element (`-1`) | PASS |
| **Deactivation / Cleanup** | Click X on HUD or Hand toggle | Stops camera video tracks, cancels frame loop | PASS |
