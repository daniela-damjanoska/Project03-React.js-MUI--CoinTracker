import React from 'react';

import Menu from '../Components/Menu';
import Navigation from '../Components/Navigation';

export default function Categories() {
    return (
        <>
            <Menu title="Categories" />
            <Navigation active={1} />
        </>
    );
}
