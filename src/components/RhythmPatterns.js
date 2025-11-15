import React, { useState, useEffect, useRef } from 'react';
import './RhythmPatterns.css';
import { rhythmPatterns } from '../data/defaultData';
import { getProgressionChords, getRandomKey } from '../utils/musicTheory';
import { Metronome } from '../utils/audio';

function RhythmPatterns({ progressions }) {
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [bpm, setBpm] = useState(80);
  const [metronomeOn, setMetronomeOn] = useState(false);
  const [currentProgression, setCurrentProgression] = useState(null);
  const [currentKey, setCurrentKey] = useState('C');
  const metronomeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Get first progression for display
    const allProgressions = [...progressions.defaultProgressions, ...progressions.customProgressions];
    if (allProgressions.length > 0) {
      const prog = allProgressions[0];
      setCurrentProgression(prog);
      setCurrentKey(getRandomKey(prog.keyType));
    }
  }, [progressions]);

  useEffect(() => {
    if (metronomeOn) {
      if (!metronomeRef.current) {
        metronomeRef.current = new Metronome(bpm);
      }
      metronomeRef.current.setBPM(bpm);
      metronomeRef.current.start();
    } else {
      if (metronomeRef.current) {
        metronomeRef.current.stop();
      }
    }
    return () => {
      if (metronomeRef.current) {
        metronomeRef.current.stop();
      }
    };
  }, [metronomeOn, bpm]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    const nextIndex = (currentPatternIndex + 1) % rhythmPatterns.length;
    setCurrentPatternIndex(nextIndex);
    setTimeLeft(timer);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timer - timeLeft) / timer;
  const currentPattern = rhythmPatterns[currentPatternIndex];
  const progressionChords = currentProgression
    ? getProgressionChords(currentProgression, currentKey, currentProgression.keyType)
    : [];

  return (
    <div className="rhythm-patterns">
      <h2>Rhythm Patterns</h2>

      <div className="rhythm-info">
        <div className="rhythm-name">RHYTHM: {currentPattern.name}</div>
        <div className="rhythm-description">"{currentPattern.description}"</div>
        <div className="rhythm-notation">
          <div className="notation">{currentPattern.notation}</div>
          <div className="counting">{currentPattern.counting}</div>
        </div>
      </div>

      <div className="metronome-section">
        <div className="metronome-controls">
          <label>BPM:</label>
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Math.max(40, Math.min(200, parseInt(e.target.value) || 80)))}
            min="40"
            max="200"
            className="bpm-input"
          />
          <button
            onClick={() => setMetronomeOn(!metronomeOn)}
            className={`metronome-button ${metronomeOn ? 'on' : ''}`}
          >
            {metronomeOn ? '▶ Metronome: ON' : '▶ Metronome: OFF'}
          </button>
        </div>
      </div>

      {currentProgression && (
        <div className="current-progression">
          <div className="progression-label">Current Progression:</div>
          <div className="progression-chords">
            {progressionChords.map((chord, i) => (
              <span key={i}>
                {chord.name}
                {i < progressionChords.length - 1 && ' → '}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="timer-section">
        <div className="timer-display">{formatTime(timeLeft)}</div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="controls">
        <div className="timer-control">
          <label>Duration (seconds):</label>
          <input
            type="number"
            value={timer}
            onChange={(e) => {
              const newTimer = parseInt(e.target.value) || 60;
              setTimer(Math.max(10, Math.min(300, newTimer)));
              if (!isRunning) setTimeLeft(newTimer);
            }}
            min="10"
            max="300"
            disabled={isRunning}
            className="timer-input"
          />
        </div>
        <div className="control-buttons">
          {!isRunning ? (
            <button onClick={() => setIsRunning(true)} className="start-button">
              Start
            </button>
          ) : (
            <button onClick={() => setIsRunning(false)} className="pause-button">
              Pause
            </button>
          )}
          <button
            onClick={() => {
              setIsRunning(false);
              setCurrentPatternIndex((prev) => (prev + 1) % rhythmPatterns.length);
              setTimeLeft(timer);
            }}
            className="next-button"
          >
            Next Pattern
          </button>
        </div>
      </div>
    </div>
  );
}

export default RhythmPatterns;

