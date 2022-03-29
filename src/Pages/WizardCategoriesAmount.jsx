import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

import LogoAndTitle from '../Components/LogoAndTitle';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

export default function WizardCategoriesAmount() {
    const [inputValues, setInputValues] = useState({});

    const { categories, updateCategoriesArray } = useContext(Context),
        navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;

        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));

        categories.map(category => {
            return category.id === +name
                ? (category.budget = +value)
                : category;
        });
    };

    const handleSubmit = () => {
        updateCategoriesArray(categories);

        localStorage.setItem('categories', JSON.stringify(categories));

        navigate('/overview');
    };

    return (
        <LogoAndTitle title="WELCOME">
            <Typography
                variant="body2"
                component="p"
                marginTop={2}
                marginBottom={6}
            >
                Set how much money you want to spend on each Category monthly
            </Typography>
            <List dense>
                {categories.map(({ id, icon, name }) => (
                    <>
                        <ListItem key={id} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon sx={{ color: 'secondary.dark' }}>
                                        {icon}
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText
                                    id={id}
                                    primary={name}
                                    sx={{ color: 'secondary.dark' }}
                                />
                                <TextField
                                    id="amount-per-category"
                                    size="small"
                                    type="number"
                                    name={String(id)}
                                    sx={{
                                        width: '120px',
                                    }}
                                    onChange={handleChange}
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>
                ))}
            </List>
            <Button
                variant="contained"
                fullWidth
                sx={{
                    display: 'block',
                    mt: 5,
                }}
                onClick={handleSubmit}
            >
                COMPLETE
            </Button>
        </LogoAndTitle>
    );
}
