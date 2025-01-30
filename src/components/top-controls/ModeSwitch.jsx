import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { MadaContext } from '../../context';

/**
 * TODO
 * 
 * @returns 
 */
export default function ModeSwitch() {

    const {
        isCompetitionMode,
        setIsCompetitionMode,
        hideControls,
        setHideControls
    } = useContext(MadaContext);

    return (
        <FormGroup sx={{
            flexDirection: 'column',
            border: '6px inset, gray',
            padding: { xs: 0.125, md: 1, xl: 2 },
            backgroundColor: 'silver'
        }}>
            {
                hideControls ? null : (
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isCompetitionMode}
                                onChange={(e) => setIsCompetitionMode(e.target.checked)}
                            />}
                        label={isCompetitionMode ? 'Competition Mode' : 'Elimination Mode'}
                    />
                )
            }

            <FormControlLabel
                control={
                    <Switch
                        checked={!hideControls}
                        onChange={(e) => setHideControls(!e.target.checked)}
                    />}
                label={hideControls ? 'Controls Hidden' : 'Controls Shown'}
                title='Toggle the switch on to show the controls.'
            />
        </FormGroup>
    )
}