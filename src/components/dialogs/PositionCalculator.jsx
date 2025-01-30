/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';

import { MadaContext } from '../../context';
import { useState, useContext } from 'react';
import { NUM_ARRAY, OP_ARRAY } from '../../constants';
import UnselectButton from '../UnselectButton';
import MiniTracker from '../MiniTracker';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function PositionCalculator({ selectedPlayer, onUpdate, sx = {} }) {
    const { lowerBound, upperBound, setSelectedPlayer, rounds, turnPlayer, isInRange } = useContext(MadaContext);
    const [number, setNumber] = useState('');
    const [operand, setOperand] = useState('');
    const [applySameColorRule, setApplySameColorRule] = useState(false);

    const buttonChars = [
        '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '=', '+'
    ];

    /**
     * 
     */
    function clear() {
        setNumber('');
        setOperand('');
    }

    /**
     * 
     */
    function calculate() {
        if (!(NUM_ARRAY.includes(number) && OP_ARRAY.includes(operand))) {
            throw new Error("Invalid arguments entered.");
        }
        let newPosition = 0;
        let triggerRangeOpen = false;
        switch (operand) {
            case '+':
                newPosition = selectedPlayer.position + number;
                break;
            case '-':
                newPosition = selectedPlayer.position - number;
                break;
            case '×':
                newPosition = selectedPlayer.position * number;
                if (number === 1 && applySameColorRule && lowerBound < 0 && upperBound > 0) {
                    newPosition *= -1;
                }
                break;
            case '÷':
                if (number === 0) {
                    const positivePosition = Math.abs(selectedPlayer.position);
                    newPosition = (applySameColorRule) ? (lowerBound + positivePosition) : (upperBound - positivePosition);
                } else {
                    newPosition = Number.parseInt(Math.floor(selectedPlayer.position / number));
                }
                break;
        }
        if (newPosition % 100 === 0 && newPosition !== selectedPlayer.position && rounds > 1) {
            triggerRangeOpen = true;
        }
        onUpdate(newPosition, triggerRangeOpen);
        setNumber('');
        setOperand('');
    }

    /**
     * 
     * @param {*} e 
     */
    function handleButtonClick(e) {
        try {
            const symbol = e.target.textContent;
            switch (symbol) {
                case '+':
                case '-':
                case '×':
                case '÷':
                    setOperand(symbol);
                    break;
                case '=':
                    calculate();
                    break;
                case 'C':
                    clear();
                    break;
                default:
                    setNumber(Number.parseInt(symbol));
                    break;
            }
        } catch (error) {
            alert(error);
        }

    }

    function openCheckBox() {
        return (number === 1 && operand === '×' && lowerBound < 0 && upperBound > 0);
    }

    function validateSelectedPlayer() {
        if (!selectedPlayer) return false;
        if (rounds <= 0) return false;
        else {
            if (rounds === 1) {
                return turnPlayer.number === selectedPlayer.number
            }
            if (turnPlayer.number !== selectedPlayer.number) {
                return isInRange(turnPlayer.position) && isInRange(selectedPlayer.position);
            }
            return true;
        }
    }

    const calcButtons = buttonChars.map((char, index) => {
        return (
            <Grid
                key={index}
                size={3}
                sx={{
                }}
            >
                <Button
                    onClick={handleButtonClick}
                    sx={{
                        minWidth: { xs: '50px !important', md: '110px !important' },
                        minHeight: { xs: '50px !important', md: '110px !important' },
                        backgroundColor: 'silver',
                        color: 'black',
                        fontWeight: 'bold',
                        border: '3px solid, #333',
                        fontSize: '30px'
                    }}
                >
                    {char}
                </Button>
            </Grid>
        )
    });

    return (
        <Dialog
            open={validateSelectedPlayer()}
            // onClose={() => setSelectedPlayer(null)} // Default behavior for closing
            onClose={(e, reason) => {
                if (reason === 'backdropClick') {
                    console.log('Backdrop click disabled');
                    return; // Do nothing on backdrop click
                }
                setSelectedPlayer(null); // Allow closing for other reasons
            }}
            sx={{
                // display: { xs: 'flex', md: 'none' },
                margin: '0 auto !important',
            }}
        >
            <UnselectButton
                onSelect={setSelectedPlayer}
                overrideHideControlSettings={true}
            />
            <MiniTracker selectedPlayer={selectedPlayer} />
            <Paper
                elevation={24}
                sx={{
                    ...sx
                }}
            >
                <Card
                    elevation={24}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#ddd',
                        width: { xs: 'fit-content', height: '440px' },
                        height: '72px',
                        margin: 'auto',
                        padding: 1,

                    }}>
                    <Grid
                        container
                        spacing={0} // No space between items
                        sx={{
                            minWidth: '100%',
                            minHeight: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)', // Adjust for the number of columns
                            gap: 0, // No gap between grid cells
                            '& *': {
                                fontSize: '40px',
                            }
                        }}
                    >
                        <Grid size={6}>
                            <Typography component='h3'>{operand}</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography component='h3'>{number}</Typography>
                        </Grid>

                    </Grid>
                </Card>
                <ButtonGroup variant='contained' aria-label='calculator'>
                    <Grid
                        container
                        spacing={0} // No space between items
                        sx={{
                            minWidth: 'fit-content',
                            minHeight: 'fit-content',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)', // Adjust for the number of columns
                            gap: 0, // No gap between grid cells
                        }}
                    >
                        {calcButtons}
                    </Grid>
                </ButtonGroup>
                {
                    openCheckBox() ? (
                        <FormGroup sx={{ flexDirection: 'column' }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={applySameColorRule}
                                        onChange={(e) => setApplySameColorRule(e.target.checked)}
                                    />}
                                label='Apply Same Color Rules' />
                        </FormGroup>
                    ) : null
                }
            </Paper>
        </Dialog>
    );
}