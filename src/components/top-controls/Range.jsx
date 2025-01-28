import { Card, Typography, Button } from "@mui/material"
import { MadaContext } from "../../context"
import { useContext } from "react";
import { INITIAL_LOWER_BOUND, INITIAL_POSITION, INITIAL_UPPER_BOUND } from "../../constants";

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
     * 
     */
    function handleReset() {
        setLowerBound(INITIAL_LOWER_BOUND);
        setUpperBound(INITIAL_UPPER_BOUND);
        // onReset();
        setPlayers(players.map((player) => {
            return {
                ...player,
                position: INITIAL_POSITION,
                score: 0,
                suspensionStreak: 0
            }
        }));
        setRounds(0);
        setSelectedPlayer(null);
        setTurnPlayer(null);
    }

    // function resetGame() {
    //     setPlayerInfo(playerInfo.map((player) => {
    //       return { ...player, position: INITIAL_POSITION, score: 0 }
    //     }));
    //     setSelectedPlayer(null);
    //     setRounds(0);
    //     setTurnPlayer(null);
    //   }

    return (
        <Card elevation={24} sx={{ padding: 3 }}>
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