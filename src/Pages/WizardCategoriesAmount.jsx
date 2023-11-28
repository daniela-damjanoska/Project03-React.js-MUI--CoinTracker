import React, { useContext, useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../Context/Context";
import { deferredPrompt } from "../App";

import LogoAndTitleWrapper from "../Components/LogoAndTitleWrapper";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

export default function WizardCategoriesAmount() {
  const [inputValues, setInputValues] = useState({});

  const { categories, addCategory, updateCategoriesArray } =
      useContext(Context),
    navigate = useNavigate(),
    { state } = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    categories.map((category) =>
      category.id === +name
        ? (category.budget = value === "" ? 0 : +value)
        : category
    );
  };

  const handleSubmit = () => {
    updateCategoriesArray(categories);

    localStorage.setItem("categories", JSON.stringify(categories));

    addCategory({
      id: new Date().valueOf(),
      name: "Salary",
      type: "income",
      budget: state?.amount,
      icon: "credit_card",
      isEnabled: true,
    });

    navigate("/overview");
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome);
        if (choiceResult.outcome === "dismissed")
          console.log("User cancelled installation");
        else console.log("User added to home screen");
      });
      // deferredPrompt = null;  //this throw an error, check this!!!!!
    }
  };

  return (
    <LogoAndTitleWrapper title="WELCOME">
      <Typography variant="body2" component="p" marginTop={2} marginBottom={6}>
        Set how much money you want to spend on each Category monthly
      </Typography>
      <List dense>
        {categories.map(({ id, icon, name }) => (
          <Fragment key={id}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon sx={{ color: "secondary.dark" }}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  id={id}
                  primary={name}
                  sx={{ color: "secondary.dark" }}
                />
                <TextField
                  id="amount-per-category"
                  size="small"
                  type="number"
                  name={String(id)}
                  sx={{
                    width: "120px",
                  }}
                  onChange={handleChange}
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
      <Button
        variant="contained"
        fullWidth
        sx={{
          display: "block",
          mt: 5,
        }}
        onClick={handleSubmit}
      >
        COMPLETE
      </Button>
    </LogoAndTitleWrapper>
  );
}
