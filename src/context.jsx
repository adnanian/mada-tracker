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
                    suspensionStreak: 0,
                    eliminatorId: 0,
                };
            });
        });
    }, [playerSize]);

    // console.log(`[${lowerBound}, ${upperBound}]`)

    function isInRange(position) {
        return position >= lowerBound && position <= upperBound;
    }

    function isEliminated(player) {
        return !(isInRange(player.position) || (isCompetitionMode && (player.score > 0 || player.suspensionStreak === 0)));
    }

    function suspensionUpdate() {
        if (isCompetitionMode) {
            if (!isInRange(turnPlayer.position)) {
                if (turnPlayer.score <= 0) {
                    setPlayers(players.map((player) => player.number === turnPlayer.number ? { ...player, suspensionStreak: (player.suspensionStreak + 1) } : player));
                } else {
                    setPlayers(players.map((player) => {
                        // if (player.number === turnPlayer.eliminatorId && player.number !== turnPlayer.number) {
                        //     const newScore = player.score + turnPlayer.score;
                        //     return { ...player, score: newScore }
                        // } else if (player.number === turnPlayer.number) {
                        //     return { ...player, score: 0 }
                        // } else {
                        //     return player;
                        // }
                        if (player.number === turnPlayer.eliminatorId) {
                            if (player.number !== turnPlayer.number) {
                                const newScore = player.score + turnPlayer.score;
                                return { ...player, score: newScore }
                            } else {
                                return { ...player, score: 0 }
                            }
                        } else {
                            return player;
                        }
                    }))
                }
            } else {
                setPlayers(players.map((player) => {
                    if (player.number === turnPlayer.number) {
                        return {
                            ...player,
                            suspensionStreak: 0,
                            eliminatorId: 0
                        }
                    } else {
                        return player
                    }
                }));
            }
        }
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
                turnPlayer, setTurnPlayer,
                suspensionUpdate,
            }}
        >
            {children}
        </MadaContext.Provider>
    );
};

export { MadaContext, MadaProvider }
