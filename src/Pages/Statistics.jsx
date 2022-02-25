import React from 'react';

import Menu from '../Components/Menu';
import Navigation from '../Components/Navigation';

export default function Statistics() {
    return (
        <>
            <Menu title="Statistics" />
            <Navigation active={2} />
        </>
    );
}
