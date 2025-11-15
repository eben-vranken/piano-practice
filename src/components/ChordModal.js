import React, { useState, useEffect } from 'react';
import './Modal.css';

function ChordModal({ chord, onSave, onClose }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Major');
  const [notes, setNotes] = useState(['', '', '']);
  const [voicing, setVoicing] = useState('');

  useEffect(() => {
    if (chord) {
      setName(chord.name || '');
      setType(chord.type || 'Major');
      setNotes(chord.notes || ['', '', '']);
      setVoicing(chord.voicing || '');
    }
  }, [chord]);

  const handleAddNote = () => {
    setNotes([...notes, '']);
  };

  const handleNoteChange = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const handleRemoveNote = (index) => {
    if (notes.length > 1) {
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredNotes = notes.filter(n => n.trim() !== '');
    if (filteredNotes.length < 2) {
      alert('Please enter at least 2 notes');
      return;
    }
    onSave({
      name: name.trim(),
      type: type.trim(),
      notes: filteredNotes,
      voicing: voicing.trim()
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{chord ? 'Edit Chord' : 'Add Chord'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Root Note:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="C, D, E, etc."
              required
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Major, Minor, maj7, 7, etc."
              required
            />
          </div>
          <div className="form-group">
            <label>Notes:</label>
            {notes.map((note, index) => (
              <div key={index} className="note-input-group">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  placeholder={`Note ${index + 1}`}
                  required
                />
                {notes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveNote(index)}
                    className="remove-button"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddNote}
              className="add-note-button"
            >
              + Add Note
            </button>
          </div>
          <div className="form-group">
            <label>Voicing (optional):</label>
            <input
              type="text"
              value={voicing}
              onChange={(e) => setVoicing(e.target.value)}
              placeholder="e.g., Root position, First inversion"
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChordModal;

