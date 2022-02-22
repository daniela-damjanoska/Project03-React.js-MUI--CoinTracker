import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LogoAndTitle({ children, title }) {
    const matches = useMediaQuery('(min-width:601px)');

    return (
        <Container
            maxWidth={false}
            sx={{
                backgroundColor: 'white',
                maxWidth: 600,
                height: matches ? 'undefined' : '100vh',
                borderRadius: matches ? '8px' : 'none',
                marginTop: matches ? 6 : 0,
                marginBottom: matches ? 6 : 0,
            }}
        >
            <Box
                paddingX={matches ? 4 : 0}
                paddingY={7}
                sx={{
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src="./Images/logo.png"
                        alt="logo"
                        style={{ width: 150 }}
                    />
                </Box>
                <Typography
                    variant="h5"
                    component="h1"
                    marginTop={8}
                    marginBottom={4}
                >
                    {title}
                </Typography>
                {children}
            </Box>
        </Container>
    );
}
