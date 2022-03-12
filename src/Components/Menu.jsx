import React from 'react';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Menu({ title }) {
    const avatarUrl = localStorage.getItem('avatar'),
        matches = useMediaQuery('(min-width:601px)');

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',

                            paddingX: matches ? 7 : 1,
                        }}
                    >
                        <img
                            src="./Images/LogoMenu.png"
                            alt="logo"
                            style={{ width: 70 }}
                        />
                        <Typography
                            marginRight={'auto'}
                            marginLeft={3}
                            variant="h5"
                        >
                            {title}
                        </Typography>
                        <Avatar
                            alt="user"
                            src={avatarUrl}
                            sx={{ width: 48, height: 48, border: 2 }}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
