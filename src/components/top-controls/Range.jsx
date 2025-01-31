import { Card, Typography, Button } from "@mui/material"
import { MadaContext } from "../../context"
import { useContext } from "react";
import { INITIAL_LOWER_BOUND, INITIAL_POSITION, INITIAL_UPPER_BOUND } from "../../constants";

/**
 * Renders the title of this application, the current range,
 * and a button to reset the whole game.
 * 
 * @returns the title, range, and reset button.
 */
export default function Range() {
    const {
        lowerBound,
        setLowerBound,
        upperBound,
        setUpperBound,
        hideControls,
        players,
        setPlayers,
        setRounds,
        setSelectedPlayer,
        setTurnPlayer
    } = useContext(MadaContext);

    /**
     * Resets the game.
     */
    function handleReset() {
        // First, reset the lower bound.
        setLowerBound(INITIAL_LOWER_BOUND);
        setUpperBound(INITIAL_UPPER_BOUND);
        // Next, reset the players' data.
        setPlayers(players.map((player) => {
            return {
                ...player,
                position: INITIAL_POSITION,
                score: 0,
                suspensionStreak: 0
            }
        }));
        // Then, set the number of rounds back to zero.
        setRounds(0);
        // Finally, set the selected and turn players to null.
        setSelectedPlayer(null);
        setTurnPlayer(null);
    }

    return (
        <Card
            elevation={24}
            sx={{
                padding: 3,
                borderRadius: 'inherit',
                display: 'inherit',

            }}
        >
            <Typography
                variant='h2'
                component='h1'
                sx={{
                    alignSelf: 'center',
                    fontSize: { xs: '34px', md: '48px', xl: '66px' }
                }}
            >
                Mada Tracker
            </Typography>
            <Typography
                variant='h2'
                component='h2'
                sx={{
                    alignSelf: 'center',
                    fontSize: { xs: '24px', md: '34px', xl: '60px' }
                }}
            >
                {`[${lowerBound}, ${upperBound}]`}
            </Typography>
            {
                hideControls ? null : (
                    <Button
                        onClick={handleReset}
                        variant='contained'
                        sx={{ marginTop: 2 }}
                    >
                        Reset
                    </Button>
                )
            }
        </Card>
    )
};