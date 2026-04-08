# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TypeFlow** — a modern typing trainer to improve typing speed and accuracy. Features real-time feedback, multiple difficulty levels, WPM tracking, and light/dark/system theme support.

## Commands

```bash
npm run dev        # Start development server with HMR
npm run build      # TypeScript check + Vite production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Docker

```bash
# Build
docker build -t type-test .

# Tag & Push
docker tag type-test username/type-test:latest
docker push username/type-test:latest

# Run on server
docker run -d -p 80:80 --name type-test username/type-test:latest
```

## Architecture

- **Router**: React Router v7 (BrowserRouter). Routes defined in [App.tsx](src/App.tsx)
- **Theming**: CSS variables in [themes.css](src/themes.css), controlled via [ThemeContext](src/context/ThemeContext.tsx)
- **Navigation**: Sidebar component uses MenuContext for state management

### Page Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Welcome page with instructions and "Try Random Text" button |
| `/levels` | LevelListPage | List of all typing levels |
| `/level/:levelId` | LevelPage | TextWriter with selected level text |
| `/settings` | SettingsPage | App settings and theme switcher |
| `/about` | AboutPage | About the project |

### Contexts

- [ThemeContext](src/context/ThemeContext.tsx) — theme switching (light/dark/system) via CSS variables
- [MenuContext](src/context/MenuContext.tsx) — sidebar menu state

### Key Files

- [levels_data.ts](src/levels_data.ts) — all typing levels with text and difficulty
- [TextWriter.tsx](src/components/GameComponent/TextWriter.tsx) — main typing game component
- [Sidebar.tsx](src/components/Sidebar/Sidebar.tsx) — navigation sidebar

## Tech Stack

- React 19 with React Compiler (`babel-plugin-react-compiler`)
- TypeScript with strict mode (tsconfig.app.json)
- ESLint flat config with typescript-eslint
- Vite 8 (beta)
- React Router v7
- React Icons (Feather Icons)
