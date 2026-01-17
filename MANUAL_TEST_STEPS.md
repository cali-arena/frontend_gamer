# Manual Test Steps - Achievements Pages 1 & 2

## Prerequisites
- Application running on `http://localhost:3000`
- Browser with developer tools open (for console checks)

## Page 1: Conquistas Widget Tests

### Visual Tests
- [ ] **Widget Appearance**
  - Widget is visible in the profile page
  - Dark background (#252525) with rounded corners (16px)
  - Subtle border (rgba(255,255,255,0.1))
  - Proper spacing and padding

- [ ] **Header Section**
  - Title "Conquistas neste jogo" is visible and properly styled
  - "ver tudo" button is visible in the top-right of header
  - Button has blue-ish color (rgba(100, 150, 255))

- [ ] **Achievement Tiles**
  - Exactly 3 achievement tiles displayed
  - Each tile shows:
    - Achievement icon (or placeholder)
    - Achievement name below icon
  - Tiles are arranged in a 3-column grid
  - Tiles have rounded corners (12px)
  - Unlocked achievements show checkmark badge
  - Locked achievements appear dimmed/grayscale

### Interaction Tests
- [ ] **Widget Click**
  - Click anywhere on the widget → Modal (Page 2) opens
  - Modal appears with fade-in animation
  - Backdrop is dark and covers entire screen

- [ ] **"ver tudo" Button Click**
  - Click "ver tudo" button → Modal (Page 2) opens
  - Event does not bubble to widget click
  - Modal opens correctly

- [ ] **Hover States**
  - Hover over widget → Border becomes more visible, background slightly lighter
  - Hover over "ver tudo" button → Button background changes, color brightens
  - Hover over achievement tiles → Tiles lift slightly (translateY)

- [ ] **Keyboard Navigation**
  - Tab to widget → Widget receives focus (outline visible)
  - Press Enter/Space on widget → Modal opens
  - Tab to "ver tudo" button → Button receives focus
  - Press Enter/Space on button → Modal opens

## Page 2: Achievements Modal Tests

### Visual Tests
- [ ] **Modal Appearance**
  - Modal is centered on screen (both horizontally and vertically)
  - Dark background (#1a1a1a) with rounded corners (16px)
  - Subtle border and shadow
  - Max width: ~800px, responsive on mobile
  - Backdrop overlay covers entire screen (rgba(0,0,0,0.75))

- [ ] **Header Section**
  - Trophy icon (🏆) visible on the left
  - Title "Conquistas neste jogo" next to icon
  - "ver tudo" button visible (top-right area)
  - Edit/pencil icon (✏️) visible next to "ver tudo"
  - Close button (×) in top-right corner
  - Header has bottom border separator

- [ ] **Achievement Tiles**
  - 3 achievement tiles displayed in a row
  - Tiles show full information (icon + name + progress if applicable)
  - Tiles match the style from Page 1
  - Selected tile (if clicked) shows blue glow/outline

- [ ] **Navigation Button**
  - Right arrow button (→) visible after the 3 tiles
  - Button is properly styled and sized

### Interaction Tests - Close Behavior
- [ ] **Close Button (X)**
  - Click X button → Modal closes
  - Focus returns to widget on Page 1
  - Animation: fade-out

- [ ] **ESC Key**
  - Press ESC key → Modal closes
  - Focus returns to widget
  - Works from any focus position inside modal

- [ ] **Click Outside (Backdrop)**
  - Click on dark backdrop area → Modal closes
  - Clicking inside modal does NOT close it
  - Focus returns to widget

### Interaction Tests - Focus Trap
- [ ] **Focus Management**
  - When modal opens, first focusable element receives focus
  - Tab key cycles only through elements inside modal
  - Shift+Tab works in reverse
  - Cannot tab to elements outside modal (backdrop)
  - Focus is trapped until modal closes

- [ ] **Keyboard Navigation**
  - Tab through: Close button → "ver tudo" → Edit button → Achievement tiles → Arrow button
  - All elements are keyboard accessible
  - Enter/Space activates buttons
  - Visual focus indicators visible on all elements

### Interaction Tests - Content
- [ ] **Achievement Tile Click**
  - Click on an achievement tile → Tile becomes selected (blue glow)
  - Other tiles remain unselected
  - Visual feedback is immediate

- [ ] **"ver tudo" Button**
  - Click "ver tudo" in modal → Currently does nothing (placeholder for future navigation)
  - Button has hover state

- [ ] **Edit Button**
  - Click edit icon → Currently does nothing (placeholder)
  - Button has hover state

- [ ] **Arrow Button**
  - Click right arrow → Currently does nothing (placeholder for full view)
  - Button has hover state

### Responsive Tests
- [ ] **Mobile View (< 768px)**
  - Modal takes ~95% width
  - Header stacks vertically if needed
  - Achievement tiles stack vertically or adjust layout
  - All buttons remain accessible
  - Touch targets are at least 44x44px

- [ ] **Tablet View**
  - Modal is properly sized
  - Layout adapts appropriately

- [ ] **Desktop View**
  - Modal is centered and properly sized
  - Max width respected

## Accessibility Tests

- [ ] **Screen Reader**
  - Modal announces when opened (aria-modal="true")
  - All buttons have proper aria-labels
  - Achievement tiles have descriptive labels
  - Focus announcements work correctly

- [ ] **ARIA Attributes**
  - Modal has role="dialog"
  - Modal has aria-modal="true"
  - Modal has aria-labelledby pointing to title
  - Close button has aria-label="Fechar modal"

- [ ] **Keyboard Only Navigation**
  - All functionality accessible via keyboard only
  - No mouse required for any interaction
  - Focus indicators are clearly visible

## Edge Cases

- [ ] **Rapid Opening/Closing**
  - Quickly open and close modal multiple times → No errors, smooth behavior

- [ ] **Long Achievement Names**
  - Achievement names wrap properly, don't overflow

- [ ] **Missing Icons**
  - Placeholder icon (🏆) shows when iconUrl is missing

- [ ] **Body Scroll Lock**
  - When modal is open, body scroll is disabled
  - When modal closes, body scroll is restored

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- [ ] **Animation Performance**
  - Modal open/close animations are smooth (60fps)
  - No jank or stuttering

- [ ] **No Console Errors**
  - Check browser console for errors
  - No React warnings
  - No accessibility warnings

## Notes

- Mock data includes 3 Fortnite achievements
- Some buttons are placeholders for future navigation (Pages 3 & 4)
- All styles match dark theme with subtle borders and shadows
- Focus trap implementation prevents tabbing outside modal

