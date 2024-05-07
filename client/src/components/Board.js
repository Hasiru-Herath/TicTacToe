import React, { useState, useEffect } from 'react';
import Square from './Square';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { Patterns } from '../WinningPatterns';
import './Board.css'; // Import CSS file for styling

function Board({ result, setResult }) {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", "",]);
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");

    const { channel } = useChannelStateContext();
    const { client } = useChatContext();

    useEffect(() => {
        checkIfTie();
        checkWin();
    }, [board]);

    const chooseSquare = async (square) => {
        if (turn === player && board[square] === "") {
            setTurn(player === "X" ? "O" : "X");

            await channel.sendEvent({
                type: "game-move",
                data: { square, player },
            });

            setBoard(
                board.map((val, idx) => {
                    if (idx === square && val === "") {
                        return player;
                    }
                    return val;
                })
            );
        }
    };

    const checkWin = () => {
        Patterns.forEach((currPattern) => {
            const firstPlayer = board[currPattern[0]];
            if (firstPlayer === "") return;
            let foundWinningPattern = true;
            currPattern.forEach((idx) => {
                if (board[idx] !== firstPlayer) {
                    foundWinningPattern = false;
                }
            });
            if (foundWinningPattern) {
                setResult({ winner: board[currPattern[0]], state: "won" });
            }
        });
    };

    const checkIfTie = () => {
        let filled = true;
        board.forEach((square) => {
            if (square === "") {
                filled = false;
            }
        });
        if (filled) {
            setResult({ winner: "none", state: "tie" });
        }
    };

    channel.on((event) => {
        if (event.type === "game-move" && event.user.id !== client.userID) {
            const currentPlayer = event.data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            setBoard(
                board.map((val, idx) => {
                    if (idx === event.data.square && val === "") {
                        return event.data.player;
                    }
                    return val;
                })
            );
        }
    });

    return (
        <div className="board">
            {[0, 3, 6].map((startIdx) => (
                <div key={startIdx} className="row">
                    {[0, 1, 2].map((offset) => (
                        <Square
                            key={startIdx + offset}
                            val={board[startIdx + offset]}
                            chooseSquare={() => {
                                chooseSquare(startIdx + offset);
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
