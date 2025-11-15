import { majorScaleNotes, minorScaleNotes, majorScaleDegrees, minorScaleDegrees } from '../data/defaultData';

// Get chord from Roman numeral in a given key
export function getChordFromRomanNumeral(numeral, key, keyType) {
  const scaleNotes = keyType === "Major" ? majorScaleNotes[key] : minorScaleNotes[key];
  const scaleDegrees = keyType === "Major" ? majorScaleDegrees : minorScaleDegrees;
  
  const degree = scaleDegrees[numeral];
  if (degree === undefined) return null;
  
  const root = scaleNotes[degree];
  const isMinor = numeral.toLowerCase() === numeral && numeral !== "I" && numeral !== "IV" && numeral !== "V";
  
  // Build triad
  if (keyType === "Major") {
    if (numeral === "I" || numeral === "IV" || numeral === "V") {
      return buildMajorTriad(root, key);
    } else if (numeral === "ii" || numeral === "iii" || numeral === "vi") {
      return buildMinorTriad(root, key);
    } else if (numeral === "vii°") {
      return buildDiminishedTriad(root, key);
    }
  } else {
    if (numeral === "i" || numeral === "iv" || numeral === "v") {
      return buildMinorTriad(root, key);
    } else if (numeral === "III" || numeral === "VI" || numeral === "VII") {
      return buildMajorTriad(root, key);
    } else if (numeral === "ii°") {
      return buildDiminishedTriad(root, key);
    }
  }
  
  // Handle bVII (flat 7 in major) - this is the flat 7th from the tonic
  if (numeral === "bVII") {
    const tonic = scaleNotes[0]; // First note of the scale is the tonic
    const flat7 = getFlat7(tonic, key);
    return buildMajorTriad(flat7, key);
  }
  
  return buildMajorTriad(root, key);
}

function buildMajorTriad(root, key) {
  const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const rootIndex = chromatic.indexOf(root.replace("b", "").replace("#", ""));
  const third = chromatic[(rootIndex + 4) % 12];
  const fifth = chromatic[(rootIndex + 7) % 12];
  
  // Handle enharmonics
  return [root, adjustEnharmonic(third, root), adjustEnharmonic(fifth, root)];
}

function buildMinorTriad(root, key) {
  const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const rootIndex = chromatic.indexOf(root.replace("b", "").replace("#", ""));
  const third = chromatic[(rootIndex + 3) % 12];
  const fifth = chromatic[(rootIndex + 7) % 12];
  
  return [root, adjustEnharmonic(third, root), adjustEnharmonic(fifth, root)];
}

function buildDiminishedTriad(root, key) {
  const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const rootIndex = chromatic.indexOf(root.replace("b", "").replace("#", ""));
  const third = chromatic[(rootIndex + 3) % 12];
  const fifth = chromatic[(rootIndex + 6) % 12];
  
  return [root, adjustEnharmonic(third, root), adjustEnharmonic(fifth, root)];
}

function getFlat7(root, key) {
  const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const rootIndex = chromatic.indexOf(root.replace("b", "").replace("#", ""));
  const flat7 = chromatic[(rootIndex + 10) % 12];
  return adjustEnharmonic(flat7, root);
}

function adjustEnharmonic(note, context) {
  // Simple enharmonic adjustment - can be improved
  if (context.includes("b") && (note === "C#" || note === "F#")) {
    return note === "C#" ? "Db" : "Gb";
  }
  if (context.includes("#") && (note === "Db" || note === "Gb" || note === "Ab")) {
    if (note === "Db") return "C#";
    if (note === "Gb") return "F#";
    if (note === "Ab") return "G#";
  }
  return note;
}

// Get chord name from notes (for display)
export function getChordName(notes, key, keyType) {
  if (!notes || notes.length === 0) return "";
  
  const root = notes[0];
  // Simple check - if second note is 3 semitones up, it's minor
  const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const rootIndex = chromatic.indexOf(root.replace("b", "").replace("#", ""));
  const thirdIndex = chromatic.indexOf(notes[1].replace("b", "").replace("#", ""));
  
  const interval = (thirdIndex - rootIndex + 12) % 12;
  const type = interval === 3 ? "m" : "";
  
  return root + type;
}

// Convert progression numerals to actual chords
export function getProgressionChords(progression, key, keyType) {
  return progression.numerals.map(numeral => {
    const chordNotes = getChordFromRomanNumeral(numeral, key, keyType);
    const chordName = getChordName(chordNotes, key, keyType);
    return {
      numeral,
      name: chordName,
      notes: chordNotes
    };
  });
}

// Get random key
export function getRandomKey(keyType) {
  const keys = keyType === "Major" 
    ? ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
    : ["Am", "Bbm", "Bm", "Cm", "C#m", "Dm", "Ebm", "Em", "Fm", "F#m", "Gm", "G#m"];
  return keys[Math.floor(Math.random() * keys.length)];
}

