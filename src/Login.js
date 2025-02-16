import React from 'react';;

function Login(){
    return(
        <div className="login">
            <header className="login-header">
                <a className="login-btn" href="/auth/login">Login with Spotify</a>
            </header>
        </div>
    )
}

export default Login;