import { useContext, useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context, getCategoriesOrEntries } from "../Context/Context";
import { deferredPrompt } from "../App";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "../App";

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

const updateCategoriesAmount = async (categoryId, categories, value) => {
  const batch = writeBatch(db);
  categories.map(
    (category) =>
      category.id === categoryId &&
      batch.update(doc(db, "categories", category.id), { budget: value })
  );
  await batch.commit();
};

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
  };

  const handleSubmit = () => {
    addCategory(
      "categories",
      {
        name: "Salary",
        type: "income",
        budget: state?.amount,
        icon: "credit_card",
        isEnabled: true,
      },
      new Date().valueOf().toString()
    );

    Object.keys(inputValues).forEach((key) =>
      updateCategoriesAmount(key, categories, +inputValues[key])
    );

    getCategoriesOrEntries(db, "categories").then((data) => {
      updateCategoriesArray(data);
      navigate("/overview");
    });

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User added to home screen");
          deferredPrompt = null;
        }
      });
    }
  };

  return (
    <LogoAndTitleWrapper title="WELCOME">
      <Typography variant="body2" component="p" marginTop={2} marginBottom={6}>
        Please specify the monthly budget for each category by setting the
        desired spending amount.
      </Typography>
      <List dense>
        {categories?.map(({ id, icon, name }) => (
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
