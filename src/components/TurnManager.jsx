/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { MadaContext } from '../context';
import { WINNING_SCORE } from '../constants';

/**
 * TODO
 * 
 * @returns 
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
        if (activePlayers.length === 1) {
            setRounds(-1);
            setGameStatus(`Winner: ${activePlayers[0].name}`);
            return;
        }
        const maxScoreReacher = activePlayers.find((player) => player.score >= WINNING_SCORE);
        if (maxScoreReacher) {
            setRounds(-1);
            setGameStatus(`Winner: ${maxScoreReacher.name}`);
            return;
        }
        if (turnPlayer?.name) {
            setGameStatus(`Round ${rounds}, ${turnPlayer.name}'s Turn`);
            return;
        }
    }, [activePlayers, rounds, setRounds, turnPlayer]);

    /**
     * TODO
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
                '& > *': {
                    margin: '5px 10px'
                }
            }}
        >
            <Typography variant='h4' component='h4'>
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