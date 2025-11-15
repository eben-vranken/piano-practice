export const defaultChords = [
  { name: "C", type: "Major", notes: ["C", "E", "G"] },
  { name: "D", type: "Major", notes: ["D", "F#", "A"] },
  { name: "E", type: "Major", notes: ["E", "G#", "B"] },
  { name: "F", type: "Major", notes: ["F", "A", "C"] },
  { name: "G", type: "Major", notes: ["G", "B", "D"] },
  { name: "A", type: "Major", notes: ["A", "C#", "E"] },
  { name: "B", type: "Major", notes: ["B", "D#", "F#"] },
  { name: "C", type: "Minor", notes: ["C", "Eb", "G"] },
  { name: "D", type: "Minor", notes: ["D", "F", "A"] },
  { name: "E", type: "Minor", notes: ["E", "G", "B"] },
  { name: "F", type: "Minor", notes: ["F", "Ab", "C"] },
  { name: "G", type: "Minor", notes: ["G", "Bb", "D"] },
  { name: "A", type: "Minor", notes: ["A", "C", "E"] },
  { name: "B", type: "Minor", notes: ["B", "D", "F#"] },
];

export const defaultProgressions = [
  {
    id: 1,
    name: "I – V – vi – IV",
    numerals: ["I", "V", "vi", "IV"],
    keyType: "Major",
    description: "Classic \"four-chord\" pop progression"
  },
  {
    id: 2,
    name: "vi – IV – I – V",
    numerals: ["vi", "IV", "I", "V"],
    keyType: "Major",
    description: "Starts on minor, popular in pop/rock"
  },
  {
    id: 3,
    name: "I – vi – IV – V",
    numerals: ["I", "vi", "IV", "V"],
    keyType: "Major",
    description: "Another common four-chord variation"
  },
  {
    id: 4,
    name: "IV – V – I – vi",
    numerals: ["IV", "V", "I", "vi"],
    keyType: "Major",
    description: "Circular feel, often in pop songs"
  },
  {
    id: 5,
    name: "I – IV – V",
    numerals: ["I", "IV", "V"],
    keyType: "Major",
    description: "Basic three-chord progression, rock/folk"
  },
  {
    id: 6,
    name: "ii – V – I",
    numerals: ["ii", "V", "I"],
    keyType: "Major",
    description: "Jazz standard progression"
  },
  {
    id: 7,
    name: "i – VII – VI – V",
    numerals: ["i", "VII", "VI", "V"],
    keyType: "Minor",
    description: "Descending minor progression"
  },
  {
    id: 8,
    name: "I – vi – ii – V",
    numerals: ["I", "vi", "ii", "V"],
    keyType: "Major",
    description: "Turnaround, jazz/pop standard"
  },
  {
    id: 9,
    name: "I – IV – ♭VII – IV",
    numerals: ["I", "IV", "bVII", "IV"],
    keyType: "Major",
    description: "Rock/pop flavour using ♭VII"
  },
  {
    id: 10,
    name: "vi – ii – V – I",
    numerals: ["vi", "ii", "V", "I"],
    keyType: "Major",
    description: "Circle of fifths root motion"
  }
];

export const rhythmPatterns = [
  {
    id: 1,
    name: "Whole Notes",
    description: "Hold each chord for 4 beats (slow, sustained)",
    notation: "𝅝    𝅝    𝅝    𝅝",
    counting: "1    2    3    4"
  },
  {
    id: 2,
    name: "Half Notes",
    description: "Play on beats 1 and 3",
    notation: "𝅗𝅥    𝅗𝅥",
    counting: "1    2    3    4"
  },
  {
    id: 3,
    name: "Quarter Note Pulse",
    description: "Steady beat on 1-2-3-4",
    notation: "♩    ♩    ♩    ♩",
    counting: "1    2    3    4"
  },
  {
    id: 4,
    name: "Eighth Notes",
    description: "Play on 1-and-2-and-3-and-4-and",
    notation: "♫    ♫    ♫    ♫",
    counting: "1 &  2 &  3 &  4 &"
  },
  {
    id: 5,
    name: "Dotted Quarter",
    description: "Longer, flowing feel",
    notation: "♩.   ♩.   ♩.",
    counting: "1    2    3    4"
  },
  {
    id: 6,
    name: "Syncopated",
    description: "Off-beat accents (1-and-2[rest]-and-4)",
    notation: "♩    ♪    ♩    ♪",
    counting: "1 &  2    3 &  4"
  },
  {
    id: 7,
    name: "Waltz (3/4)",
    description: "1-2-3, 1-2-3 (emphasis on beat 1)",
    notation: "♩    ♪    ♪",
    counting: "1    2    3"
  },
  {
    id: 8,
    name: "Swing Feel",
    description: "Triplet-based rhythm (shuffle)",
    notation: "♩    ♪    ♩    ♪",
    counting: "1 & a 2 & a 3 & a 4 & a"
  },
  {
    id: 9,
    name: "Ballad",
    description: "Sparse, expressive (whole and half notes with space)",
    notation: "𝅝    𝅗𝅥    𝅝",
    counting: "1    2    3    4"
  },
  {
    id: 10,
    name: "Bossa Nova",
    description: "Brazilian rhythm pattern",
    notation: "♩    ♪    ♪    ♩    ♪",
    counting: "1    2    3    4    &"
  },
  {
    id: 11,
    name: "Stride",
    description: "Left hand bass-chord-bass-chord pattern",
    notation: "♩    ♩    ♩    ♩",
    counting: "1    2    3    4"
  },
  {
    id: 12,
    name: "Arpeggiated",
    description: "Play chord notes one at a time",
    notation: "♪    ♪    ♪    ♪",
    counting: "1 &  2 &  3 &  4 &"
  }
];

