import React, { useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { object, string } from 'yup';
import { finalize } from 'rxjs';

import { useAuth } from '../../../context/AuthContext';
import { SignUpConfirmFormData } from '../../../structures/form-data/signup-confirm';
import { doOnSubscribe } from '../../../utils/rxjs-utils';

const SignUpConfirmationScreen = () => {
    const { confirmAccount$ } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const validationSchema = object().shape({
        code: string().required('Confirmation code is required')
    });

    const initialValues: SignUpConfirmFormData = {
        code: ''
    };

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpConfirmFormData>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = handleSubmit((data) => {
        console.log('Sign Up', data);
        confirmAccount$({
            code: data.code
        })
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: (result) => {
                    console.log('Signup confirmation', result);
                },
                error: (err) => {
                    console.error('SignUp confirmation error', err);
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
                            Sign Up Confirmation
                        </Typography>
                    </Box>
                    <Controller
                        name='code'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                error={'code' in errors}
                                fullWidth
                                helperText={errors.code?.message}
                                label='Confirmation Code'
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

                    <Box mt={2}>
                        <LoadingButton color='primary' loading={loading} fullWidth size='large' type='submit' variant='contained'>
                            Confirm
                        </LoadingButton>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default SignUpConfirmationScreen;
