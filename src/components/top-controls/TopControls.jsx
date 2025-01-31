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

/**
 * TODO
 * 
 * @returns 
 */
export default function TopControls() {
    const { players, setRounds, setTurnPlayer } = useContext(MadaContext);
    const [triggerNamesAdjust, setTriggerNamesAdjust] = useState(false);

    /**
     * Begins a new game.
     * 
     * @param {*} e 
     * @returns void if name validation fails.
     */
    function startGame(e) {
        e.preventDefault();
        // First validates, that all name fields are entered and have unique entries.
        for (let i = 0; i < players.length; i++) {
            if (players[i].name.replace(' ', '') === '') {
                alert('Names cannot be blank!');
                return;
            }
            for (let j = i + 1; j < players.length; j++) {
                if (players[i].name.toLowerCase() === players[j].name.toLowerCase()) {
                    alert('All names must be unique (case insensitive)!');
                    return;
                }
            }
        }
        // Next, closes the name form.
        setTriggerNamesAdjust(false);
        // Finally, starts the first round with the first player as the turn player.
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