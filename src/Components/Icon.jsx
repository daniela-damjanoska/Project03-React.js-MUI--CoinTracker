import React from 'react';

import FastfoodRounded from '@mui/icons-material/FastfoodRounded';
import CommuteRounded from '@mui/icons-material/CommuteRounded';
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import HealthAndSafetyRounded from '@mui/icons-material/HealthAndSafetyRounded';
import CheckroomRounded from '@mui/icons-material/CheckroomRounded';
import SportsBasketball from '@mui/icons-material/SportsBasketball';
import Flight from '@mui/icons-material/Flight';

export default function Icon(props) {
    const { name } = props;

    let icon = null;

    switch (name) {
        case 'FastfoodRounded':
            icon = FastfoodRounded;
            break;
        case 'CommuteRounded':
            icon = CommuteRounded;
            break;
        case 'DescriptionRounded':
            icon = DescriptionRounded;
            break;
        case 'HealthAndSafetyRounded':
            icon = HealthAndSafetyRounded;
            break;
        case 'CheckroomRounded':
            icon = CheckroomRounded;
            break;
        case 'SportsBasketball':
            icon = SportsBasketball;
            break;
        case 'Flight':
            icon = Flight;
            break;
    }

    return React.createElement(icon, { ...props });
}
