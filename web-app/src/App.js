import React, { useState } from 'react';

function App() {
    const [status, setStatus] = useState('Unknown');
    const [message, setMessage] = useState('');

    const checkServerStatus = async () => {
        try {
            const response = await fetch('http://localhost:5000/status');
            const data = await response.json()
            if (response.ok) {
                setStatus(data.status);
                setMessage(data.message);
            }
            else {
                setStatus(data.status);
                setMessage(data.message);
            }
        }
        catch (error) {
            setStatus(status);
            setMessage(message);
        }
    };

    return (
        <div className="App">
            <h1>Server Check</h1>
            <button onClick={checkServerStatus}>Check</button>
            <p>Status: {status}</p>
            <p>Message: {message}</p>
        </div>
    );
}

export default App;