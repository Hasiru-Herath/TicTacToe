import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Board from "./Board";
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import "./Chat.css";

function Game({ channel, setChannel }) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({ winner: "none", state: "none" });

    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    });

    const handleLeaveGame = async () => {
        await channel.stopWatching();
        setChannel(null);
    };


    return (
        <div className="gameContainer">
            <div className="boardContainer">
                <Board result={result} setResult={setResult} />
            </div>
            <div >
                <Window className="window">
                    <div className='windowContainer'>
                        {<MessageList
                            enableDateSeparator
                            //closeReactionSelectorOnClick
                            hideDeletedMessages
                            messageActions={["none"]}
                        />}
                    </div>

                    <MessageInput className='messageInput' noFiles />
                </Window>
            </div>

            <button className='leave-game' onClick={handleLeaveGame}>Leave Game</button>

            {result.state === "won" && (`Player "${result.winner}" Won The Game`)}
            {result.state === "tie" && ("Game tieds")}
        </div>
    );


}

export default Game;
