import React from 'react';
import AuthenticationModule from './Authentication';
import { useAuth } from '../context/AuthContext';
import ApplicationModule from './Application';

const Modules = () => {
    const { user } = useAuth();

    return user ? <ApplicationModule /> : <AuthenticationModule />;
};

export default Modules;
