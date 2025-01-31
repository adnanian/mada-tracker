/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { INITIAL_LOWER_BOUND, INITIAL_POSITION, INITIAL_UPPER_BOUND, MIN_PLAYER_SIZE } from "./constants";

const MadaContext = createContext();

/**
 * Renders a context provider of a massive amount of player and game information.
 * This helps facilitate player selection, player info update, without having to
 * prop drill values into every single component.
 * 
 * 
 * @param {object} props the component props. 
 * @returns the provider for MadaContext.
 */
const MadaProvider = ({ children }) => {
    // The lowerBound and upperBound make up the range.
    const [lowerBound, setLowerBound] = useState(INITIAL_LOWER_BOUND);
    const [upperBound, setUpperBound] = useState(INITIAL_UPPER_BOUND);

    // If true, then the mode is competition mode, elimination mode otherwise.
    const [isCompetitionMode, setIsCompetitionMode] = useState(false);

    // If true, then certain components will be hidden.
    const [hideControls, setHideControls] = useState(false);

    // The current number of players.
    const [playerSize, setPlayerSize] = useState(MIN_PLAYER_SIZE);

    // The list of players.
    const [players, setPlayers] = useState([]);

    // The number of rounds (i.e. the number of iterations over the active players.)
    const [rounds, setRounds] = useState(0);

    // Self explanatory.
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
                    // marker for helping eliminated players suspended for too long.
                    suspensionStreak: 0,
                    eliminatorId: 0,
                };
            });
        });
    }, [playerSize]);

    /**
     * Return whether a given position is in range.
     * 
     * Note: the bounds are included in the range.
     * 
     * @param {number} position the position. 
     * @returns true if the position is within the range, false otherwise.
     */
    function isInRange(position) {
        return position >= lowerBound && position <= upperBound;
    }

    /**
     * Returns whether a player has been eliminated.
     * 
     * A player is eliminated if his/her position has been moved outside the range in elimination mode.
     * In competition mode, that player is suspended instead. Being "suspended" still 
     * 
     * 
     * @param {object} player the player. 
     * @returns 
     */
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
