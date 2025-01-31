import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useContext, useState } from 'react';
import { MadaContext } from '../../context';
import PlayerCard from './PlayerCard';
import PositionCalculator from '../dialogs/PositionCalculator';
import ScoreForm from '../dialogs/ScoreForm';
import RangeChanger from '../dialogs/RangeChanger';

/**
 * Renders a grid-layout of all the players in the current game
 * session.
 * 
 * @returns a list of all the players in the game session.
 */
export default function PlayerViewer() {

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
    // Modal opener for RangeChanger.
    const [triggerRangeChange, setTriggerRangeChange] = useState(false);
    // Modal opener for ScoreForm.
    const [triggerScoreChange, setTriggerScoreChange] = useState(false);

    /**
     * Updates the currently selected player's position, and opens
     * the RangeChanger modal if applicable.
     * 
     * @param {number} newPosition the selected player's new position.
     * @param {boolean} openRangeChanger the new state value for triggerRangeChange.
     */
    function updateSelectedPlayerPosition(newPosition, openRangeChanger) {
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
        setTriggerRangeChange(openRangeChanger);
        if (isOut) {
            setTriggerScoreChange(isCompetitionMode);
        }
    }

    /**
     * Updates the turn player's score upon submitting the score form.
     * 
     * @param {number} points the number of points to add to the turn player's score. 
     */
    function updateScore(points) {
        const newScore = (turnPlayer.number !== selectedPlayer.number) ? turnPlayer.score + points : turnPlayer.score - points;
        setPlayers(players.map((player) => {
            if (player.number === turnPlayer.number) {
                return {
                    ...player,
                    score: newScore,
                    // suspensionStreak: newSuspensionStreak
                }
            } else {
                return player;
            }
        }));
        setTurnPlayer({
            ...turnPlayer,
            score: newScore,
            // suspensionStreak: turnPlayerNewSuspensionStreak
        });
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
                    margin: '10px auto 20px',
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
            <RangeChanger
                open={triggerRangeChange}
                onClose={(e, reason) => {
                    if (reason === 'backdropClick') {
                        return;
                    }
                    setTriggerRangeChange(false);
                }}
            />
            <ScoreForm
                open={triggerScoreChange}
                onClose={(e, reason) => {
                    if (reason === 'backdropClick') {
                        return;
                    }
                    setTriggerScoreChange(false);
                }}
                onUpdate={updateScore}
            />
        </Box>
    );
}