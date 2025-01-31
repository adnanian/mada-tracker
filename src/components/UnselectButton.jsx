/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { MadaContext } from '../context';

/**
 * Renders a button to deselect the selected player.
 * 
 * This button is used in TopComponents and PositionCalculator.
 * The latter component requires the prop, overrideHideControlSettings
 * to be set to true, so that the button will display even if the context
 * state value, hideControls, is true.
 * 
 * @param {*} param0 
 * @returns 
 */
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