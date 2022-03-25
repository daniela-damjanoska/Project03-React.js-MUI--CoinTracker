import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

import EntryModal from '../Components/EntryModal';

import BottomNavigation from '@mui/material/BottomNavigation';
import Fab from '@mui/material/Fab';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Navigation({ active }) {
    const [value, setValue] = useState(active);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEntry, setOpenModalEntry] = useState(false);
    const [addIncome, setAddIncome] = useState(false);
    //for default type value
    const [isExpense, setIsExpense] = useState(true);

    const matches = useMediaQuery('(min-width:601px)');

    const navigate = useNavigate();

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => setOpenModal(false);

    const handleCloseModalEntry = () => {
        setOpenModalEntry(false);
        setAddIncome(false);
    };

    //function for "expense" button
    const handleOpenModalEntry = () => {
        setAddIncome(true);
        setOpenModal(false);
    };

    //function for "income" button
    const handleIsExpense = () => {
        handleOpenModalEntry();
        //set default type value, if "expense" button is pressed to be 'expense', else 'income'
        setIsExpense(false);
    };

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={newValue => setValue(newValue)}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'primary.main',
                '& .Mui-selected': {
                    '& .MuiBottomNavigationAction-label': {
                        color: 'info.main',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'info.main',
                    },
                },
            }}
        >
            <BottomNavigationAction
                label="Overview"
                icon={<HomeIcon />}
                sx={{
                    color: 'secondary.extraLight',
                }}
                onClick={() => navigate('/overview')}
            />
            <BottomNavigationAction
                label="Categories"
                icon={<CategoryIcon />}
                sx={{
                    color: 'secondary.extraLight',
                }}
                onClick={() => navigate('/categories')}
            />
            <BottomNavigationAction
                label="Statistics"
                icon={<EqualizerIcon />}
                sx={{
                    color: 'secondary.extraLight',
                    marginRight: 2,
                }}
                onClick={() => navigate('/statistics')}
            />
            <Fab
                color="info"
                aria-label="add"
                sx={{
                    color: 'secondary.dark',
                    marginRight: 4,
                    marginTop: '-28px',
                }}
                onClick={handleOpenModal}
            >
                <AddIcon color="secondary.dark" />
            </Fab>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: '#ffffffbf',
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '120px',
                        right: matches ? '30%' : '5%',
                    }}
                >
                    <Button
                        onClick={handleOpenModalEntry}
                        variant="contained"
                        sx={{
                            display: 'block',
                            ml: 'auto',
                            mb: 4,
                        }}
                    >
                        ADD EXPENSE
                    </Button>
                    <Button
                        onClick={handleIsExpense}
                        variant="contained"
                        sx={{
                            display: 'block',
                            ml: 'auto',
                        }}
                    >
                        ADD INCOME
                    </Button>
                </Box>
            </Modal>
            {addIncome ? (
                <EntryModal
                    buttonDesc="Add"
                    typeDefault={isExpense ? 'expense' : 'income'}
                    closeModal={handleCloseModalEntry}
                />
            ) : (
                ''
            )}
        </BottomNavigation>
    );
}
