import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundScreen from '../../error-page/NotFound';
import DashBoardScreen from './DashBoard';

const ApplicationModule = () => {
    return (
        <Routes>
            <Route path='dashboard/*' element={<DashBoardScreen />} />
            <Route path='/' element={<Navigate to='dashboard' replace />} />

            <Route path='*' element={<NotFoundScreen />} />
        </Routes>
    );
};

export default ApplicationModule;
