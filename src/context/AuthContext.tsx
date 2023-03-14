import React, { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { CircularProgress } from '@mui/material';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { catchError, finalize, map, mergeMap, Observable, of } from 'rxjs';
import { doOnSubscribe } from '../utils/rxjs-utils';
import { useNavigate } from 'react-router-dom';

export interface IAuthContextType {
    user: CognitoUser | null;
    signIn$: (input: { email: string; password: string }) => Observable<{ userConfirmed: boolean }>;
    signOut$: () => Observable<void>;
    signUp$: (input: { firstName: string; lastName: string; email: string; password: string }) => Observable<{ userConfirmed: boolean }>;
    confirmAccount$: (input: { code: string }) => Observable<{ userConfirmed: boolean }>;
}

// Create a context object
export const AuthContext = React.createContext<IAuthContextType>({
    user: null
} as IAuthContextType);

interface IAuthProviderProps {
    children: React.ReactNode;
}

// Create a provider for components to consume and subscribe to changes
export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<CognitoUser | null>(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    // temporarily holds unverified account email, password
    const [unverifiedAccount, setUnverifiedAccount] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        fromPromise(Auth.currentAuthenticatedUser())
            .pipe(
                doOnSubscribe(() => setIsAuthenticating(true)),
                map((fetchedUser) => {
                    const cognitoUser: CognitoUser = fetchedUser as CognitoUser;

                    if (!cognitoUser) {
                        throw Error('Current auth user cast error');
                    }

                    return cognitoUser;
                }),
                finalize(() => setIsAuthenticating(false))
            )
            .subscribe({
                next: (cognitoUser) => setUser(cognitoUser),
                error: (error) => {
                    console.error('currentAuthenticatedUse error', error);
                }
            });
    }, []);

    const signIn$ = ({ email, password }: { email: string; password: string }): Observable<{ userConfirmed: boolean }> => {
        return fromPromise(Auth.signIn({ username: email, password })).pipe(
            map((signInResult) => {
                console.log('signInResult', signInResult);
                if (!(signInResult instanceof CognitoUser)) {
                    // this case should not arise as sign in result should always return CognitoUser
                    throw Error('Critical Error');
                }

                // set user information in state
                setUser(signInResult);

                // reset route
                navigate('/');

                return {
                    userConfirmed: true
                };
            }),
            catchError((err) => {
                // could not find any possible way to detect the error type
                // that's why compared the message
                if (err.message === 'User is not confirmed.') {
                    setUnverifiedAccount({ email: email, password: password });

                    return of({
                        userConfirmed: false
                    });
                }

                throw err;
            })
        );
    };

    const signUp$ = ({
        email,
        password,
        firstName,
        lastName
    }: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Observable<{ userConfirmed: boolean; user: CognitoUser }> => {
        return fromPromise(
            Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    name: `${firstName} ${lastName}`
                }
            })
        ).pipe(
            map((signUpResult) => {
                if (!signUpResult.userConfirmed) {
                    setUnverifiedAccount({ email: email, password: password });
                }

                return {
                    user: signUpResult.user,
                    userConfirmed: signUpResult.userConfirmed
                };
            })
        );
    };

    const confirmAccount$ = ({ code }: { code: string }): Observable<{ userConfirmed: boolean }> => {
        return fromPromise(Auth.confirmSignUp(unverifiedAccount?.email, code)).pipe(
            mergeMap((data) => {
                console.log('confirmSignUp', data);
                return signIn$({
                    email: unverifiedAccount?.email,
                    password: unverifiedAccount?.password
                });
            })
        );
    };

    const signOut$ = () => {
        return fromPromise(Auth.signOut()).pipe(map(() => setUser(null)));
    };

    const value = {
        user,
        signIn$,
        signUp$,
        signOut$,
        confirmAccount$
    } satisfies IAuthContextType;

    if (isAuthenticating) {
        return <CircularProgress />;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext) as IAuthContextType;

export default AuthProvider;
