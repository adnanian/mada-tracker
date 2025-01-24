/* eslint-disable react/prop-types */
import { Slider, Card, Typography } from "@mui/material";
import { MAX_PLAYER_SIZE, MIN_PLAYER_SIZE } from "../constants";
import { useCallback } from "react";

export default function PlayerSizeAdjuster({ numberOfPlayers, onChange }) {
    const marks = useCallback(() => {
        const playerMarks = [];
        for (let i = MIN_PLAYER_SIZE; i <= MAX_PLAYER_SIZE; i++) {
            playerMarks.push({
                value: i,
                label: i
            });
        }
        return playerMarks;
    }, []);

    return (
        <Card
            elevation={24}
            sx={{
                display: 'inherit',
                flexDirection: 'inherit',
                alignItems: 'inherit',
                borderRadius: 'inherit',
                marginTop: 5,
                width: '40%',
                padding: 2,

            }}>
            <Typography component='h5'>Number of Players</Typography>
            <Slider
                aria-label="player-size"
                value={numberOfPlayers}
                min={MIN_PLAYER_SIZE}
                max={MAX_PLAYER_SIZE}
                onChange={onChange}
                marks={marks()}
                step={1}
                valueLabelDisplay='auto'
                sx={{ width: '90%' }}
            />
        </Card>
    );
}