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

    let API: string = APILocation(name);
    let [lat, lon] = getLocation(API);
    console.log([lat, lon])
    API = APITemp([lat, lon])
    getTemp(API)
    setName("");
  }

  const getLocation = (API: any): any[] => {

    let lat: number = 0;
    let lon: number = 0;

    fetch(API)
      .then(response => response.json())
      .then(data => {
        debugger
        lat = data[0].lat;
        lon = data[0].lon;
        return [data[0].lat, data[0].lon];
      }).catch(e =>
        console.log(e)
      );

    debugger
    return [0,0]; 
  }

  const getTemp = (API: any) => {

    let tempName: string = name
    // Get data
    fetch(API)
      .then(response => response.json())
      .then(data => {
        debugger;
        setCities([...cities, {
          key: data.id,
          temperature: Math.floor(data.main.temp - 273.15), // Convert from Kelvin to Celcius 
          // and set the temperature to the api call
          name: tempName,
        }]);
      }).catch(e =>
        console.log(e)
      );

    debugger;

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
