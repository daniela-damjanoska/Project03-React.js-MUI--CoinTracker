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

export default function IncomeEntries() {
    const { categories } = useContext(Context);

    const matches = useMediaQuery('(min-width:601px)');

    return (
        <IncomeAndExpenseWrapper
            title="Income"
            customTopMarginMob={11}
            customBottomMarginMob={5}
            customLeftMarginPC={0}
            customLeftMarginMob={0}
        >
            {categories.map(category => (
                <>
                    <ListItem
                        key={category.id}
                        disablePadding
                        // onClick={() => {
                        //     setItem(category);
                        //     setAddEditCategory(true);
                        // }}
                    >
                        <ListItemButton
                            sx={{
                                color:
                                    category.type === 'expense'
                                        ? '#b983fb'
                                        : '#3caca4',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color:
                                        category.type === 'expense'
                                            ? '#b983fb'
                                            : '#3caca4',
                                }}
                            >
                                <Icon>{category.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText
                                id={category.id}
                                primary={category.name}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column-reverse',
                                    textAlign:
                                        category.budget === 0
                                            ? 'center'
                                            : 'right',
                                }}
                            >
                                <ListItemText
                                    sx={{
                                        color: 'secondary.main',
                                    }}
                                    primaryTypographyProps={{
                                        fontSize: '8px',
                                        width:
                                            category.budget === 0
                                                ? '40%'
                                                : '100%',
                                        ml: 'auto',
                                    }}
                                    primary={
                                        category.budget === 0
                                            ? 'NO BUDGET LIMIT'
                                            : category.type === 'expense'
                                            ? 'BUDGET'
                                            : 'PLANNED'
                                    }
                                />
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: '22px',
                                    }}
                                    primary={
                                        category.budget !== 0
                                            ? category.budget
                                            : ''
                                    }
                                />
                            </Box>
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}
        </IncomeAndExpenseWrapper>
    );
}
