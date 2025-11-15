import React from 'react';
import './PianoKeyboard.css';

function PianoKeyboard({ notes = [] }) {
  // Create a visual representation of a piano keyboard
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  
  // Normalize a note to check if it matches (handles enharmonics)
  const normalizeNote = (note) => {
    // Convert flats to sharps for consistent matching
    const flatToSharp = {
      'Db': 'C#',
      'Eb': 'D#',
      'Gb': 'F#',
      'Ab': 'G#',
      'Bb': 'A#'
    };
    return flatToSharp[note] || note;
  };
  
  // Check if a note matches a key (handles enharmonics)
  const noteMatches = (note, key) => {
    const normalizedNote = normalizeNote(note);
    const normalizedKey = normalizeNote(key);
    return normalizedNote === normalizedKey;
  };
  
  // Check if a white key should be active
  const isWhiteKeyActive = (key) => {
    return notes.some(note => {
      // White keys match exact note names (C, D, E, F, G, A, B)
      // They should NOT match if the note is a sharp/flat version
      // So "A" matches "A", but "A#" or "Ab" does not match "A"
      return note === key;
    });
  };
  
  // Check if a black key should be active
  const isBlackKeyActive = (blackKeyNote) => {
    return notes.some(note => {
      // Check if note matches the black key or its enharmonic equivalent
      return noteMatches(note, blackKeyNote);
    });
  };

  return (
    <div className="piano-keyboard">
      <div className="white-keys">
        {whiteKeys.map((key, i) => {
          const isActive = isWhiteKeyActive(key);
          return (
            <div key={i} className={`white-key ${isActive ? 'active' : ''}`}>
              <span className="key-label">{key}</span>
            </div>
          );
        })}
      </div>
      <div className="black-keys">
        {[0, 1, 3, 4, 5].map((pos, i) => {
          const blackKeyNotes = ['C#', 'D#', 'F#', 'G#', 'A#'];
          const note = blackKeyNotes[i];
          const isActive = isBlackKeyActive(note);
          return (
            <div
              key={i}
              className={`black-key ${isActive ? 'active' : ''}`}
              style={{ left: `${pos * 14.28 + (pos >= 2 ? 7.14 : 0)}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PianoKeyboard;

