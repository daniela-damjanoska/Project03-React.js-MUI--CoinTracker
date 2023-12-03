import { useContext } from "react";
import { Context } from "../Context/Context";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  modalOverlay: {
    "& .MuiBackdrop-root": {
      backgroundColor: "#ffffffbf",
    },
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    backgroundColor: "background.paper",
    borderRadius: "5px",
    border: "2px inset red",
    boxShadow: 24,
    p: 3,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "error.main",
    "&:hover": {
      backgroundColor: "#8b0000",
    },
  },
};

export default function ConfirmDeletionModal({ closeModal, item }) {
  const { deleteEntry } = useContext(Context),
    matches = useMediaQuery("(min-width:601px)");

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: matches ? 13 : 6,
          }}
        >
          <Button variant="text" onClick={() => closeModal()} color="secondary">
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
