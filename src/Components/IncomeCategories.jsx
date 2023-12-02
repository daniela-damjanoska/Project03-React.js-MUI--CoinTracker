import React, { useContext, Fragment } from "react";
import { Context } from "../Context/Context";

import IncomeAndExpenseWrapper from "./IncomeAndExpenseWrapper";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";

const styles = {
  typographyProp: {
    color: "secondary.dark",
    textAlign: "right",
    fontSize: "22px",
  },
  progressBar: {
    width: "81.5%",
    backgroundColor: "#FFCCCB",
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
                <ListItemIcon
                  sx={{
                    color: "secondary.dark",
                  }}
                >
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{
                    color: "secondary.dark",
                  }}
                />
                <ListItemText
                  primary={entriesAmount > 0 && `${entriesAmount}  /`}
                  primaryTypographyProps={{
                    textAlign: "right",
                    fontSize: "22px",
                    color: "secondary.dark",
                  }}
                />
                <ListItemText
                  primary={budget === 0 || budget === "" ? "No amount" : budget}
                  primaryTypographyProps={{
                    fontSize: budget === 0 || budget === "" ? "13px" : "22px",
                    color: "secondary.dark",
                    textAlign: "right",
                  }}
                  sx={{
                    flexBasis: 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
            {entriesAmount > 0 ? (
              <Box sx={styles.progressBar}>
                <Box
                  sx={{
                    width:
                      entriesAmount < budget
                        ? `${(entriesAmount / budget) * 100}%`
                        : "100%",
                    height: "4px",
                    backgroundColor:
                      entriesAmount > 0 && entriesAmount < budget
                        ? "error.main"
                        : "info.main",
                  }}
                ></Box>
              </Box>
            ) : (
              <Divider
                variant="inset"
                component="li"
                sx={{
                  mr: 2,
                }}
              />
            )}
          </Fragment>
        )
      )}
    </IncomeAndExpenseWrapper>
  );
}
