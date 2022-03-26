import React, { useContext } from 'react';
import { Context } from '../Context/Context';

import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';

export default function ExpensesCategories() {
    const { filteredExpenseCategories } = useContext(Context);

    return (
        <IncomeAndExpenseWrapper
            title="Expenses"
            customTopMarginMob={0}
            customBottomMarginMob={5}
            customLeftMarginPC={4}
            customLeftMarginMob={0}
            array={filteredExpenseCategories}
            type='expense categories'
        >
            {filteredExpenseCategories.map(
                ({ id, icon, name, budget, entriesAmount }) => (
                    <>
                        <ListItem key={id} disablePadding>
                            <ListItemButton>
                                <ListItemIcon
                                    sx={{
                                        color:
                                            entriesAmount > budget
                                                ? 'error.main'
                                                : 'secondary.dark',
                                    }}
                                >
                                    <Icon>{icon}</Icon>
                                </ListItemIcon>
                                <ListItemText
                                    primary={name}
                                    primaryTypographyProps={{
                                        color:
                                            entriesAmount > budget
                                                ? 'error.main'
                                                : 'secondary.dark',
                                    }}
                                />
                                <ListItemText
                                    primary={
                                        entriesAmount > 0
                                            ? `${entriesAmount}/`
                                            : ''
                                    }
                                    primaryTypographyProps={{
                                        textAlign: 'right',
                                        fontSize: '22px',
                                        color:
                                            entriesAmount > budget
                                                ? 'error.main'
                                                : 'secondary.dark',
                                    }}
                                />
                                <ListItemText
                                    primary={
                                        budget === 0 || budget === ''
                                            ? 'no limit'
                                            : budget
                                    }
                                    primaryTypographyProps={{
                                        fontSize:
                                            budget === 0 || budget === ''
                                                ? '13px'
                                                : '22px',
                                        color:
                                            entriesAmount > budget
                                                ? 'error.main'
                                                : 'secondary.dark',
                                        textAlign: 'right',
                                    }}
                                    sx={{
                                        flexBasis: 0,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                        {entriesAmount > 0 ? (
                            <Box
                                sx={{
                                    width: '75%',
                                    backgroundColor: 'rgba(15, 221, 221, 0.2)',
                                    height: '4px',
                                    mr: 2,
                                    ml: 'auto',
                                }}
                            >
                                <Box
                                    sx={{
                                        width:
                                            entriesAmount < budget
                                                ? `${
                                                      (entriesAmount / budget) *
                                                      100
                                                  }%`
                                                : '100%',
                                        height: '4px',
                                        backgroundColor:
                                            entriesAmount > budget
                                                ? 'error.main'
                                                : 'info.main',
                                    }}
                                ></Box>
                            </Box>
                        ) : (
                            <Divider
                                variant="inset"
                                component="li"
                                sx={{
                                    mr: 2,
                                }}
                            />
                        )}
                    </>
                )
            )}
        </IncomeAndExpenseWrapper>
    );
}
