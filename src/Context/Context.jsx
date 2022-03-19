import { createContext, useState, useEffect } from 'react';

import initialCategories from '../Data/Categories';

export const Context = createContext({});

export const Provider = ({ children }) => {
    const [categories, setCategories] = useState(initialCategories);
    const [entries, setEntries] = useState([]);
    const [categoryIcon, setCategoryIcon] = useState('');

    useEffect(() => {
        const categoriesFromLS = localStorage.getItem('categories');

        if (categoriesFromLS) {
            setCategories(JSON.parse(categoriesFromLS));
        } else {
            setCategories(initialCategories);
        }
    }, []);

    useEffect(() => {
        const entriesFromLS = localStorage.getItem('entries');

        if (entriesFromLS) {
            setEntries(JSON.parse(entriesFromLS));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        localStorage.setItem('entries', JSON.stringify(entries));
    }, [entries]);

    const updateCategoriesArray = array => setCategories(array);
    const updateEntriesArray = array => setEntries(array);
    const saveCategoryIcon = icon => setCategoryIcon(icon);

    const addCategory = category => {
        setCategories([
            ...categories,
            { ...category, id: new Date().valueOf() },
        ]);
    };

    const addEntry = entry => {
        setEntries([
            {
                ...entry,
                categoryIcon,
                id: new Date().valueOf(),
                icon: categoryIcon,
            },
            ...entries,
        ]);
    };

    const updateCategory = category => {
        const categoryToUpdate = categories.find(el => el.id === category.id);
        categoryToUpdate.type = category.type;
        categoryToUpdate.name = category.name;
        categoryToUpdate.icon = category.icon;
        categoryToUpdate.budget = category.budget;
        categoryToUpdate.isEnabled = category.isEnabled;

        localStorage.setItem('categories', JSON.stringify(categories));
    };

    const updateEntry = entry => {
        const entryToUpdate = entries.find(el => el.id === entry.id);
        entryToUpdate.type = entry.type;
        entryToUpdate.name = entry.name;
        entryToUpdate.category = entry.category;
        entryToUpdate.amount = entry.amount;
        entryToUpdate.date = entry.date;

        localStorage.setItem('entries', JSON.stringify(entries));
    };

    // const deleteCategory = category => {
    //     const updated = categories.filter(el => el.id !== category.id);

    //     setCategories(updated);
    // };

    const deleteEntry = entry => {
        const updated = entries.filter(el => el.id !== entry.id);

        setEntries(updated);
    };

    const contextObject = {
        updateCategoriesArray,
        updateEntriesArray,
        addCategory,
        addEntry,
        updateCategory,
        updateEntry,
        // deleteCategory,
        deleteEntry,
        saveCategoryIcon,
        categories,
        entries,
    };

    return (
        <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
};
