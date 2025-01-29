/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { MadaContext } from '../context';
import { WINNING_SCORE } from '../constants';

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
        }
        const maxScoreReacher = activePlayers.find((player) => player.score >= WINNING_SCORE);
        if (maxScoreReacher) {
            setRounds(-1);
            setGameStatus(`Winner: ${maxScoreReacher.name}`);
        }
        if (turnPlayer) {
            setGameStatus(`Round ${rounds}, ${turnPlayer.name}'s Turn`);
        }
    }, [activePlayers, rounds, setRounds, turnPlayer]);

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

    // function getGameStatus() {

    // }

    // function isGameOver() {
    //     return (
    //         activePlayers.length === 1
    //         || activePlayers.find((player) => player.score >= WINNING_SCORE)
    //     );
    // }


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