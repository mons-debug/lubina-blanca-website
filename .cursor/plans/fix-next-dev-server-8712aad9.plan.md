<!-- 8712aad9-de82-44f5-8c0c-8fd893b10acb 7dd407dd-1af7-4b6e-af17-98f4ea36d993 -->
# Zellige Pattern Refinement Plan

## 1. Fix AFCON Section - Remove Duplicate Zellige Layer

**File**: `components/AfconWatch.tsx`

Remove the second Zellige layer (lines 54-65) that creates the heavy/duplicated look. Keep only the first layer with optimized settings:

```tsx
{/* Zellige Moroccan Pattern Background */}
<div 
  className="absolute inset-0 opacity-[0.15]" 
  style={{
    backgroundImage: `url('/zelija moncef.svg')`,
    backgroundSize: '300px 300px',
    backgroundRepeat: 'repeat',
    filter: 'brightness(2.5) saturate(0) contrast(1.2)',
    mixBlendMode: 'overlay',
    animation: 'zelligeAfcon 35s ease-in-out infinite'
  }} 
/>
```

Remove the duplicate layer div and the `zelligeAfconReverse` animation from the style tag.

## 2. Add Wave Pattern to White Sections

**File**: `app/globals.css`

Add a second `::after` pseudo-element to body with wavy diagonal lines that complement the blue Zellige pattern:

```css
/* Wavy diagonal lines for seafood/Mediterranean theme */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 60px,
      rgba(94, 179, 206, 0.08) 60px,
      rgba(94, 179, 206, 0.08) 62px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 80px,
      rgba(94, 179, 206, 0.05) 80px,
      rgba(94, 179, 206, 0.05) 81px
    );
  pointer-events: none;
  z-index: 0;
  animation: wavyFlow 25s ease-in-out infinite;
}

@keyframes wavyFlow {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(-20px) translateY(10px);
  }
}
```

This creates subtle wavy diagonal lines in the restaurant's blue color that flow gently, creating harmony between the geometric Zellige tiles and the ocean/seafood theme.

## Result

- AFCON section will have clean, single-layer white Zellige pattern on red
- White sections will have blue Zellige tiles with complementary wavy diagonal lines
- Low opacity waves create subtle Mediterranean/coastal atmosphere without overwhelming content

### To-dos

- [ ] Add aboutImages array to restaurantData.ts with sample images
- [ ] Create /api/about-images route with GET, POST, DELETE handlers
- [ ] Update dataManager.ts to parse and write aboutImages
- [ ] Build swipeable card stack component in About.tsx with drag gestures and auto-play
- [ ] Add image management UI to admin about dashboard with upload/delete/reorder
- [ ] Style card stack with layering, animations, and mobile responsiveness