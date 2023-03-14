import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Modules from './modules';
import { SnackbarProvider } from 'notistack';

import { configureAmplify } from './lib/amplify';
import AuthProvider from './context/AuthContext';

configureAmplify();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <SnackbarProvider
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}>
                        <Modules />
                    </SnackbarProvider>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
