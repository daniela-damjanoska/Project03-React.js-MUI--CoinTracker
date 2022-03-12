import React from 'react';

import Header from '../Components/Header';
import Navigation from '../Components/Navigation';

export default function Overview() {
    return (
        <>
            <Header title="Overview" />
            <Navigation active={0} />
        </>
    );
}
