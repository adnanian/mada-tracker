import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { MadaContext } from '../context';

export default function ModeSwitch() {

    const { isCompetitionMode, setIsCompetitionMode } = useContext(MadaContext);
    return (
        <FormGroup sx={{ flexDirection: 'column' }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={isCompetitionMode}
                        onChange={(e) => setIsCompetitionMode(e.target.checked)}
                    />}
                label={isCompetitionMode ? 'Competition Mode' : 'Elimination Mode'} />
        </FormGroup>
    )
}