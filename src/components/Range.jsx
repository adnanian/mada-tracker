import { Card, Typography } from "@mui/material"
import { MadaContext } from "../context"
import { useContext } from "react";

export default function Range() {
    const { lowerBound, upperBound } = useContext(MadaContext);

    return (
        <Card elevation={24} sx={{ padding: 3 }}>
            <Typography variant='h2' component='h1' sx={{ alignSelf: 'center' }}>
                Mada Tracker
            </Typography>
            <Typography variant='h2' component='h2'>
                {`[${lowerBound}, ${upperBound}]`}
            </Typography>
        </Card>
    )
};