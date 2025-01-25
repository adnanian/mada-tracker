/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Button, Typography, TableContainer, Table, TableRow, TableCell, Box, TableBody, Tooltip } from "@mui/material";
import { MadaContext } from "../context";
import { useContext } from "react";

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
            {/* <TextField
                value={player.name}
                // onChange={handleNameChange}
                variant="outlined"
                fullWidth
                readOnly
                slotProps={{
                    input: {
                        style: { textAlign: 'center' }, // Default alignment
                    },
                }}
                sx={{
                    '& .MuiInputBase-input': {
                        textAlign: { xs: 'left', sm: 'center' }, // Responsive alignment
                    },
                }}
            /> */}

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
                                    <Tooltip title='Score' placement='right'>
                                        <TableCell align='center'>{player.score}</TableCell>
                                    </Tooltip>
                                ) : null
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='contained' sx={{ backgroundColor: '#0f0 !important' }} onClick={onScoreUpdate}>
                Update Score
            </Button>
        </Box>
    );
}
