import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

import LogoAndTitle from '../Components/LogoAndTitle';
import Icon from '../Components/Icon';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function WizardCategories() {
    const { addFilteredArray } = useContext(Context);

    const [checked, setChecked] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const navigate = useNavigate();

    //set filtered array to be equal to filteredCategories array, every time when checked array is changed
    useEffect(() => setFiltered(filteredCategories), [checked]);

    //save filtered array to local storage
    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(filtered));
    }, [filtered]);

    //manipulate the checkboxes
    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const checkedItems = [...checked];

        if (currentIndex === -1) {
            checkedItems.push(value);
        } else {
            checkedItems.splice(currentIndex, 1);
        }

        setChecked(checkedItems);
    };

    const categories = [
        {
            id: 1,
            name: 'Food',
            type: 'expense',
            budget: 0,
            icon: 'FastfoodRounded',
            isEnabled: false,
        },
        {
            id: 2,
            name: 'Transportation',
            type: 'expense',
            budget: 0,
            icon: 'CommuteRounded',
            isEnabled: false,
        },
        {
            id: 3,
            name: 'Utilities',
            type: 'expense',
            budget: 0,
            icon: 'DescriptionRounded',
            isEnabled: false,
        },
        {
            id: 4,
            name: 'Healthcare',
            type: 'expense',
            budget: 0,
            icon: 'HealthAndSafetyRounded',
            isEnabled: false,
        },
        {
            id: 5,
            name: 'Clothes',
            type: 'expense',
            budget: 0,
            icon: 'CheckroomRounded',
            isEnabled: false,
        },
        {
            id: 6,
            name: 'Entertainment',
            type: 'expense',
            budget: 0,
            icon: 'SportsBasketball',
            isEnabled: false,
        },
        {
            id: 7,
            name: 'Traveling',
            type: 'expense',
            budget: 0,
            icon: 'Flight',
            isEnabled: false,
        },
    ];

    //filter the array according to the checkboxes that are checked
    const filteredCategories = categories.filter(category =>
        checked.includes(category.id)
    );

    //set IsEnabled to true to the elements when the checkboxes are checked
    filteredCategories.forEach(filteredItem => (filteredItem.isEnabled = true));

    return (
        <LogoAndTitle title="WELCOME">
            <Typography
                variant="body2"
                component="p"
                marginTop={2}
                marginBottom={6}
            >
                Choose what you spend money on
            </Typography>
            <List dense>
                {categories.map(({ id, icon, name }) => {
                    const labelId = `checkbox-list-secondary-label-${id}`;
                    return (
                        <>
                            <ListItem
                                key={id}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(id)}
                                        checked={checked.indexOf(id) !== -1}
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                        color="dark"
                                    />
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon name={icon} color="dark" />
                                    </ListItemIcon>
                                    <ListItemText id={id} primary={name} />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    );
                })}
            </List>
            <Button
                variant="contained"
                fullWidth={true}
                disabled={checked.length === 0 ? true : false}
                sx={{
                    display: 'block',
                    marginTop: 5,
                }}
                onClick={() => {
                    addFilteredArray(filtered);
                    navigate('/wizard-categories-amount');
                }}
            >
                Done
            </Button>
        </LogoAndTitle>
    );
}
