import { createContext, useState, useEffect } from 'react';

export const Context = createContext({});

export const Provider = ({ children }) => {
    const [categoriesArray, setCategoriesArray] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        const categoriesFromLS = localStorage.getItem('categories');
        const avatarFromLS = localStorage.getItem('avatar');

        console.log(avatarFromLS);

        if (categoriesFromLS !== 'undefined') {
            setCategoriesArray(JSON.parse(categoriesFromLS));
        }

        if (avatarFromLS) {
            setAvatarUrl(avatarFromLS);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categoriesArray));
    }, [categoriesArray]);

    const addFilteredArray = array => setCategoriesArray(array);
    const addAvatarUrl = url => setAvatarUrl(url);
    const addCategory = category => {
        setCategoriesArray([...categoriesArray, category]);
    };

    const updateCategory = (
        categoryId,
        type,
        name,
        icon,
        budget,
        isEnabled
    ) => {
        const categoryToUpdate = categoriesArray.find(
            el => el.id === categoryId
        );

        categoryToUpdate.type = type;
        categoryToUpdate.name = name;
        categoryToUpdate.icon = icon;
        categoryToUpdate.budget = budget;
        categoryToUpdate.isEnabled = isEnabled;
    };

    console.log(categoriesArray);
    console.log(avatarUrl);

    const contextObject = {
        addFilteredArray,
        addAvatarUrl,
        addCategory,
        updateCategory,
        categoriesArray,
        avatarUrl,
    };

    return (
        <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
};
