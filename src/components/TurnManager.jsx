/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MadaContext } from '../context';

export default function TurnManager({ players, turnPlayer, rounds, onUpdate }) {

    const { isEliminated } = useContext(MadaContext);
    const activePlayers = players.filter((player) => !isEliminated(player));

    function handleDone() {
        const nextTurnIndex = (activePlayers.findIndex((player) => player.number === turnPlayer.number) + 1) % activePlayers.length;
        const roundCompleted = (nextTurnIndex === 0);
        onUpdate(activePlayers[nextTurnIndex], roundCompleted)
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
            <Button variant='contained' onClick={handleDone}>
                Done
            </Button>
        </Card>
    );
}