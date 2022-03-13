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
        setCategories([
            ...categories,
            { ...category, id: new Date().valueOf() },
        ]);
    };

    // const updateCategory = category => {
    //     const categoryToUpdate = categories.find(el => el.id === category.id);

    //     categoryToUpdate.type = category.type;
    //     categoryToUpdate.name = category.name;
    //     categoryToUpdate.icon = category.icon;
    //     categoryToUpdate.budget = category.budget;
    //     categoryToUpdate.isEnabled = category.isEnabled;
    // };

    const updateCategory = category => {
        const updated = categories.map(el =>
            el.id === category.id ? category : el
        );

        setCategories(updated);
    };

    const deleteCategory = category => {
        const updated = categories.filter(el => el.id !== category.id);

        setCategories(updated);
    };

    const contextObject = {
        updateCategoriesArray,
        addCategory,
        updateCategory,
        deleteCategory,
        categories,
    };

    return (
        <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
};
