---
name: Jal Seva
colors:
  surface: '#f7f9ff'
  surface-dim: '#c9dcf0'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf4ff'
  surface-container: '#e1efff'
  surface-container-high: '#d7eaff'
  surface-container-highest: '#d1e5f9'
  on-surface: '#091d2c'
  on-surface-variant: '#44474e'
  inverse-surface: '#203242'
  inverse-on-surface: '#e7f2ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#495f82'
  primary: '#001026'
  on-primary: '#ffffff'
  primary-container: '#0b2545'
  on-primary-container: '#778db2'
  inverse-primary: '#b1c7f0'
  secondary: '#006495'
  on-secondary: '#ffffff'
  secondary-container: '#6cc0ff'
  on-secondary-container: '#004e75'
  tertiary: '#001316'
  on-tertiary: '#ffffff'
  tertiary-container: '#002a2f'
  on-tertiary-container: '#009baa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b1c7f0'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#314769'
  secondary-fixed: '#cbe6ff'
  secondary-fixed-dim: '#8fcdff'
  on-secondary-fixed: '#001e30'
  on-secondary-fixed-variant: '#004b71'
  tertiary-fixed: '#92f1ff'
  tertiary-fixed-dim: '#51d8e9'
  on-tertiary-fixed: '#001f23'
  on-tertiary-fixed-variant: '#004f57'
  background: '#f7f9ff'
  on-background: '#091d2c'
  surface-variant: '#d1e5f9'
typography:
  headline-xl:
    fontFamily: Noto Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
  headline-xl-mobile:
    fontFamily: Noto Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 42px
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-reliability, civic-tech standard engineered for municipal utility distribution, grievance reporting, and supply infrastructure monitoring. It addresses two distinct user archetypes: rural and urban citizens accessing updates on handheld mobile viewports, and municipal engineers supervising flow telemetry and billing across expansive dashboard layouts.

The design movement balances **Corporate / Modern** civic dependability with approachable clarity. The aesthetic emphasizes absolute legibility, low cognitive friction under direct sunlight, and immediate utility verification. It discards decorative artifacts in favor of structural clarity, high-contrast status feedback, and bilingual equity—seamlessly prioritizing Marathi typography alongside standardized English civic classifications.

## Colors

The palette establishes institutional trust anchored by deep oceanic tones, paired with luminous aquatic accents for telemetry, flow indicators, and civic notifications.

### Roles & Semantic Palette
- **Primary Navy (`#0B2545`):** Structural anchors, authoritative navigation headers, high-level administrative sidebars, and critical action buttons.
- **Primary Blue (`#087DB8`):** Interactive highlights, links, standard primary CTAs on citizen portals, and active filtration states.
- **Water Cyan (`#2DBFD0`):** Informational callouts, active supply meters, reservoir fill volume graphics, and telemetry indicators.
- **Neutral Main (`#182B3A`):** Core typographic tone, providing rigorous contrast against light backdrops for extended readability.
- **Neutral Secondary (`#5D6B78`):** Supporting metadata, timestamps, Devanagari secondary translations, and form helper text.
- **Surface Canvas (`#F4F9FC`):** Overall system backdrop, reducing eye fatigue from pure white while simulating ambient atmospheric hydration.
- **Surface Card (`#FFFFFF`):** Base canvas for structural cards, data sheets, and elevated overlays.
- **Border Outline (`#D7E5EC`):** Division boundaries, container frames, and tabular column separations.
- **Teal Success (`#239F83`):** Scheduled supply confirmed, water purity verified, and settled water bills.
- **Warning Amber (`#F4A340`):** Low pipeline pressure, scheduled maintenance closures, and pending complaint approvals.
- **Error Red (`#C74646`):** Pipe rupture alarms, supply contamination alerts, and missed payments.

## Typography

Typographic hierarchy accommodates dual-script rendering where Marathi (Devanagari) shares equal vertical weight and line balance with English. `Noto Sans` (incorporating Noto Sans Devanagari metrics) governs all conversational copy, headers, and bilingual content blocks, avoiding glyph clipping on matras and conjuncts through relaxed line-height ratios.

`Inter` handles tabular data, technical identifiers (pipeline valve tags, consumer connection IDs), telemetry numericals, and compact badge labels. When Devanagari text is paired directly above or beside English labels, maintain equivalent point sizing while setting the secondary translation in `#5D6B78` with a 0.85 scale modifier.

## Layout & Spacing

The layout is built on an adaptive 8-point base module. Layout structures accommodate two primary interfaces:
1. **Citizen Mobile Interface (Single Column / 4-Column Grid):** Fluid width bounded at 480px max-width, prioritizing touch targets of at least 48px, compact card margins, and edge-to-edge floating action surfaces.
2. **Admin Operations Portal (12-Column Fluid Grid):** Scaled across desktop monitors with a fixed 260px administrative navigation sidebar, 1.5rem (`24px`) gutters, and dynamic workspace panels accommodating multi-gauge telemetry maps and data grids.

