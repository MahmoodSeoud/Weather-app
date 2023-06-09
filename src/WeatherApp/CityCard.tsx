import React from 'react';
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
                        <div
                        key={city.key}
                        onClick={() => props.handleOnCityClick(city)}
                        className='citycard-card'
                        >
                            {city.name}
                        </div>
                ))
            }
        </>
    );
}

export default CityCard;

