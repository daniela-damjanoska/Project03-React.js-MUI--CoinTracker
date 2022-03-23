import React, { useContext, useState } from 'react';
import { Context } from '../Context/Context';

import { format } from 'date-fns';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP },
    },
};

export default function EntryModal({
    buttonDesc,
    closeModal,
    addOrEditEntry,
    typeDefault,
}) {
    const {
        addEntry,
        updateEntry,
        saveCategoryId,
        saveCategoryIcon,
        filteredIncomeCategories,
        filteredExpenseCategories,
    } = useContext(Context);

    const [entryData, setEntryData] = useState(
        addOrEditEntry || {
            type: typeDefault,
            name: '',
            category: '',
            amount: '',
            date: format(new Date(), 'yyyy-MM-dd'),
        }
    );

    const matches = useMediaQuery('(min-width:601px)');

    const filteredIncomeOrExpenseCategories =
        entryData.type === 'income'
            ? filteredIncomeCategories
            : filteredExpenseCategories;

    const handleModalClosing = () => closeModal();

    const handleSubmit = e => {
        e.preventDefault();

        buttonDesc === 'UPDATE' ? updateEntry(entryData) : addEntry(entryData);

        handleModalClosing();
    };

    return (
        <Modal
            open={true}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: '#ffffffbf',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '12%',
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
                    {buttonDesc === 'UPDATE' ? 'Update Entry' : 'Add New Entry'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth size="small" sx={{ mb: 4 }}>
                        <Select
                            labelId="entry-type-select-label"
                            id="entry-type-select"
                            value={entryData.type}
                            onChange={e => {
                                setEntryData({
                                    ...entryData,
                                    type: e.target.value,
                                });
                            }}
                        >
                            <MenuItem value={'income'}>Income</MenuItem>
                            <MenuItem value={'expense'}>Expense</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="entry-name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        value={entryData.name}
                        onChange={e => {
                            setEntryData({
                                ...entryData,
                                name: e.target.value,
                            });
                        }}
                    />
                    <FormControl
                        fullWidth
                        sx={{ mb: 4, mt: 4 }}
                        size="small"
                        required
                    >
                        <InputLabel id="category-select-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={entryData.category}
                            label="Category"
                            onChange={e => {
                                setEntryData({
                                    ...entryData,
                                    category: e.target.value,
                                });
                            }}
                            MenuProps={MenuProps}
                        >
                            {filteredIncomeOrExpenseCategories.map(
                                ({ name, id, icon }) => (
                                    <MenuItem
                                        value={name}
                                        key={id}
                                        onClick={() => {
                                            saveCategoryIcon(icon);
                                            saveCategoryId(id);
                                        }}
                                    >
                                        {name}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                    <TextField
                        id="entry-amount"
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        type="number"
                        value={entryData.amount}
                        onChange={e => {
                            setEntryData({
                                ...entryData,
                                amount: +e.target.value,
                            });
                        }}
                    />
                    <Stack spacing={3}>
                        <TextField
                            id="entry-date"
                            type="date"
                            defaultValue={entryData.date}
                            fullWidth
                            sx={{ mt: 4 }}
                            size="small"
                            onChange={e => {
                                setEntryData({
                                    ...entryData,
                                    date: e.target.value,
                                });
                            }}
                        />
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 7,
                        }}
                    >
                        <Button variant="text" onClick={handleModalClosing}>
                            CANCEL
                        </Button>
                        <Button variant="contained" type="submit">
                            {buttonDesc}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
