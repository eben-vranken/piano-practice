# Piano Improvisation Practice Suite

A comprehensive web-based training tool designed to develop piano improvisation skills through structured, timed exercises. Built with React.js.

## Features

- **Chord Wiki**: Reference library with 14 default chords and ability to add custom chords
- **Progressions**: Master 10 built-in chord progressions across all 24 keys with timed practice
- **Rhythm Patterns**: Develop rhythmic variety with 12 different patterns and built-in metronome
- **Dynamics Coach**: Learn expressive playing through 24 dynamic and articulation exercises
- **Texture Explorer**: Explore 15 different piano textures and arrangement techniques

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

### Chord Wiki
- Browse and search through chord library
- Add custom chords (7ths, 9ths, sus chords, etc.)
- Visual piano keyboard shows chord fingerings

### Progressions
- Practice 10 built-in progressions (or add your own)
- Timer automatically advances through progressions
- Automatically switches keys when needed
- Customizable timer duration (5-300 seconds)

### Rhythm Patterns
- 12 different rhythm patterns
- Built-in metronome (40-200 BPM)
- Works with current progression

### Dynamics Coach
- 24 dynamic patterns (static, changes, articulation, pedal)
- Visual guides for dynamic changes
- Develop expressive playing

### Texture Explorer
- 15 different piano textures
- Learn arrangement techniques
- Pattern guides for each texture

## Data Management

- All data is stored in browser localStorage
- Download your data as JSON for backup
- Upload previously saved JSON files
- Reset to defaults when needed

## Project Structure

```
piano-improvisation-practice/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChordWiki.js
│   │   ├── Progressions.js
│   │   ├── RhythmPatterns.js
│   │   ├── DynamicsCoach.js
│   │   ├── TextureExplorer.js
│   │   └── ...
│   ├── data/
│   │   └── defaultData.js
│   ├── utils/
│   │   ├── musicTheory.js
│   │   └── audio.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Technologies

- React 18
- Pure CSS (no frameworks)
- Web Audio API for metronome and beeps
- LocalStorage for data persistence

## License

This project is open source and available for personal and educational use.

# piano-practice
