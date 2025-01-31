/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { MadaContext } from '../context';
import { WINNING_SCORE } from '../constants';

/**
 * Renders a card showing the current status of the game in
 * regards to the turn players and winners.
 * 
 * If a game is in session, the card will display the round number
 * and the name of the current turn player. This is accompanied with
 * a button to pass the turn to the next active player in the game.
 * 
 * If the game is over, then the card will show the name of the winner.
 * 
 * Otherwise, nothing will be shown.
 * 
 * @returns the game status.
 */
export default function TurnManager() {

    const {
        players,
        rounds,
        setRounds,
        turnPlayer,
        setTurnPlayer,
        isEliminated,
        suspensionUpdate
    } = useContext(MadaContext);
    const [gameStatus, setGameStatus] = useState('');

    const activePlayers = players.filter((player) => !isEliminated(player));

    useEffect(() => {
        // A player who is the last in range wins the game.
        if (activePlayers.length === 1) {
            setRounds(-1);
            setGameStatus(`Winner: ${activePlayers[0].name}`);
            return;
        }
        // A player who is the first to reach 500 points also wins the game.
        const maxScoreReacher = activePlayers.find((player) => player.score >= WINNING_SCORE);
        if (maxScoreReacher) {
            setRounds(-1);
            setGameStatus(`Winner: ${maxScoreReacher.name}`);
            return;
        }
        // Otherwise, the current round and turn player is shown.
        if (turnPlayer?.name) {
            setGameStatus(`Round ${rounds}, ${turnPlayer.name}'s Turn`);
            return;
        }
    }, [activePlayers, rounds, setRounds, turnPlayer]);

    /**
     * Completes a player's turn and passes the turn to the next active player.
     */
    function handleDone() {
        suspensionUpdate();
        const nextTurnIndex = (activePlayers.findIndex((player) => player.number === turnPlayer.number) + 1) % activePlayers.length;
        const roundCompleted = (nextTurnIndex === 0);
        setTurnPlayer(activePlayers[nextTurnIndex]);
        if (roundCompleted) {
            setRounds((rounds) => rounds + 1);
        }
    }

    if (!rounds || !turnPlayer) {
        return null;
    }

    return (
        <Card
            elevation={24}
            sx={{
                borderRadius: 'inherit',
                maxWidth: { xs: '80vw', md: 'fit-content' },
                display: 'inherit',
                flexDirection: { xs: 'column', sm: 'row' },
                marginTop: 5,
                '& > *': {
                    margin: '10px 15px !important'
                }
            }}
        >
            <Typography
                variant='h4'
                component='h4'
                sx={{
                    typography: {
                        textAlign: 'center'
                    }
                }}
            >
                {gameStatus}
            </Typography>
            <Button
                variant='contained'
                onClick={handleDone}
                disabled={rounds < 0}
            >
                Done
            </Button>
        </Card>
    );
}