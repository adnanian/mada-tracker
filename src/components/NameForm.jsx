/* eslint-disable react/prop-types */
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NameForm({ players, onNameChange, open, onClose }) {

    console.log(open);

    function handleNameChange(e) {
        const elementNameProp = e.currentTarget.name;
        const number = Number.parseInt(elementNameProp.substring(elementNameProp.indexOf('-') + 1));
        onNameChange(number, e.currentTarget.value);
    }

    const playerFields = players.map((player) => {
        return (
            <TextField
                key={player.number}
                name={`p-${player.number}`}
                value={player.name}
                variant="outlined"
                onChange={handleNameChange}
                slotProps={{
                    input: {
                        style: { textAlign: 'center', maxWidth: '350px' }, // Default alignment
                    },
                }}
                sx={{
                    '& .MuiInputBase-input': {
                        textAlign: { xs: 'left', sm: 'center' }, // Responsive alignment

                    },
                }}
            />
        )
    });

    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogTitle>Adjust the Range</DialogTitle>
            <Box
                component='form'
                autoComplete='off'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '400px',
                    '&  *': {
                        margin: '5px auto'
                    }
                }}
            >
                {playerFields}
                <Button variant='contained' onClick={onClose} sx={{ width: '100%' }}>
                    Done!
                </Button>
            </Box>
        </Dialog>
    );
}