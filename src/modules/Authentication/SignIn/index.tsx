import React, { useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { finalize } from 'rxjs';

import { useAuth } from '../../../context/AuthContext';
import { doOnSubscribe } from '../../../utils/rxjs-utils';
import { SignInFormData } from '../../../structures/form-data/signin';

const SignInScreen = () => {
    const navigate = useNavigate();
    const { signIn$ } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const initialValues: SignInFormData = {
        email: '',
        password: ''
    };

    const validationSchema = object().shape({
        email: string().email('Must be a valid Email').required('Email is required'),
        password: string().min(6, `Password must be at least 6 characters`).required('Password is required')
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInFormData>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = handleSubmit((data) => {
        signIn$({
            email: data.email,
            password: data.password
        })
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: (result) => {
                    if (!result.userConfirmed) {
                        navigate('/signup-confirmation');
                    }
                },
                error: (error) => {
                    console.error('SignUp error', error);
                    enqueueSnackbar(error.message, { variant: 'error' });
                }
            });
    });

    return (
        <Box
            component='main'
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}>
            <Container maxWidth='sm'>
                <form onSubmit={onSubmit}>
                    <Box sx={{ mt: 4 }}>
                        <Typography color='textPrimary' variant='h4' align='center'>
                            Sign Up
                        </Typography>
                        <Typography align='center'>Sample Pass A$hik123456</Typography>
                    </Box>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                error={'email' in errors}
                                fullWidth
                                helperText={errors.email?.message}
                                label='Email Address'
                                margin='normal'
                                name='email'
                                onBlur={onBlur}
                                onChange={onChange}
                                type='email'
                                value={value}
                                variant='outlined'
                                inputProps={{
                                    form: {
                                        autocomplete: 'off'
                                    }
                                }}
                            />
                        )}
                    />

                    <Controller
                        name='password'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                error={'password' in errors}
                                fullWidth
                                helperText={errors.password?.message}
                                label='Password'
                                margin='normal'
                                name='password'
                                onBlur={onBlur}
                                onChange={onChange}
                                type='password'
                                value={value}
                                variant='outlined'
                                inputProps={{
                                    form: {
                                        autocomplete: 'off'
                                    }
                                }}
                            />
                        )}
                    />

                    <Box mt={2}>
                        <LoadingButton color='primary' loading={loading} fullWidth size='large' type='submit' variant='contained'>
                            Sign In
                        </LoadingButton>
                    </Box>
                </form>

                <Box mt={3}>
                    <Typography align='center'>{`Don't have an account?`}</Typography>
                    <Typography onClick={() => navigate('/signup')} align='center'>
                        Sign Up
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default SignInScreen;
