import { useContext, useState, Fragment } from "react";
import { Context } from "../Context/Context";

import Header from "../Components/Header";
import Navigation from "../Components/Navigation";
import CategoryModal from "../Components/CategoryModal";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";
import Popper from "@mui/material/Popper";

const styles = {
  titleWrapper: {
    backgroundColor: "#f4f4f4",
    paddingY: 2,
    paddingX: 2,
    borderTopRightRadius: "3px",
    borderTopLeftRadius: "3px",
    color: "secondary.light",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dividerMargin: {
    mr: 2,
  },
};

export default function Categories() {
  const [addEditCategory, setAddEditCategory] = useState(false),
    [item, setItem] = useState(),
    [anchorEl, setAnchorEl] = useState(null);

  const { categories } = useContext(Context),
    matches = useMediaQuery("(min-width:601px)"),
    idPopper = Boolean(anchorEl) && "simple-popper";

  const closeModalCategory = () => setAddEditCategory(false);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: matches ? "auto" : "100vh",
        backgroundColor: matches ? "transparent" : "white",
      }}
    >
      <Header title="Categories" />
      <Paper
        elevation={6}
        sx={{
          width: "600px",
          height: "fit-content",
          mt: matches ? 13 : 11,
          mb: matches ? 13 : 11,
        }}
      >
        <Box sx={styles.titleWrapper}>
          <Typography variant="h5" component="h2">
            Categories
          </Typography>

          <Icon
            sx={{ cursor: "pointer" }}
            onMouseOver={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={(e) => setAnchorEl(null)}
          >
            info
          </Icon>
        </Box>
        <Popper
          id={idPopper}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom"
        >
          <Box
            sx={{
              borderColor: "#757575",
              p: 1.5,
              bgcolor: "#6400f0e6",
              borderRadius: "4px",
              color: "#fff",
              maxWidth: "300px",
            }}
          >
            Click on any category to edit it. If a category is disabled, it will
            be hidden from the overview and statistics
          </Box>
        </Popper>
        <List dense sx={{ pt: 3 }}>
          <ListItem
            disablePadding
            onClick={() => {
              setItem(null);
              setAddEditCategory(true);
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ pb: 2 }}>
                <AddIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Add New Category"
                primaryTypographyProps={{
                  color: "secondary",
                  pb: 2,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" sx={styles.dividerMargin} />
          {categories.map((category) => (
            <Fragment key={category.id}>
              <ListItem
                disablePadding
                onClick={() => {
                  setItem(category);
                  setAddEditCategory(true);
                }}
              >
                <ListItemButton
                  sx={{
                    color:
                      category.type === "expense" ? "error.main" : "info.main",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        category.type === "expense"
                          ? "error.main"
                          : "info.main",
                    }}
                  >
                    <Icon>{category.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={category.name} />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column-reverse",
                      textAlign: "right",
                    }}
                  >
                    <ListItemText
                      primary={
                        category.budget
                          ? category.budget
                          : category.type === "expense"
                          ? "No limit"
                          : "No amount"
                      }
                      primaryTypographyProps={{
                        fontSize: category.budget ? "22px" : "12px",
                        color: !category.budget && "secondary",
                      }}
                    />
                  </Box>
                </ListItemButton>
              </ListItem>
              <Divider
                variant="inset"
                component="li"
                sx={styles.dividerMargin}
              />
            </Fragment>
          ))}
        </List>
        {addEditCategory ? (
          <CategoryModal
            closeModal={closeModalCategory}
            addOrEditCategory={item}
          />
        ) : (
          ""
        )}
      </Paper>
      <Navigation active={1} />
    </Container>
  );
}
