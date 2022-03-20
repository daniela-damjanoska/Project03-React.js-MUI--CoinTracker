import React, { useContext, useEffect } from 'react';
import { Context } from '../Context/Context';

import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

export default function IncomeCategories() {
    const { filteredIncomeCategories } = useContext(Context);

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
                    <ListItem key={category.id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>{category.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText
                                primary={category.name}
                                primaryTypographyProps={{
                                    color: 'dark.main',
                                }}
                            />
                            <ListItemText
                                primary={
                                    category.budget === 0 ||
                                    category.budget === ''
                                        ? 'no limit'
                                        : category.budget
                                }
                                primaryTypographyProps={{
                                    fontSize:
                                        category.budget === 0 ||
                                        category.budget === ''
                                            ? '13px'
                                            : '22px',
                                    color: 'dark.main',
                                    textAlign: 'right',
                                }}
                            />
                            <ListItemText primary={category.entriesArr} />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}
        </IncomeAndExpenseWrapper>
    );
}
