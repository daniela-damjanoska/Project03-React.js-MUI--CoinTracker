import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Overview() {
    const { state } = useLocation();

    return <div>Overview</div>;
}
