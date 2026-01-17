# Testing Guide

## How to Run Tests

### Prerequisites

Install dependencies:
```bash
npm install
```

### Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode (for development):
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Test Structure

Tests are located in the `__tests__` directory, mirroring the component structure:

```
__tests__/
└── components/
    └── achievements/
        └── AchievementsModal.test.tsx
```

## Test Coverage

### AchievementsModal Component Tests

The test suite covers:

1. **Modal Open/Close**
   - Modal renders when `isOpen` is true
   - Modal doesn't render when `isOpen` is false
   - Close button calls `onClose`
   - ESC key closes modal

2. **Compact View (Page 2)**
   - Renders compact view by default
   - Shows first 3 achievements
   - Switches to list view when "ver tudo" is clicked

3. **List View (Page 3)**
   - Renders list view with search input
   - Filters achievements by search query
   - Shows empty state when no matches
   - Opens detail view when achievement is clicked

4. **Detail View (Page 4)**
   - Renders detail view with achievement metadata
   - Navigates to previous/next achievement
   - Toggles watched state
   - Toggles pinned state
   - Returns to list view when back button is clicked

## Writing New Tests

### Example Test Structure

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YourComponent } from '@/components/YourComponent';

describe('YourComponent', () => {
  it('does something', async () => {
    const user = userEvent.setup();
    render(<YourComponent />);
    
    // Your test assertions
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Best Practices

1. **Use `userEvent` for interactions**: Prefer `userEvent` over `fireEvent` for more realistic user interactions
2. **Use `waitFor` for async operations**: Wait for elements to appear/disappear
3. **Test user flows**: Test complete user journeys, not just isolated components
4. **Mock external dependencies**: Mock API calls, timers, and browser APIs
5. **Use descriptive test names**: Test names should clearly describe what is being tested

## Debugging Tests

### View Test Output

Tests show detailed output in the terminal. For more verbose output:

```bash
npm test -- --verbose
```

### Debug Individual Tests

Add `debug()` to inspect rendered output:

```typescript
import { render, screen } from '@testing-library/react';

const { debug } = render(<YourComponent />);
debug(); // Prints the rendered HTML
```

### Common Issues

1. **Async operations**: Use `waitFor` or `findBy*` queries for async elements
2. **Portal components**: Mock components that use portals (like modals)
3. **Timers**: Use `jest.useFakeTimers()` for testing time-dependent code
4. **Cleanup**: Ensure proper cleanup between tests

## Continuous Integration

Tests should run automatically in CI/CD pipelines. Ensure:

- All tests pass before merging PRs
- Test coverage meets minimum thresholds
- Tests run on multiple Node.js versions (if applicable)

## Future Test Additions

Consider adding:

- E2E tests with Playwright or Cypress
- Visual regression tests
- Performance tests
- Accessibility tests (using `@testing-library/jest-dom` matchers)

