/* eslint-disable react/prop-types */
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { useContext } from 'react';
import { MadaContext } from '../../context';

export default function NameForm({ open, onClose, onBegin }) {
    const { players, setPlayers } = useContext(MadaContext);

    function handleNameChange(e) {
        const elementNameProp = e.currentTarget.name;
        const number = Number.parseInt(elementNameProp.substring(elementNameProp.indexOf('-') + 1));
        const newName = e.currentTarget.value;
        setPlayers(players.map((player) => player.number === number ? { ...player, name: newName } : player));
    }

    function clearNames() {
        setPlayers(players.map((player) => {
            return {
                ...player,
                name: ''
            }
        }));
    }

    const playerFields = players.map((player) => {
        return (
            <FormControl
                variant='outlined'
                key={player.number}
                sx={{
                    width: 'fit-content',
                    margin: 'auto'
                }}
            >
                <TextField
                    required
                    name={`p-${player.number}`}
                    label={`Player ${player.number}`}
                    value={player.name}
                    variant="outlined"
                    onChange={handleNameChange}
                    sx={{
                        width: '90%',
                        margin: '10px 0'
                    }}
                />
            </FormControl>
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
                    '&  > *': {
                        margin: 'auto'
                    }
                }}
            >
                <Button
                    variant='contained'
                    onClick={clearNames}
                    sx={{ width: '100%' }}
                >
                    Clear Names
                </Button>
                {playerFields}
                <Button
                    variant='contained'
                    type='submit'
                    onClick={onBegin}
                    sx={{ width: '100%' }}
                >
                    Done!
                </Button>
                <Button
                    variant='contained'
                    onClick={onClose}
                    sx={{ width: '100%', backgroundColor: 'red' }}
                >
                    Cancel
                </Button>
            </Box>
        </Dialog>
    );
}