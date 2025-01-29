/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MadaContext } from '../../context';


export default function PlayerFormOpener({ onOpen }) {
    const { hideControls, rounds } = useContext(MadaContext);

    if (hideControls) {
        return hideControls;
    }

    return (
        <Button
            onClick={() => onOpen(true)}
            variant='contained'
            sx={{ marginTop: 2 }}
            disabled={rounds > 0}
        >
            New Players
        </Button>
    );
}