import React, { useContext } from 'react';
import { Context } from '../Context/Context';

import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';
import CategoriesChart from '../Components/CategoriesChart';

export default function IncomeChart() {
    const { filteredIncomeCategories } = useContext(Context);

    return (
        <IncomeAndExpenseWrapper
            title="Income"
            customTopMarginMob={0}
            customBottomMarginMob={5}
            customLeftMarginPC={0}
            customLeftMarginMob={0}
        >
            <CategoriesChart
                array={filteredIncomeCategories}
                backgroundColor="rgba(255,99,132,0.2)"
                borderColor="rgba(255,99,132,1)"
                hoverBackgroundColor="rgba(255,99,132,0.4)"
                type="income"
            />
        </IncomeAndExpenseWrapper>
    );
}
