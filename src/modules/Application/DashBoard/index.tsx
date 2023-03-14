import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

const DashBoardScreen = () => {
    const { signOut$ } = useAuth();

    const handleSignOut = () => {
        signOut$().subscribe();
    };

    return (
        <div>
            <Button onClick={handleSignOut} variant={'contained'}>
                Log out
            </Button>
        </div>
    );
};

export default DashBoardScreen;
