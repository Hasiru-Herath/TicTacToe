import React, { useState } from 'react';
import Login from './Login';
import Game from './Game';

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [winnerUsername, setWinnerUsername] = useState(null);

    const handleLoginSuccess = (username) => {
        setIsAuth(true);
        setWinnerUsername(username); // Set the winnerUsername after successful login
    };

    return (
        <div>
            {!isAuth ? (
                <Login setIsAuth={handleLoginSuccess} setWinnerUsername={setWinnerUsername} />
            ) : (
                <Game winnerUsername={winnerUsername} />
            )}
        </div>
    );
}

export default App;
