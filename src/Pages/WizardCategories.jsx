import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

import LogoAndTitle from '../Components/LogoAndTitle';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

export default function WizardCategories() {
    const { categories, updateCategoriesArray } = useContext(Context);

    const [checked, setChecked] = useState([]);

    const navigate = useNavigate();

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

    //filter the array according to the checkboxes that are checked
    const checkedCategories = categories.filter(category =>
        checked.includes(category.id)
    );

    //set IsEnabled to true to the elements when the checkboxes are checked
    checkedCategories.forEach(filteredItem => (filteredItem.isEnabled = true));

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
                                        color="secondary"
                                    />
                                }
                                disablePadding
                            >
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
                disabled={checked.length === 0 ? true : false}
                sx={{
                    display: 'block',
                    mt: 5,
                }}
                onClick={() => {
                    updateCategoriesArray(checkedCategories);
                    navigate('/wizard-categories-amount');
                }}
            >
                Done
            </Button>
        </LogoAndTitle>
    );
}
