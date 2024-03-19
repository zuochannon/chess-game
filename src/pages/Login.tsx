import React, { useState } from 'react';
import { NavigationBar } from '../components/NavigationBar';
export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const handleLogin = () => {
      // Check if user and password are not empty
      if (username.trim() !== '' && password.trim() !== '') {
        setIsLoggedIn(true);
        // TODO: Successful login page
      } else {
        alert('Please enter valid username and password.');
      }
    };
    return (
        <main className = 'h-screen bg-black'>
            <NavigationBar />
            <h1 className = 'bg-[#0f0f0f0f] text-center w-full text-3xl font-bold'>
                Login
            </h1>
            <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          {/* Display logout button or redirect to another page */}
        </div>
      ) : (
        <div 
            style={{display: "flex", flexDirection: "column"}}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onClick={handleLogin}
            style={{margin: "10px auto", width: "50vw", padding: "10px"}}
            >Login</button>
        </div>
      )}
    </div>
        </main>
    )
}
