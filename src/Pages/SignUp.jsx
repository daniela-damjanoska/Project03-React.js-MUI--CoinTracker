import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

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

export default function SignUp() {
    const { addAvatarUrl } = useContext(Context);

    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const navigate = useNavigate();

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

        navigate('/wizard-amount');
        addAvatarUrl(data.results[0].picture.thumbnail);
    }

    const handleSubmit = e => {
        e.preventDefault();

        fetchMoviesJSON();
    };

    return (
        <LogoAndTitle title="SIGN UP">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="sign-up-username"
                    label="Username"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    required
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
                    <InputLabel htmlFor="sign-up-password">Password</InputLabel>
                    <OutlinedInput
                        id="sign-up-password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
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
                </FormControl>
                <Button variant="contained" type="submit">
                    Sign up
                </Button>
            </form>
            <Typography
                variant="body2"
                component="p"
                marginTop={2}
                color="secondary"
            >
                Already have an account?
            </Typography>
            <Link to="/">Sign in please.</Link>
        </LogoAndTitle>
    );
}
