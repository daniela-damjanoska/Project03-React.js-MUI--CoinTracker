import React from "react";

import Header from "../Components/Header";
import Navigation from "../Components/Navigation";
import IncomeCategories from "../Components/IncomeCategories";
import ExpensesCategories from "../Components/ExpensesCategories";
import IncomeAndExpenseEntries from "../Components/IncomeAndExpenseEntries";

import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Overview() {
  const matches = useMediaQuery("(min-width:601px)");

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: matches ? "row" : "column",
        justifyContent: "center",
        minHeight: matches ? "auto" : "100vh",
        backgroundColor: matches ? "transparent" : "white",
      }}
    >
      <Header title="Overview" />
      <IncomeCategories />
      <ExpensesCategories />
      <IncomeAndExpenseEntries />
      <Navigation active={0} />
    </Container>
  );
}
