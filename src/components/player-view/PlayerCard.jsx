/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Button, Typography, TableContainer, Table, TableRow, TableCell, Box, TableBody, Tooltip } from "@mui/material";
import { MadaContext } from "../../context";
import { useContext } from "react";
import { WINNING_SCORE } from "../../constants";

export default function PlayerCard({ player, isSelected, onSelect, onScoreUpdate }) {

    const { isInRange, isCompetitionMode } = useContext(MadaContext);

    // function handleNameChange(e) {
    //     e.stopPropagation(); // Prevent parent click from firing
    //     onNameChange(player.number, e.target.value);
    // }

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
