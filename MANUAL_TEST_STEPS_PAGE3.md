# Manual Test Steps - Page 3 (Expanded Achievements Modal)

## Prerequisites
- Application running on `http://localhost:3000`
- Browser with developer tools open
- Page 1 widget visible on profile page

## Opening Page 3

### From Page 1 Widget
- [ ] Click "ver tudo" button → Modal opens in **list view** (Page 3)
- [ ] Click anywhere on widget → Modal opens in **compact view** (Page 2)
- [ ] In compact view, click "ver tudo" → Switches to **list view** (Page 3)
- [ ] In compact view, click right arrow (→) → Switches to **list view** (Page 3)

## Page 3: List View Visual Tests

### Header Section
- [ ] **Title**: "Conquistas neste jogo" visible at top-left
- [ ] **Game Selector**: Dropdown visible at top-right
  - Default shows "Fortnite"
  - Dropdown has proper styling (dark background, rounded corners)
  - Dropdown arrow icon visible

### Category Tabs
- [ ] **Tabs Row**: 7 category tabs displayed horizontally
  - "Todas" (🏆)
  - "Combate" (⚔️)
  - "Exploração" (🗺️)
  - "Coleção" (📦)
  - "Progressão" (📈)
  - "Social" (👥)
  - "Especial" (⭐)
