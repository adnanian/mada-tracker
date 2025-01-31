import { Slider, Card, Typography } from "@mui/material";
import { MAX_PLAYER_SIZE, MIN_PLAYER_SIZE } from "../../constants";
import { useCallback, useContext } from "react";
import { MadaContext } from "../../context";

/**
 * Renders a slider for adjusting the number of players
 * in the game.
 * 
 * @returns a slider to adjust the player count.
 */
export default function PlayerSizeAdjustor() {
    const { playerSize, setPlayerSize, hideControls, rounds } = useContext(MadaContext);

    // Each whole number from the min to max number of players will have its own mark.
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

    if (hideControls) {
        return null;
    }

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
                '& > *': {
                    marginTop: 3
                }
            }}>
            <Typography component='h5'>Number of Players</Typography>
            <Slider
                aria-label="player-size"
                value={playerSize}
                min={MIN_PLAYER_SIZE}
                max={MAX_PLAYER_SIZE}
                onChange={(e) => setPlayerSize(e.target.value)}
                marks={marks()}
                step={1}
                valueLabelDisplay='auto'
                sx={{ width: '90%' }}
                disabled={rounds > 0}
            />
        </Card>
    );
}