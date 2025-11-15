import React, { useState, useEffect, useRef } from 'react';
import './TextureExplorer.css';
import { texturePatterns } from '../data/defaultData';
import { getProgressionChords, getRandomKey } from '../utils/musicTheory';

function TextureExplorer({ progressions }) {
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentProgression, setCurrentProgression] = useState(null);
  const [currentKey, setCurrentKey] = useState('C');
  const intervalRef = useRef(null);

  useEffect(() => {
    const allProgressions = [...progressions.defaultProgressions, ...progressions.customProgressions];
    if (allProgressions.length > 0) {
      const prog = allProgressions[0];
      setCurrentProgression(prog);
      setCurrentKey(getRandomKey(prog.keyType));
    }
  }, [progressions]);

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
    const nextIndex = (currentPatternIndex + 1) % texturePatterns.length;
    setCurrentPatternIndex(nextIndex);
    setTimeLeft(timer);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timer - timeLeft) / timer;
  const currentPattern = texturePatterns[currentPatternIndex];
  const progressionChords = currentProgression
    ? getProgressionChords(currentProgression, currentKey, currentProgression.keyType)
    : [];

  return (
    <div className="texture-explorer">
      <h2>Texture Explorer</h2>

      <div className="texture-info">
        <div className="texture-name">TEXTURE: {currentPattern.name}</div>
        <div className="texture-description">"{currentPattern.description}"</div>
        <div className="texture-pattern">
          <pre>{currentPattern.pattern}</pre>
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
              setCurrentPatternIndex((prev) => (prev + 1) % texturePatterns.length);
              setTimeLeft(timer);
            }}
            className="next-button"
          >
            Next Texture
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextureExplorer;

