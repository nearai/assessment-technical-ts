# Testing Guide

This project uses Jest and React Testing Library for testing. This guide will help you understand how to run tests and write new ones.

## Running Tests

To run all tests:
```bash
npm test
```

To run tests in watch mode (tests will re-run when files change):
```bash
npm run test:watch
```

To run tests with coverage report:
```bash
npm run test:coverage
```

## Test Structure

Tests are organized in `__tests__` directories next to the files they test:

- Component tests: `src/app/__tests__/`
- Utility function tests: `src/utils/__tests__/`

## Writing Tests

### Component Tests

For React components, use React Testing Library. Example:

```tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Utility Function Tests

For utility functions, write standard Jest tests. Example:

```ts
import { myUtilityFunction } from '../myUtility';

describe('myUtilityFunction', () => {
  it('returns expected result', () => {
    const result = myUtilityFunction(input);
    expect(result).toBe(expectedOutput);
  });
});
```

## Mocking

### Mocking Components

```tsx
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});
```

### Mocking API Calls

```tsx
jest.mock('../api', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: 'mocked data' }),
}));
```

## Best Practices

1. Test behavior, not implementation
2. Keep tests simple and focused
3. Use descriptive test names
4. Avoid testing implementation details
5. Use setup and teardown functions for common test setup