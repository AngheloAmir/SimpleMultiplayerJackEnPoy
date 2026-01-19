import { useState } from 'react';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Playing from './components/Playing';
import './App.css';

type GameScreen = 'welcome' | 'playing';
type Team = 'red' | 'blue';

function App() {
  const [screen, setScreen] = useState<GameScreen>('welcome');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setScreen('playing');
  };

  const handleBack = () => {
    setScreen('welcome');
    setSelectedTeam(null);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {screen === 'welcome' && (
          <Welcome onTeamSelect={handleTeamSelect} />
        )}
        {screen === 'playing' && selectedTeam && (
          <Playing team={selectedTeam} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

export default App;
