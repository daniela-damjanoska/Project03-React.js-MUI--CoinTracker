import React, { useContext } from 'react';

import { Context } from '../Context/Context';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Menu({ title }) {
    const { avatarUrl } = useContext(Context);

    const matches = useMediaQuery('(min-width:601px)');

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'primary.main',
                color: 'light.main',
                paddingX: matches ? 7 : 2,
            }}
        >
            <img src="./Images/logoMenu.png" alt="logo" style={{ width: 70 }} />
            <Typography marginRight={'auto'} marginLeft={3} variant="h5">
                {title}
            </Typography>
            <Avatar
                alt="user"
                src={avatarUrl}
                sx={{ width: 48, height: 48, border: 2 }}
            />
        </Box>
    );
}
