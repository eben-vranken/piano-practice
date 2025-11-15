import React, { useState } from 'react';
import './Modal.css';
import { getProgressionChords, getRandomKey } from '../utils/musicTheory';
import { majorKeys } from '../data/defaultData';

function ProgressionModal({ onSave, onClose }) {
  const [name, setName] = useState('');
  const [numerals, setNumerals] = useState('');
  const [keyType, setKeyType] = useState('Major');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numeralArray = numerals.trim().split(/\s+/).filter(n => n);
    if (numeralArray.length === 0) {
      alert('Please enter at least one Roman numeral');
      return;
    }
    onSave({
      name: name.trim() || numeralArray.join(' – '),
      numerals: numeralArray,
      keyType,
      description: description.trim()
    });
  };

  // Preview in different keys
  const previewKeys = keyType === 'Major' ? ['C', 'A', 'F'] : ['Am', 'Dm', 'Fm'];
  const previews = previewKeys.map(previewKey => {
    try {
      const progression = {
        numerals: numerals.trim().split(/\s+/).filter(n => n),
        keyType
      };
      if (progression.numerals.length === 0) return null;
      const chords = getProgressionChords(progression, previewKey, keyType);
      return {
        key: previewKey,
        chords: chords.map(c => c.name).join(' → ')
      };
    } catch (e) {
      return null;
    }
  }).filter(p => p);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Progression</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Name (optional):</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="I-IV-V-I"
            />
          </div>
          <div className="form-group">
            <label>Key Type:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Major"
                  checked={keyType === 'Major'}
                  onChange={(e) => setKeyType(e.target.value)}
                />
                Major
              </label>
              <label>
                <input
                  type="radio"
                  value="Minor"
                  checked={keyType === 'Minor'}
                  onChange={(e) => setKeyType(e.target.value)}
                />
                Minor
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Roman Numerals (space-separated):</label>
            <input
              type="text"
              value={numerals}
              onChange={(e) => setNumerals(e.target.value)}
              placeholder="I IV V I"
              required
            />
            <small style={{ color: '#888', marginTop: '5px', display: 'block' }}>
              Examples: I IV V, vi IV I V, ii V I
            </small>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this progression..."
              rows="3"
            />
          </div>
          {numerals.trim() && (
            <div className="preview-section">
              <h3>Preview:</h3>
              {previews.map((preview, i) => (
                <div key={i} className="preview-item">
                  <strong>{preview.key} {keyType}:</strong> {preview.chords}
                </div>
              ))}
            </div>
          )}
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

export default ProgressionModal;

