/* eslint-disable react/prop-types */
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useContext } from 'react';
import { MadaContext } from '../context';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function MiniTracker({ selectedPlayer }) {
    const { lowerBound, upperBound, isInRange } = useContext(MadaContext);

    // console.log(selectedPlayer);

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