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

function App() {
  const [playerSize, setPlayerSize] = useState(MIN_PLAYER_SIZE);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [triggerRangeChange, setTriggerRangeChange] = useState(false);

  useEffect(() => {
    setPlayerInfo(
      Array.from({ length: playerSize }, (_, index) => {
        const playerObj = {
          number: index + 1,
          name: `Player ${index + 1}`,
          position: INITIAL_POSITION,
          score: 0,
        };
        return playerObj;
      })
    );
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

  function hideRangeAdjustor() {
    setTriggerRangeChange(false);
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
          onNameChange={handlePlayerNameChange}
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
          <Range />
          <PlayerSizeAdjustor numberOfPlayers={playerSize} onChange={handlePlayerSizeChange} />
          <Button
            onClick={() => handlePlayerSelection(null)}
            variant='contained'
            sx={{ marginTop: 2 }}
          >
            Unselect
          </Button>
          <ModeSwitch />
          {
            !triggerRangeChange ? null : (
              <RangeAdjustor
                players={playerInfo}
                onUpdate={hideRangeAdjustor}
              />
            )
          }
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
      </Paper>
    </MadaProvider>
  )
}

export default App
