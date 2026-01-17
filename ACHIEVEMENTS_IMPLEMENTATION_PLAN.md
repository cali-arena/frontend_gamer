# Achievements UX Implementation Plan

## 1. Page Breakdown & Requirements

### Page 1: Achievements Overview/List
**UI Elements:**
- Header section with title "Achievements" or similar
- Filter/search controls (if present)
- Grid/list of achievement cards
- Each card shows:
  - Achievement icon/image
  - Achievement name
  - Achievement description (possibly truncated)
  - Progress indicator (if applicable)
  - Locked/unlocked status
  - Completion percentage or progress bar
- Navigation to individual achievement details (Page 2)

**Interactions:**
- Click on achievement card → Opens Page 2 (modal or detail view)
- Filter/search achievements
- Scroll through achievement list
- Visual feedback on hover/click

### Page 2: Achievement Detail View
**UI Elements:**
- Achievement header:
  - Large achievement icon/image
  - Achievement name
  - Achievement description (full)
  - Completion status badge/indicator
- Progress section:
  - Progress bar with percentage
  - Current progress vs required progress
  - Time remaining (if applicable)
- Related information:
  - Unlock date (if unlocked)
  - Rarity/rarity badge
  - Category/tags
- Action buttons:
  - "Compare with Friends" → Opens Page 3
  - Close button
  - Back button

**Interactions:**
- Click "Compare with Friends" → Opens Page 3
- Close modal (ESC, click outside, close button)
- Keyboard navigation

### Page 3: Friend Comparison List
**UI Elements:**
- Header: "Compare Achievements" or similar
- List of friends with achievement status:
  - Friend avatar/icon
  - Friend name/username
  - Achievement status (unlocked/locked)
  - Unlock date (if unlocked)
  - Progress percentage (if applicable)
- Filter/sort options (if present)
- "View Details" or similar action per friend

