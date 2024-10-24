import React, { useState } from 'react';

function App() {
    const [status, setStatus] = useState('Unknown');
    const [message, setMessage] = useState('');

    const checkServerStatus = async () => {
        try {
            const response = await fetch('http://localhost:5002/status');
            if (response.ok) {
                const data = await response.json();
                setStatus(data.status);
                setMessage(data.message);
            } else {
                setStatus('Error');
                setMessage('No response');
            }
        } catch (error) {
            setStatus('Error');
            setMessage('Connection failed ' + error.message);
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
