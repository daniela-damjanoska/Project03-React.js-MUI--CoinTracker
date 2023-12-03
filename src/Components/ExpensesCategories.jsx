import { useContext, Fragment } from "react";
import { Context } from "../Context/Context";

import IncomeAndExpenseWrapper from "./IncomeAndExpenseWrapper";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";

const style = {
  width: "81.5%",
  backgroundColor: "rgba(15, 221, 221, 0.2)",
  height: "4px",
  mr: 2,
  ml: "auto",
};

export default function ExpensesCategories() {
  const { filteredExpenseCategories } = useContext(Context);

  return (
    <IncomeAndExpenseWrapper
      title="Expenses Categories"
      customTopMarginMob={0}
      customBottomMarginMob={5}
      customLeftMarginPC={4}
      customLeftMarginMob={0}
      array={filteredExpenseCategories}
      type="expense category"
      additionalInfo={true}
      popperContent={
        "These are your expenses plan categories. If a category lacks a progress bar, it means there are no related entries. If a category has a green progress bar, it indicates that the sum of related entries is less than your planned amount."
      }
    >
      {filteredExpenseCategories.map(
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
                  primary={entriesAmount > 0 && `${entriesAmount} /`}
                  primaryTypographyProps={{
                    textAlign: "right",
                    fontSize: "22px",
                    color: "secondary.dark",
                  }}
                />
                <ListItemText
                  primary={budget === 0 || budget === "" ? "No limit" : budget}
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
              <Box sx={style}>
                <Box
                  sx={{
                    width:
                      entriesAmount < budget
                        ? `${(entriesAmount / budget) * 100}%`
                        : "100%",
                    height: "4px",
                    backgroundColor:
                      entriesAmount > budget ? "error.main" : "info.main",
                  }}
                ></Box>
              </Box>
            ) : (
              <Divider
                variant="inset"
                component="li"
                sx={{
                  mx: 2,
                }}
              />
            )}
          </Fragment>
        )
      )}
    </IncomeAndExpenseWrapper>
  );
}
