import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function RightClickMenu({ contextMenu, handleClose, children }) {
    return (
        <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                contextMenu !== null
                    ? {
                          top: contextMenu.mouseY,
                          left: contextMenu.mouseX,
                      }
                    : undefined
            }
        >
            {children}
            {/* <MenuItem onClick={handleClose}>Duplicate</MenuItem>
            <MenuItem onClick={handleClose}>Create New</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem> */}
        </Menu>
    );
}
