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
        // Ensure the score is within the allowed range before updating
        const validScore = Math.max(SCORE_CHANGE_MIN, Math.min(Number(score), SCORE_CHANGE_MAX));
        onUpdate(validScore);
        onClose();
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Adjust the Range</DialogTitle>
            <Box
                component="form"
                autoComplete="off"
                sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <TextField
                    value={score}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setScore(e.target.value)}
                    label="Score"
                    type="number"
                    inputProps={{
                        min: SCORE_CHANGE_MIN,
                        max: SCORE_CHANGE_MAX,
                        step: 1,
                        style: { textAlign: 'center' }, // Center-align text
                    }}
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: { xs: 'left', sm: 'center' }, // Responsive alignment
                        },
                    }}
                />
                <Button
                    variant="contained"
                    onClick={update}
                    sx={{ width: '100%', height: '80px' }}
                >
                    Done!
                </Button>
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{ width: '100%', height: '80px' }}
                >
                    Cancel
                </Button>
            </Box>
        </Dialog>
    );
}
