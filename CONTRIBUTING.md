# Contributing to Angular Perfect Select

Thank you for your interest in contributing to Angular Perfect Select! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate in all interactions. We want to foster an inclusive and welcoming environment for everyone.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Environment details** (Angular version, browser, OS)
- **Code examples** or screenshots if applicable
- **Error messages** or console output

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:
- **Clear title and description**
- **Use case** - why this enhancement would be useful
- **Proposed solution** - how you envision it working
- **Alternatives considered**
- **Examples** from other libraries if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding standards** (see below)
3. **Write tests** for new features or bug fixes
4. **Update documentation** if you're changing APIs or adding features
5. **Ensure tests pass** before submitting
6. **Create a Pull Request** with a clear title and description

#### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG.md following the existing format
3. The PR will be merged once you have the approval of maintainers

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Angular CLI (`npm install -g @angular/cli`)

### Setup Instructions

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/angular-perfect-select.git
   cd angular-perfect-select
   ```

2. **Install dependencies**
   ```bash
   # Install library dependencies
   npm install

   # Install demo dependencies
   cd demo
   npm install
   cd ..
   ```

3. **Run the demo app**
   ```bash
   cd demo
   npm start
   # or
   npm run dev
   ```

   The demo will be available at `http://localhost:4200`

4. **Build the library**
   ```bash
   npm run build
   ```

5. **Run tests**
   ```bash
   npm test
   ```

## Project Structure

```
angular-perfect-select/
├── src/                         # Library source code
│   ├── lib/
│   │   ├── components/
│   │   │   └── perfect-select/  # Main component
│   │   ├── models/              # TypeScript interfaces
│   │   ├── constants/           # Theme definitions
│   │   ├── animations/          # Angular animations
│   │   └── directives/          # Custom directives
│   └── public-api.ts            # Public exports
├── demo/                        # Demo application
│   └── src/
│       ├── app/
│       │   ├── pages/           # Demo pages
│       │   ├── components/      # Demo components
│       │   ├── services/        # Demo services
│       │   └── data/            # Examples and metadata
│       └── styles.scss          # Global styles
├── package.json                 # Library package config
├── angular.json                 # Angular CLI config
├── README.md                    # Documentation
└── CHANGELOG.md                 # Version history
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Provide type annotations for all public APIs
- Avoid `any` types when possible
- Use interfaces for data structures
- Use enums for fixed sets of values

### Angular

- Use standalone components
- Prefer signals over RxJS observables for simple state
- Use OnPush change detection when possible
- Follow Angular style guide: https://angular.io/guide/styleguide

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use destructuring where appropriate

### Formatting

- Indent with 2 spaces
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Max line length: 100 characters (preferred)
- Use semicolons

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: Add support for custom badge colors
fix: Resolve keyboard navigation issue in RTL mode
docs: Update README with reactive forms example
```

## Testing

### Writing Tests

- Write unit tests for new features
- Ensure existing tests pass
- Aim for >85% code coverage
- Test edge cases and error conditions

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --code-coverage
```

## Documentation

When adding new features or changing APIs:

1. Update the README.md
2. Add TypeScript doc comments (JSDoc)
3. Update examples in the demo app
4. Add entries to CHANGELOG.md

## Release Process

(For maintainers only)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a git tag
4. Push to GitHub
5. Publish to npm
6. Create a GitHub release

## Questions?

If you have questions, please:
1. Check existing issues and discussions
2. Read the documentation
3. Create a new issue with the "question" label

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
