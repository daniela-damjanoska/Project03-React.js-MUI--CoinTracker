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

    const addFilteredArray = array => setCategoriesArray(array);
    const addAvatarUrl = url => setAvatarUrl(url);

    console.log(categoriesArray);
    console.log(avatarUrl);

    const contextObject = {
        addFilteredArray,
        addAvatarUrl,
        categoriesArray,
        avatarUrl,
    };

    return (
        <Context.Provider value={contextObject}>{children}</Context.Provider>
    );
};
