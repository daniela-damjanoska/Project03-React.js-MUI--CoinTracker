import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function IncomeAndExpenseWrapper({
    children,
    customTopMarginMob,
    customBottomMarginMob,
    customLeftMarginPC,
    customLeftMarginMob,
    title,
}) {
    const matches = useMediaQuery('(min-width:601px)');

    return (
        <Paper
            elevation={6}
            sx={{
                flexBasis: '33.333%',
                height: 'fit-content',
                mt: matches ? 13 : customTopMarginMob,
                mb: matches ? 13 : customBottomMarginMob,
                ml: matches ? customLeftMarginPC : customLeftMarginMob,
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
                    color: 'secondary.light',
                }}
            >
                {title}
            </Typography>
            <List dense>{children}</List>
        </Paper>
    );
}
