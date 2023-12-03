import React, { useContext } from "react";
import { Context } from "../Context/Context";

import IncomeAndExpenseWrapper from "./IncomeAndExpenseWrapper";
import CategoriesChart from "../Components/CategoriesChart";

export default function IncomeChart() {
  const { filteredIncomeCategories } = useContext(Context);

  return (
    <IncomeAndExpenseWrapper
      title="Income Categories"
      customTopMarginMob={11}
      customBottomMarginMob={5}
      customLeftMarginPC={0}
      customLeftMarginMob={0}
      array={filteredIncomeCategories}
      type="income category"
    >
      <CategoriesChart
        array={filteredIncomeCategories}
        backgroundColor="rgba(0,128,0,0.2)"
        borderColor="rgba(0,128,0,1)"
        hoverBackgroundColor="rgba(0,128,0,0.4)"
        type="income"
      />
    </IncomeAndExpenseWrapper>
  );
}
