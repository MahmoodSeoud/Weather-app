import React, { useEffect, useState } from 'react';
import './App.css';
import CityCard from './WeatherApp/CityCard';
import CityDetails from './WeatherApp/CityDetails';
import Search from './WeatherApp/Search';
import { APITemp, APILocation } from './API_Key';
import { debug } from 'console';

let nextId: number = 0;
const defaultCities: City[] = [{
  temperature: 0,
  name: 'Birmingham',
  key: 0
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
    /*     console.log(name);
        console.log(cities) */
  }, [name]);

  const handleSubmit = (event: any) => {
    event.preventDefault();


    let lat: string = "";
    let lon: string = "";
    let API: string = APILocation(name)

    // Get data
    fetch(API)
      .then(response => response.json())
      .then(data => {
        lat = data[0].lat
        lon = data[0].lon
      }

      ).catch(e =>
        console.log(e)
      );

    API = APITemp(lat, lon)
    fetch(API)
      .then(response => response.json())
      .then(data => {
        setCities([...cities, {
          key: ++nextId,
          temperature: Math.floor(data.main.temp - 273.15), // Convert from Kelvin to Celcius 
                                                            // and set the temperature to the api call
          name: name,
        }]);
      }).catch(e =>
        console.log(e)
      );
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
        <div className='city-details'>
          {selectedCity && (
            <CityDetails
              temperature={selectedCity.temperature}
              cityName={selectedCity.name}
            />
          )}
        </div>
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
