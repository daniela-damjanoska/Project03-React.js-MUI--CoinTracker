import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoAndTitle from '../Components/LogoAndTitle';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function WizardAmount() {
    const [amount, setAmount] = useState('');
    const [isValue, setIsValue] = useState(false);

    const matches = useMediaQuery('(min-width:601px)');
    const navigate = useNavigate();

    const handleChange = e => {
        e.target.value !== '' ? setIsValue(true) : setIsValue(false);
        setAmount(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        navigate('/wizard-categories');
    };

    return (
        <LogoAndTitle title="WELCOME">
            <Typography
                variant="body2"
                component="p"
                marginTop={2}
                marginBottom={6}
            >
                How much money do you have at the moment?
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="wizard-amount"
                    label="Amount"
                    type="number"
                    variant="filled"
                    fullWidth
                    color="primary"
                    value={amount}
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={isValue ? false : true}
                    sx={{
                        display: 'block',
                        mt: matches ? 9 : 40,
                    }}
                >
                    ADD
                </Button>
            </form>
        </LogoAndTitle>
    );
}
