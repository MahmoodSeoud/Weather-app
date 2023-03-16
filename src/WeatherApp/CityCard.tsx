import React, { useEffect, useState } from 'react';
import { City } from '../App';

import '../App.css';

interface CityCardProps {
    cities: any[];
    handleOnCityClick: (city: City) => void;
}



function CityCard(props: CityCardProps) {


    return (
        <>
            {
                props.cities.map(city => (
                    <div>
                        <div
                            onClick={() => props.handleOnCityClick(city)}
                            className='CityCard-card'>
                                {city.name}</div>
                    </div>
                ))
            }
        </>
    );
}

export default CityCard;

