/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MadaContext } from '../context';

export default function UnselectButton({ onSelect, overrideHideControlSettings = false }) {
    const { hideControls } = useContext(MadaContext);

    if (hideControls && !overrideHideControlSettings) {
        return null;
    }

    return (
        <Button
            onClick={() => onSelect(null)}
            variant='contained'
            sx={{ marginTop: 2 }}
        >
            {overrideHideControlSettings ? 'Done' : 'Unselect'}
        </Button>

    );
}