import React from 'react';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP },
    },
};

export default function IconInput() {
    return (
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
    );
}
