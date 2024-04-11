import React, { useState } from 'react';
import { NavigationBar } from '../components/NavigationBar';

export function Profile() {
    const user = {
        displayName: "JohnDoe",
        firstName: "John",
        lastName: "Doe"
    };

    return (
        <main className='h-screen bg-black'>
            <NavigationBar />
            <h1 className='bg-black text-center w-auto text-3xl font-bold'>
                User Profile
            </h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="profile-info">
                    <h2>Display Name: {user.displayName}</h2>
                    <h2>First Name: {user.firstName}</h2>
                    <h2>Last Name: {user.lastName}</h2>
                </div>
            </div>
        </main>
    )
}
