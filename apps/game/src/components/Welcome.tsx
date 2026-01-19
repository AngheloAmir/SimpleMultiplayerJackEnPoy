import React from 'react';

interface WelcomeProps {
  onTeamSelect: (team: 'red' | 'blue') => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onTeamSelect }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <h2 className="welcome-title">Welcome Player</h2>
          <p className="welcome-subtitle">Ready to challenge your opponent?</p>
        </div>
        
        <div className="team-selection">
          <h3 className="choose-text">Choose Your Side</h3>
          
          <div className="team-buttons">
            <button 
              className="team-button team-red"
              onClick={() => onTeamSelect('red')}
            >
              <div className="team-icon">🔴</div>
              <span className="team-name">Team Red</span>
              <div className="team-glow red-glow"></div>
            </button>
            
            <div className="vs-divider">
              <span>VS</span>
            </div>
            
            <button 
              className="team-button team-blue"
              onClick={() => onTeamSelect('blue')}
            >
              <div className="team-icon">🔵</div>
              <span className="team-name">Team Blue</span>
              <div className="team-glow blue-glow"></div>
            </button>
          </div>
        </div>
        
        <div className="game-hints">
          <p>✊ Rock beats ✌️ Scissors</p>
          <p>✋ Paper beats ✊ Rock</p>
          <p>✌️ Scissors beats ✋ Paper</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
