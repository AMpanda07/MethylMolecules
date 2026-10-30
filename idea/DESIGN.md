---
version: alpha
name: Zperiod
description: "Light interface measured from zperiod.app: system-ui type with Inter, light orange accents, flat surfaces and 14px corners."
colors:
  background: "#FDFBF7"
  surface: "#FDFBF7"
  on-surface: "#20304A"
  on-background: "#20304A"
  on-surface-strong: "#1D1D1F"
  on-surface-variant: "#2C2420"
  on-surface-muted: "#444444"
  overlay: "#0000000A"
  overlay-strong: "#8B5CF61C"
  outline: "#2E46681F"
  outline-variant: "#8B5CF640"
  primary: "#FFD08B"
  on-primary: "#000000"
  secondary: "#7BE7B8"
  tertiary: "#7DB3FF"
typography:
  headline-display:
    fontFamily: system-ui
    fontSize: 32px
    fontWeight: 700
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 700
    letterSpacing: -0.01em
  body-md:
    fontFamily: system-ui
    fontSize: 16px
    fontWeight: 400
  label-lg:
    fontFamily: Arial
    fontSize: 14px
    fontWeight: 700
  label-md:
    fontFamily: Arial
    fontSize: 13.5px
    fontWeight: 600
    lineHeight: 1.05
  label-sm:
    fontFamily: system-ui
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20.5px
    fontWeight: 700
    letterSpacing: -0.01em
rounded:
  sm: 14px
  md: 16.92px
  full: 9999px
spacing:
  xs: 2px
  sm: 8px
  md: 10px
  lg: 18.8px
  gutter: 11.28px
components:
  button-primary:
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: 8px 10px
    height: 38px
  button-primary-hover:
    backgroundColor: "#FFFFFF"
  button-secondary:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 0px 15.79px 0px 5.26px
    height: 39px
  button-outline:
    backgroundColor: "#FFFFFFD1"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 0px 15.79px 0px 5.26px
    height: 39px
---

# Zperiod Design System

## Overview

