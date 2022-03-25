import { createContext, useState, useEffect } from 'react';

import initialCategories from '../Data/Categories';

export const Context = createContext({});

export const Provider = ({ children }) => {
    const [categories, setCategories] = useState(initialCategories);
    const [entries, setEntries] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');
    // const [calcSum, setCalcSum] = useState('');

    useEffect(() => {
        const categoriesFromLS = localStorage.getItem('categories'),
            entriesFromLS = localStorage.getItem('entries');

        if (categoriesFromLS) {
            setCategories(JSON.parse(categoriesFromLS));
        } else {
            setCategories(initialCategories);
        }

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

    const filteredEnabledCategories = categories.filter(
        category => category.isEnabled === true
    );

    const filteredIncomeCategories = filteredEnabledCategories.filter(
        category => category.type === 'income'
    );

    const filteredExpenseCategories = filteredEnabledCategories.filter(
        category => category.type === 'expense'
    );

    const updateCategoriesArray = array => setCategories(array);
    const updateEntriesArray = array => setEntries(array);
    const saveCategoryId = id => setCategoryId(id);
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
                categoryId,
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
        entryToUpdate.icon = categoryIcon;
        entryToUpdate.date = entry.date;

        localStorage.setItem('entries', JSON.stringify(entries));
    };

    const deleteEntry = entry => {
        const updated = entries.filter(el => el.id !== entry.id);

        setEntries(updated);
    };

    // make a sum of the income
    // let sum = 0;
    // const makeSum = num => (sum += num);

    if (entries.length > 0) {
        categories.forEach(el => {
            const filteredEntriesForSum = entries.filter(
                entry => el.id === entry.categoryId
            );

            el.entriesArr = filteredEntriesForSum.map(el => el.amount);

            localStorage.setItem('categories', JSON.stringify(categories));
        });
    }

    const contextObject = {
        updateCategoriesArray,
        updateEntriesArray,
        addCategory,
        addEntry,
        updateCategory,
        updateEntry,
        deleteEntry,
        saveCategoryId,
        saveCategoryIcon,
        filteredIncomeCategories,
        filteredExpenseCategories,
        categories,
        entries,
    };

    return (
        <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
};
