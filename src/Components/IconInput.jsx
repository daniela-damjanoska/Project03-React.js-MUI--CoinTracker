import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP },
    },
};

export default function IconInput({
    children,
    setCategoryData,
    categoryData,
    label,
}) {
    return (
        <FormControl fullWidth sx={{ mb: 4, mt: 4 }} size="small">
            <InputLabel id="icon-select-label">Icon</InputLabel>
            <Select
                labelId="category-icon-select-label"
                id="category-icon-select"
                label={label}
                MenuProps={MenuProps}
                value={categoryData.icon}
                onChange={e => {
                    setCategoryData({
                        ...categoryData,
                        icon: e.target.value,
                    });
                }}
            >
                {children}
            </Select>
        </FormControl>
    );
}
