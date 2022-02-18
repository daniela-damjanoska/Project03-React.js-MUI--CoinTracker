import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deepPurple, grey } from '@mui/material/colors';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SignIn() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: deepPurple[800],
            },
            secondary: {
                main: grey[600],
            },
        },
    });

    const handleChange = prop => e => {
        setValues({ ...values, [prop]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = e => e.preventDefault();

    async function fetchMoviesJSON() {
        const response = await fetch('https://randomuser.me/api'),
        data = await response.json();

        navigate('/Overview', { state: data.results[0].picture.thumbnail });
    }

    const handleSubmit = e => {
        e.preventDefault();

        fetchMoviesJSON();
    };

    const matches = useMediaQuery('(max-width:600px)');

    return (
        <Container
            maxWidth={false}
            sx={{
                backgroundColor: 'white',
                width: 600,
                height: matches ? '100vh' : 'auto',
                borderRadius: matches ? 'none' : '8px',
            }}
        >
            <Box
                paddingX={4}
                paddingY={7}
                sx={{
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src="./Images/logo.png"
                        alt="logo"
                        style={{ width: 150 }}
                    />
                </Box>
                <Typography
                    variant="h5"
                    component="h1"
                    marginTop={8}
                    marginBottom={4}
                >
                    SIGN IN
                </Typography>
                <ThemeProvider theme={theme}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            fullWidth={true}
                            size="small"
                            value={values.username}
                            onChange={handleChange('username')}
                            sx={{
                                marginBottom: 3,
                            }}
                        />
                        <FormControl
                            variant="outlined"
                            fullWidth={true}
                            size="small"
                            sx={{
                                marginBottom: 7,
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {values.showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Sign in
                        </Button>
                    </form>
                    <Typography
                        variant="body2"
                        component="p"
                        marginTop={2}
                        color="secondary"
                    >
                        Don't have an account yet?{' '}
                    </Typography>
                    <Link to="/SignUp">Sign up now, it is free!</Link>
                </ThemeProvider>
            </Box>
        </Container>
    );
}