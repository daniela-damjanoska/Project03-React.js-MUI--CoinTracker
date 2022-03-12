import React, { useContext, useState, useEffect } from 'react';
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
    const { categoriesArray, addFilteredArray } = useContext(Context);

    const [inputValues, setInputValues] = useState({});
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(
        () => setCategories(matchedCategories.concat(unmatchedCategories)),
        [inputValues]
    );

    //find the id of the inputs that have an amount bigger than 0, and then transform it to a number
    const inputsIdArr = Object.keys(inputValues).map(el => parseInt(el));

    //find the elements of the categoriesArray that have an id that is equal to the id of the inputs that have an amount bigger than 0
    const matchedCategories = categoriesArray.filter(category =>
        inputsIdArr.includes(category.id)
    );

    //find the elements of the categoriesArray that have an id that is not equal to the id of the inputs that have an amount bigger than 0, in order to concatenate with the matchedCategories array when it is updated
    const unmatchedCategories = categoriesArray.filter(
        category => !inputsIdArr.includes(category.id)
    );

    const inputsValuesArrays = Object.entries(inputValues);

    //set the appropriate amount to the appropriate element of the matchedCategories array
    matchedCategories.forEach(category => {
        for (let i = 0; i < inputsValuesArrays.length; i++) {
            if (+inputsValuesArrays[i][0] === category.id) {
                category.budget = +inputsValuesArrays[i][1];
            }
        }
    });

    const handleChange = e => {
        const { name, value } = e.target;

        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        addFilteredArray(categories);
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
                {categoriesArray.map(({ id, icon, name }) => {
                    return (
                        <>
                            <ListItem key={id} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon sx={{ color: 'dark.main' }}>
                                            {icon}
                                        </Icon>
                                    </ListItemIcon>
                                    <ListItemText id={id} primary={name} />
                                    <TextField
                                        id="amount-per-category"
                                        size="small"
                                        type="number"
                                        //it has to be a string because of the warning in the console
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
                    );
                })}
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
