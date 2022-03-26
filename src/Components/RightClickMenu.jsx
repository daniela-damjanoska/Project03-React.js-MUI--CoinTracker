import React from 'react';

import Menu from '@mui/material/Menu';

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
        </Menu>
    );
}
