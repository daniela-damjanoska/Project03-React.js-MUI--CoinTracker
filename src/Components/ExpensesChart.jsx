import React, { useContext } from 'react';
import { Context } from '../Context/Context';

import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';
import CategoriesChart from './CategoriesChart';

export default function ExpensesChart() {
    const { filteredExpenseCategories } = useContext(Context);

    return (
        <IncomeAndExpenseWrapper
            title="Expenses"
            customTopMarginMob={0}
            customBottomMarginMob={5}
            customLeftMarginPC={4}
            customLeftMarginMob={0}
        >
            <CategoriesChart
                array={filteredExpenseCategories}
                backgroundColor="rgba(0,128,0,0.2)"
                borderColor="rgba(0,128,0,1)"
                hoverBackgroundColor="rgba(0,128,0,0.4)"
                type="expense"
            />
        </IncomeAndExpenseWrapper>
    );
}
