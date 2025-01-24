/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { INITIAL_LOWER_BOUND, INITIAL_UPPER_BOUND } from "./constants";

const MadaContext = createContext();

const MadaProvider = ({ children }) => {
    const [lowerBound, setLowerBound] = useState(INITIAL_LOWER_BOUND);
    const [upperBound, setUpperBound] = useState(INITIAL_UPPER_BOUND);
    const [isCompetitionMode, setIsCompetitionMode] = useState(false);

    console.log(`[${lowerBound}, ${upperBound}]`)

    function isInRange(position) {
        return position >= lowerBound && position <= upperBound;
    }

    return (
        <MadaContext.Provider value={{ lowerBound, setLowerBound, upperBound, setUpperBound, isInRange, isCompetitionMode, setIsCompetitionMode }}>
            {children}
        </MadaContext.Provider>
    );
};

export { MadaContext, MadaProvider }
