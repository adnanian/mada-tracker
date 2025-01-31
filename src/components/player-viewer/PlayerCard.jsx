/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import Tooltip from '@mui/material/Tooltip';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import { MadaContext } from "../../context";
import { useContext } from "react";
import { WINNING_SCORE } from "../../constants";

/**
 * Renders a selectable container displaying a player's information.
 * 
 * @param {Event} props the component props. 
 * @returns a container of the player's name, position, and score.
 */
export default function PlayerCard({ player, isSelected, onSelect }) {

    const { isInRange, isCompetitionMode, isEliminated } = useContext(MadaContext);

    /**
     * Sets the new selected player upon clicking on the card.
     */
    function handleSelectedPlayer() {
        onSelect(player);
    }

    /**
     * Sets the appropriate background color of the player card, depending
     * on the player's selection and elimination/suspension status.
     * 
     * A non-selected active player card will be gray.
     * A selected active player card will be yellow.
     * A non-selected suspended/eliminated player card will be orange.
     * A selected suspended/eliminated player card will be pink.
     * 
     * @returns the appropriate background color.
     */
    function backgroundColor() {
        if (player.score >= WINNING_SCORE) return '#0ff';
        if (isInRange(player.position)) {
            return isSelected ? 'yellow' : '#ccc';
        } else {
            return isSelected ? 'pink' : '#fa0';
        }
    }

    /**
     * Displays the appropriate icon next to the player's name, depending
     * on whether or not the player is suspended or eliminated.
     * 
     * A suspended player will have the warning icon displayed next to his/her name.
     * An eliminated player will have the close icon displayed next to his/her name.
     * 
     * @returns the appropriate icon if applicable, null otherwise.
     */
    function iconDisplay() {
        if (!isInRange(player.position)) {
            const sx = {
                color: '#400'
            }
            return isEliminated(player) ? <CloseIcon sx={sx} /> : <WarningIcon sx={sx} />
        }
        return null;
    }

    return (
        <Box
            onClick={handleSelectedPlayer}
            sx={{
                backgroundColor: backgroundColor(),
                color: isInRange(player.position) ? 'black' : '#600',
                border: '2px solid black',
                borderRadius: '15px',
                width: '100%', // Ensure cards fit within the grid
                maxWidth: '200px', // Limit card width for consistency
                padding: 2,
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2, // Space between children
                cursor: 'pointer',
                '& > :not(.MuiInputBase-root)': {
                    color: 'inherit',
                    backgroundColor: 'inherit',
                },
            }}
        >
            <Typography
                variant='body1'
                component='h6'
                sx={{
                    typography: {
                        textAlign: 'center'
                    }
                }}
            >
                {player.name}
                {iconDisplay()}
            </Typography>

            <TableContainer
                component={Card}
                sx={{
                    color: 'inherit',
                    '& *': { fontSize: '20px' },
                    '& .MuiTableCell-root': {
                        backgroundColor: 'inherit', // Set background for cells
                        color: 'inherit', // Set text color for cells
                        fontSize: '20px',
                        border: '1px solid black'
                    },
                }}
            >
                <Table>
                    <TableBody>
                        <TableRow>
                            <Tooltip title='Position' placement='left'>
                                <TableCell align='center'>{player.position}</TableCell>
                            </Tooltip>
                            {
                                isCompetitionMode ? (
                                    <Tooltip
                                        title='Score'
                                        placement='right'
                                        sx={{
                                            display: { xs: 'none', md: 'table-cell' }
                                        }}
                                    >
                                        <TableCell align='center'>{player.score}</TableCell>
                                    </Tooltip>
                                ) : null
                            }
                        </TableRow>
                        {isCompetitionMode ? (
                            <TableRow
                                sx={{
                                    display: { xs: 'default', md: 'none' }
                                }}
                            >
                                <Tooltip
                                    title='Score'
                                    placement='right'
                                >
                                    <TableCell align='center'>{player.score}</TableCell>
                                </Tooltip>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
