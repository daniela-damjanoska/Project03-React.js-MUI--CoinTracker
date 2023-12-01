import React, { useState, useContext } from "react";
import { Context, getCategoriesOrEntries } from "../Context/Context";
import { db } from "../App";

import icons from "../Data/Icons";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

//icons dropdown:
const ITEM_HEIGHT = 40,
  ITEM_PADDING_TOP = 8,
  MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        display: "flex",
        textAlign: "center",
        maxWidth: 1,
      },
    },
  };

const styles = {
  modalOverlay: {
    "& .MuiBackdrop-root": {
      backgroundColor: "#ffffffbf",
    },
  },
  boxEnabled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: 1,
    borderRadius: "3px",
    mt: 4,
    borderColor: "#c4c4c4",
    height: "42.3px",
    pl: "14px",
    mb: 7,
    "&:hover": {
      borderColor: "black",
    },
  },
  iconsMenuItem: {
    display: "inline-flex",
    color: "primary.main",
  },
  boxButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default function CategoryModal({ closeModal, addOrEditCategory }) {
  const [categoryData, setCategoryData] = useState(
    addOrEditCategory || {
      name: "",
      type: "",
      budget: "",
      icon: "",
      isEnabled: true,
    }
  );

  const { addCategory, updateCategory, updateCategoriesArray } =
      useContext(Context),
    isEditing = Boolean(addOrEditCategory),
    matches = useMediaQuery("(min-width:601px)");

  const handleSubmit = (e) => {
    e.preventDefault();

    isEditing
      ? updateCategory(categoryData)
      : addCategory(
          "categories",
          categoryData,
          new Date().valueOf().toString()
        );

    getCategoriesOrEntries(db, "categories").then((data) =>
      updateCategoriesArray(data)
    );

    closeModal();
  };

  return (
    <Modal
      open={true}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={styles.modalOverlay}
    >
      <Box
        sx={{
          position: "absolute",
          top: matches ? "12%" : "16%",
          left: "50%",
          transform: "translateX(-50%)",
          width: matches ? "550px" : "90%",
          backgroundColor: "background.paper",
          borderRadius: "5px",
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          {isEditing ? "Update Category" : "Add New Category"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth size="small" sx={{ mb: 4 }} required>
            <InputLabel id="category-type-select-label">
              Category type
            </InputLabel>
            <Select
              labelId="category-type-select-label"
              id="category-type-select"
              label="Category type"
              value={categoryData.type}
              onChange={(e) => {
                setCategoryData({
                  ...categoryData,
                  type: e.target.value,
                });
              }}
            >
              <MenuItem value={"income"}>Income</MenuItem>
              <MenuItem value={"expense"}>Expense</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="category-name"
            label="Name"
            variant="outlined"
            fullWidth
            required
            size="small"
            value={categoryData.name}
            onChange={(e) => {
              setCategoryData({
                ...categoryData,
                name: e.target.value,
              });
            }}
          />
          <FormControl fullWidth sx={{ mb: 4, mt: 4 }} size="small">
            <InputLabel id="icon-select-label">Icon</InputLabel>
            <Select
              labelId="icon-select-label"
              id="icon-select"
              label="Icon"
              MenuProps={MenuProps}
              value={categoryData.icon}
              onChange={(e) => {
                setCategoryData({
                  ...categoryData,
                  icon: e.target.value,
                });
              }}
            >
              {icons.map((icon, idx) => (
                <MenuItem value={icon} key={idx} sx={styles.iconsMenuItem}>
                  <Icon>{icon}</Icon>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="category-budget"
            label="Budget"
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            value={categoryData.budget}
            onChange={(e) => {
              setCategoryData({
                ...categoryData,
                budget: +e.target.value,
              });
            }}
          />
          <Box sx={styles.boxEnabled}>
            <Typography
              variant="body1"
              component="p"
              sx={{
                color: "#666667",
              }}
            >
              Enabled
            </Typography>
            <Checkbox
              inputProps={{ "aria-label": "controlled" }}
              color="default"
              checked={categoryData.isEnabled}
              onChange={(e) => {
                setCategoryData({
                  ...categoryData,
                  isEnabled: e.target.checked,
                });
              }}
            />
          </Box>
          <Box sx={styles.boxButtons}>
            <Button variant="text" onClick={() => closeModal()}>
              CANCEL
            </Button>
            <Button variant="contained" type="submit">
              {isEditing ? "UPDATE" : "ADD"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
