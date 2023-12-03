import Header from "../Components/Header";
import IncomeChart from "../Components/IncomeChart";
import ExpensesChart from "../Components/ExpensesChart";
import IncomeAndExpenseChart from "../Components/IncomeAndExpenseChart";
import Navigation from "../Components/Navigation";

import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Statistics() {
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
      <Header title="Statistics" />
      <IncomeChart />
      <ExpensesChart />
      <IncomeAndExpenseChart />
      <Navigation active={2} />
    </Container>
  );
}
