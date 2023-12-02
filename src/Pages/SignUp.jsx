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

export default function SignUp() {
  const [values, setValues] = useState({
    name: "",
    surname: "",
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
    navigate("/wizard-amount");
  }

  const validateUser = () => {
    if (values.email) {
      if (
        !values.email.match(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        )
      ) {
        setUserErrors(true);
        setHelperTextUser("Please enter a valid e-mail address");
      } else {
        setUserSuccess(true);
        localStorage.setItem("email", JSON.stringify(values.email));
      }
    }
  };

  const validatePassword = () => {
    if (values.password) {
      if (values.password.length < 8) {
        setPassErrors(true);
        setHelperTextPass("Password must be at least 8 characters");
      } else if (!values.password.match(/^(?=.*?[#!@$%^&*]).{8,}$/)) {
        setPassErrors(true);
        setHelperTextPass(
          "Password must contains at least one of this characters: !@#$%^&*"
        );
      } else if (values.password.length > 32) {
        setPassErrors(true);
        setHelperTextPass("Password must be less than 32 characters");
      } else {
        setPassSuccess(true);
        localStorage.setItem("password", JSON.stringify(values.password));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("name", values.name);
    localStorage.setItem("surname", values.surname);

    if (userSuccess && passSuccess) {
      fetchUserAvatar();
    }
  };

  return (
    <LogoAndTitleWrapper title="SIGN UP">
      <form onSubmit={handleSubmit}>
        <TextField
          id="login-name"
          label="Name"
          variant="outlined"
          fullWidth
          size="small"
          required
          value={values.name}
          onChange={handleChange("name")}
          sx={{ mb: 3 }}
        />
        <TextField
          id="login-surname"
          label="Surname"
          variant="outlined"
          fullWidth
          size="small"
          required
          value={values.surname}
          onChange={handleChange("surname")}
          sx={{ mb: 3 }}
        />
        <TextField
          id="sign-up-email"
          label="Email"
          variant="outlined"
          fullWidth={true}
          size="small"
          required
          error={userErrors ? true : false}
          helperText={userErrors ? helperTextUser : ""}
          onBlur={() => validateUser()}
          onFocus={() => setUserErrors(false)}
          value={values.email}
          onChange={handleChange("email")}
          sx={{
            marginBottom: 3,
          }}
        />
        <FormControl
          variant="outlined"
          fullWidth={true}
          size="small"
          required
          sx={{
            marginBottom: 7,
          }}
        >
          <InputLabel htmlFor="sign-up-password">Password</InputLabel>
          <OutlinedInput
            id="sign-up-password"
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
          Sign up
        </Button>
      </form>
      <Typography variant="body2" component="p" marginTop={2} color="secondary">
        Already have an account?
      </Typography>
      <Link to="/">Sign in please.</Link>
    </LogoAndTitleWrapper>
  );
}
