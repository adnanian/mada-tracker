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
     * A player is eliminated if his/her position has been moved outside the
     * range in elimination mode.
     * In competition mode, that player is suspended instead. Being "suspended"
     * stil gives the player an opportunity to get back in the game.
     * 
     * See suspensionUpdate() for more info.
     * 
     * 
     * @param {object} player the player. 
     * @returns true if the player is eliminated, false otherwise.
     */
    function isEliminated(player) {
        return !(isInRange(player.position) || (isCompetitionMode && (player.score > 0 || player.suspensionStreak === 0)));
    }

    /**
     * Validate's the turn players status at the end of the turn.
     * 
     * The following scenarios apply only to competition mode:
     * 
     * If a player is active (i.e. within range), then ensures that
     * suspensionStreak and eliminatorIds are reset. This is regardless
     * of whether the play was active or suspended at the beginning of
     * his/her turn.
     * 
     * If a player is suspended and fails to get back in the range at the end of
     * his/her turn, then one of two things would happen:
     * 
     * 1. The player would have to give all his/her points to the player
     * that eliminated him/her, and has one more chance to get back in
     * at his/her next turn. This is the purpose of suspension streak.
     * Any player with a suspension streak greater than 0 is eliminated.
     * It increases for every turn that the player remains suspended.
     * 
     * 2. If the player is suspended and has a score less than or equal to 0,
     * then he/she is eliminated from the game.
     */
    function suspensionUpdate() {
        if (isCompetitionMode) {
            if (!isInRange(turnPlayer.position)) {
                if (turnPlayer.score <= 0) {
                    setPlayers(players.map((player) => player.number === turnPlayer.number ? { ...player, suspensionStreak: (player.suspensionStreak + 1) } : player));
                } else {
                    setPlayers(players.map((player) => {
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
