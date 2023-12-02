import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import EntryModal from "../Components/EntryModal";

import BottomNavigation from "@mui/material/BottomNavigation";
import Fab from "@mui/material/Fab";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from "@mui/material/Tooltip";

const styles = {
  main: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "primary.main",
    "& .Mui-selected": {
      "& .MuiBottomNavigationAction-label": {
        color: "info.main",
      },
      "& .MuiSvgIcon-root": {
        color: "info.main",
      },
    },
  },
  iconColor: {
    color: "secondary.extraLight",
  },
  addIcon: {
    color: "secondary.dark",
    marginRight: 4,
    marginTop: "-28px",
  },
  modalOverlay: {
    "& .MuiBackdrop-root": {
      backgroundColor: "#ffffffbf",
    },
  },
  expenseBtn: {
    display: "block",
    ml: "auto",
    mb: 4,
  },
  incomeBtn: {
    display: "block",
    ml: "auto",
  },
};

export default function Navigation({ active }) {
  const [value, setValue] = useState(active),
    [openModal, setOpenModal] = useState(false),
    [openModalEntry, setOpenModalEntry] = useState(false),
    [addIncome, setAddIncome] = useState(false),
    //for default type value
    [isExpense, setIsExpense] = useState(true);

  const matches = useMediaQuery("(min-width:601px)"),
    navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseModalEntry = () => {
    setOpenModalEntry(false);
    setAddIncome(false);
  };

  //function for "expense" button
  const handleOpenModalEntry = () => {
    setAddIncome(true);
    setOpenModal(false);
  };

  //function for "income" button
  const handleIsExpense = () => {
    handleOpenModalEntry();
    //set default type value, if "expense" button is pressed to be 'expense', else 'income'
    setIsExpense(false);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(newValue) => setValue(newValue)}
      sx={styles.main}
    >
      <BottomNavigationAction
        label="Overview"
        icon={<HomeIcon />}
        sx={styles.iconColor}
        onClick={() => navigate("/overview")}
      />
      <BottomNavigationAction
        label="Categories"
        icon={<CategoryIcon />}
        sx={styles.iconColor}
        onClick={() => navigate("/categories")}
      />
      <BottomNavigationAction
        label="Statistics"
        icon={<EqualizerIcon />}
        sx={styles.iconColor}
        onClick={() => navigate("/statistics")}
      />
      <Tooltip
        placement="top"
        title={
          <div
            style={{
              backgroundColor: "#6400f0e6",
              color: "#fff",
              padding: "10px",
              borderRadius: "4px",
              margin: "-8px",
              fontSize: "16px",
              fontWeight: "normal",
            }}
          >
            Click on this button to add a new income or expense entry.
          </div>
        }
      >
        <Fab
          color="info"
          aria-label="add"
          sx={styles.addIcon}
          onClick={handleOpenModal}
          // onMouseOver={(e) => setAnchorEl(e.currentTarget)}
          // onMouseLeave={(e) => setAnchorEl(null)}
        >
          <AddIcon color="secondary.dark" />
        </Fab>
      </Tooltip>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={styles.modalOverlay}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "120px",
            right: matches ? "30%" : "5%",
          }}
        >
          <Button
            onClick={handleOpenModalEntry}
            variant="contained"
            sx={styles.expenseBtn}
          >
            ADD EXPENSE
          </Button>
          <Button
            onClick={handleIsExpense}
            variant="contained"
            sx={styles.incomeBtn}
          >
            ADD INCOME
          </Button>
        </Box>
      </Modal>
      {addIncome ? (
        <EntryModal
          buttonDesc="Add"
          typeDefault={isExpense ? "expense" : "income"}
          closeModal={handleCloseModalEntry}
        />
      ) : (
        ""
      )}
    </BottomNavigation>
  );
}
