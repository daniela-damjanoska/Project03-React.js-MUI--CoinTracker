import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import Fab from '@mui/material/Fab';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AddIcon from '@mui/icons-material/Add';

export default function Navigation({ active }) {
    const [value, setValue] = useState(active);

    const navigate = useNavigate();

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'primary.main',
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
                    color: 'light.main',
                }}
                onClick={() => navigate('/overview')}
            />
            <BottomNavigationAction
                label="Categories"
                icon={<CategoryIcon />}
                sx={{
                    color: 'light.main',
                }}
                onClick={() => navigate('/categories')}
            />
            <BottomNavigationAction
                label="Statistics"
                icon={<EqualizerIcon />}
                sx={{
                    color: 'light.main',
                    marginRight: 2,
                }}
                onClick={() => navigate('/statistics')}
            />
            <Fab
                color="info"
                aria-label="add"
                sx={{
                    color: 'light.main',
                    marginRight: 4,
                    marginTop: '-28px',
                }}
            >
                <AddIcon color="dark" />
            </Fab>
        </BottomNavigation>
    );
}
