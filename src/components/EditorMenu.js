import React from 'react';
import './EditorMenu.css';

function EditorMenu({ chords, setChords, progressions, setProgressions, onDownload, onUpload, onReset }) {
  return (
    <div className="editor-menu">
      <div className="editor-actions">
        <button onClick={onDownload} className="download-button">
          📥 Download JSON
        </button>
        <label className="upload-button">
          📤 Upload JSON
          <input
            type="file"
            accept=".json"
            onChange={onUpload}
            style={{ display: 'none' }}
          />
        </label>
        <button onClick={onReset} className="reset-button">
          ↻ Reset to Defaults
        </button>
      </div>
      <div className="editor-info">
        <p>Download your data to save it, or upload a previously saved JSON file.</p>
        <p className="warning">⚠️ Resetting will remove all custom chords and progressions.</p>
      </div>
    </div>
  );
}

export default EditorMenu;

