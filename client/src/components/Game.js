import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Board from "./Board";
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import "./Chat.css";


function Game({ channel, setChannel, winnerUsername }) {
    const [setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({ winner: "none", state: "none" });
    const [toastShown, setToastShown] = useState(false);

    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    });
    

    useEffect(() => {
        if (result.state === "won" && !toastShown) {
            toast.success(`player ${winnerUsername} Won The Game`, {
                position: "top-center", // Position toast at the top center of the screen
                autoClose: 5000, // Close after 5 seconds
                hideProgressBar: true, // Hide progress bar
                closeButton: false, // Hide close button
            });
            setToastShown(true);
        }
    }, [result, toastShown, winnerUsername]);

    const handleLeaveGame = async () => {
        await channel.stopWatching();
        setChannel(null);
    };
    return (
        <div className="gameContainer">
            <Board result={result} setResult={setResult} />
            <Window>
                <MessageList
                    disableDateSeparator
                    closeReactionSelectorOnClick
                    hideDeletedMessages
                    messageActions={["react"]}
                />
                <MessageInput noFiles />
            </Window>

            <button onClick={handleLeaveGame}>Leave Game</button>

            <ToastContainer /> {/* Toast container for displaying messages */}

        </div>
    );
}

export default Game;
