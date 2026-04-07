# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vite + React 19 + TypeScript project using React Compiler for performance optimization. Features CSS-based theming with CSS variables and React Router v7 for navigation.

## Commands

```bash
npm run dev        # Start development server with HMR
npm run build      # TypeScript check + Vite production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Architecture

- **Router**: React Router v7 (BrowserRouter). Routes defined in [App.tsx](src/App.tsx)
- **Theming**: CSS variables in [themes.css](src/themes.css), controlled via [ThemeContext](src/context/ThemeContext.tsx)
- **Navigation**: Sidebar component uses MenuContext for state management

### Page Structure

| Route | Component |
|-------|-----------|
| `/` | HomePage |
| `/levels` | LevelListPage |
| `/level/:levelId` | LevelPage |
| `/settings` | SettingsPage |

### Contexts

- [ThemeContext](src/context/ThemeContext.tsx) — theme switching via CSS variables
- [MenuContext](src/context/MenuContext.tsx) — sidebar menu state

## Tech Stack

- React 19 with React Compiler (`babel-plugin-react-compiler`)
- TypeScript with strict mode (tsconfig.app.json)
- ESLint flat config with typescript-eslint
- Vite 8 (beta)
