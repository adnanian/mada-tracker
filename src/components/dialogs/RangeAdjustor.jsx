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
 * TODO
 * 
 * @param {*} param0 
 * @returns 
 */
export default function RangeAdjustor({ open, onClose }) {
    const { lowerBound, setLowerBound, upperBound, setUpperBound, isInRange, players } = useContext(MadaContext);

    const playersInRange = players.filter((player) => isInRange(player.position));

    const lowestPosition = Math.min(...playersInRange.map((player) => player.position));
    const highestPosition = Math.max(...playersInRange.map((player) => player.position));

    /**
     * TODO
     * 
     * @param {*} e 
     */
    function adjustRange(e) {
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
            <DialogTitle>Adjust the Range</DialogTitle>
            <Box >
                <ButtonGroup
                    variant="contained"
                    aria-label="range adjustor"
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
                                onClick={adjustRange}
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
                                onClick={adjustRange}
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
                                    Range unadjustable!
                                </Typography>
                                <Button id="cancel-button" onClick={adjustRange}>
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