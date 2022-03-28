import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LogoAndTitle from '../Components/LogoAndTitle';

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
import FormHelperText from '@mui/material/FormHelperText';

export default function SignIn() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const [userErrors, setUserErrors] = useState(false);
    const [passErrors, setPassErrors] = useState(false);
    const [userSuccess, setUserSuccess] = useState(false);
    const [passSuccess, setPassSuccess] = useState(false);
    const [helperTextUser, setHelperTextUser] = useState('');
    const [helperTextPass, setHelperTextPass] = useState('');

    const navigate = useNavigate();
    const userFromLS = JSON.parse(localStorage.getItem('username'));

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

        localStorage.setItem('avatar', data.results[0].picture.thumbnail);
        navigate('/Overview');
    }

    const validateUser = () => {
        if (userFromLS && userFromLS === values.username) {
            setUserSuccess(true);
        } else {
            setUserErrors(true);
            setHelperTextUser(
                'The e-mail address does not exist, please try again'
            );
        }
    };

    const validatePassword = () => {
        const passFromLS = JSON.parse(localStorage.getItem('password'));

        if (userFromLS && passFromLS && passFromLS === values.password) {
            setPassSuccess(true);
        } else {
            setPassErrors(true);
            setHelperTextPass(
                'Your password is incorrect, please try again later'
            );
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (userSuccess && passSuccess) {
            fetchMoviesJSON();
        }
    };

    return (
        <LogoAndTitle title="SIGN IN">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="login-username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    error={userErrors ? true : false}
                    helperText={userErrors ? helperTextUser : ''}
                    onBlur={() => validateUser()}
                    onFocus={() => setUserErrors(false)}
                    value={values.username}
                    onChange={handleChange('username')}
                    sx={{ mb: 3 }}
                />
                <FormControl
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ mb: 7 }}
                >
                    <InputLabel htmlFor="login-password">Password</InputLabel>
                    <OutlinedInput
                        id="login-password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        error={passErrors ? true : false}
                        onBlur={() => validatePassword()}
                        onFocus={() => setPassErrors(false)}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
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
                    {passErrors && (
                        <FormHelperText error id="password-error">
                            {helperTextPass}
                        </FormHelperText>
                    )}
                </FormControl>
                <Button variant="contained" type="submit">
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
        </LogoAndTitle>
    );
}
