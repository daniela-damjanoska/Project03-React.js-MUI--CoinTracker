import React, { useContext } from 'react';
import { Context } from '../Context/Context';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const styles = {
    modalOverlay: {
        '& .MuiBackdrop-root': {
            backgroundColor: '#ffffffbf',
        },
    },
    modalBox: {
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
    },
    boxButtons: {
        display: 'flex',
        px: 8,
        justifyContent: 'space-between',
    },
    deleteButton: {
        backgroundColor: 'error.main',
        '&:hover': {
            backgroundColor: '#8b0000',
        },
    },
};

export default function ConfirmDeletionModal({ closeModal, item }) {
    const { deleteEntry } = useContext(Context);

    return (
        <Modal
            open={true}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={styles.modalOverlay}
        >
            <Box sx={styles.modalBox}>
                <Typography
                    id="modal-content"
                    variant="h6"
                    component="p"
                    color="secondary"
                    marginBottom={4}
                >
                    Are you sure that you want to delete this entry?
                </Typography>
                <Box sx={styles.boxButtons}>
                    <Button
                        variant="text"
                        onClick={() => closeModal()}
                        color="secondary"
                    >
                        CANCEL
                    </Button>
                    <Button
                        variant="contained"
                        sx={styles.deleteButton}
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
    );
}
