import React, { useEffect, useState } from 'react';
import './App.css';
import CityCard from './WeatherApp/CityCard';
import CityDetails from './WeatherApp/CityDetails';
import Search from './WeatherApp/Search';
import { APITemp, APILocation } from './API_Key';

const defaultCities: City[] = [{
  temperature: null,
  name: '',
  key: null
}];

export interface City {
  key: number | null;
  temperature: number | null;
  name: string;
}

// Global lattiude and longitude for the web API
let lat: number = 0;
let lon: number = 0;

function App() {

  const [name, setName] = useState('');
  const [cities, setCities] = useState<City[]>(defaultCities);
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  // Component did mount
  useEffect(() => {
    const fetchData = async () => {
      const cityName = 'Copenhagen';
      setName(cityName);
      await getData(cityName);
    };

    fetchData();
    if (cities && cities.length > 0) {
      setSelectedCity(cities[cities.length - 1])
    }
  }, []);

  // COmponent did update (cities)
  useEffect(() => {
    if (cities && cities.length > 0) {
      setSelectedCity(cities[cities.length - 1])
    }
  }, [cities]);



  const getData = async (locationName: string) => {
    let API: string = APILocation(locationName);
    [lat, lon] = await getLocation(API);

    API = APITemp([lat, lon])
    await getTemp(API)
    debugger;
    // Resetting the input
    resetInput();
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await getData(name);
  }

  const resetInput = () => {
    setName("");
  }

  const getLocation = (API: any): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      fetch(API)
        .then(response => response.json())
        .then(data => {
          lat = data[0].lat;
          lon = data[0].lon;
          resolve([lat, lon]);
        }).catch(e => reject(e));
    })
  }

  const getTemp = (API: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Get data
      fetch(API)
        .then(response => response.json())
        .then(data => {
          setCities([...cities, {
            key: data.id,
            temperature: Math.floor(data.main.temp - 273.15), // Convert from Kelvin to Celcius 
            // and set the temperature to the api call
            name: name,
          }]);
          resolve()
        }).catch(error => reject(error));
    })
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
