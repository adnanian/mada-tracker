/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Typography, TableContainer, Table, TableRow, TableCell, Box, TableBody, Tooltip } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import { MadaContext } from "../../context";
import { useContext } from "react";
import { WINNING_SCORE } from "../../constants";

export default function PlayerCard({ player, isSelected, onSelect, onScoreUpdate }) {

    const { isInRange, isCompetitionMode, isEliminated } = useContext(MadaContext);

    function handleSelectedPlayer() {
        onSelect(player);
    }

    function backgroundColor() {
        if (player.score >= WINNING_SCORE) return '#0ff';
        if (isInRange(player.position)) {
            return isSelected ? 'yellow' : '#ccc';
        } else {
            return isSelected ? 'pink' : '#fa0';
        }
    }

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
            {/* {isCompetitionMode ? (
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: '#0f0 !important',
                        width: '100% !important',
                        border: '1px solid black'
                    }}
                    onClick={onScoreUpdate}
                >
                    Update Score
                </Button>
            ) : null} */}
        </Box>
    );
}
