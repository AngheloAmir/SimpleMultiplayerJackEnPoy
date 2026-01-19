import React from 'react';

interface HeaderProps {
  team?: 'red' | 'blue' | null;
}

const Header: React.FC<HeaderProps> = ({ team }) => {
  return (
    <header className={`header ${team ? 'has-team' : ''}`}>
      <div className="header-content">
        {/* Brand View (Desktop or No Team) */}
        <div className={`brand-view ${team ? 'hide-on-mobile' : ''}`}>
          <div className="brand-icon">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path 
                d="M7 11V7a5 5 0 0 1 10 0v4" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <path 
                d="M4 11h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V11z" 
                fill="url(#gradient)"
              />
              <circle cx="12" cy="16" r="2" fill="#1a1a2e"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            {/* Hand gesture icon */}
            <div className="hand-icons">
              <span className="gesture-emoji">✊</span>
              <span className="gesture-emoji">✋</span>
              <span className="gesture-emoji">✌️</span>
            </div>
          </div>
          <h1 className="brand-name">
            <span className="brand-text">SimpleMultiplayer</span>
            <span className="brand-highlight">JackEnPoy</span>
          </h1>
        </div>

        {/* Mobile Team View */}
        {team && (
          <div className="mobile-team-view">
            <span className="team-emoji">{team === 'red' ? '🔴' : '🔵'}</span>
            <span className={`mobile-team-name team-text-${team}`}>
              Team {team === 'red' ? 'Red' : 'Blue'}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
