import './App.css';
import Paper from '@mui/material/Paper';

import TopControls from './components/top-controls/TopControls';
import TurnManager from './components/TurnManager';

function App() {
  // const [playerSize, setPlayerSize] = useState(MIN_PLAYER_SIZE);
  // const [playerInfo, setPlayerInfo] = useState([]);
  // const [selectedPlayer, setSelectedPlayer] = useState(null);
  // const [triggerRangeChange, setTriggerRangeChange] = useState(false);
  // const [triggerNamesAdjust, setTriggerNamesAdjust] = useState(false);
  // const [triggerScoreChange, setTriggerScoreChange] = useState(false);
  // const [rounds, setRounds] = useState(0);
  // const [turnPlayer, setTurnPlayer] = useState(null);


  // useEffect(() => {
  //   setPlayerInfo((players) => {
  //     return Array.from({ length: playerSize }, (_, index) => {
  //       const existingPlayer = players[index];
  //       return existingPlayer || {
  //         number: index + 1,
  //         name: '',
  //         position: INITIAL_POSITION,
  //         score: 0,
  //       };
  //     });
  //   });
  // }, [playerSize]);


  // function handlePlayerSizeChange(e) {
  //   setPlayerSize(e.target.value);
  // }

  // function handlePlayerNameChange(number, newName) {
  //   setPlayerInfo(playerInfo.map((player) => player.number === number ? { ...player, name: newName } : player));
  // }

  // function updateSelectedPlayerPosition(newPosition, openRangeAdjustor) {
  //   setPlayerInfo(playerInfo.map((player) => player.number === selectedPlayer.number ? { ...player, position: newPosition } : player));
  //   setSelectedPlayer({ ...selectedPlayer, position: newPosition });
  //   setTriggerRangeChange(openRangeAdjustor);
  // }

  // function updateScore(points) {
  //   const newScore = selectedPlayer.score + points;
  //   setPlayerInfo(playerInfo.map((player) => player.number === selectedPlayer.number ? { ...player, score: newScore } : player));
  //   setSelectedPlayer(null);
  //   setTriggerScoreChange(false);
  // }

  // function startGame() {
  //   setTriggerNamesAdjust(false);
  //   setRounds(1);
  //   setTurnPlayer(playerInfo[0]);
  // }

  // function nextTurn(nextTurnPlayer, roundCompleted) {
  //   setTurnPlayer(nextTurnPlayer);
  //   if (roundCompleted) {
  //     setRounds((rounds) => rounds + 1);
  //   }
  // }

  // function resetGame() {
  //   setPlayerInfo(playerInfo.map((player) => {
  //     return { ...player, position: INITIAL_POSITION, score: 0 }
  //   }));
  //   setSelectedPlayer(null);
  //   setRounds(0);
  //   setTurnPlayer(null);
  // }

  // const playerCards = playerInfo.map((player) => {
  //   return (
  //     <Grid
  //       key={player.number}
  //       // item // Explicitly set this as a grid item
  //       // xs={6} // Adjust for 2 items per row
  //       // sm={3} // Responsive adjustment for different screen sizes
  //       size={{ xs: 6, sm: 3 }}
  //       sx={{
  //         display: 'flex',
  //         justifyContent: 'center', // Center each card in its grid cell
  //         alignItems: 'center',
  //       }}
  //     >
  //       <PlayerCard
  //         player={player}
  //         isSelected={selectedPlayer?.number === player.number}
  //         onScoreUpdate={() => setTriggerScoreChange(true)}
  //         onSelect={setSelectedPlayer}
  //       />
  //     </Grid>
  //   );
  // });


  return (
    <Paper elevation={24} sx={{
      width: '90vw',
      minHeight: '90vh',
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
      <TopControls />
      <TurnManager />
      {/* {
        (!rounds || !turnPlayer) ? null : (
          <TurnManager
            players={playerInfo}
            turnPlayer={turnPlayer}
            rounds={rounds}
            onUpdate={nextTurn}
          />
        )
      } */}
      {/* <Box sx={{
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
        <Dialog
          open={!!selectedPlayer && !triggerScoreChange}
          // onClose={() => setSelectedPlayer(null)} // Default behavior for closing
          onClose={(e, reason) => {
            if (reason === 'backdropClick') {
              console.log('Backdrop click disabled');
              return; // Do nothing on backdrop click
            }
            setSelectedPlayer(null); // Allow closing for other reasons
          }}
          sx={{
            // display: { xs: 'flex', md: 'none' },
            margin: '0 auto !important',
          }}
        >
          <UnselectButton
            onSelect={setSelectedPlayer}
            overrideHideControlSettings={true}
          />
          <MiniTracker selectedPlayer={selectedPlayer} />
          <Calculator
            selectedPlayer={selectedPlayer}
            onUpdate={updateSelectedPlayerPosition}
            disabled={triggerRangeChange}
          />
        </Dialog>
      </Box>
      <RangeAdjustor
        players={playerInfo}
        open={triggerRangeChange && rounds > 1}
        onClose={() => setTriggerRangeChange(false)}
      />
      <NameForm
        players={playerInfo}
        onNameChange={handlePlayerNameChange}
        open={triggerNamesAdjust}
        onClose={startGame}
      />
      <ScoreForm
        open={triggerScoreChange}
        onClose={() => setTriggerScoreChange(false)}
        onUpdate={updateScore}
      /> */}
    </Paper>
  )
}

export default App
