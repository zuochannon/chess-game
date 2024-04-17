import React, { useState } from 'react';
import { NavigationBar } from '../components/NavigationBar';

export function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSignUp = () => {
        // Checks for non-empty email, username, and password
        if (username.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
            fetch(`${import.meta.env.VITE_SERVER}/signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({username, email, password}),
              }).then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                console.log(data);
                setIsRegistered(true);
              })
              .catch(error => {
                console.error('There was a problem with the login request:', error);
              });
        // TODO: Redirect the user to another page after successful registration 
        } else {
        alert('Please enter valid username, email, and password.');
        }
    };

    return (
        <main className = 'h-screen bg-black'>
            <NavigationBar />
            <h1 className = 'bg-black text-center w-auto text-3xl font-bold'>
                Sign Up
            </h1>
            <div>
                {isRegistered ? (
                    <div>
                        <h2>Account Registered Successfully!</h2>
                        {/* TODO: Display a message or redirect to another page */}
                    </div>
                ) : (
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{margin: "10px auto", width: "50vw", padding: "10px"}}
                            />
                            <br />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{margin: "10px auto", width: "50vw", padding: "10px"}}
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{margin: "10px auto", width: "50vw", padding: "10px"}}
                            />
                            <br />
                            <button
                                onClick={handleSignUp}
                                style={{margin: "10px auto", width: "50vw", padding: "10px"}}
                            >Sign Up</button>
                        </div>
                )}
            </div>

        </main>
    )
}
