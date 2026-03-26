```markdown
# Design System Specification: Editorial Impact

## 1. Overview & Creative North Star
**The Creative North Star: "The Philanthropic Architect"**

This design system rejects the "country club" aesthetic in favor of a high-end, editorial-first experience. It is designed to feel like a premium digital monograph—combining the warmth of human impact with the precision of a modern architectural firm. 

We break the "template" look through **Intentional Asymmetry**. Layouts should avoid perfect centering; instead, use the spacing scale to create a rhythmic, staggered flow. By overlapping typography onto high-end imagery and utilizing fluid SVG dividers, we move away from rigid blocks and toward a continuous, storytelling-driven narrative. The goal is to make the user feel they are participating in a curated movement, not just browsing a website.

---

## 2. Colors & Surface Philosophy

The palette is a sophisticated interplay between "Active Energy" (Coral) and "Foundational Trust" (Deep Navy). 

### The Color Tokens
*   **Primary (#ab3500 / #ff6b35):** Reserved strictly for high-conversion moments. Use `primary` for text on light backgrounds and `primary_container` for large button fills.
*   **Secondary (#455f87):** Our "Anchor." Used for headers and primary navigation to establish authority.
*   **Tertiary (#2c694e):** The "Impact Green." Used specifically for data points regarding charity results and environmental growth.
*   **Accents:** `Golden Yellow` is reserved for "Prize" or "Reward" tiers to signify value without using garish metallic gradients.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Sectioning must be achieved through background shifts. For example, a `surface_container_low` section should transition into a `surface` section using a fluid SVG wave or a simple tonal jump. This creates a seamless, infinite-scroll feel rather than a boxed-in layout.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following logic for nesting:
1.  **Base Layer:** `surface` (#fbf9f5)
2.  **Sectioning Layer:** `surface_container_low` (#f5f3ef)
3.  **Component Layer (Cards):** `surface_container_lowest` (#ffffff) to create a subtle "pop" against the background.

### The "Glass & Gradient" Rule
To add soul to the UI, use **Glassmorphism** for floating navigation bars or overlay modals. Apply a `surface_container_lowest` fill at 70% opacity with a `20px` backdrop-blur. 
*   **Signature Gradient:** For Hero CTAs, use a linear gradient from `primary` (#ab3500) to `primary_container` (#ff6b35) at a 135-degree angle to provide depth.

---

## 3. Typography: The Manrope Scale

We use **Manrope** for its geometric yet approachable character. The hierarchy is designed for high-contrast legibility.

*   **Display (lg/md/sm):** Used for "Big Ideas." Set with `tight` letter-spacing (-0.02em) and `secondary` color. These should often be placed with asymmetrical margins (e.g., more padding-left than padding-right) to feel editorial.
*   **Headline (lg/md/sm):** Used for section titles. Ensure these are always `on_surface` to maintain warmth.
*   **Title (lg/md/sm):** Used for card titles and prominent UI labels.
*   **Body (lg/md/sm):** The workhorse. Always use `on_surface_variant` (#594139) for long-form text to reduce harsh contrast and increase the "Warm White" feel.
*   **Label (md/sm):** Used for eyebrow text (all caps, +0.1em tracking) to introduce sections.

---

## 4. Elevation & Depth: Tonal Layering

We convey importance through **Tonal Layering** rather than structural shadows.

*   **The Layering Principle:** Instead of a shadow, place a `surface_container_highest` card inside a `surface_container_low` wrapper. The shift in "temperature" creates the necessary visual separation.
*   **Ambient Shadows:** If a card must "float" (e.g., a prize modal), use a `primary_fixed` tinted shadow: `box-shadow: 0 20px 40px rgba(171, 53, 0, 0.06);`. This mimics natural light reflecting off the brand colors.
*   **The Ghost Border Fallback:** For input fields, use `outline_variant` at 20% opacity. Never use a 100% opaque border; it breaks the organic feel of the warm background.
*   **Subtle 3D Effects:** Use a `1px` inner-top highlight (white at 40% opacity) on buttons to give them a "molded" look, moving away from flat, "cheap" digital buttons.

---

## 5. Components

### Buttons (The "Tactile Action")
*   **Primary:** `primary_container` background, `on_primary_fixed` text. Radius: `full`. Padding: `spacing.3` x `spacing.8`.
*   **Secondary:** `surface_container_high` background with a `ghost border`. 
*   **Interaction:** On hover, translate -2px Y-axis and increase shadow spread.

### Cards & Impact Modules
*   **Constraint:** Forbid the use of divider lines.
*   **Separation:** Use `spacing.10` of vertical white space between content blocks or a subtle shift to `surface_container_lowest`.
*   **Imagery:** Use large corner radii (`xl`: 1.5rem) for images to maintain the "Soft Modern" feel.

### Input Fields
*   **Style:** Minimalist. No bottom line, just a `surface_container_low` background with `rounded.md`. 
*   **Focus State:** The background remains static, but the "Ghost Border" increases to 40% opacity in `primary`.

### Data Visualization (Charity Impact)
*   Use `tertiary` (Forest Green) for progress bars. These should be thick (`spacing.4`) with `full` rounding to feel substantial and friendly, rather than clinical.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace negative space. If a layout feels "full," add `spacing.12` to the margins.
*   **Do** use fluid SVG dividers to transition between a `secondary` (Deep Navy) footer and a `surface` background.
*   **Do** use overlapping elements. A "Prize" card (Golden Yellow) should slightly overlap the hero image to create depth.

### Don't:
*   **Don't** use pure black (#000000). Use `on_surface` (#1b1c1a) for all "black" text.
*   **Don't** use golf clichés like grass textures, golf ball dimple patterns, or crossed-club icons.
*   **Don't** use 1px borders. If you feel you need a line, use a background color change instead.
*   **Don't** center-align everything. Modern editorial design thrives on a strong, off-center focal point.

---
**Director's Note:** Every pixel should feel like it was placed with a purpose. If an element doesn't contribute to the feeling of "Warm Professionalism," remove it. We are building a movement, not just a platform. Use the tokens wisely.```