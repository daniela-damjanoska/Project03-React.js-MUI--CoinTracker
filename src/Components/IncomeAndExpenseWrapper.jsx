import { useState } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Icon from "@mui/material/Icon";

const style = {
  backgroundColor: "#f4f4f4",
  paddingY: 2,
  paddingX: 2,
  borderTopRightRadius: "3px",
  borderTopLeftRadius: "3px",
  color: "secondary.light",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function IncomeAndExpenseWrapper({
  children,
  customTopMarginMob,
  customBottomMarginMob,
  customLeftMarginPC,
  customLeftMarginMob,
  title,
  array,
  type,
  additionalInfo = false,
  popperContent,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const matches = useMediaQuery("(min-width:601px)");
  const idPopper = Boolean(anchorEl) && "simple-popper";

  return (
    <Paper
      elevation={6}
      sx={{
        width: matches ? "33.333%" : "100%",
        height: "fit-content",
        mt: matches ? 13 : customTopMarginMob,
        mb: matches ? 13 : customBottomMarginMob,
        ml: matches ? customLeftMarginPC : customLeftMarginMob,
      }}
    >
      <Box sx={style}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        {additionalInfo && (
          <Icon
            sx={{ cursor: "pointer" }}
            onMouseOver={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={(e) => setAnchorEl(null)}
          >
            info
          </Icon>
        )}
      </Box>
      {additionalInfo && (
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
            {popperContent}
          </Box>
        </Popper>
      )}
      {array?.length ? (
        <List dense>{children}</List>
      ) : (
        <Typography variant="body" component="p" padding={2} color="secondary">
          No data available for {type} amounts
        </Typography>
      )}
    </Paper>
  );
}
