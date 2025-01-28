/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MadaContext } from '../context';


export default function PlayerFormOpener({ onOpenNameForm }) {
    const { hideControls } = useContext(MadaContext);

    if (hideControls) {
        return hideControls;
    }

    return (
        <Button
            onClick={() => onOpenNameForm(true)}
            variant='contained'
            sx={{ marginTop: 2 }}
        >
            New Players
        </Button>
    );
}