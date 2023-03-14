import React, { useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { object, string } from 'yup';
import { finalize } from 'rxjs';

import { useAuth } from '../../../context/AuthContext';
import { doOnSubscribe } from '../../../utils/rxjs-utils';
import { SignUpFormData } from '../../../structures/form-data/signup';

const SignUpScreen = () => {
    const navigate = useNavigate();
    const { signUp$ } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const validationSchema = object().shape({
        email: string().email('Must be a valid Email').required('Email is required'),
        firstName: string().required('Firstname is required'),
        lastName: string().required('Lastname is required'),
        password: string().min(6, `Password must be at least 6 characters`).required('Password is required')
    });

    const initialValues: SignUpFormData = {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    };

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormData>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = handleSubmit((data) => {
        console.log('Sign Up', data);

        signUp$({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
        })
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: (result) => {
                    if (result.userConfirmed) {
                        navigate('/signin');
                    } else {
                        navigate('/signup-confirmation');
                    }
                },
                error: (err) => {
                    console.error('SignUp error', err);
                    enqueueSnackbar(err.message, { variant: 'error' });
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
                        name='firstName'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                error={'firstName' in errors}
                                fullWidth
                                helperText={errors.firstName?.message}
                                label='Firstname'
                                margin='normal'
                                name='firstName'
                                onBlur={onBlur}
                                onChange={onChange}
                                type='text'
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
                        name='lastName'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                error={'lastName' in errors}
                                fullWidth
                                helperText={errors.lastName?.message}
                                label='Lastname'
                                margin='normal'
                                name='lastName'
                                onBlur={onBlur}
                                onChange={onChange}
                                type='text'
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
                            Sign Up
                        </LoadingButton>
                    </Box>
                </form>

                <Box mt={3}>
                    <Typography align='center'>{`Already have an account?`}</Typography>
                    <Typography onClick={() => navigate('/signin')} align='center'>
                        Sign In
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default SignUpScreen;
