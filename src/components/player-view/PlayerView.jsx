import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useContext, useState } from 'react';
import { MadaContext } from '../../context';
import PlayerCard from './PlayerCard';
import PositionCalculator from '../dialogs/PositionCalculator';
import ScoreForm from '../dialogs/ScoreForm';
import RangeAdjustor from '../dialogs/RangeAdjustor';

export default function PlayerView() {

    const {
        players,
        setPlayers,
        selectedPlayer,
        setSelectedPlayer,
        isInRange,
        isCompetitionMode,
        turnPlayer,
        setTurnPlayer
    } = useContext(MadaContext);
    const [triggerRangeChange, setTriggerRangeChange] = useState(false);
    const [triggerScoreChange, setTriggerScoreChange] = useState(false);

    function updateSelectedPlayerPosition(newPosition, openRangeAdjustor) {
        const isOut = !isInRange(newPosition);
        const eliminatorId = isOut ? turnPlayer.number : 0;
        setPlayers(players.map((player) => {
            if (player.number === selectedPlayer.number) {
                return {
                    ...player,
                    position: newPosition,
                    eliminatorId: eliminatorId
                }
            } else {
                return player;
            }

        }));
        setSelectedPlayer({ ...selectedPlayer, position: newPosition, eliminatorId: eliminatorId });
        if (selectedPlayer.number === turnPlayer.number) {
            setTurnPlayer({ ...turnPlayer, position: newPosition, eliminatorId: eliminatorId })
        }
        setTriggerRangeChange(openRangeAdjustor);
        if (isOut) {
            setTriggerScoreChange(isCompetitionMode);
        }
    }

    function updateScore(points) {
        const newScore = (turnPlayer.number !== selectedPlayer.number) ? turnPlayer.score + points : turnPlayer.score - points;
        setPlayers(players.map((player) => {
            // return player.number === turnPlayer.number ? { ...player, score: newScore } : player
            if (player.number === turnPlayer.number) {
                let newSuspensionStreak = player.suspensionStreak;
                if (turnPlayer.number === selectedPlayer.number) {
                    newSuspensionStreak += 1;
                }
                return {
                    ...player,
                    score: newScore,
                    suspensionStreak: newSuspensionStreak
                }
            } else {
                return player;
            }
        }));
        setSelectedPlayer(null);
        setTriggerScoreChange(false);
    }


    const playerCards = players.map((player) => {
        return (
            <Grid
                key={player.number}
                size={{ xs: 6, sm: 3 }}
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
                    onSelect={setSelectedPlayer}
                />
            </Grid>
        );
    });

    return (
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
            >
                {playerCards}
            </Grid>
            <PositionCalculator
                selectedPlayer={selectedPlayer}
                onUpdate={updateSelectedPlayerPosition}
            />
            <RangeAdjustor
                open={triggerRangeChange}
                onClose={() => setTriggerRangeChange(false)}
            />
            <ScoreForm
                open={triggerScoreChange}
                onClose={() => setTriggerScoreChange(false)}
                onUpdate={updateScore}
            />
        </Box>
    );
}