/* eslint-disable react/prop-types */
import { Card, Typography, Button } from "@mui/material"
import { MadaContext } from "../context"
import { useContext } from "react";
import { INITIAL_LOWER_BOUND, INITIAL_UPPER_BOUND } from "../constants";

export default function Range({ onResetGame }) {
    const { lowerBound, setLowerBound, upperBound, setUpperBound } = useContext(MadaContext);

    function handleReset() {
        setLowerBound(INITIAL_LOWER_BOUND);
        setUpperBound(INITIAL_UPPER_BOUND);
        onResetGame();
    }

    return (
        <Card elevation={24} sx={{ padding: 3 }}>
            <Typography variant='h2' component='h1' sx={{ alignSelf: 'center' }}>
                Mada Tracker
            </Typography>
            <Typography variant='h2' component='h2'>
                {`[${lowerBound}, ${upperBound}]`}
            </Typography>
            <Button
                onClick={handleReset}
                variant='contained'
                sx={{ marginTop: 2 }}
            >
                Reset
            </Button>
        </Card>
    )
};