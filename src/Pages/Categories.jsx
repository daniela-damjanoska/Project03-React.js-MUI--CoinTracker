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

export default function Categories() {
    // const [categoryId, setCategoryId] = useState('');
    // const [categoryType, setCategoryType] = useState('');
    // const [categoryName, setCategoryName] = useState('');
    // const [categoryIcon, setCategoryIcon] = useState('');
    // const [categoryBudget, setCategoryBudget] = useState('');
    // const [isEnabled, setIsEnabled] = useState(true);

    const [addEditCategory, setAddEditCategory] = useState(false);

    const [item, setItem] = useState();

    const { categories } = useContext(Context);

    const matches = useMediaQuery('(min-width:601px)');

    const closeModalCategory = () => setAddEditCategory(false);

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: matches ? 'auto' : '100vh',
                backgroundColor: matches ? 'transparent' : 'white',
            }}
        >
            <Header title="Categories" />
            <Paper
                elevation={6}
                sx={{
                    width: '600px',
                    height: 'fit-content',
                    mt: matches ? 13 : 11,
                    mb: matches ? 13 : 11,
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        backgroundColor: '#f4f4f4',
                        paddingY: 2,
                        paddingX: 2,
                        borderTopRightRadius: '3px',
                        borderTopLeftRadius: '3px',
                    }}
                >
                    Categories
                </Typography>
                <List dense sx={{ pt: 2 }}>
                    <ListItem
                        disablePadding
                        onClick={() => {
                            setItem(null);
                            setAddEditCategory(true);
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <AddIcon color="dark"></AddIcon>
                            </ListItemIcon>
                            <ListItemText primary="Add New Category" />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    {categories.map(category => (
                        <>
                            <ListItem
                                key={category.id}
                                disablePadding
                                onClick={() => {
                                    setItem(category);
                                    setAddEditCategory(true);
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        color:
                                            category.type === 'expense'
                                                ? '#af2126'
                                                : '#3caca4',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color:
                                                category.type === 'expense'
                                                    ? '#af2126'
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
                                                    : category.type ===
                                                      'expense'
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
                </List>
                {addEditCategory ? (
                    <CategoryModal
                        closeModal={closeModalCategory}
                        addOrEdit={item}
                    />
                ) : (
                    ''
                )}
            </Paper>
            <Navigation active={1} />
        </Container>
    );
}
