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
 * Renders a modal containing a calculator for the 
 * current player to calculate new positions.
 * 
 * @param {object} props the component props.
 * @returns the calculator used to update positions.
 */
export default function PositionCalculator({ selectedPlayer, onUpdate, sx = {} }) {
    const { lowerBound, upperBound, setSelectedPlayer, rounds, turnPlayer, isInRange } = useContext(MadaContext);
    const [number, setNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [applySameColorRule, setApplySameColorRule] = useState(false);

    const buttonChars = [
        '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '=', '+'
    ];

    /**
     * Clears the calculator.
     */
    function clear() {
        setNumber('');
        setOperator('');
    }

    /**
     * Applies the calculation with the given number and operator
     * to the position of the currently selected player.
     * 
     * Will also check if all the conditions to change the range
     * are met.
     */
    function calculate() {
        // First, checks that valid arguments were entered (a valid operator and number).
        if (!(NUM_ARRAY.includes(number) && OP_ARRAY.includes(operator))) {
            throw new Error("Invalid arguments entered.");
        }
        // Next, initializes the variables and performs the appropriate calculation.
        let newPosition = 0;
        let triggerRangeChangeOpen = false;
        switch (operator) {
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
        // Then, checks to see if the range should be updated.
        if (newPosition % 100 === 0 && newPosition !== selectedPlayer.position && rounds > 1) {
            triggerRangeChangeOpen = true;
        }
        // After that, executes the callback to update the information in PlayerViewer.
        onUpdate(newPosition, triggerRangeChangeOpen);
        // Finally, clears the calculator.
        setNumber('');
        setOperator('');
    }

    /**
     * Performs the appropriate action on the calculator
     * depending on the button clicked.
     * 
     * If a number was clicked, then that number will overwrite the currently
     * shown number.
     * 
     * If an operator was clicked, then that operator will overwrite the currently
     * shown operator.
     * 
     * If the 'C' button was clicked, then the display on the calculator will be
     * cleared.
     * 
     * If the 
     * 
     * @param {Event} e the event. 
     */
    function handleButtonClick(e) {
        try {
            const symbol = e.target.textContent;
            switch (symbol) {
                case '+':
                case '-':
                case '×':
                case '÷':
                    setOperator(symbol);
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

    /**
     * Checks whether the calculator should show the optional
     * toggle of making a "× 1" a "× -1". According to the rules of Mada
     * as of January 30, 2025, this is allowed to occur if and only if
     * the lower bound is negative and the upper bound is positive.
     * 
     * @returns true if the conditions for making "× 1" negative are met, false otherwise.
     */
    function openCheckBox() {
        return (number === 1 && operator === '×' && lowerBound < 0 && upperBound > 0);
    }

    /**
     * Checks that all the conditions for opening the calculator modal are met.
     * Here are the following conditions:
     * 
     * 1. A player must be selected.
     * 2. A game must be in session.
     * 3. If it's the first round, then the turn player has selected his/her self.
     * 4. If it's been at least two rounds, then the turn player and a selected player
     * other than the turn player must both be within the range.
     * 
     * @returns true if the calculator opening conditions are met, false otherwise.
     */
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
            onClose={(e, reason) => {
                if (reason === 'backdropClick') {
                    console.log('Backdrop click disabled');
                    return; // Do nothing on backdrop click
                }
                setSelectedPlayer(null); // Allow closing for other reasons
            }}
            sx={{
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
                            <Typography component='h3'>{operator}</Typography>
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