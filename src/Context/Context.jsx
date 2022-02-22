import { createContext, useState, useEffect } from 'react';

export const Context = createContext({});

export const Provider = ({ children }) => {
    const [categoriesArray, setCategoriesArray] = useState([]);

    useEffect(() => {
        const categoriesFromLS = localStorage.getItem('categories');

        if (categoriesFromLS !== 'undefined') {
            setCategoriesArray(JSON.parse(categoriesFromLS));
        }
    }, []);

    const addFilteredArray = array => setCategoriesArray(array);
    console.log(categoriesArray);

    const contextObject = {
        addFilteredArray,
        categoriesArray,
    };

    return (
        <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
};
