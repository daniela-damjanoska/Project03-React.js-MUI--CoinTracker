import React from 'react';

import Menu from '../Components/Menu';
import Navigation from '../Components/Navigation';

export default function Overview() {
    return (
        <>
            <Menu title="Overview" />
            <Navigation active={0} />
        </>
    );
}
