import React, { useState, useContext } from 'react';
import { Context } from '../Context/Context';

import initialCategories from '../Data/Categories';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

const icons = [
    'downhill_skiing',
    'child_care',
    'directions_car',
    'vibration',
    'pool',
    'fitness_center',
    'home',
];

const iconsFromCategoriesArr = initialCategories.map(category => category.icon),
    allIcons = [...icons, ...iconsFromCategoriesArr],
    uniqueIcons = [...new Set(allIcons)],
    //icons dropdown:
    ITEM_HEIGHT = 40,
    ITEM_PADDING_TOP = 8,
    MenuProps = {
        PaperProps: {
            style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP },
        },
    };

export default function CategoryModal({ closeModal, addOrEdit }) {
    const { addCategory, updateCategory } = useContext(Context);

    const [categoryData, setCategoryData] = useState(
        addOrEdit || {
            name: '',
            type: '',
            budget: '',
            icon: '',
            isEnabled: true,
        }
    );

    const isEditing = Boolean(addOrEdit),
        matches = useMediaQuery('(min-width:601px)');

    const handleModalClosing = () => closeModal();

    const handleSubmit = e => {
        e.preventDefault();

        isEditing ? updateCategory(categoryData) : addCategory(categoryData);

        handleModalClosing();
    };

    return (
        <Modal
            open={true}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
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
                    <FormControl fullWidth size="small" sx={{ mb: 4 }} required>
                        <InputLabel id="category-type-select-label">
                            Category type
                        </InputLabel>
                        <Select
                            labelId="category-type-select-label"
                            id="category-type-select"
                            label="Category type"
                            value={categoryData.type}
                            onChange={e => {
                                setCategoryData({
                                    ...categoryData,
                                    type: e.target.value,
                                });
                            }}
                        >
                            <MenuItem value={'income'}>Income</MenuItem>
                            <MenuItem value={'expense'}>Expense</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="category-name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        value={categoryData.name}
                        onChange={e => {
                            setCategoryData({
                                ...categoryData,
                                name: e.target.value,
                            });
                        }}
                    />
                    <FormControl fullWidth sx={{ mb: 4, mt: 4 }} size="small">
                        <InputLabel id="icon-select-label">Icon</InputLabel>
                        <Select
                            labelId="icon-select-label"
                            id="icon-select"
                            label="Icon"
                            MenuProps={MenuProps}
                            value={categoryData.icon}
                            onChange={e => {
                                setCategoryData({
                                    ...categoryData,
                                    icon: e.target.value,
                                });
                            }}
                        >
                            {uniqueIcons.map((icon, idx) => (
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
                        value={categoryData.budget}
                        onChange={e => {
                            setCategoryData({
                                ...categoryData,
                                budget: e.target.value,
                            });
                        }}
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
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="default"
                            checked={categoryData.isEnabled}
                            onChange={e => {
                                setCategoryData({
                                    ...categoryData,
                                    isEnabled: e.target.checked,
                                });
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button variant="text" onClick={handleModalClosing}>
                            CANCEL
                        </Button>
                        <Button variant="contained" type="submit">
                            {isEditing ? 'UPDATE' : 'ADD'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