**Interactions:**
- Click on friend → Opens Page 4 (friend's achievement detail)
- Sort/filter friends
- Close modal
- Back to Page 2

### Page 4: Friend's Achievement Detail
**UI Elements:**
- Similar to Page 2 but for friend's achievement
- Friend's information header:
  - Friend avatar
  - Friend name
- Achievement details:
  - Achievement icon
  - Achievement name
  - Achievement description
  - Friend's progress/completion status
  - Friend's unlock date
  - Comparison with current user (if applicable)
- Action buttons:
  - Back to Page 3
  - Close modal

**Interactions:**
- Navigate back to Page 3
- Close modal
- View comparison data

---

## 2. Proposed Folder/Component Structure

```
src/
├── components/
│   ├── achievements/
│   │   ├── AchievementCard.tsx          # Reusable achievement card component
│   │   ├── AchievementDetail.tsx        # Page 2: Individual achievement detail
│   │   ├── AchievementList.tsx          # Page 1: Main achievements list/grid
│   │   ├── FriendComparison.tsx         # Page 3: Friend comparison list
│   │   ├── FriendAchievementDetail.tsx  # Page 4: Friend's achievement detail
│   │   ├── AchievementProgress.tsx      # Progress bar component
│   │   ├── AchievementStatusBadge.tsx   # Locked/unlocked badge
│   │   └── AchievementModal.tsx         # Modal wrapper with focus trap
│   ├── ui/                              # Existing UI primitives (if any)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ProgressBar.tsx
│   └── layout/
│       └── PageContainer.tsx
├── types/
│   └── achievements.ts                  # TypeScript interfaces/types
├── hooks/
│   ├── useAchievements.ts              # Fetch achievements data
│   ├── useAchievementDetail.ts         # Fetch single achievement
│   ├── useFriendComparison.ts          # Fetch friend comparison data
│   └── useModal.ts                     # Modal state management
├── services/
│   └── achievementsApi.ts              # API service layer (mock/real)
├── data/
│   └── mockAchievements.ts             # Mock data/fixtures
├── utils/
│   ├── achievements.ts                 # Helper functions
│   └── accessibility.ts                # Focus trap, keyboard handlers
└── styles/
    └── achievements.module.css         # Component-specific styles
```

---

## 3. Data Model Types/Interfaces

```typescript
// types/achievements.ts

/**
 * Game entity
 */
export interface Game {
  id: string;
  name: string;
  slug: string;
  iconUrl?: string;
  description?: string;
}

/**
 * Achievement definition
 */
export interface Achievement {
  id: string;
  gameId: string;
  name: string;
  description: string;
  iconUrl: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  points: number;
  requirements: AchievementRequirement[];
  isSecret?: boolean;
  unlockDate?: string; // ISO date string
}

export type AchievementCategory = 
  | 'combat'
  | 'exploration'
  | 'social'
  | 'collection'
  | 'progression'
  | 'special';

export type AchievementRarity = 
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary';

export interface AchievementRequirement {
  type: 'kill' | 'collect' | 'complete' | 'time' | 'custom';
  target: number; // Target value
  current: number; // Current progress
  unit?: string; // e.g., "enemies", "items", "hours"
}

/**
 * User's achievement progress/unlock info
 */
export interface UserAchievement {
  achievementId: string;
  userId: string;
  isUnlocked: boolean;
  progress: number; // 0-100 percentage
  unlockDate?: string; // ISO date string
  currentProgress: number; // Current value toward requirement
  targetProgress: number; // Required value
  lastUpdated: string; // ISO date string
}

/**
 * Friend comparison data
 */
export interface FriendComparison {
  friendId: string;
  friendName: string;
  friendAvatarUrl?: string;
  achievementId: string;
  isUnlocked: boolean;
  unlockDate?: string;
  progress: number;
  currentProgress: number;
  targetProgress: number;
  comparison: ComparisonStats;
}

export interface ComparisonStats {
  userUnlocked: boolean;
  friendUnlocked: boolean;
  userProgress: number;
  friendProgress: number;
  userUnlockDate?: string;
  friendUnlockDate?: string;
  timeDifference?: number; // milliseconds difference
}

/**
 * API Response types
 */
export interface AchievementsResponse {
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  total: number;
}

export interface AchievementDetailResponse {
  achievement: Achievement;
  userAchievement: UserAchievement | null;
}

export interface FriendComparisonResponse {
  comparisons: FriendComparison[];
  total: number;
}

export interface FriendAchievementDetailResponse {
  achievement: Achievement;
  friendComparison: FriendComparison;
}
```

---

## 4. State Flow & Navigation

### Navigation Flow:
```
Page 1 (AchievementList)
  └─> Click Achievement Card
      └─> Page 2 (AchievementDetail) [Modal]
          └─> Click "Compare with Friends"
              └─> Page 3 (FriendComparison) [Modal]
                  └─> Click Friend
                      └─> Page 4 (FriendAchievementDetail) [Modal]
```

### State Management Approach:

**Option A: URL-based (Recommended for Next.js)**
- Use Next.js router with query params
- `/achievements` → Page 1
- `/achievements?detail={id}` → Page 2
- `/achievements?detail={id}&compare=true` → Page 3
- `/achievements?detail={id}&compare=true&friend={friendId}` → Page 4
- Pros: Shareable URLs, browser back/forward works
- Cons: More complex routing logic

**Option B: Modal State (Simpler)**
- Use React state/context for modal stack
- Modal component manages which page is shown
- Stack-based navigation (push/pop)
- Pros: Simpler, no URL changes
- Cons: Not shareable, browser back doesn't work naturally

**Recommended: Hybrid Approach**
- Page 1: Regular page route
- Pages 2-4: Modal overlays with URL query params
- Modal state synced with URL params
- Browser back button closes modals in reverse order

### Implementation Pattern:

```typescript
// Modal stack management
interface ModalState {
  stack: ModalPage[];
  currentPage: ModalPage | null;
}

type ModalPage = 
  | { type: 'detail', achievementId: string }
  | { type: 'comparison', achievementId: string }
  | { type: 'friend-detail', achievementId: string, friendId: string };

// Navigation functions
- openDetail(achievementId)
- openComparison(achievementId)
- openFriendDetail(achievementId, friendId)
- closeModal()
- goBack()
```

---

## 5. Acceptance Criteria

### Visual Design
- [ ] **Dark Theme**: All pages use dark background (#1a1a1a or similar)
- [ ] **Rounded Cards**: All achievement cards have border-radius: 12px or 16px
- [ ] **Spacing**: Consistent padding/margins:
  - Card padding: 16px-24px
  - Grid gap: 16px-24px
  - Section spacing: 32px-48px
- [ ] **Subtle Borders**: Cards have subtle borders (1px, rgba(255,255,255,0.1))
- [ ] **Soft Shadows**: Cards have soft box-shadow (0 4px 6px rgba(0,0,0,0.1))
- [ ] **Typography**: Clear hierarchy with appropriate font sizes/weights
- [ ] **Icons**: Achievement icons are properly sized and aligned

### Modal Behavior
- [ ] **Open Animation**: Modal fades in with backdrop (300ms ease)
- [ ] **Close on ESC**: Pressing ESC closes current modal
- [ ] **Close on Backdrop Click**: Clicking outside modal closes it
- [ ] **Close Button**: Visible close button (X) in top-right corner
- [ ] **Back Button**: Back button navigates to previous modal/page
- [ ] **Modal Stack**: Multiple modals can be stacked (Page 2 → 3 → 4)
- [ ] **Close Order**: Closing modals in reverse order (LIFO)
- [ ] **URL Sync**: Modal state reflected in URL query params

### Accessibility
- [ ] **Focus Trap**: Tab key cycles only within modal when open
- [ ] **Focus Return**: Focus returns to trigger element when modal closes
- [ ] **Initial Focus**: First focusable element receives focus on modal open
- [ ] **ARIA Labels**: All interactive elements have proper aria-labels
- [ ] **ARIA Roles**: Modal has role="dialog" and aria-modal="true"
- [ ] **Keyboard Navigation**: 
  - Tab/Shift+Tab navigates focusable elements
  - Enter/Space activates buttons
  - ESC closes modal
- [ ] **Screen Reader**: Announcements for modal open/close
- [ ] **Skip Links**: Skip to main content available

### Responsive Design
- [ ] **Centered Modal**: Modal centered both horizontally and vertically
- [ ] **Max Width**: Modal max-width: 800px-1200px (desktop)
- [ ] **Max Height**: Modal max-height: 90vh
- [ ] **Mobile Width**: On mobile (< 768px), modal takes 95% width
- [ ] **Internal Scroll**: Content scrolls inside modal if exceeds max-height
- [ ] **Backdrop**: Backdrop covers full viewport
- [ ] **Grid Responsive**: Achievement grid adapts:
  - Desktop: 3-4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- [ ] **Touch Targets**: Minimum 44x44px touch targets on mobile

### Functionality
- [ ] **Data Loading**: Loading states shown during API calls
- [ ] **Error Handling**: Error states displayed for failed requests
- [ ] **Empty States**: Appropriate empty states (no achievements, no friends)
- [ ] **Progress Calculation**: Progress percentages calculated correctly
- [ ] **Date Formatting**: Dates formatted consistently (e.g., "2 days ago")
- [ ] **Filtering**: Filters work correctly (if implemented)
- [ ] **Search**: Search functionality works (if implemented)

### Performance
- [ ] **Lazy Loading**: Achievement images lazy-loaded
- [ ] **Code Splitting**: Modal components code-split
- [ ] **Memoization**: Expensive calculations memoized
- [ ] **Debouncing**: Search/filter inputs debounced

---

## 6. Mock API Layer

### File: `services/achievementsApi.ts`

```typescript
// Mock API service that can be swapped with real API later

export const achievementsApi = {
  // Get all achievements for a game
  async getAchievements(gameId: string): Promise<AchievementsResponse> {
    // Mock implementation
    // Later: return fetch(`/api/games/${gameId}/achievements`)
  },

  // Get single achievement detail
  async getAchievementDetail(
    gameId: string, 
    achievementId: string
  ): Promise<AchievementDetailResponse> {
    // Mock implementation
  },

  // Get friend comparisons for an achievement
  async getFriendComparisons(
    achievementId: string
  ): Promise<FriendComparisonResponse> {
    // Mock implementation
  },

  // Get friend's achievement detail
  async getFriendAchievementDetail(
    achievementId: string,
    friendId: string
  ): Promise<FriendAchievementDetailResponse> {
    // Mock implementation
  },
};
```

### File: `data/mockAchievements.ts`

```typescript
// Mock data fixtures
export const mockGames: Game[] = [...];
export const mockAchievements: Achievement[] = [...];
export const mockUserAchievements: UserAchievement[] = [...];
export const mockFriendComparisons: FriendComparison[] = [...];
```

### Swapping Strategy:
- Create interface/contract for API service
- Mock implementation uses fixtures
- Real implementation uses fetch/axios
- Swap by changing import path or using environment variable

```typescript
// Example swap pattern
const api = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'
  ? mockAchievementsApi
  : realAchievementsApi;
```

---

## 7. Implementation Checklist

### Phase 1: Setup & Types
- [ ] Create folder structure
- [ ] Define TypeScript interfaces/types
- [ ] Set up mock API layer
- [ ] Create mock data fixtures

### Phase 2: UI Components
- [ ] Create base UI primitives (if not exist)
- [ ] Build AchievementCard component
- [ ] Build AchievementProgress component
- [ ] Build AchievementStatusBadge component
- [ ] Build Modal wrapper with focus trap

### Phase 3: Page Components
- [ ] Build Page 1: AchievementList
- [ ] Build Page 2: AchievementDetail
- [ ] Build Page 3: FriendComparison
- [ ] Build Page 4: FriendAchievementDetail

### Phase 4: Navigation & State
- [ ] Implement modal state management
- [ ] Implement navigation flow
- [ ] Add URL sync for modals
- [ ] Add keyboard handlers (ESC, Tab)

### Phase 5: Styling
- [ ] Apply dark theme
- [ ] Style cards with rounded corners
- [ ] Add subtle borders and shadows
- [ ] Implement responsive grid
- [ ] Style modals (centered, max-width/height)

### Phase 6: Accessibility
- [ ] Implement focus trap
- [ ] Add ARIA labels and roles
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

### Phase 7: Polish & Testing
- [ ] Add loading states
- [ ] Add error states
- [ ] Add empty states
- [ ] Test all interactions
- [ ] Test responsive behavior
- [ ] Performance optimization

---

## 8. Technical Notes

### Modal Implementation Details:
- Use `react-focus-lock` or custom focus trap
- Use `react-aria-modal` or custom backdrop click handler
- Use `framer-motion` or CSS transitions for animations
- Use Next.js `useRouter` for URL sync

### Styling Approach:
- CSS Modules or Tailwind CSS (if already in project)
- Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px)
- Dark theme color palette:
  - Background: #1a1a1a
  - Card background: #252525
  - Border: rgba(255,255,255,0.1)
  - Text primary: #ffffff
  - Text secondary: rgba(255,255,255,0.7)

### Performance Considerations:
- Use `React.memo` for card components
- Use `useMemo` for filtered/sorted lists
- Use `useCallback` for event handlers
- Implement virtual scrolling if list is very long (>100 items)

---

## Next Steps

1. Review this plan and provide feedback
2. Share screenshots if available for visual refinement
3. Confirm tech stack (Next.js version, styling solution)
4. Check existing UI component library
5. Begin implementation following the checklist

