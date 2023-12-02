import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LogoAndTitleWrapper from "../Components/LogoAndTitleWrapper";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";

export default function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [userErrors, setUserErrors] = useState(false),
    [passErrors, setPassErrors] = useState(false),
    [userSuccess, setUserSuccess] = useState(false),
    [passSuccess, setPassSuccess] = useState(false),
    [helperTextUser, setHelperTextUser] = useState(""),
    [helperTextPass, setHelperTextPass] = useState("");

  const navigate = useNavigate();

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  async function fetchUserAvatar() {
    const response = await fetch("https://randomuser.me/api"),
      data = await response.json();

    localStorage.setItem("avatar", data.results[0].picture.thumbnail);
    navigate("/overview");
  }

  const validateUser = () => {
    if (values.email) {
      const userFromLS = JSON.parse(localStorage.getItem("email"));

      if (userFromLS && userFromLS === values.email) {
        setUserSuccess(true);
      } else {
        setUserErrors(true);
        setHelperTextUser(
          "The e-mail address does not exist, please try again"
        );
      }
    }
  };

  const validatePassword = () => {
    if (values.password) {
      const passFromLS = JSON.parse(localStorage.getItem("password"));

      if (passFromLS !== values.password) {
        setPassErrors(true);
        setHelperTextPass("Your password is incorrect, please try again");
      } else {
        setPassSuccess(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userSuccess && passSuccess) {
      fetchUserAvatar();
    }
  };

  return (
    <LogoAndTitleWrapper title="SIGN IN">
      <form onSubmit={handleSubmit}>
        <TextField
          id="login-email"
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
          required
          error={userErrors ? true : false}
          helperText={userErrors ? helperTextUser : ""}
          onBlur={() => validateUser()}
          onFocus={() => setUserErrors(false)}
          value={values.email}
          onChange={handleChange("email")}
          sx={{ mb: 3 }}
        />
        <FormControl
          variant="outlined"
          fullWidth
          size="small"
          required
          sx={{ mb: 7 }}
        >
          <InputLabel htmlFor="login-password">Password</InputLabel>
          <OutlinedInput
            id="login-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            error={passErrors ? true : false}
            onBlur={() => validatePassword()}
            onFocus={() => setPassErrors(false)}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {passErrors && (
            <FormHelperText error id="password-error">
              {helperTextPass}
            </FormHelperText>
          )}
        </FormControl>
        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </form>
      <Typography variant="body2" component="p" marginTop={2} color="secondary">
        Don't have an account yet?{" "}
      </Typography>
      <Link to="/signUp">Sign up now, it is free!</Link>
    </LogoAndTitleWrapper>
  );
}
