import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import SignUpConfirmationScreen from './SignUpConfirmation';

const AuthenticationModule = () => {
    return (
        <Routes>
            <Route path='signin' element={<SignInScreen />} />
            <Route path='signup' element={<SignUpScreen />} />
            <Route path='signup-confirmation' element={<SignUpConfirmationScreen />} />
            <Route path='/*' element={<Navigate to='signin' replace />} />
        </Routes>
    );
};

export default AuthenticationModule;
