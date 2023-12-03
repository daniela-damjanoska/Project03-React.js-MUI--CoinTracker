import { useState, useContext, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, writeBatch } from "firebase/firestore";

import { db } from "../App";
import { Context } from "../Context/Context";

import LogoAndTitleWrapper from "../Components/LogoAndTitleWrapper";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

const deleteUncheckedAndUpdateCheckedCategories = async (
  uncheckedCategories,
  checkedCategories
) => {
  const batch = writeBatch(db);

  uncheckedCategories.map((category) =>
    batch.delete(doc(db, "categories", category.id))
  );
  checkedCategories.map((category) =>
    batch.update(doc(db, "categories", category.id), { isEnabled: true })
  );
  await batch.commit();
};

export default function WizardCategories() {
  const [checked, setChecked] = useState([]);

  const { categories, updateCategoriesArray } = useContext(Context),
    navigate = useNavigate(),
    { state } = useLocation();

  //manipulate the checkboxes
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value),
      checkedItems = [...checked];

    currentIndex === -1
      ? checkedItems?.push(value)
      : checkedItems?.splice(currentIndex, 1);

    setChecked(checkedItems);
  };

  const checkedCategories = categories?.filter((category) =>
    checked?.includes(category.id)
  );

  const uncheckedCategories = categories?.filter(
    (category) => !checked?.includes(category.id)
  );

  return (
    <LogoAndTitleWrapper title="WELCOME">
      <Typography variant="body2" component="p" marginTop={2} marginBottom={6}>
        Please choose from the suggested categories where to allocate your money
      </Typography>
      <List dense>
        {categories.map(({ id, icon, name }) => (
          <Fragment key={id}>
            <ListItem
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(id)}
                  checked={checked.indexOf(id) !== -1}
                  color="secondary"
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <Icon sx={{ color: "secondary.dark" }}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  id={id}
                  primary={name}
                  sx={{ color: "secondary.dark" }}
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
        disabled={checked.length === 0 ? true : false}
        sx={{
          display: "block",
          mt: 5,
        }}
        onClick={() => {
          updateCategoriesArray(checkedCategories);
          navigate("/wizard-categories-amount", {
            state: { amount: state?.amount },
          });
          deleteUncheckedAndUpdateCheckedCategories(
            uncheckedCategories,
            checkedCategories
          );
        }}
      >
        Done
      </Button>
    </LogoAndTitleWrapper>
  );
}
