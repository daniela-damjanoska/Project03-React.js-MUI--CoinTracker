import React, { useContext, Fragment } from "react";
import { Context } from "../Context/Context";

import IncomeAndExpenseWrapper from "./IncomeAndExpenseWrapper";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

const styles = {
  typographyProp: {
    color: "secondary.dark",
    textAlign: "right",
    fontSize: "22px",
  },
  progressBar: {
    width: "75%",
    backgroundColor: "rgba(98, 0, 238, 0.2)",
    height: "4px",
    mr: 2,
    ml: "auto",
  },
};

export default function IncomeCategories() {
  const { filteredIncomeCategories } = useContext(Context);

  return (
    <IncomeAndExpenseWrapper
      title="Income Categories"
      customTopMarginMob={11}
      customBottomMarginMob={5}
      customLeftMarginPC={0}
      customLeftMarginMob={0}
      array={filteredIncomeCategories}
      type="income categories"
    >
      {filteredIncomeCategories?.map(
        ({ id, icon, name, budget, entriesAmount }) => (
          <Fragment key={id}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  "& .MuiListItemIcon-root": {
                    minWidth: "35px",
                  },
                  cursor: "auto",
                }}
              >
                <ListItemIcon>
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{
                    color: "secondary.dark",
                  }}
                />
                <ListItemText
                  primary={
                    !entriesAmount && budget === 0
                      ? "no amount"
                      : budget + entriesAmount
                  }
                  primaryTypographyProps={
                    !entriesAmount && budget === 0
                      ? { ...styles.typographyProp, fontSize: "13px" }
                      : styles.typographyProp
                  }
                  sx={{
                    flexBasis: 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider
              variant="inset"
              component="li"
              sx={{
                mx: 2,
              }}
            />
          </Fragment>
        )
      )}
    </IncomeAndExpenseWrapper>
  );
}
