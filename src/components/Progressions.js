import React, { useState, useEffect, useRef } from 'react';
import './Progressions.css';
import { getProgressionChords, getRandomKey } from '../utils/musicTheory';
import { majorKeys, minorKeys } from '../data/defaultData';
import { playBeep } from '../utils/audio';
import ProgressionModal from './ProgressionModal';

function Progressions({ progressions, setProgressions }) {
  const [currentProgressionIndex, setCurrentProgressionIndex] = useState(0);
  const [currentKey, setCurrentKey] = useState('C');
  const [timer, setTimer] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);

  const allProgressions = [...progressions.defaultProgressions, ...progressions.customProgressions];
  const currentProgression = allProgressions[currentProgressionIndex];
  const currentKeyType = currentProgression?.keyType || 'Major';
  const progressionChords = currentProgression
    ? getProgressionChords(currentProgression, currentKey, currentKeyType)
    : [];

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

  useEffect(() => {
    // When progression changes, check if we need to switch key type
    if (currentProgression) {
      const requiredKeyType = currentProgression.keyType;
      const currentIsMajor = majorKeys.includes(currentKey);
      const shouldBeMajor = requiredKeyType === 'Major';

      if (currentIsMajor !== shouldBeMajor) {
        setCurrentKey(getRandomKey(requiredKeyType));
      }
    }
  }, [currentProgressionIndex, currentProgression]);

  const handleTimerComplete = () => {
    playBeep(600, 300);
    setIsRunning(false);
    
    // Move to next progression
    const nextIndex = (currentProgressionIndex + 1) % allProgressions.length;
    setCurrentProgressionIndex(nextIndex);
    
    // If we've completed all progressions, switch to new random key
    if (nextIndex === 0) {
      const newProgression = allProgressions[0];
      setCurrentKey(getRandomKey(newProgression.keyType));
    }
    
    setTimeLeft(timer);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentProgressionIndex(0);
    setCurrentKey(getRandomKey(allProgressions[0]?.keyType || 'Major'));
    setTimeLeft(timer);
  };

  const handleNewKey = () => {
    if (currentProgression) {
      setCurrentKey(getRandomKey(currentProgression.keyType));
    }
  };

  const handleTimerChange = (e) => {
    const newTimer = parseInt(e.target.value) || 30;
    setTimer(Math.max(5, Math.min(300, newTimer)));
    if (!isRunning) {
      setTimeLeft(newTimer);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timer - timeLeft) / timer;

  if (!currentProgression) {
    return <div>No progressions available</div>;
  }

  return (
    <div className="progressions">
      <div className="progressions-header">
        <h2>Progressions</h2>
        <button onClick={() => setShowModal(true)} className="add-progression-button">
          + Add Progression
        </button>
      </div>

      <div className="progression-info">
        <div className="progression-number">
          PROGRESSION {currentProgressionIndex + 1} / {allProgressions.length}
        </div>
        <div className="progression-description">{currentProgression.description}</div>
        <div className="progression-key">
          KEY: <strong>{currentKey} {currentKeyType.toUpperCase()}</strong>
        </div>
      </div>

      <div className="chord-sequence">
        {progressionChords.map((chord, index) => (
          <div key={index} className="chord-item">
            <div className="chord-name">{chord.name}</div>
            <div className="chord-numeral">{chord.numeral}</div>
            {index < progressionChords.length && (
              <div className="chord-arrow">→</div>
            )}
          </div>
        ))}
      </div>

      <div className="progress-dots">
        {Array.from({ length: allProgressions.length }).map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${i === currentProgressionIndex ? 'active' : ''}`}
          />
        ))}
      </div>

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
          <label>Timer (seconds):</label>
          <input
            type="number"
            value={timer}
            onChange={handleTimerChange}
            min="5"
            max="300"
            disabled={isRunning}
            className="timer-input"
          />
        </div>
        <div className="control-buttons">
          {!isRunning ? (
            <button onClick={handleStart} className="start-button">
              Start
            </button>
          ) : (
            <button onClick={handlePause} className="pause-button">
              Pause
            </button>
          )}
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
          <button onClick={handleNewKey} className="new-key-button">
            New Key
          </button>
        </div>
      </div>

      {showModal && (
        <ProgressionModal
          onSave={(progression) => {
            const newProgression = {
              ...progression,
              id: Date.now()
            };
            setProgressions({
              ...progressions,
              customProgressions: [...progressions.customProgressions, newProgression]
            });
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Progressions;

