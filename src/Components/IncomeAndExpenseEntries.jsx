import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../Context/Context';

import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';
import EntryModal from '../Components/EntryModal';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

export default function IncomeAndExpenseEntries() {
    const { entries } = useContext(Context);

    const [editEntry, setEditEntry] = useState(false);
    const [item, setItem] = useState();

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false); // hide menu

    const handleContextMenu = useCallback(
        event => {
            event.preventDefault();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setShow(true);
        },
        [setAnchorPoint]
    );

    const handleClick = useCallback(
        () => (show ? setShow(false) : null),
        [show]
    );

    const closeEntryCategory = () => setEditEntry(false);

    return (
        <IncomeAndExpenseWrapper
            title="Entries"
            customTopMarginMob={0}
            customBottomMarginMob={13}
            customLeftMarginPC={4}
            customLeftMarginMob={0}
        >
            {entries.map((entry, idx) => (
                <>
                    <ListItem
                        key={idx}
                        disablePadding
                        onClick={() => {
                            setItem(entry);
                            setEditEntry(true);
                            handleClick();
                        }}
                        onContextMenu={handleContextMenu}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>{entry.categoryIcon}</Icon>
                            </ListItemIcon>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <ListItemText
                                    primary={`${entry.category} (${entry.name})`}
                                    primaryTypographyProps={{
                                        color: 'dark.main',
                                        mb: -1,
                                    }}
                                />
                                <ListItemText
                                    primary={entry.date}
                                    primaryTypographyProps={{
                                        color: 'lightGrey.main',
                                        mt: 0,
                                    }}
                                />
                            </Box>
                            <ListItemText
                                primary={
                                    entry.type === 'income'
                                        ? `+${entry.amount}`
                                        : `-${entry.amount}`
                                }
                                primaryTypographyProps={{
                                    fontSize: '22px',
                                    textAlign: 'right',
                                    color:
                                        entry.type === 'income'
                                            ? 'info.main'
                                            : 'danger.main',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    {editEntry ? (
                        <EntryModal
                            closeModal={closeEntryCategory}
                            addOrEditEntry={item}
                        />
                    ) : (
                        ''
                    )}
                </>
            ))}
            {show ? (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x,
                    }}
                >
                    <li>Share to</li>
                    <li>Cut</li>
                    <li>Copy</li>
                </ul>
            ) : (
                <> </>
            )}
        </IncomeAndExpenseWrapper>
    );
}
