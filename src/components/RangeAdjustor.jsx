/* eslint-disable react/prop-types */
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { MadaContext } from '../context';

export default function RangeAdjustor({ players, onUpdate }) {
    const { setLowerBound, setUpperBound, isInRange } = useContext(MadaContext);

    const playersInRange = players.filter((player) => isInRange(player.position));

    const lowestPosition = Math.min(...playersInRange.map((player) => player.position));
    const highestPosition = Math.max(...playersInRange.map((player) => player.position));

    function adjustRange(e) {
        const { id } = e.currentTarget; // Get the id of the clicked button
        console.log("Clicked button id:", id);

        if (id === 'lb') {
            setLowerBound(() => lowestPosition - 100);
        } else if (id === 'ub') { // Corrected to 'ub'
            setUpperBound(() => highestPosition + 100);
        } else if (id === 'cancel-button') {
            console.log("Cancelled");
        }
        onUpdate(); // Trigger the update function
    }

    return (
        <Box >
            <ButtonGroup variant="outlined" aria-label="range adjustor" sx={{ dislpay: 'flex', flexDirection: 'column' }}>
                <Button id="lb" onClick={adjustRange}>
                    Lower Bound (Set to: {lowestPosition - 100})
                </Button>
                <Button id="ub" onClick={adjustRange}>
                    Upper Bound (Set to: {highestPosition + 100})
                </Button>
                <Button id="cancel-button" onClick={adjustRange}>
                    Cancel
                </Button>
            </ButtonGroup>
        </Box>
    );
}