- [ ] **Tab Styling**: 
  - Large icon (32px) at top
  - Label text below icon
  - Rounded corners (12px)
  - Dark background (#252525)
  - Selected tab has blue border and glow
- [ ] **Default Selection**: "Todas" tab is selected by default

### Progress Bar
- [ ] **Progress Display**: Shows "X de Y alcançados" and "Z%" on right
  - Example: "8 de 15 alcançados" and "53%"
  - Numbers match actual unlocked/total count
- [ ] **Progress Bar**: 
  - Green gradient fill bar
  - Percentage matches the text
  - Smooth animation when switching games/categories

### Search Input
- [ ] **Search Field**: 
  - Placeholder: "Pesquisar conquista"
  - Search icon (🔍) on left
  - Clear button (×) appears when text is entered
  - Dark background, rounded corners
- [ ] **Search Functionality**:
  - Typing filters achievements in real-time
  - Searches both name and description
  - Case-insensitive search

### Compare Dropdown
- [ ] **Label**: "Comparar com" visible
- [ ] **Dropdown**: 
  - Shows "Nenhum" by default
  - Lists all friends (João Silva, Maria Santos, etc.)
  - Proper styling matches other dropdowns

### Achievements List
- [ ] **List Structure**:
  - Scrollable container
  - Each achievement is a row item
  - Unlocked achievements shown first
  - Locked achievements shown after divider

- [ ] **Achievement Row Items**:
  - Left side: Icon (56x56px) + Title + Description
  - Right side: Friend avatars (or "—" if none)
  - Rounded corners, dark background
  - Hover effect (slight lift/shadow)

- [ ] **Unlocked Achievements**:
  - Icon has green border/glow
  - Checkmark badge on icon
  - Full opacity
  - Shows friend avatars who have it

- [ ] **Locked Achievements**:
  - Icon is dimmed/grayscale
  - No checkmark
  - Reduced opacity
  - Shows friend avatars who have it

- [ ] **Friend Avatars**:
  - Small circular avatars (32px)
  - Shows up to 3 avatars
  - "+X" indicator if more than 3 friends have it
  - Placeholder letter if no avatar image
  - Tooltip shows friend name on hover

- [ ] **"Não alcançadas" Divider**:
  - Horizontal line with label
  - Appears between unlocked and locked sections
  - Label: "NÃO ALCANÇADAS" (uppercase, muted color)

- [ ] **Empty State**:
  - Shows "Nenhuma conquista encontrada" when filters return no results
  - Centered text, muted color

## Interaction Tests

### Game Selector
- [ ] **Change Game**:
  - Select different game from dropdown → Achievements list updates
  - Search query clears
  - Category resets to "Todas"
  - Progress bar updates
  - List scrolls to top

### Category Tabs
- [ ] **Switch Categories**:
  - Click "Combate" → Only combat achievements shown
  - Click "Exploração" → Only exploration achievements shown
  - Click "Todas" → All achievements shown
  - Selected tab has blue border/glow
  - List updates immediately
  - Search query persists

### Search Functionality
- [ ] **Search Achievements**:
  - Type "vitória" → Filters to achievements with "vitória" in name/description
  - Type "pouso" → Shows "Primeiro Pouso"
  - Clear search (×) → Shows all achievements again
  - Search works with category filter active

### Compare Mode
- [ ] **Select Friend**:
  - Select friend from dropdown → Comparison indicators appear
  - Each achievement row shows:
    - "Você ✓" or "Você ✗" (green/red)
    - "Amigo ✓" or "Amigo ✗" (blue/gray)
  - Friend avatars column still visible

- [ ] **Deselect Friend**:
  - Select "Nenhum" → Comparison indicators disappear
  - Returns to normal view

### Achievement Row Click
- [ ] **Click Achievement**:
  - Click any achievement row → Row becomes selected (blue border)
  - Other rows remain unselected
  - Visual feedback immediate
  - TODO: Should navigate to Page 4 (detail view) - placeholder for now

### Keyboard Navigation
- [ ] **Arrow Keys**:
  - Press ↓ (Down) → Focus moves to next achievement row
  - Press ↑ (Up) → Focus moves to previous achievement row
  - Focused row has blue border/glow
  - Scrolling follows focused item

- [ ] **Enter Key**:
  - Press Enter on focused row → Achievement selected (same as click)
  - TODO: Should open Page 4 detail view

- [ ] **Tab Navigation**:
  - Tab cycles through: Game selector → Category tabs → Search → Compare → Achievement rows
  - Focus trap works (can't tab outside modal)

### Scrolling
- [ ] **List Scrolling**:
  - Scroll wheel works inside achievements list
  - Scrollbar visible on right side
  - Custom scrollbar styling (dark, thin)
  - Modal backdrop stays fixed
  - Header stays visible at top

- [ ] **Long Lists**:
  - With many achievements, list scrolls smoothly
  - Focused item scrolls into view automatically

## Edge Cases

### Filter Combinations
- [ ] **Category + Search**:
  - Select "Combate" category
  - Search for "vitória"
  - Shows only combat achievements matching "vitória"
  - Progress bar updates correctly

- [ ] **Game + Category + Search**:
  - Switch to different game
  - Select category
  - Enter search query
  - All filters work together

### Empty States
- [ ] **No Results**:
  - Search for non-existent achievement → Empty state shown
  - Select category with no achievements → Empty state shown
  - Empty state message: "Nenhuma conquista encontrada"

- [ ] **No Locked Achievements**:
  - If all achievements unlocked → No "Não alcançadas" divider shown

- [ ] **No Unlocked Achievements**:
  - If no achievements unlocked → Divider at top, all in locked section

### Friend Data
- [ ] **No Friends Have Achievement**:
  - Achievement shows "—" in friends column
  - Comparison mode shows "Amigo ✗"

- [ ] **Many Friends Have Achievement**:
  - Shows first 3 avatars + "+X" indicator
  - Tooltip shows friend names

## Responsive Tests

- [ ] **Mobile View (< 768px)**:
  - Modal takes ~95% width
  - Category tabs wrap or scroll horizontally
  - Achievement rows stack properly
  - Touch targets are adequate (44x44px minimum)
  - All interactions work on touch

- [ ] **Tablet View**:
  - Layout adapts appropriately
  - All features accessible

- [ ] **Desktop View**:
  - Optimal layout
  - Max width respected (~900px)

## Performance Tests

- [ ] **Filtering Performance**:
  - Switching categories is instant
  - Typing in search is smooth (no lag)
  - No console errors or warnings

- [ ] **Rendering Performance**:
  - List scrolls smoothly (60fps)
  - No jank when switching views
  - Memory usage reasonable

## Accessibility Tests

- [ ] **Screen Reader**:
  - Modal announces when opened
  - Achievement rows have descriptive labels
  - Category tabs announce selection state
  - Progress bar announces progress

- [ ] **Keyboard Only**:
  - All functionality accessible via keyboard
  - Focus indicators clearly visible
  - Tab order logical

- [ ] **ARIA Attributes**:
  - Modal has proper role and aria-modal
  - Buttons have aria-labels
  - Selects have aria-labels
  - Progress bar has proper ARIA attributes

## Integration Tests

- [ ] **Page 1 → Page 3**:
  - Click "ver tudo" from widget → Opens Page 3 directly
  - Modal state persists correctly

- [ ] **Page 2 → Page 3**:
  - Open compact view → Click "ver tudo" → Switches to list view
  - State preserved (selected game, etc.)

- [ ] **Close Modal**:
  - ESC key closes modal
  - Click outside closes modal
  - X button closes modal
  - Focus returns to widget

## Notes

- Mock data includes 15 achievements across multiple categories
- 4 mock friends available for comparison
- Friend achievements mapping is randomized for testing
- Keyboard navigation uses arrow keys + Enter
- All filtering is memoized for performance
- Modal content scrolls independently of backdrop

