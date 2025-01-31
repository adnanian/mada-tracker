/* eslint-disable react/prop-types */
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useContext } from 'react';
import { MadaContext } from '../../context';
import { Typography } from '@mui/material';

/**
 * Renders a modal for altering the range.
 * 
 * Per Mada rules as of January 30, 2025, the lower bound
 * can be changed as long as it's set to a different number, and likewise
 * for the upper bound. However, if neither of the bounds to set are different,
 * then a message will be displayed to the players saying that the range
 * cannot be changed and will have to move on.
 * 
 * @param {object} props the component props. 
 * @returns the modal for altering the range.
 */
export default function RangeChanger({ open, onClose }) {
    const { lowerBound, setLowerBound, upperBound, setUpperBound, isInRange, players } = useContext(MadaContext);

    const playersInRange = players.filter((player) => isInRange(player.position));

    // Calculate the lowest position amongst the active players.
    const lowestPosition = Math.min(...playersInRange.map((player) => player.position));

    // Calculate the highest position amongst the active players.
    const highestPosition = Math.max(...playersInRange.map((player) => player.position));

    /**
     * Updates the lower bound or the upper bound, if possible.
     * 
     * @param {Event} e the event. 
     */
    function setNewRange(e) {
        const { id } = e.currentTarget; // Get the id of the clicked button
        // console.log("Clicked button id:", id);

        if (id === 'lb') {
            setLowerBound(() => lowestPosition - 100);
        } else if (id === 'ub') { // Corrected to 'ub'
            setUpperBound(() => highestPosition + 100);
        } else if (id === 'cancel-button') {
            console.log("Cancelled");
        }
        onClose(); // Trigger the update function
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Alter the Range</DialogTitle>
            <Box >
                <ButtonGroup
                    variant="contained"
                    aria-label="range alterer"
                    sx={{
                        dislpay: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        margin: '0 auto !important',
                        '& > *': {
                            minWidth: '75% !important',
                            margin: '5px 3px !important'
                        }
                    }}
                >
                    {
                        lowerBound !== (lowestPosition - 100) ? (
                            <Button
                                id="lb"
                                onClick={setNewRange}
                                sx={{ backgroundColor: '#700' }}
                            >
                                Lower Bound (Set to: {lowestPosition - 100})
                            </Button>
                        ) : null
                    }
                    {
                        upperBound !== (highestPosition + 100) ? (
                            <Button
                                id="ub"
                                onClick={setNewRange}
                                sx={{ backgroundColor: '#070' }}
                            >
                                Upper Bound (Set to: {highestPosition + 100})
                            </Button>
                        ) : null
                    }
                    {
                        (lowerBound === (lowestPosition - 100) && upperBound === (highestPosition + 100)) ? (
                            <>
                                <Typography
                                    variant='body1'
                                    component='p'
                                    sx={{
                                        typography: {
                                            textAlign: 'center'
                                        }
                                    }}
                                >
                                    Range Unalterable!
                                </Typography>
                                <Button id="cancel-button" onClick={setNewRange}>
                                    OK
                                </Button>
                            </>
                        ) : null
                    }

                </ButtonGroup>
            </Box>
        </Dialog>
    );
}