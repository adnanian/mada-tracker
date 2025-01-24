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
import { MadaContext } from '../context';
import { useState, useContext } from 'react';

export default function Calculator({ selectedPlayer, onUpdate }) {
    const { lowerBound, upperBound } = useContext(MadaContext);
    const [number, setNumber] = useState('');
    const [operand, setOperand] = useState('');
    const [applySameColorRule, setApplySameColorRule] = useState(false);

    const buttonChars = [
        '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '=', '+'
    ];

    function clear() {
        setNumber('');
        setOperand('');
    }

    function calculate() {
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
        if (newPosition % 100 === 0) {
            triggerRangeOpen = true;
            // if (newPosition === 0) {
            //     // TODO
            // } else {
            //     // TODO
            // }
        }
        onUpdate(newPosition, triggerRangeOpen);
    }

    function handleButtonClick(e) {
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
    }

    function openCheckBox() {
        if (number === 0 && operand === '÷') return true;
        else if (number === 1 && operand === '×') return true;
        return false;
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
                        minWidth: '55px !important',
                        minHeight: '55px !important',
                        backgroundColor: 'silver',
                        color: 'black',
                        fontWeight: 'bold',
                        border: '3px outset, #333',
                        fontSize: '30px'
                    }}
                >
                    {char}
                </Button>
            </Grid>
        )
    });

    return (
        <Paper elevation={24}>
            <Card
                elevation={24}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#ddd',
                    width: '100%',
                    height: '72px',
                    margin: 'auto',
                    padding: 2,

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
                        <Typography component='h6'>{operand}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography component='h6'>{number}</Typography>
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
    );
}