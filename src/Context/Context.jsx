import { createContext, useState, useEffect } from 'react';

import initialCategories from '../Data/Categories';

export const Context = createContext({});

export const Provider = ({ children }) => {
    const [categories, setCategories] = useState(initialCategories);

    useEffect(() => {
        const categoriesFromLS = localStorage.getItem('categories');

        if (categoriesFromLS) {
            setCategories(JSON.parse(categoriesFromLS));
        } else {
            setCategories(initialCategories);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const updateCategoriesArray = array => setCategories(array);

    const addCategory = category => {
        setCategories([...categories, category]);
    };

    const updateCategory = (
        categoryId,
        type,
        name,
        icon,
        budget,
        isEnabled
    ) => {
        const categoryToUpdate = categories.find(el => el.id === categoryId);

        categoryToUpdate.type = type;
        categoryToUpdate.name = name;
        categoryToUpdate.icon = icon;
        categoryToUpdate.budget = budget;
        categoryToUpdate.isEnabled = isEnabled;
    };

    console.log(categories);

    const contextObject = {
        updateCategoriesArray,
        addCategory,
        updateCategory,
        categories,
    };

    return (
        <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
};
