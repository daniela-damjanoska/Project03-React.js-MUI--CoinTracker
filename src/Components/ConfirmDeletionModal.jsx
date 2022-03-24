import React, { useContext } from 'react';
import { Context } from '../Context/Context';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    borderRadius: '5px',
    border: '2px inset red',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};

export default function ConfirmDeletionModal({ closeModal, item }) {
    const { deleteEntry } = useContext(Context);

    return (
        <div>
            <Modal
                open={true}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: '#ffffffbf',
                    },
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="modal-content"
                        variant="h6"
                        component="p"
                        color="dark.main"
                        marginBottom={4}
                    >
                        Are you sure that you want to delete this entry?
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            px: 8,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            variant="text"
                            onClick={() => closeModal()}
                            color="dark"
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'danger.main',
                                // '& .hover': {
                                //     backgroundColor: '#ffffffbf',
                                // },
                            }}
                            onClick={() => {
                                deleteEntry(item);
                                closeModal();
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
