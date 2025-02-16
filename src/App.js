import React, { useEffect, useState } from 'react';
import { WebPlayback } from './Webplayback';
import Login from './Login';

function App(){
    const [token, setToken] = useState('');
    
    useEffect(() => {
        async function getToken(){
            const response = await fetch('/auth/token');
            const json = await response.json();
            setToken(json.access_token);
        }
        getToken();
    }, []);

    return(
        <>
            { (token === '') ? <Login /> : <WebPlayback token={token} /> }
        </>
    )
}

export default App;