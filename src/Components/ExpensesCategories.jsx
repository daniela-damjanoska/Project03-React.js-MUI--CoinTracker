import React, { useContext, useState } from 'react';
import { Context } from '../Context/Context';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Icon from '@mui/material/Icon';
import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';

export default function ExpenseCat() {
    const { categories, entries } = useContext(Context);

    const filteredIncomeCategories = categories.filter(
        category => category.type === 'expense'
    );

    return (
        <IncomeAndExpenseWrapper
            title="Expenses"
            customTopMarginMob={0}
            customBottomMarginMob={5}
            customLeftMarginPC={4}
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
