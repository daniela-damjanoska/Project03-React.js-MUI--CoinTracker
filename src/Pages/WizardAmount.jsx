import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";

import LogoAndTitleWrapper from "../Components/LogoAndTitleWrapper";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function WizardAmount() {
  const [amount, setAmount] = useState(""),
    [isValue, setIsValue] = useState(false),
    [errors, setErrors] = useState(false),
    [amountSuccess, setAmountSuccess] = useState(false),
    [helperText, setHelperText] = useState("");

  const matches = useMediaQuery("(min-width:601px)"),
    navigate = useNavigate();

  const handleChange = (e) => {
    e.target.value !== "" ? setIsValue(true) : setIsValue(false);
    setAmount(e.target.value);
  };

  const validateAmount = () => {
    if (amount > 0) {
      setAmountSuccess(true);
    } else {
      setErrors(true);
      setHelperText("Please enter a number greater than 0");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amountSuccess) {
      navigate("/wizard-categories", { state: { amount: amount } });
    }
  };

  return (
    <LogoAndTitleWrapper title="WELCOME">
      <Typography variant="body2" component="p" marginTop={2} marginBottom={6}>
        How much money do you have at the moment?
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="wizard-amount"
          label="Amount"
          type="number"
          variant="filled"
          fullWidth
          color="primary"
          error={errors ? true : false}
          helperText={errors ? helperText : ""}
          onBlur={() => validateAmount()}
          onFocus={() => setErrors(false)}
          value={amount}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={isValue ? false : true}
          sx={{
            display: "block",
            mt: matches ? 9 : 40,
          }}
        >
          ADD
        </Button>
      </form>
    </LogoAndTitleWrapper>
  );
}
