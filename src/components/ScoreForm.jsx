/* eslint-disable react/prop-types */
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { SCORE_CHANGE_MIN, SCORE_CHANGE_MAX } from '../constants';

export default function ScoreForm({ open, onClose, onUpdate }) {
    const [score, setScore] = useState(0);

    function update() {
        onUpdate(Number.parseInt(score));
        onClose();
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogTitle>Adjust the Range</DialogTitle>
            <Box
                component='form'
                autoComplete='off'
            >
                <TextField
                    value={score}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setScore(e.currentTarget.value)}
                    label="Score"
                    type='number'
                    min={SCORE_CHANGE_MIN}
                    max={SCORE_CHANGE_MAX}
                    step={1}
                    slotProps={{
                        input: {
                            style: { textAlign: 'center' }, // Default alignment
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: { xs: 'left', sm: 'center' }, // Responsive alignment
                        },
                    }}
                />
                <Button variant='contained' onClick={update} sx={{ width: '100%', height: '80px' }}>
                    Done!
                </Button>
                <Button variant='contained' onClick={onClose} sx={{ width: '100%', height: '80px' }}>
                    Cancel
                </Button>
            </Box>
        </Dialog>
    );
}