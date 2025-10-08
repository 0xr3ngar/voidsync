# Bunkit

A modern TypeScript template for Bun with batteries included.

## ⚡ Quick Start

Use the CLI tool to create a new project instantly:

```bash
bunx create-bunkit my-project
```

Or clone manually if you prefer.

## 🚀 What's Inside

- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[TypeScript](https://www.typescriptlang.org/)** - Strict type checking
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Knip](https://knip.dev/)** - Finds unused files, dependencies, and exports
- **Path aliases** - Clean imports with `@/` prefix
- **Built-in testing** - Using Bun's fast test runner
- **Assert utilities** - Type-safe assertions
- **Type-safe config** - Environment variables with proper typing

## 🛠️ Manual Setup

If you prefer to clone manually:

1. **Clone this template:**
   ```bash
   git clone https://github.com/0xr3ngar/bunkit my-project
   cd my-project
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Update package.json:**
   - Change `name` field to your project name
   - Update `description`, `author`, and other metadata

4. **Start coding!**
   ```bash
   bun run dev
   ```

## 📦 Scripts

### Development
```bash
bun run dev          # Run in watch mode (auto-reload on changes)
bun run start        # Run once
```

### Testing
```bash
bun run test         # Run tests once
bun run test:watch   # Run tests in watch mode
```

### Building
```bash
bun run build        # Build for production
```

### Code Quality
```bash
bun run typecheck    # Type check with TypeScript
bun run biome:check  # Format + lint + fix all issues
bun run biome:format # Format code only
bun run biome:lint   # Lint code only
bun run knip         # Find unused code and dependencies
bun run check        # Run all checks (typecheck + biome + knip)
```

## 🏗️ Project Structure

```
.
├── src/
│   ├── __tests__/        # Test files
│   ├── utils/            # Utility functions
│   │   └── assert.ts     # Assertion utilities
│   ├── config.ts         # Environment configuration
│   └── index.ts          # Main entry point
├── .env.example          # Environment variables template
├── biome.json            # Biome configuration
├── knip.json             # Knip configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## 🔧 Configuration

### TypeScript (`tsconfig.json`)
- Strict type checking enabled
- Path aliases: `@/*` maps to `src/*`
- Optimized for Bun runtime

### Biome (`biome.json`)
- **Formatting:** 4 spaces, double quotes
- **Linting:** Recommended rules enabled

### Knip (`knip.json`)
Scans `src/**/*.ts` for unused code and dependencies.

## 💡 Tips

### Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your values
3. Access them type-safely via `src/config.ts`

### Path Aliases
Use clean imports throughout your project:
```typescript
// Instead of this:
import { something } from "../../utils/helpers";

// Do this:
import { something } from "@/utils/helpers";
```

### Assert Utilities
```typescript
import { assert, assertDefined } from "@/utils/assert";

const value = assertDefined(process.env.API_KEY, "API_KEY");
assert(value.length > 0, "API_KEY must not be empty");
```

### VSCode Setup
Install the recommended extensions (Biome + Bun). The workspace is pre-configured to format on save.

### CI/CD
The included GitHub Actions workflows run all checks in parallel automatically on push/PR:
- Test - Runs unit tests
- Typecheck - Validates TypeScript types
- Format - Checks code formatting and linting
- Knip - Finds unused code and dependencies
- Build - Verifies project builds successfully

## 🔗 Related

- **[create-bunkit](https://www.npmjs.com/package/create-bunkit)** - CLI tool to scaffold new projects from this template

## 📝 License

MIT

