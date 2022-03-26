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
            array={filteredExpenseCategories}
            type="expense categories"
        >
            <CategoriesChart
                array={filteredExpenseCategories}
                backgroundColor="rgba(255,99,132,0.2)"
                borderColor="rgba(255,99,132,1)"
                hoverBackgroundColor="rgba(255,99,132,0.4)"
                type="expense"
            />
        </IncomeAndExpenseWrapper>
    );
}
