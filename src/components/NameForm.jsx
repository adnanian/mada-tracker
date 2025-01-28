/* eslint-disable react/prop-types */
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NameForm({ players, onNameChange, open, onClose }) {

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
                        style: { textAlign: 'center', maxWidth: { xs: '225px', md: '350px' } }, // Default alignment
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
            <DialogTitle
                sx={{
                    textAlign: 'center'
                }}
            >
                Enter names
            </DialogTitle>
            <Typography
                variant='body1'
                component='p'
                sx={{
                    typography: {
                        textAlign: 'center',
                        width: '75%',
                        margin: 'auto'
                    }
                }}
            >
                Enter the names so that the top name is the player
                going first and the name below is the player to the
                left.
            </Typography>
            <Box
                component='form'
                autoComplete='off'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: { xs: '275px', md: '400px' },
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