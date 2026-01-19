import React, { useRef, useEffect, useState, useCallback } from 'react';
import { initializeHandDetector, detectGesture, disposeDetector } from '../utils/handDetection';
import { sendFight } from '../utils/api';
import type { GestureType } from '../utils/gestures';

interface PlayingProps {
  team: 'red' | 'blue';
  onBack: () => void;
}

const gestureEmojis: Record<string, string> = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

const gestureNames: Record<string, string> = {
  rock: 'Rock',
  paper: 'Paper',
  scissors: 'Scissors',
};

const gestureImages: Record<string, string> = {
  rock: '/rock.png',
  paper: '/paper.png',
  scissors: '/scissors.png',
};

interface PracticeState {
  rock: boolean;
  paper: boolean;
  scissors: boolean;
}

const Playing: React.FC<PlayingProps> = ({ team, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentGesture, setCurrentGesture] = useState<GestureType>(null);
  const [isFighting, setIsFighting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Initializing camera...');
  const [gameResult, setGameResult] = useState<'Won' | 'Lost' | 'Draw' | null>(null);
  const [opponentGesture, setOpponentGesture] = useState<string | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  
  // Practice mode state
  const [practiceCompleted, setPracticeCompleted] = useState<PracticeState>({
    rock: false,
    paper: false,
    scissors: false,
  });

  const isPracticeComplete = practiceCompleted.rock && practiceCompleted.paper && practiceCompleted.scissors;

  // Update practice state when gesture is detected
  useEffect(() => {
    if (currentGesture && !isPracticeComplete) {
      setPracticeCompleted(prev => ({
        ...prev,
        [currentGesture]: true,
      }));
    }
  }, [currentGesture, isPracticeComplete]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStatusMessage('Loading hand detection model...');
      await initializeHandDetector();
      setStatusMessage('Ready! Show your hand gesture');
      setIsLoading(false);
    } catch (error) {
      console.error('Error starting camera:', error);
      setStatusMessage('Failed to access camera. Please allow camera permissions.');
      setIsLoading(false);
    }
  }, []);

  const detectLoop = useCallback(async () => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const gesture = await detectGesture(videoRef.current);
      if (gesture) {
        setCurrentGesture(gesture);
      }
    }
    animationFrameRef.current = requestAnimationFrame(detectLoop);
  }, []);

  useEffect(() => {
    startCamera();

    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      disposeDetector();
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  useEffect(() => {
    if (!isLoading) {
      detectLoop();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoading, detectLoop]);

  const handleFight = async () => {
    if (!currentGesture) {
      setStatusMessage('Show a gesture first!');
      return;
    }

    if (!isPracticeComplete) {
      setStatusMessage('Complete the practice first!');
      return;
    }

    setIsFighting(true);
    setStatusMessage('Fighting...');

    try {
      const response = await sendFight({
        team,
        gesture: currentGesture,
      });
      setStatusMessage(response.message || 'Fight sent successfully!');
      
      if (response.result) {
        setGameResult(response.result);
        setOpponentGesture(response.opponentGesture || null);
      }
    } catch (error) {
      setStatusMessage('Failed to send fight request');
    } finally {
      setIsFighting(false);
    }
  };

  return (
    <div className="playing-container">
      <div className="playing-layout">
        {/* Main Game Area */}
        <div className="game-area">
          {/* Practice Badge - Only show if practice not complete */}
          {!isPracticeComplete && (
            <div className="practice-badge">
              <h3 className="practice-title">🎯 Before fighting, let's practice first!</h3>
              <p className="practice-subtitle">
                Keep your hand visible and close to camera (but not too close)
              </p>
              
              <div className="practice-gestures">
                <div className={`practice-item ${practiceCompleted.rock ? 'completed' : ''}`}>
                  <img src={gestureImages.rock} alt="Rock" className="practice-image" />
                  <span className="practice-label">Rock</span>
                  {practiceCompleted.rock && <span className="practice-check">✓</span>}
                </div>
                
                <div className={`practice-item ${practiceCompleted.paper ? 'completed' : ''}`}>
                  <img src={gestureImages.paper} alt="Paper" className="practice-image" />
                  <span className="practice-label">Paper</span>
                  {practiceCompleted.paper && <span className="practice-check">✓</span>}
                </div>
                
                <div className={`practice-item ${practiceCompleted.scissors ? 'completed' : ''}`}>
                  <img src={gestureImages.scissors} alt="Scissors" className="practice-image" />
                  <span className="practice-label">Scissors</span>
                  {practiceCompleted.scissors && <span className="practice-check">✓</span>}
                </div>
              </div>
              
              <div className="practice-current">
                <span className="current-label">Current gesture:</span>
                <span className="current-gesture">
                  {currentGesture ? `${gestureEmojis[currentGesture]} ${gestureNames[currentGesture]}` : '—'}
                </span>
              </div>
            </div>
          )}

          {/* Webcam Display */}
          <div className="webcam-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="webcam-video"
            />
            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <p>{statusMessage}</p>
              </div>
            )}
            
            {/* Gesture Display Overlay */}
            <div className="gesture-display-overlay">
              <div className={`gesture-card-overlay ${currentGesture ? 'detected' : ''}`}>
                <span className="gesture-emoji-large">
                  {currentGesture ? gestureEmojis[currentGesture] : '🤚'}
                </span>
                <span className="gesture-label-overlay">
                  {currentGesture ? gestureNames[currentGesture] : 'No gesture'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <div className={`team-badge ${team}`}>
            <span className="team-emoji">{team === 'red' ? '🔴' : '🔵'}</span>
            <span className="team-label">Team {team === 'red' ? 'Red' : 'Blue'}</span>
          </div>

          <div className="status-area">
            <p className="status-message">{statusMessage}</p>
          </div>

          <div className="action-buttons">
            <button
              className="fight-button"
              onClick={handleFight}
              disabled={!currentGesture || isFighting || isLoading || !isPracticeComplete}
            >
              <span className="fight-text">
                {!isPracticeComplete ? 'Complete Practice First' : isFighting ? 'Fighting...' : 'FIGHT!'}
              </span>
              <div className="fight-glow"></div>
            </button>

            <button className="back-button" onClick={onBack}>
              ← Back to Menu
            </button>
          </div>

          <div className="gesture-guide">
            <h4>Gestures</h4>
            <div className="guide-items">
              <div className={`guide-item ${currentGesture === 'rock' ? 'active' : ''}`}>
                <span>✊</span> Rock
              </div>
              <div className={`guide-item ${currentGesture === 'paper' ? 'active' : ''}`}>
                <span>✋</span> Paper
              </div>
              <div className={`guide-item ${currentGesture === 'scissors' ? 'active' : ''}`}>
                <span>✌️</span> Scissors
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Game Result Overlay */}
      {gameResult && (
        <div className="result-overlay" onClick={() => setGameResult(null)}>
           <div className={`result-content result-${gameResult.toLowerCase()}`}>
              <div className="result-animation">
                {gameResult === 'Won' && '⭐⭐⭐'}
                {gameResult === 'Lost' && '😢'}
                {gameResult === 'Draw' && '🤝'}
              </div>
              <h2 className="result-title">You {gameResult}!</h2>
              {opponentGesture && (
                <p className="result-subtitle">
                   Opponent chose <span className="opponent-move">{opponentGesture}</span>
                </p>
              )}
              <p className="click-to-close">Tap to continue</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Playing;
