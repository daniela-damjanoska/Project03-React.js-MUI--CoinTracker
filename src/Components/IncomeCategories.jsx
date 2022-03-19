import React, { useContext, useState } from 'react';
import { Context } from '../Context/Context';

import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

export default function IncomeCategories() {
    const { categories, entries } = useContext(Context);

    const filteredIncomeCategories = categories.filter(
        category => category.type === 'income'
    );

    return (
        <IncomeAndExpenseWrapper
            title="Income"
            customTopMarginMob={11}
            customBottomMarginMob={5}
            customLeftMarginPC={0}
            customLeftMarginMob={0}
        >
            {filteredIncomeCategories.map(category => (
                <>
                    <ListItem
                        key={category.id}
                        disablePadding
                        // sx={{
                        //     color: '#3caca4',
                        // }}
                    >
                        <ListItemButton>
                            <ListItemIcon
                            // sx={{
                            //     color: '#3caca4',
                            // }}
                            >
                                <Icon>{category.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText
                                id={category.id}
                                primary={category.name}
                            />
                            <ListItemText
                                primaryTypographyProps={{
                                    fontSize: '22px',
                                }}
                                primary={category.budget}
                                sx={{
                                    textAlign: 'right',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}
        </IncomeAndExpenseWrapper>
    );
}
