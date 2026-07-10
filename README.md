# CrazySort

**CrazySort** is an original mobile liquid-sorting puzzle game built with React Native and Expo. Pour colored liquid between glass jars until every jar holds a single color or stands empty.

Inspired by the liquid-sort puzzle genre, but with its own brand, palette, UI, and architecture.

## Tech Stack

- React Native + Expo SDK 57 (Expo Go compatible)
- Expo Router
- React Native Reanimated
- React Native Gesture Handler
- React Native SVG
- Async Storage
- Expo AV (sound effects + ambient music)
- Expo Haptics (tactile feedback on pour, select, victory)

## Getting Started

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on iOS or Android. The app runs in portrait mode only.

## Project Structure

```
app/                    Expo Router entry routes
src/
  assets/               Game assets (future)
  components/           Reusable UI (Jar, GameBoard, buttons)
  constants/            App name, colors, game rules
  context/              SaveProvider — global save state
  hooks/                React hooks (useGameEngine, useSave)
  navigation/           Route constants
  screens/              Screen compositions
  services/
    audio/              AudioManager — pour, tap, victory, music
    storage/              SaveManager + save schema
  game/
    engine/               GameEngine — state, undo, hints
    logic/                Pour rules, win detection, hints
    animations/           Animation constants
    levels/               Level data files
    models/               Jar model
    managers/             LevelManager
  utils/                  Shared utilities
```

## Architecture

Gameplay is separated from UI and persistence:

| Layer | Responsibility |
|-------|----------------|
| **Models** (`Jar`) | Data structure for jar state |
| **Logic** (`pourLogic`, `winDetection`, `hintLogic`) | Pure game rules |
| **Engine** (`GameEngine`) | State, selection, undo, hints |
| **Hooks** (`useGameEngine`) | React bridge to the engine |
| **SaveManager** | All AsyncStorage access |
| **Components** | Visual presentation only |

No component accesses AsyncStorage directly. All saves go through `SaveManager`.

## Screens

- **Main Menu** — Play / Resume, Level Select, Settings, Statistics
- **Game** — Level header, undo, restart, hint, pause, victory overlay with stars and coins
- **Level Select** — Grid of all 50 levels with unlock state and stars
- **Settings** — Sound and music preferences (persisted locally)
- **Statistics** — Stars, completions, averages, hints, coins

## Levels (Pack 01)

Version 1 ships **50 verified solvable levels** in `src/game/levels/pack01.js`.

- Level 1 is a handcrafted tutorial (`First Pour`)
- Levels 2–50 are randomly scrambled and BFS-verified via `scripts/generateLevels.js`
- Each level includes a `parMoves` target for star ratings

Star rules (`src/utils/stars.js`):

- **3★** — moves ≤ par
- **2★** — moves ≤ par + 4
- **1★** — otherwise

Coins: 10 per star earned on completion.

## Audio & Feedback (Stage 4)

Sound effects and ambient music via **Expo AV**, controlled in Settings:

| Sound | Trigger |
|-------|---------|
| Pour | Successful liquid transfer |
| Select | Jar selected |
| Tap | UI button press |
| Undo | Undo move |
| Victory | Level complete |
| Music | Ambient loop (optional) |

Haptic feedback (iOS/Android) on pour, select, undo, and victory.

Audio assets live in `src/assets/audio/`. Regenerate with:

```bash
node scripts/generateAudio.js
```

## Save System

Persisted locally via `@react-native-async-storage/async-storage`:

- Unlocked level and in-progress puzzle state
- Coins, stars, best moves per level
- Statistics and hint count
- Settings (sound, music)
- Achievement and daily reward placeholders for future features

Designed so a backend adapter can replace or sync local storage later.

## How to Play

1. Tap a jar with liquid to select it.
2. Tap another jar to pour.
3. Liquid pours only when the destination has room and is empty or the top colors match.
4. Consecutive matching layers pour together (LIFO — index 0 is the top).
5. Use **Undo**, **Restart**, or **Hint** from the toolbar.
6. Sort all colors to complete the level.

## Adding New Levels

Levels are plain data objects. Register new packs in `LevelManager`:

```javascript
export const level42 = {
  id: 41,
  number: 42,
  name: 'Violet Cascade',
  difficulty: 'medium',
  jarCount: 7,
  capacity: 4,
  parMoves: 24,
  jars: [
    ['ruby', 'sapphire', /* top to bottom — index 0 pours first */],
  ],
};
```

Regenerate pack 01 with `node scripts/generateLevels.js` if needed.

## Development Stages

- **Stage 1** ✅ Expo setup, engine, pour logic, win detection, playable prototype
- **Stage 2** ✅ Main menu, gameplay UI, undo, restart, animations, SaveManager
- **Stage 3** ✅ 50 levels, level select, victory screen, statistics polish
- **Stage 4** ✅ Audio, haptics, particles, victory animations, performance polish

## Roadmap

- [x] Main menu and navigation flow
- [x] Undo / restart with move history
- [x] Local save system
- [x] 50 handcrafted solvable levels
- [x] Level select and full progression
- [x] Audio and particle effects
- [ ] Achievements and daily rewards
- [ ] Cloud saves and leaderboards (future backend)

## License

See [LICENSE](LICENSE).
