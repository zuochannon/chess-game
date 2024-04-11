import React from 'react';
import profileImage from '../assets/default_pfp.png'; // Importing the profile image
import { NavigationBar } from '../components/NavigationBar';

export function Profile() {
    const user = {
        displayName: "JohnDoe",
        firstName: "John",
        lastName: "Doe"
    };

    return (
        <main className='h-screen bg-black pt-20'>
            <NavigationBar />
            <div className="profile-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h1 className='bg-black text-3xl font-bold'>
                        User Profile
                    </h1>
                </div>
                <div className="profile-info" style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "20px" }}>
                    <img src={profileImage} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%", marginRight: "20px" }} />
                    <div>
                        <h2>Display Name: {user.displayName}</h2>
                        <h2>First Name: {user.firstName}</h2>
                        <h2>Last Name: {user.lastName}</h2>
                    </div>
                </div>
            </div>
        </main>
    )
}