export const dynamicPatterns = [
  { id: 1, name: "Pianissimo (pp)", description: "Very soft", type: "static", value: "pp" },
  { id: 2, name: "Piano (p)", description: "Soft", type: "static", value: "p" },
  { id: 3, name: "Mezzo-piano (mp)", description: "Moderately soft", type: "static", value: "mp" },
  { id: 4, name: "Mezzo-forte (mf)", description: "Moderately loud", type: "static", value: "mf" },
  { id: 5, name: "Forte (f)", description: "Loud", type: "static", value: "f" },
  { id: 6, name: "Fortissimo (ff)", description: "Very loud", type: "static", value: "ff" },
  { id: 7, name: "Crescendo", description: "Start soft (p), gradually build to loud (f)", type: "change", from: "p", to: "f" },
  { id: 8, name: "Decrescendo", description: "Start loud (f), gradually get softer", type: "change", from: "f", to: "p" },
  { id: 9, name: "Swell", description: "Soft → Loud → Soft", type: "change", from: "p", to: "f", back: true },
  { id: 10, name: "Terraced", description: "Sudden contrast (f → p instantly)", type: "change", from: "f", to: "p", sudden: true },
  { id: 11, name: "Wave", description: "pp → ff → pp over time", type: "change", from: "pp", to: "ff", back: true },
  { id: 12, name: "Build", description: "pp to ff slowly (over full duration)", type: "change", from: "pp", to: "ff" },
  { id: 13, name: "Legato", description: "Smooth, connected notes", type: "articulation", value: "legato" },
  { id: 14, name: "Staccato", description: "Short, detached notes", type: "articulation", value: "staccato" },
  { id: 15, name: "Accented", description: "Emphasis on beat 1 of each bar", type: "articulation", value: "accented" },
  { id: 16, name: "Tenuto", description: "Full value, slightly emphasized", type: "articulation", value: "tenuto" },
  { id: 17, name: "Marcato", description: "Strong accents", type: "articulation", value: "marcato" },
  { id: 18, name: "Piano Legato", description: "Soft and smooth", type: "combined", dynamic: "p", articulation: "legato" },
  { id: 19, name: "Forte Staccato", description: "Loud and detached", type: "combined", dynamic: "f", articulation: "staccato" },
  { id: 20, name: "Crescendo with Accents", description: "Build volume with emphasis", type: "combined", dynamic: "crescendo", articulation: "accented" },
  { id: 21, name: "Sustain Throughout", description: "Hold pedal down entire time", type: "pedal", value: "sustain" },
  { id: 22, name: "Pedal on Beat 1", description: "Press on downbeat, release before next", type: "pedal", value: "beat1" },
  { id: 23, name: "No Pedal", description: "Dry, clear sound", type: "pedal", value: "none" },
  { id: 24, name: "Half Pedal", description: "Subtle sustain", type: "pedal", value: "half" }
];

