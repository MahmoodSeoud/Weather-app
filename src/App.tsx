import React, { useEffect, useState } from 'react';
import './App.css';
import CityCard from './WeatherApp/CityCard';
import CityDetails from './WeatherApp/CityDetails';
import Search from './WeatherApp/Search';
import {API} from './API_Key'

let nextId: number = 0;
const defaultCities: City[] = [{
  temperature: 0,
  name: 'Birmingham',
  key:0
}];

export interface City {
  key: number;
  temperature: number;
  name: string;
}


function App() {
  const [name, setName] = useState('');
  const [cities, setCities] = useState<City[]>(defaultCities);
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  useEffect(() => {
    console.log(name);
    console.log(cities)
  }, [name]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(API)

    let results = await fetch(API)
    results.json()
    console.log(results)
    setCities([...cities, {
      key: ++nextId,
      temperature: 0,
      name: name,
    }]) // Set the temperature to the api call
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }

  const handleOnCityClick = (city: City) => {
      setSelectedCity(city)
  }

  return (
    <div className='web-cover'>
      <div className='image'>
        {selectedCity && (
          <CityDetails
            temperature={selectedCity.temperature}
          />
        )}
      </div>
      <div className='input'>

        <div className='search-input'>
          <Search
            handleKeyDown={handleKeyDown}
            setName={setName}
            name={name}
          />
        </div>
        <div className='CityCard-card-container'>
          <CityCard
            cities={cities}
            handleOnCityClick={(city) => handleOnCityClick(city)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
