/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Range from './Range';
import PlayerSizeAdjustor from './PlayerSizeAdjustor';
import UnselectButton from '../UnselectButton';
import PlayerFormOpener from './PlayerFormOpener';
import ModeSwitch from './ModeSwitch';
import NameForm from '../dialog-forms/NameForm';

export default function TopControls({ onOpenNameForm }) {
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
            <PlayerFormOpener onOpen={onOpenNameForm} />
            <ModeSwitch />
            <NameForm />
        </Box>
    );
}