export const texturePatterns = [
  {
    id: 1,
    name: "Block Chords",
    description: "Both hands play full chords together",
    pattern: "RH: [C E G]\nLH: [C E G]"
  },
  {
    id: 2,
    name: "Broken Chords (Arpeggios)",
    description: "Play chord notes one at a time",
    pattern: "C - E - G - C - E - G..."
  },
  {
    id: 3,
    name: "Alberti Bass",
    description: "Left hand plays Low-High-Mid-High pattern, right hand plays melody",
    pattern: "LH: Low - High - Middle - High (C - G - E - G)\nRH: Melody or sustained chords"
  },
  {
    id: 4,
    name: "Bass + Chord",
    description: "Root in left, chord in right",
    pattern: "LH: C (root note)\nRH: [E G C] (chord tones)"
  },
  {
    id: 5,
    name: "Stride Piano",
    description: "Left hand alternates bass and chord",
    pattern: "LH: Bass - Chord - Bass - Chord\n     1     2     3     4"
  },
  {
    id: 6,
    name: "Shell Voicings",
    description: "Root and 7th only (jazz style)",
    pattern: "LH: C (root)\nRH: B (7th)"
  },
  {
    id: 7,
    name: "Melody + Bass",
    description: "Skip the middle",
    pattern: "LH: Bass notes (roots)\nRH: Melody line only"
  },
  {
    id: 8,
    name: "Two-Hand Spread",
    description: "Spread chord across both hands",
    pattern: "LH: C E\nRH: G C E"
  },
  {
    id: 9,
    name: "Rolling Chords",
    description: "Harp-like effect (bottom to top)",
    pattern: "C - E - G - C (quickly rolled)"
  },
  {
    id: 10,
    name: "Ostinato",
    description: "Repeating pattern that continues while harmony changes",
    pattern: "RH: C-E-G-E-C-E-G-E (pattern continues)\nLH: [Change chords underneath]"
  },
  {
    id: 11,
    name: "Pedal Point",
    description: "One note held/repeated while harmony changes above",
    pattern: "LH: C - C - C - C (stays on C)\nRH: [C] [Am] [F] [G] (chords change)"
  },
  {
    id: 12,
    name: "Tremolo",
    description: "Rapid alternation between two notes",
    pattern: "RH: C-E-C-E-C-E-C-E (fast repetition)"
  },
  {
    id: 13,
    name: "Countermelody",
    description: "Two melodic lines at once",
    pattern: "RH: Melody going up\nLH: Melody going down"
  },
  {
    id: 14,
    name: "Cluster Chords",
    description: "Dense, modern sound",
    pattern: "Play many adjacent notes together"
  },
  {
    id: 15,
    name: "Sparse/Space",
    description: "Lots of silence, minimal notes",
    pattern: "Play note... wait... play note... wait..."
  }
];

export const majorKeys = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
export const minorKeys = ["Am", "Bbm", "Bm", "Cm", "C#m", "Dm", "Ebm", "Em", "Fm", "F#m", "Gm", "G#m"];

// Roman numeral to scale degree mapping
export const majorScaleDegrees = {
  "I": 0, "ii": 1, "II": 1, "iii": 2, "III": 2, "IV": 3, "V": 4, "vi": 5, "VI": 5, "vii°": 6, "VII": 6, "bVII": 6
};

export const minorScaleDegrees = {
  "i": 0, "ii°": 1, "II": 1, "III": 2, "iv": 3, "IV": 3, "v": 4, "V": 4, "VI": 5, "vii°": 6, "VII": 6
};

// Major scale notes
export const majorScaleNotes = {
  "C": ["C", "D", "E", "F", "G", "A", "B"],
  "Db": ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  "D": ["D", "E", "F#", "G", "A", "B", "C#"],
  "Eb": ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  "E": ["E", "F#", "G#", "A", "B", "C#", "D#"],
  "F": ["F", "G", "A", "Bb", "C", "D", "E"],
  "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
  "G": ["G", "A", "B", "C", "D", "E", "F#"],
  "Ab": ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  "A": ["A", "B", "C#", "D", "E", "F#", "G#"],
  "Bb": ["Bb", "C", "D", "Eb", "F", "G", "A"],
  "B": ["B", "C#", "D#", "E", "F#", "G#", "A#"]
};

// Minor scale notes
export const minorScaleNotes = {
  "Am": ["A", "B", "C", "D", "E", "F", "G"],
  "Bbm": ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"],
  "Bm": ["B", "C#", "D", "E", "F#", "G", "A"],
  "Cm": ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
  "C#m": ["C#", "D#", "E", "F#", "G#", "A", "B"],
  "Dm": ["D", "E", "F", "G", "A", "Bb", "C"],
  "Ebm": ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
  "Em": ["E", "F#", "G", "A", "B", "C", "D"],
  "Fm": ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
  "F#m": ["F#", "G#", "A", "B", "C#", "D", "E"],
  "Gm": ["G", "A", "Bb", "C", "D", "Eb", "F"],
  "G#m": ["G#", "A#", "B", "C#", "D#", "E", "F#"]
};

