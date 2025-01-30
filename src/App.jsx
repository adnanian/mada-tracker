import './App.css';
import Paper from '@mui/material/Paper';
import TopControls from './components/top-controls/TopControls';
import TurnManager from './components/TurnManager';
import PlayerView from './components/player-view/PlayerView';
import { MadaProvider } from './context.jsx'

/**
 * TODO
 * 
 * @returns 
 */
function App() {

  return (
    <MadaProvider>
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
        <PlayerView />
      </Paper>
    </MadaProvider>
  )
}

export default App
