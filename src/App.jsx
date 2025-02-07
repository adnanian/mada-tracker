import './App.css';
import Paper from '@mui/material/Paper';
import TopControls from './components/top-controls/TopControls';
import TurnManager from './components/TurnManager';
import PlayerViewer from './components/player-viewer/PlayerViewer';
import { MadaProvider } from './context.jsx'

/**
 * Parent component.
 * 
 * @returns app.
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
        <PlayerViewer />
      </Paper>
    </MadaProvider>
  )
}

export default App