### Breakpoints & Reflow
- **Mobile (< 768px):** 4 columns, 16px margins, stacked card layouts, bottom navigation bar for quick complaint submission and status verification.
- **Tablet (768px – 1024px):** 8 columns, 32px margins, 2-column card arrays for regional reservoir dashboards.
- **Desktop (> 1024px):** 12 columns, 48px outer canvas margin, split layouts displaying real-time GIS mapping on the right 7 columns and management feeds on the left 5 columns.

## Elevation & Depth

Visual hierarchy uses crisp boundaries layered over soft ambient depth to remain sharp in high-glare environments. Surfaces avoid heavy saturated drop-shadows; depth is derived from tone layering combined with soft aquatic tints.

- **Level 0 (Flat / Canvas):** Surface canvas `#F4F9FC`. Base structural background.
- **Level 1 (Card / Container):** Solid `#FFFFFF` fill bounded by a crisp 1px solid `#D7E5EC` border, paired with an ambient shadow: `0 2px 6px rgba(11, 37, 69, 0.04)`. Used for metric cards, civic update feeds, and bill stubs.
- **Level 2 (Interactive Floating / Active State):** Raised cards on hover, search inputs, and dropdown panels: `0 6px 16px rgba(11, 37, 69, 0.08)`, border adjusted to `#C2D8E5`.
- **Level 3 (Modal / Critical Dialog):** Emergency alert popups, water tanker tracking drawers, and payment overlays: `0 16px 36px rgba(11, 37, 69, 0.16)`.

## Shapes

The shape system employs roundedness level **2**, striking a balance between civic authority and friendly accessibility:
- **Buttons & Input Fields:** Curvature between 10px and 12px (`rounded-md`), providing tactile, easily locatable targets on mobile.
- **Cards & Primary Modules:** Radii bounded between 14px and 18px (`rounded-lg` / `rounded-xl`), creating distinct, friendly visual containers for discrete operational information.
- **Badges, Chips & Status Pills:** Full radius (`9999px`) to immediately distinguish contextual states and metadata tags from interactive square buttons.

## Components

### Buttons
- **Primary:** Solid `#0B2545` (Admin) or `#087DB8` (Citizen Mobile) with `#FFFFFF` text. Minimum height of 48px for citizen touchpoints. Border radius: 10px to 12px. Active states darken background by 10%.
- **Secondary:** Surface `#FFFFFF` with 1.5px border `#087DB8`, text `#087DB8`.
- **Subtle / Ghost:** Transparent background, text `#0B2545`, used strictly for inline dismissals and secondary table row operations.

### Input Fields & Selectors
- Background `#FFFFFF`, 1.5px border `#D7E5EC`, corner radius 10px, padding 12px 16px.
- Placeholder text in `#5D6B78`.
- Focus state triggers a 2px outer ring in `#2DBFD0` with border color transition to `#087DB8`.
- Inline labels include bilingual Marathi/English headings (e.g., *मीटर क्रमांक / Meter Number*).

### Status Badges & Chips
- Constructed as fully rounded pills (`border-radius: 9999px`) with padding of 4px 12px.
- **Active Water Supply / सामान्य:** Teal Success background `#EAF7F3`, border `#239F83`, text `#136351`.
- **Scheduled Maintenance / नियोजित दुरुस्ती:** Amber Warning background `#FEF6EC`, border `#F4A340`, text `#8A5515`.
- **Contamination / No Supply / पाणीपुरवठा खंडित:** Red Error background `#FBECEC`, border `#C74646`, text `#832222`.

### Cards & Module Containers
- Cards feature 16px corner radii, `#FFFFFF` surface fills, 1px `#D7E5EC` borders, and Level 1 ambient shadows.
- Inner card padding uses `space-md` (16px) on mobile and `space-lg` (24px) on administrative screens.
- Telemetry cards incorporate a top 4px accent line using `#2DBFD0` for water flow or `#239F83` for operational purity.

### Checkboxes & Radio Buttons
- 20px dimension with 6px border radius (checkbox) or circular (radio).
- Default border `#5D6B78`, shifting to filled `#087DB8` when active with high-contrast white glyph indicators.

### Domain-Specific Components
- **Water Quality Gauge:** Horizontal segmented tracker displaying PPM and Turbidity using Teal, Amber, and Red color stops.
- **Tanker Tracking Card:** Dedicated citizen card presenting driver contact, water volume capacity (liters), live GPS route pill, and bilingual time estimates (*१५ मिनिटे / 15 mins*).
- **Grievance Resolution Step-Indicator:** Vertical timeline for citizen complaint progression (Submitted $\rightarrow$ Field Engineer Assigned $\rightarrow$ Valve Repaired $\rightarrow$ Resolved).