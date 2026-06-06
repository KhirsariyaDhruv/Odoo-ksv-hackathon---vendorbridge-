---
name: Obsidian Flux
colors:
  surface: '#13121b'
  surface-dim: '#13121b'
  surface-bright: '#393842'
  surface-container-lowest: '#0e0d16'
  surface-container-low: '#1b1b24'
  surface-container: '#1f1f28'
  surface-container-high: '#2a2933'
  surface-container-highest: '#35343e'
  on-surface: '#e4e1ee'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#e4e1ee'
  inverse-on-surface: '#302f39'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c4c0ff'
  primary: '#c4c0ff'
  on-primary: '#2000a4'
  primary-container: '#8781ff'
  on-primary-container: '#1b0091'
  inverse-primary: '#4f44e2'
  secondary: '#ffb599'
  on-secondary: '#5a1b00'
  secondary-container: '#822d03'
  on-secondary-container: '#ffa17c'
  tertiary: '#9ad594'
  on-tertiary: '#00390b'
  tertiary-container: '#669e63'
  on-tertiary-container: '#003209'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c4c0ff'
  on-primary-fixed: '#100069'
  on-primary-fixed-variant: '#3622ca'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b01'
  tertiary-fixed: '#b5f2af'
  tertiary-fixed-dim: '#9ad594'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#1b511f'
  background: '#13121b'
  on-background: '#e4e1ee'
  surface-variant: '#35343e'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  mono-data:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 32px
  gutter-grid: 24px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px
---

## Brand & Style

This design system embodies a premium, futuristic fintech aesthetic designed for high-stakes SaaS environments. It targets sophisticated enterprise users who require high-density data visualization without sacrificing visual delight. 

The style is a fusion of **Glassmorphism** and **Corporate Modernism**, characterized by deep obsidian surfaces, vibrant neon data-points, and ultra-smooth geometry. The emotional response is one of absolute control, precision, and "day-after-tomorrow" technological capability. The UI prioritizes depth through layered transparency and high-contrast accents that guide the eye toward critical financial insights.

## Colors

The palette is anchored by a "True Black" foundation to maximize OLED contrast and reduce visual noise in data-heavy views. 

- **Core Neutrals:** The background uses `#0A0A0A` for absolute depth, while `#121212` and `#1E1E1E` provide the structural "charcoal" containers that define the dashboard's architecture.
- **Vibrant Accents:** We use a high-energy spectrum to categorize data. **Purple (#6C63FF)** represents primary actions and brand presence; **Orange (#FF8A5B)** denotes highlights or warnings; **Green (#A7E3A1)** indicates growth or positive "Buy" signals; **Yellow (#F6C667)** serves as a tertiary bridge for secondary metrics.
- **Glass Effects:** Semi-transparent versions of these colors (10-20% opacity) should be used for background blurs and card overlays to maintain the glassmorphic feel.

## Typography

This design system utilizes a dual-font strategy to balance futuristic character with extreme legibility.

- **Space Grotesk (Headlines):** Used for large numerical displays, dashboard titles, and primary headings. Its geometric, slightly tech-leaning apertures provide the "futuristic" signature.
- **Sora (Body & UI):** Used for all functional UI text, labels, and secondary data. Its wider stance and modern curves ensure high readability on dark backgrounds.
- **Financial Data:** For ticker symbols and currency values, use `Space Grotesk` with a medium weight to emphasize numerical clarity.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The sidebar remains fixed at 280px, while the main content area utilizes a 12-column fluid grid.

- **Margins & Gutters:** A generous 32px outer margin provides breathing room for the glassmorphic containers. Internal gutters are set to 24px to maintain a distinct separation of data modules.
- **Density:** While the visual style is "airy," the internal spacing of cards remains tight (16px - 20px) to allow for high-information density essential for fintech dashboards.
- **Mobile Reflow:** On mobile, the 12-column grid collapses to a single column, and card horizontal padding reduces to 16px.

## Elevation & Depth

Depth in this system is achieved through **Tonal Stacking** and **Backdrop Blurs** rather than traditional heavy shadows.

1.  **Level 0 (Floor):** The base `#0A0A0A` background.
2.  **Level 1 (Modules):** Surfaces using `#121212` with a subtle 1px stroke (Color: White, Opacity: 8%).
3.  **Level 2 (Glass Overlays):** Modal windows and dropdowns use a semi-transparent surface with a `24px` backdrop blur and a thin gradient border to simulate light hitting the edge of the glass.
4.  **Neon Glow:** Interactive elements (like active charts or buttons) emit a soft, diffused outer glow matching their accent color (Blur: 20px, Opacity: 15%).

## Shapes

The shape language is defined by oversized, luxurious radii that contrast with the sharp technical nature of the data.

- **Primary Containers:** Large dashboard modules and cards must use a minimum of **24px** (rounded-xl) to 32px corner radius.
- **Small Elements:** Buttons and tags use a "Pill" style or a **12px** radius to maintain a friendly yet professional feel.
- **Consistency:** Never mix sharp corners with rounded ones; every interactive or containing element must adhere to the soft-geometric curve.

## Components

### Cards & Modules
All cards should feature a subtle inner glow (top-left) and a 1px border at 10% white opacity. Backgrounds should be `#121212`. For featured cards (like "Crypto balance"), use a solid accent color background with black text.

### Buttons
- **Primary:** Solid `#6C63FF` with white text. High-radius (pill).
- **Secondary:** Transparent with a 1px `#6C63FF` border.
- **Ghost:** No border, text-only with an icon, used for navigation.

### Charts & Data Viz
Lines should be `2.5px` thick with a soft glow. Use the primary accent colors (Green for growth, Orange for decline). The area under the line should have a subtle gradient fade to transparent.

### Navigation
Vertical sidebar with minimal icons. The active state is indicated by a vertical neon "indicator bar" on the far left and the icon/text switching to the accent color.

### Inputs
Fields should use a darker background than the card they sit on (`#080808`) with a focused border state that glows in the brand's primary Purple.