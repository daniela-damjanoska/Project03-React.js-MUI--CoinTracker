import { createContext, useState, useEffect } from 'react';

import initialCategories from '../Data/Categories';

import { format } from 'date-fns';

export const Context = createContext({});

export const Provider = ({ children }) => {
    const [categories, setCategories] = useState(initialCategories),
        [entries, setEntries] = useState([]),
        [categoryId, setCategoryId] = useState(''),
        [categoryIcon, setCategoryIcon] = useState('');

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

    const updateCategoriesArray = array => setCategories(array),
        updateEntriesArray = array => setEntries(array),
        saveCategoryId = id => setCategoryId(id),
        saveCategoryIcon = icon => setCategoryIcon(icon);

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

    const datesBetween = (start, end) => {
        const dates = new Array(),
            day = new Date(start);

        while (day <= end) {
            dates.push(new Date(day));
            day.setDate(day.getDate() + 1);
        }
        return dates;
    };

    const today = new Date();
    const dateInProperFormat = format(today, 'yyyy-MM-dd');
    const daysInCurrentMonth = +dateInProperFormat.slice(-2) - 1;

    const thirtyDaysAgo = new Date().setDate(
        new Date().getDate() - daysInCurrentMonth
    );

    const dates = datesBetween(thirtyDaysAgo, today);
    const labels = dates.map(el => format(el, 'yyyy-MM-dd'));
    console.log(labels);

    const datesFromEntries = entries.map(el => el.date);
    console.log(datesFromEntries);

    const concat 

    // const findDuplicates = array => {
    //     const uniqueElements = new Set(array);
    //     const filteredElements = array.filter(item => {
    //         if (uniqueElements.has(item)) {
    //             uniqueElements.delete(item);
    //         } else {
    //             return item;
    //         }
    //     });
    
    //     return [...new Set(filteredElements)];
    // };

    //make a sum of the entries amount for each category
    if (entries) {
        filteredEnabledCategories.forEach(category => {
            const totalAmount = entries.reduce((accumulation, entry) => {
                if (entry.categoryId === category.id) {
                    return accumulation + parseInt(entry.amount);
                } else {
                    return accumulation;
                }
            }, 0);

            category.entriesAmount = totalAmount;
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
        labels,
    };

    return (
        <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
};
