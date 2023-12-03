import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Popover from "@mui/material/Popover";

export default function Header({ title }) {
  const [anchorEl, setAnchorEl] = useState(null),
    avatarUrl = localStorage.getItem("avatar"),
    matches = useMediaQuery("(min-width:601px)"),
    navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open && "simple-popover";

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              paddingX: matches ? 7 : 1,
            }}
          >
            <img src="./Images/LogoMenu.png" alt="logo" style={{ width: 70 }} />
            <Typography
              marginRight={"auto"}
              marginLeft={matches ? 3 : 1}
              variant={matches ? "h5" : "h6"}
            >
              {title}
            </Typography>
            <Avatar
              alt="user"
              src={avatarUrl}
              sx={{ width: 50, height: 50, cursor: "pointer" }}
              onClick={handleClick}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                "& .MuiPopover-paper": {
                  backgroundColor: "primary.main",
                  color: "#fff",
                  borderRadius: "4px",
                  marginTop: "5px",
                  padding: "30px",
                  textAlign: "center",
                  width: matches ? "auto" : "100%",
                },
              }}
            >
              <Typography
                variant="h4"
                component="p"
                marginTop={2}
                marginBottom={3}
                color="#fff"
                fontWeight={"bold"}
              >
                {`${localStorage.getItem("name")}`}
              </Typography>
              <Avatar
                alt="user"
                src={avatarUrl}
                sx={{ width: 48, height: 48, border: 2, mx: "auto" }}
              />
              <Typography variant="h6" component="p" marginTop={2} color="#fff">
                {`${localStorage.getItem("name")} ${localStorage.getItem(
                  "surname"
                )}`}
              </Typography>
              <Typography variant="h6" component="p" marginTop={2} color="#fff">
                {`${JSON.parse(localStorage.getItem("email"))}`}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                marginTop={2}
                color="#fff"
                onClick={() => navigate("/")}
                sx={{ cursor: "pointer" }}
              >
                SIGN OUT
              </Typography>
            </Popover>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
