import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Components/Navigation';

export default function Overview() {
    const { state } = useLocation();

    return <Navigation active={0} />;
}
