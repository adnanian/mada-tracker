/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MadaContext } from '../context';

export default function UnselectButton({ overrideHideControlSettings = false }) {
    const { setSelectedPlayer, hideControls } = useContext(MadaContext);

    if (hideControls && !overrideHideControlSettings) {
        return null;
    }

    return (
        <Button
            onClick={() => setSelectedPlayer(null)}
            variant='contained'
            sx={{ marginTop: 2 }}
        >
            {overrideHideControlSettings ? 'Done' : 'Unselect'}
        </Button>

    );
}