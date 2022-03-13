import React, { useContext, useState } from 'react';
import { Context } from '../Context/Context';

import Header from '../Components/Header';
import Navigation from '../Components/Navigation';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const icons = [
    'downhill_skiing',
    'child_care',
    'directions_car',
    'vibration',
    'pool',
    'fitness_center',
    'home',
];

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP },
    },
};

export default function Categories() {
    const [openModal, setOpenModal] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');
    const [categoryBudget, setCategoryBudget] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const { categories, addCategory, updateCategory } = useContext(Context);

    const matches = useMediaQuery('(min-width:601px)');

    const handleModalOpening = () => setOpenModal(true);

    const handleModalClosing = () => {
        setCategoryType('');
        setCategoryName('');
        setCategoryIcon('');
        setCategoryBudget('');
        setIsEnabled(true);
        setOpenModal(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newCategory = {
            id: new Date().valueOf(),
            name: categoryName,
            type: categoryType,
            budget: categoryBudget,
            icon: categoryIcon,
            isEnabled: isEnabled,
        };

        isEditing
            ? updateCategory(
                  3,
                  categoryType,
                  categoryName,
                  categoryIcon,
                  categoryBudget,
                  isEnabled
              )
            : addCategory(newCategory);

        handleModalClosing();
    };

    const handleEditing = id => {
        setIsEditing(true);
        const categoryToEdit = categories.find(el => el.id === id);

        setOpenModal(true);
        setCategoryId(categoryToEdit.id);
        setCategoryType(categoryToEdit.type);
        setCategoryName(categoryToEdit.name);
        setCategoryIcon(categoryToEdit.icon);
        setCategoryBudget(categoryToEdit.budget);
        setIsEnabled(categoryToEdit.isEnabled);

        console.log(categoryToEdit.id);
    };

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
                    <ListItem disablePadding onClick={handleModalOpening}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddIcon color="dark"></AddIcon>
                            </ListItemIcon>
                            <ListItemText primary="Add New Category" />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    {categories.map(({ id, icon, name, budget, type }) => {
                        return (
                            <>
                                <ListItem
                                    key={id}
                                    disablePadding
                                    onClick={() => handleEditing(id)}
                                >
                                    <ListItemButton
                                        sx={{
                                            color:
                                                type === 'expense'
                                                    ? '#af2126'
                                                    : '#3caca4',
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color:
                                                    type === 'expense'
                                                        ? '#af2126'
                                                        : '#3caca4',
                                            }}
                                        >
                                            <Icon>{icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText id={id} primary={name} />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column-reverse',
                                                textAlign:
                                                    budget === 0
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
                                                        budget === 0
                                                            ? '40%'
                                                            : '100%',
                                                    ml: 'auto',
                                                }}
                                                primary={
                                                    budget === 0
                                                        ? 'NO BUDGET LIMIT'
                                                        : type === 'expense'
                                                        ? 'BUDGET'
                                                        : 'PLANNED'
                                                }
                                            />
                                            <ListItemText
                                                primaryTypographyProps={{
                                                    fontSize: '22px',
                                                }}
                                                primary={
                                                    budget !== 0 ? budget : ''
                                                }
                                            />
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        );
                    })}
                </List>
                <Modal
                    open={openModal}
                    onClose={handleModalClosing}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: matches ? '16%' : '12%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: matches ? '550px' : '90%',
                            backgroundColor: 'background.paper',
                            borderRadius: '5px',
                            boxShadow: 24,
                            p: 3,
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                            {isEditing ? 'Update Category' : 'Add New Category'}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                fullWidth
                                size="small"
                                sx={{ mb: 4 }}
                                required
                            >
                                <InputLabel id="category-type-select-label">
                                    Category type
                                </InputLabel>
                                <Select
                                    labelId="category-type-select-label"
                                    id="category-type-select"
                                    value={categoryType}
                                    label="Category type"
                                    onChange={e =>
                                        setCategoryType(e.target.value)
                                    }
                                >
                                    <MenuItem value={'income'}>Income</MenuItem>
                                    <MenuItem value={'expense'}>
                                        Expense
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="category-name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                required
                                size="small"
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                            />
                            <FormControl
                                fullWidth
                                sx={{ mb: 4, mt: 4 }}
                                size="small"
                            >
                                <InputLabel id="icon-select-label">
                                    Icon
                                </InputLabel>
                                <Select
                                    labelId="icon-select-label"
                                    id="icon-select"
                                    value={categoryIcon}
                                    label="Icon"
                                    onChange={e =>
                                        setCategoryIcon(e.target.value)
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {icons.map((icon, idx) => (
                                        <MenuItem value={icon} key={idx}>
                                            <Icon>{icon}</Icon>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="category-budget"
                                label="Budget"
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="number"
                                value={categoryBudget}
                                onChange={e =>
                                    setCategoryBudget(e.target.value)
                                }
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    border: 1,
                                    borderRadius: '3px',
                                    mt: 4,
                                    borderColor: '#c4c4c4',
                                    height: '42.3px',
                                    pl: '14px',
                                    mb: 7,
                                    '&:hover': {
                                        borderColor: 'black',
                                    },
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{
                                        color: '#666667',
                                    }}
                                >
                                    Enabled
                                </Typography>
                                <Checkbox
                                    checked={isEnabled}
                                    onChange={e =>
                                        setIsEnabled(e.target.checked)
                                    }
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color="default"
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    variant="text"
                                    onClick={handleModalClosing}
                                >
                                    CANCEL
                                </Button>
                                <Button variant="contained" type="submit">
                                    {isEditing ? 'UPDATE' : 'ADD'}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>
            </Paper>
            <Navigation active={1} />
        </Container>
    );
}
