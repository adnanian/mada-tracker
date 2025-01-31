/* eslint-disable react/prop-types */
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { SCORE_CHANGE_MIN, SCORE_CHANGE_MAX } from '../../constants';

/**
 * Renders the modal for updating the turn player's score upon
 * successfully kicking a player out of the range.
 * 
 * @param {Event} props the component props.
 * @returns the score form modal.
 */
export default function ScoreForm({ open, onClose, onUpdate }) {
    const [score, setScore] = useState(0);

    /**
     * Updates the score and closes the modal.
     */
    function update() {
        // Ensure the score is within the allowed range before updating
        const validScore = Math.max(SCORE_CHANGE_MIN, Math.min(Number(score), SCORE_CHANGE_MAX));
        onUpdate(validScore);
        setScore(0);
        onClose();
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add Points</DialogTitle>
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
                    slotProps={{
                        input: {
                            min: SCORE_CHANGE_MIN,
                            max: SCORE_CHANGE_MAX,
                            step: 1,
                            style: { textAlign: 'center' }, // Center-align text
                        }
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
                    sx={{
                        width: '100%',
                        height: { xs: '30px', md: '80px' }
                    }}
                >
                    Done!
                </Button>
            </Box>
        </Dialog>
    );
}
