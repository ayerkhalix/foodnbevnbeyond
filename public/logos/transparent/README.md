# Transparent restaurant logos

Produced with the built-in image-generation tool for background extraction.
Original source images remain in the parent directory. All four output PNGs
have a real alpha channel and share the PlaceLogo display treatment.

## Source mapping

- coco-resto.png: ../coco resto.png
- the-lighthouse.png: ../the lighthouse.png
- moringa-tree.png: ../moringa tree.png
- sa-kurbada.png: ../kurbada sa hapag karaenan.png

## Prompts

The Lighthouse, Moringa Tree, and Sa Kurbada each used this exact prompt,
substituting the source name in the two marked positions:

Use case: background-extraction. Edit target: the attached {source name} restaurant logo. Remove only the flat white background to true transparent alpha, including white negative space inside letters and around the artwork. Preserve the existing artwork, original colors, exact wording, spelling, typography, brush border if present, proportions, composition, and all fine details. Do not redesign, add, recolor, or invent anything. Output a clean transparent PNG of the original logo with a small even transparent margin, tightly framed around its visible artwork. This is a faithful background removal for a real restaurant website.

Coco Resto used this final prompt:

Background extraction only of the attached original COCO RESTO logo. Copy the original logo artwork exactly with identical colors, lettering and details, and replace the white canvas with 100% transparent alpha. All former flat white regions must be completely empty and transparent, including between palm fronds and lettering. Absolutely no green background, no haze, no shadow, no gradient, no glow, no reinterpretation. Preserve the dark green brush-stroke rectangular frame and green palm leaf, the black letters COCO RESTO, El Nido, Filipino Restaurant, and the footer unchanged. True transparent PNG, crisp edge cutout.

## Display and delivery

The website uses object-contain without a white tile, border, or shadow.
Next.js supplies responsive optimized images while retaining PNG source alpha.
Logo text and colors remain individual to each restaurant.