Zperiod describes itself as: “Zperiod is a complete interactive periodic table with 118 elements, 3D atom models, ions, chemistry tools, and worksheet practice for modern chemistry learning.” The interface is light, built on **Warm Snow (#FDFBF7)** with **Deep Blue (#20304A)** text, and **Light Orange (#FFD08B)** as the main accent.

Type is set in **system-ui** and **Inter**. Headlines run large; body text is 16px. Depth comes from soft drop shadows. Corners are mostly 14px.

Measured from [zperiod.app](https://zperiod.app/) on October 30, 2026 at 1440×900 and 390×844 from 97 rendered elements. Values are computed styles from the live page, not the original source files.

## Colors

The palette has 13 roles.

- **Warm Snow (#FDFBF7):** Page background, seen 1 time. Token `background`.
- **Deep Blue (#20304A):** Primary text and headings, seen 41 times. Token `on-surface`.
- **Charcoal (#1D1D1F):** Headings and emphasis, seen 2 times. Token `on-surface-strong`, CSS `--segment-text-active`.
- **Warm Graphite (#2C2420):** Secondary text, seen 3 times. Token `on-surface-variant`.
- **Graphite (#444444):** Muted text and metadata, seen 4 times. Token `on-surface-muted`.
- **Near Black 4% (#0000000A):** Translucent fill for cards and controls, seen 3 times. Token `overlay`, CSS `--segment-track-bg`.
- **Violet 11% (#8B5CF61C):** Stronger translucent fill, seen 1 time. Token `overlay-strong`.
- **Dark Blue 12% (#2E46681F):** Borders and dividers, seen 40 times. Token `outline`.
- **Violet 25% (#8B5CF640):** Secondary dividers, seen 1 time. Token `outline-variant`.
- **Light Orange (#FFD08B):** Brand color on large areas. Token `primary`.
- **Near Black (#000000):** Text and icons on primary. Token `on-primary`.
- **Teal (#7BE7B8):** Accent on large areas. Token `secondary`.
- **Light Blue (#7DB3FF):** Accent on large areas. Token `tertiary`.

## Typography

**system-ui**, **Inter** and **Arial** share the interface. Fallback stack: `ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI`.

- **headline-display:** system-ui 32px at weight 700. Page title (h1).
- **headline-lg:** Inter 22px at weight 700, tracking -0.01em (20.5px on mobile). Section headings (h2).
- **body-md:** system-ui 16px at weight 400. Body text.
- **label-lg:** Arial 14px at weight 700. Large buttons and tabs.
- **label-md:** Arial 13.5px at weight 600, line height 1.05. Buttons, navigation and labels.
- **label-sm:** system-ui 12px at weight 600, line height 1.2. Small labels and badges.

## Layout

Spacing does not follow a strict grid: 40% of measured values are multiples of 4px, so match the measured steps rather than rounding to a grid.

- **Scale:** xs 2px, sm 8px, md 10px, lg 18.8px.
- **Gaps:** 11.28px is the most common gap in flex and grid layouts.
- **Breakpoints:** 600px, 640px, 680px, 760px, 768px, 900px, 960px, 980px, 981px, 1100px, 1149px, 1180px, 1360px, 1500px.

## Elevation & Depth

Raised elements use soft drop shadows. The most used recipes:

- `rgba(40, 55, 80, 0.055) 0px 3px 10px 0px`
- `rgba(0, 0, 0, 0.04) 0px 1px 2px 0px`
- `rgba(139, 92, 246, 0.16) 0px 0px 18px 0px, rgba(99, 102, 241, 0.12) 0px 6px 22px 0px`

## Shapes

Most elements use 14px corners. Measured radii, most used first:

- **sm (14px):** 160 elements.
- **full (9999px):** 36 elements.
- **md (16.92px):** 24 elements.

## Components

Measured from the rendered page. Token values reference the tokens above.

- **button-primary (“English”):** transparent fill, #20304A text, 14.08px/700, 14px radius, padding 8px 10px, border 1px solid #2E46681F, shadow `rgba(40, 55, 80, 0.055) 0px 3px 10px 0px`.
- **button-primary-hover:** background #FFFFFF, text #20304A on hover.
- **button-secondary (“Beta 2 Testing”):** transparent fill, #2C2420 text, 13.16px/700, 999px radius, padding 0px 15.79px 0px 5.26px, border 1px solid #8B5CF640, shadow `rgba(139, 92, 246, 0.16) 0px 0px 18px 0px, rgba(99, 102, 241, 0.12) 0px 6px 22px 0px`.
- **button-outline (“Customize Layout”):** #FFFFFFD1 fill, #2C2420 text, 13.16px/700, 999px radius, padding 0px 15.79px 0px 5.26px, border 1px solid #00000012, shadow `rgba(15, 23, 42, 0.05) 0px 1px 2px 0px, rgba(15, 23, 42, 0.09) 0px 8px 22px 0px`.

## Do's and Don'ts

- Do use #FDFBF7 for the page.
- Do keep text in 4 levels: #20304A, #1D1D1F, #2C2420, #444444.
- Do use #FFD08B as the brand accent: header, logo and key highlights.
- Do reuse the measured spacing steps (8px, 10px, 18.8px).
- Do use 14px corners on most elements; larger surfaces also use 16.92px.
- Don't introduce new font families beyond system-ui, Inter and Arial.
- Don't use #FFD08B for large backgrounds or body text.
- Don't make interface transitions slower than 0.28s.

## Motion

Interface transitions are quick: 0.25s, 0.16s, 0.18s, 0.28s. Longer ambient animations run 0.8s, 7s.

- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)`, `ease`, `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Reduced motion:** the page responds to `prefers-reduced-motion`.

Generated by [Sitepeel](https://sitepeel.dev/design-md/zperiod.app/), the free DESIGN.md generator (engine 2026.10.29+bf9d681d83cf).
