import './App.css';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MadaProvider } from './context';
import Range from './components/Range';
import { INITIAL_POSITION, MIN_PLAYER_SIZE } from './constants';
import PlayerSizeAdjustor from './components/PlayerSizeAdjustor';
import { useEffect, useState } from 'react';
import PlayerCard from './components/PlayerCard';
import ModeSwitch from './components/ModeSwitch';
import Calculator from './components/Calculator';
import RangeAdjustor from './components/RangeAdjustor';
import NameForm from './components/NameForm';
import ScoreForm from './components/ScoreForm';

function App() {
  const [playerSize, setPlayerSize] = useState(MIN_PLAYER_SIZE);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [triggerRangeChange, setTriggerRangeChange] = useState(false);
  const [triggerNamesAdjust, setTriggerNamesAdjust] = useState(false);
  const [triggerScoreChange, setTriggerScoreChange] = useState(false);

  useEffect(() => {
    setPlayerInfo((players) => {
      return Array.from({ length: playerSize }, (_, index) => {
        const existingPlayer = players[index];
        return existingPlayer || {
          number: index + 1,
          name: '',
          position: INITIAL_POSITION,
          score: 0,
        };
      });
    });
  }, [playerSize]);


  function handlePlayerSizeChange(e) {
    setPlayerSize(e.target.value);
  }

  function handlePlayerNameChange(number, newName) {
    setPlayerInfo(playerInfo.map((player) => player.number === number ? { ...player, name: newName } : player));
  }

  function handlePlayerSelection(newSelectedPlayer) {
    setSelectedPlayer(newSelectedPlayer);
  }

  function updateSelectedPlayerPosition(newPosition, openRangeAdjustor) {
    setPlayerInfo(playerInfo.map((player) => player.number === selectedPlayer.number ? { ...player, position: newPosition } : player));
    setSelectedPlayer({ ...selectedPlayer, position: newPosition });
    setTriggerRangeChange(openRangeAdjustor);
  }

  function updateScore(points) {
    const newScore = selectedPlayer.score + points;
    setPlayerInfo(playerInfo.map((player) => player.number === selectedPlayer.number ? { ...player, score: newScore } : player));
    setSelectedPlayer({ ...selectedPlayer, score: newScore });
    setTriggerScoreChange(false);
  }

  function resetGame() {
    setPlayerInfo(playerInfo.map((player) => {
      return { ...player, position: INITIAL_POSITION, score: 0 }
    }));
    setSelectedPlayer(null);
  }

  const playerCards = playerInfo.map((player) => {
    return (
      <Grid
        key={player.number}
        xs={6} // Adjust for 2 items per row (2 by 4 grid)
        sm={3} // Responsive adjustment for different screen sizes
        item
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center each card in its grid cell
          alignItems: 'center',
        }}
      >
        <PlayerCard
          player={player}
          isSelected={selectedPlayer?.number === player.number}
          onScoreUpdate={() => setTriggerScoreChange(true)}
          onSelect={handlePlayerSelection}
        />
      </Grid>
    );
  });

  return (
    <MadaProvider>
      <Paper elevation={24} sx={{
        width: '90vw',
        height: '120vh',
        display: 'flex',
        flexDirection: 'column',
        margin: '30px auto',
        alignItems: 'center',
        borderRadius: '20px',
        '& > *': {
          display: 'inherit',
          alignItems: 'inherit',
          borderRadius: 'inherit'
        },
      }}>
        <Box disabled={triggerRangeChange} sx={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '5px',
          '& > *': {
            flexDirection: 'column'
          },
          width: '80%'

        }}>
          <Range onResetGame={resetGame} />
          <PlayerSizeAdjustor numberOfPlayers={playerSize} onChange={handlePlayerSizeChange} />
          <Button
            onClick={() => handlePlayerSelection(null)}
            variant='contained'
            sx={{ marginTop: 2 }}
          >
            Unselect
          </Button>
          <Button
            onClick={() => setTriggerNamesAdjust(true)}
            variant='contained'
            sx={{ marginTop: 2 }}
          >
            New Players
          </Button>
          <ModeSwitch />

        </Box>
        <Box sx={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '5px',
          '& > *': {
            flexDirection: 'column'
          },
          width: '80%'
        }}>
          <Grid
            container
            spacing={2} // Adjust spacing between grid items
            sx={{
              width: '1000px',
              margin: '10px auto 0',
              justifyContent: 'center', // Center the grid items
              alignItems: 'center', // Align items vertically
            }}
            disabled={triggerRangeChange}
          >
            {playerCards}
          </Grid>
          {
            !selectedPlayer ? null : (
              <Calculator
                selectedPlayer={selectedPlayer}
                onUpdate={updateSelectedPlayerPosition}
                disabled={triggerRangeChange}
              />
            )
          }

        </Box>
        <RangeAdjustor
          players={playerInfo}
          open={triggerRangeChange}
          onClose={() => setTriggerRangeChange(false)}
        />
        <NameForm
          players={playerInfo}
          onNameChange={handlePlayerNameChange}
          open={triggerNamesAdjust}
          onClose={() => setTriggerNamesAdjust(false)}
        />
        <ScoreForm
          open={triggerScoreChange}
          onClose={() => setTriggerScoreChange(false)}
          onUpdate={updateScore}
        />
      </Paper>
    </MadaProvider>
  )
}

export default App
