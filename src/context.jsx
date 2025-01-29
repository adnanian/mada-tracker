/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { INITIAL_LOWER_BOUND, INITIAL_POSITION, INITIAL_UPPER_BOUND, MIN_PLAYER_SIZE } from "./constants";

const MadaContext = createContext();

const MadaProvider = ({ children }) => {
    const [lowerBound, setLowerBound] = useState(INITIAL_LOWER_BOUND);
    const [upperBound, setUpperBound] = useState(INITIAL_UPPER_BOUND);
    const [isCompetitionMode, setIsCompetitionMode] = useState(false);
    const [hideControls, setHideControls] = useState(false);
    const [playerSize, setPlayerSize] = useState(MIN_PLAYER_SIZE);
    const [players, setPlayers] = useState([]);
    const [rounds, setRounds] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [turnPlayer, setTurnPlayer] = useState(null);

    useEffect(() => {
        setPlayers((players) => {
            return Array.from({ length: playerSize }, (_, index) => {
                const existingPlayer = players[index];
                return existingPlayer || {
                    number: index + 1,
                    name: '',
                    position: INITIAL_POSITION,
                    score: 0,
                    suspensionStreak: 0
                };
            });
        });
    }, [playerSize]);

    // console.log(`[${lowerBound}, ${upperBound}]`)

    function isInRange(position) {
        return position >= lowerBound && position <= upperBound;
    }

    function isEliminated(player) {
        return !(isInRange(player.position) || (isCompetitionMode && player.score > 0));
    }

    return (
        <MadaContext.Provider
            value={{
                lowerBound, setLowerBound,
                upperBound, setUpperBound,
                isInRange, isEliminated,
                isCompetitionMode, setIsCompetitionMode,
                hideControls, setHideControls,
                playerSize, setPlayerSize,
                players, setPlayers,
                rounds, setRounds,
                selectedPlayer, setSelectedPlayer,
                turnPlayer, setTurnPlayer
            }}
        >
            {children}
        </MadaContext.Provider>
    );
};

export { MadaContext, MadaProvider }
