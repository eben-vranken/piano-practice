import React, { useState } from 'react';
import './ChordWiki.css';
import ChordModal from './ChordModal';

function ChordWiki({ chords, setChords }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingChord, setEditingChord] = useState(null);

  const allChords = [...chords.defaultChords, ...chords.customChords];

  const filteredChords = allChords.filter(chord => {
    const search = searchTerm.toLowerCase();
    return (
      chord.name.toLowerCase().includes(search) ||
      chord.type.toLowerCase().includes(search) ||
      chord.notes.some(note => note.toLowerCase().includes(search))
    );
  });

  const handleAddChord = () => {
    setEditingChord(null);
    setShowModal(true);
  };

  const handleEditChord = (chord, isCustom) => {
    if (!isCustom) return; // Can't edit default chords
    setEditingChord({ ...chord, isCustom: true });
    setShowModal(true);
  };

  const handleDeleteChord = (chordId) => {
    setChords({
      ...chords,
      customChords: chords.customChords.filter(c => c.id !== chordId)
    });
  };

  const handleSaveChord = (chordData) => {
    if (editingChord && editingChord.id) {
      // Update existing
      setChords({
        ...chords,
        customChords: chords.customChords.map(c =>
          c.id === editingChord.id ? { ...chordData, id: editingChord.id } : c
        )
      });
    } else {
      // Add new
      const newChord = {
        ...chordData,
        id: Date.now()
      };
      setChords({
        ...chords,
        customChords: [...chords.customChords, newChord]
      });
    }
    setShowModal(false);
    setEditingChord(null);
  };

  return (
    <div className="chord-wiki">
      <div className="chord-wiki-header">
        <h2>Chord Wiki</h2>
        <div className="chord-wiki-controls">
          <input
            type="text"
            placeholder="Search chords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleAddChord} className="add-button">
            + Add Chord
          </button>
        </div>
      </div>

      <div className="chords-grid">
        {filteredChords.map((chord, index) => {
          const isCustom = index >= chords.defaultChords.length;
          return (
            <div key={index} className="chord-card">
              <div className="chord-header">
                <h3>{chord.name} {chord.type}</h3>
                {isCustom && (
                  <div className="chord-actions">
                    <button
                      onClick={() => handleEditChord(chord, true)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteChord(chord.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                )}
                {isCustom && <span className="custom-badge">Custom</span>}
              </div>
              <div className="chord-notes">
                <strong>Notes:</strong> {chord.notes.join(' - ')}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <ChordModal
          chord={editingChord}
          onSave={handleSaveChord}
          onClose={() => {
            setShowModal(false);
            setEditingChord(null);
          }}
        />
      )}
    </div>
  );
}

export default ChordWiki;

