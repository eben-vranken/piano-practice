import React, { useState, useEffect } from 'react';
import './App.css';
import ExerciseCard from './components/ExerciseCard';
import ChordWiki from './components/ChordWiki';
import Progressions from './components/Progressions';
import RhythmPatterns from './components/RhythmPatterns';
import DynamicsCoach from './components/DynamicsCoach';
import TextureExplorer from './components/TextureExplorer';
import EditorMenu from './components/EditorMenu';
import { defaultChords, defaultProgressions } from './data/defaultData';

function App() {
  const [activeExercise, setActiveExercise] = useState('progressions');
  const [chords, setChords] = useState({ defaultChords, customChords: [] });
  const [progressions, setProgressions] = useState({ defaultProgressions, customProgressions: [] });
  const [showEditor, setShowEditor] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedData = localStorage.getItem('pianoPracticeData');
        if (savedData) {
          const data = JSON.parse(savedData);
          if (data.chords) setChords(data.chords);
          if (data.progressions) setProgressions(data.progressions);
        }
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const data = {
          chords,
          progressions,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('pianoPracticeData', JSON.stringify(data));
      } catch (e) {
        console.error('Error saving data:', e);
      }
    }
  }, [chords, progressions]);

  const handleDownload = () => {
    const data = {
      chords,
      progressions,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'piano-practice-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.chords) setChords(data.chords);
          if (data.progressions) setProgressions(data.progressions);
        } catch (err) {
          alert('Error loading file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all data to defaults? This will remove all custom chords and progressions.')) {
      setChords({ defaultChords, customChords: [] });
      setProgressions({ defaultProgressions, customProgressions: [] });
    }
  };

  const exercises = [
    { id: 'chordwiki', name: 'Chord Wiki', icon: '🎹' },
    { id: 'progressions', name: 'Progressions', icon: '🎵' },
    { id: 'rhythm', name: 'Rhythm Patterns', icon: '🥁' },
    { id: 'dynamics', name: 'Dynamics Coach', icon: '🎚️' },
    { id: 'texture', name: 'Texture Explorer', icon: '🎨' }
  ];

  const renderExercise = () => {
    switch (activeExercise) {
      case 'chordwiki':
        return <ChordWiki chords={chords} setChords={setChords} />;
      case 'progressions':
        return <Progressions progressions={progressions} setProgressions={setProgressions} />;
      case 'rhythm':
        return <RhythmPatterns progressions={progressions} />;
      case 'dynamics':
        return <DynamicsCoach progressions={progressions} />;
      case 'texture':
        return <TextureExplorer progressions={progressions} />;
      default:
        return <Progressions progressions={progressions} setProgressions={setProgressions} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Piano Improvisation Practice Suite</h1>
        <p className="subtitle">Develop your improvisation skills through structured practice</p>
      </header>

      <nav className="exercise-nav">
        {exercises.map(ex => (
          <button
            key={ex.id}
            className={`nav-button ${activeExercise === ex.id ? 'active' : ''}`}
            onClick={() => setActiveExercise(ex.id)}
          >
            <span className="nav-icon">{ex.icon}</span>
            <span className="nav-text">{ex.name}</span>
          </button>
        ))}
      </nav>

      <div className="main-content">
        <ExerciseCard>
          {renderExercise()}
        </ExerciseCard>
      </div>

      <div className="editor-section">
        <button className="editor-toggle" onClick={() => setShowEditor(!showEditor)}>
          {showEditor ? '▼' : '▲'} Editor
        </button>
        {showEditor && (
          <EditorMenu
            chords={chords}
            setChords={setChords}
            progressions={progressions}
            setProgressions={setProgressions}
            onDownload={handleDownload}
            onUpload={handleUpload}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}

export default App;

