import React, { useContext, useState } from 'react';
import { Context } from '../Context/Context';

import Header from '../Components/Header';
import Navigation from '../Components/Navigation';
import CategoryModal from '../Components/CategoryModal';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';
import Icon from '@mui/material/Icon';
import IncomeEntries from '../Components/IncomeEntries';
import ExpensesEntries from '../Components/ExpensesEntries';
import IncomeAndExpenseEntries from '../Components/IncomeAndExpenseEntries';

export default function Overview() {
    const { categories } = useContext(Context);

    const matches = useMediaQuery('(min-width:601px)');

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: matches ? 'row' : 'column',
                justifyContent: 'center',
                minHeight: matches ? 'auto' : '100vh',
                backgroundColor: matches ? 'transparent' : 'white',
            }}
        >
            <Header title="Overview" />
            <IncomeEntries />
            <ExpensesEntries />
            <IncomeAndExpenseEntries />
            <Navigation active={0} />
        </Container>
    );
}
