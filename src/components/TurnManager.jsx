/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MadaContext } from '../context';

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
    const activePlayers = players.filter((player) => !isEliminated(player));

    function handleDone() {
        suspensionUpdate();
        const nextTurnIndex = (activePlayers.findIndex((player) => player.number === turnPlayer.number) + 1) % activePlayers.length;
        const roundCompleted = (nextTurnIndex === 0);
        // onUpdate(activePlayers[nextTurnIndex], roundCompleted)
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
                Round {rounds}, {`${turnPlayer.name}'s Turn`}
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