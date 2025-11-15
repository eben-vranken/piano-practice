import React from 'react';
import './ExerciseCard.css';

function ExerciseCard({ children }) {
  return (
    <div className="exercise-card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default ExerciseCard;

