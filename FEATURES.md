# TypeFlow — Features Documentation

## Overview

TypeFlow is a typing trainer that helps users improve their typing speed and accuracy through practice with various text levels.

---

## TextWriter Component

**Location**: `src/components/GameComponent/TextWriter.tsx`

### How It Works

1. User types characters on keyboard
2. Each character is compared to the expected text at the same position
3. Visual feedback shows correct (green) and incorrect (red) characters
4. WPM (Words Per Minute) is calculated when text is completed

### Features

- **Character-by-character validation**: Each typed character is compared with expected text
- **Color feedback**:
  - Green = correct character
  - Red = incorrect character
  - Gray = not yet typed
- **WPM calculation**: Uses standard formula: `(characters / 5) / minutes`
- **Timer**: Starts on first keypress, ends when text is complete
- **Wrong language detection**: Shows "Change language" warning if non-English keys pressed
- **Shift support**: Capital letters when Shift is held

### Win Screen

When text is completed, a win screen appears showing:
- "Finished!" message
- WPM score
- Animated appearance

---

## Theme System

**Location**: `src/context/ThemeContext.tsx`, `src/themes.css`

### Theme Options

1. **Light** — Light background with purple accent colors
2. **Dark** — Dark background (#0c0c1a) with muted purple accents
3. **System** — Follows OS color scheme preference

### How to Switch

- **Sidebar**: Theme switcher button at bottom of sidebar
- **Settings Page**: Theme option in Appearance section

### CSS Variables

All colors use CSS variables defined in `themes.css`:

```css
--sidebar-bg    /* Sidebar background */
--background    /* Main content background */
--text-primary  /* Main text color */
--text-secondary /* Secondary/muted text */
--border        /* Border color */
--hover         /* Hover state background */
--accent        /* Accent color (buttons, links) */
```

---

## Levels System

**Location**: `src/levels_data.ts`

### Structure

```typescript
{
  id: number,
  title: string,
  text: string,
  difficulty: 'easy' | 'medium' | 'hard'
}
```

### Default Levels

1. **Hello World** (easy) — "hello world"
2. **Short Sentence** (easy) — "The quick brown fox..."
3. **Pangram** (medium) — "Pack my box with five dozen..."
4. **Programming** (medium) — JavaScript code snippet
5. **Speed Test** (hard) — Long motivational quote

### Level Selection

- Navigate to `/levels` to see all levels
- Each level is displayed as a card button
- Clicking opens `LevelPage` with the level's text

---

## Sidebar Navigation

**Location**: `src/components/Sidebar/`

### Behavior

- **Collapsed**: Shows only icons, centered
- **Expanded** (on hover): Shows icons + labels
- Icons remain in same position when expanding

### Items

- Home (`/`)
- Levels (`/levels`)
- About (`/about`)
- Settings (`/settings`)
- Theme Switcher (bottom)

---

## Pages

### HomePage (`/`)

- Welcome title with gradient text
- Instructions on how to use TextWriter
- "Try Random Text" button — loads random level text

### LevelListPage (`/levels`)

- Title: "Choose Your Level"
- Subtitle: "Practice makes perfect..."
- Decorative gradient circles on background
- List of level buttons

### LevelPage (`/level/:levelId`)

- TextWriter component with level's text
- Real-time character validation
- Win screen with WPM on completion

### SettingsPage (`/settings`)

- Theme switcher
- Sections: Appearance, Typing, Statistics
- "Coming Soon" badges for future features

### AboutPage (`/about`)

- Gradient title "TypeFlow"
- "Your personal typing coach" tagline
- Three feature cards: Learn, Track, Improve
- Description paragraph
- Tech stack footer

---

## Styling Conventions

- **Gradients**: Purple gradient `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Shadows**: Soft shadows `0 4px 20px rgba(0, 0, 0, 0.08)`
- **Border radius**: 16px for cards, 12px for buttons, 8px for small elements
- **Transitions**: `0.3s ease` for most interactive elements
- **Hover effects**: Translate Y + shadow increase

---

## Docker Deployment

### Build & Push

```bash
docker build -t type-test .
docker tag type-test YOUR_USERNAME/type-test:latest
docker push YOUR_USERNAME/type-test:latest
```

### Run on Server

```bash
docker pull YOUR_USERNAME/type-test:latest
docker run -d -p 80:80 --name type-test YOUR_USERNAME/type-test:latest
```

Access at `http://<server-ip>:80`

---

## Future Features (Coming Soon)

- Sound effects toggle
- Keystroke visualization
- Progress tracking & statistics
- Accent color customization
- User accounts & leaderboards
