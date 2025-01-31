/* eslint-disable react/prop-types */
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useContext } from 'react';
import { MadaContext } from '../context';

/**
 * Renders a small card containing the currently selected player's name and
 * position, as well as the current range.
 * 
 * This is only displayed on the PositionCalculator.
 * 
 * @param {object} props the component props. 
 * @returns the mini view of the range and player's information.
 */
export default function MiniTracker({ selectedPlayer }) {
    const { lowerBound, upperBound, isInRange } = useContext(MadaContext);

    return (
        <Card sx={{
            backgroundColor: isInRange(selectedPlayer?.position || 0) ? 'white' : 'pink',
            minWidth: '100%',
            minHeight: 'fit-content'
        }}>
            <Typography
                variant='body1'
                component='p'
                sx={{
                    typography: {
                        textAlign: 'center',
                        fontSize: '20px'
                    }
                }}
            >
                {selectedPlayer?.name || 'Unnamed'} | {selectedPlayer?.position || 0} | [{lowerBound}, {upperBound}]
            </Typography>
        </Card>
    );
}