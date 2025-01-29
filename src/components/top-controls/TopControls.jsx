/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Range from './Range';
import PlayerSizeAdjustor from './PlayerSizeAdjustor';
import UnselectButton from '../UnselectButton';
import PlayerFormOpener from './PlayerFormOpener';
import ModeSwitch from './ModeSwitch';
import NameForm from '../dialogs/NameForm';
import { useContext, useState } from 'react';
import { MadaContext } from '../../context';

export default function TopControls() {
    const { players, setRounds, setTurnPlayer } = useContext(MadaContext);
    const [triggerNamesAdjust, setTriggerNamesAdjust] = useState(false);

    function startGame(e) {
        e.preventDefault();
        for (let player of players) {
            if (player.name.replace(' ', '') === '') {
                alert('Names cannot be blank!');
                return;
            }
        }
        setTriggerNamesAdjust(false);
        setRounds(1);
        setTurnPlayer(players[0]);
    }

    return (
        <Box sx={{
            flexDirection: { xs: 'column', 'md': 'row' },
            justifyContent: 'space-evenly',
            marginTop: '5px',
            '& > *': {
                flexDirection: 'column',
                marginLeft: '15px !important',
                marginRight: '15px !important',
            },
            width: '80%'

        }}>
            <Range />
            <PlayerSizeAdjustor />
            <UnselectButton />
            <PlayerFormOpener onOpen={() => setTriggerNamesAdjust(true)} />
            <ModeSwitch />
            <NameForm
                open={triggerNamesAdjust}
                onClose={() => setTriggerNamesAdjust(false)}
                onBegin={startGame}
            />

        </Box>
    );
}