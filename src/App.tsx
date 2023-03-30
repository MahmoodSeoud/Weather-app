import React, { useEffect, useState } from 'react';
import './App.css';
import CityCard from './WeatherApp/CityCard';
import CityDetails from './WeatherApp/CityDetails';
import Search from './WeatherApp/Search';
import { APITemp, APILocation } from './API_Key';
import WeatherDetails from './WeatherApp/WeatherDetails';

export interface City {
  key: number;
  name: string;
  weather: {
    temperature: number;
    cloudPercentage: number;
    humidityPercentage: number;
    windSpeed: number;
    icon: string;
    description: string;
  };
}

// Global lattiude and longitude for the web API
let lat: number = 0;
let lon: number = 0;

function App() {

  const [name, setName] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City>();

  // Component didmount
  useEffect(() => {
    const fetchData = async () => {
      await getData('Copenhagen');
    };

    fetchData();
  }, []);

  // Component did update (cities)
  useEffect(() => {
    if (cities && cities.length > 0) {
      setSelectedCity(cities[cities.length - 1])
    }
  }, [cities]);

  //  Fetch data from API call and set to that city.
  const getData = async (locationName: string) => {
    let tempLocationName = (locationName[0].toUpperCase() + locationName.slice(1).toLowerCase()).trim();
    let API: string = APILocation(tempLocationName);
    [lat, lon] = await getLocation(API);

    // Make sure that the lat and lot calls are valid
    if (lat !== 0 && lon !== 0) {
      API = APITemp([lat, lon])
      await getTemp(API, tempLocationName)
    }
    // Resetting the input
    resetInput();
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await getData(name);
  }

  // Resest the input after user is done typing
  const resetInput = () => {
    setName("");
  }

  // API call to get the latitude and longitude of the inputtet location
  const getLocation = (API: any): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      fetch(API)
        .then(response => response.json())
        .then(data => {
          lat = data[0].lat;
          lon = data[0].lon;
          resolve([lat, lon]);
        }).catch(e => {
          alert('Please enter a valid city')
          reject(e)
        });
    })
  }

  // Check if data is already in the array.
  const checkIfExists = (data: any): boolean => {
    const foundCity = cities.find(city => city.key === data.id);
    if (!foundCity) {
      return false
    }
    setSelectedCity(foundCity)
    return true
  }

  // API call to get the temperature of the given latitude and longitude 
  const getTemp = (API: any, name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Get data
      fetch(API)
        .then(response => response.json())
        .then(data => {

          const alreadyInArr = checkIfExists(data);

          if (alreadyInArr) {
          } else {
            setCities([...cities, {
              name: name,
              key: data.id,
              weather: {
                temperature: Math.floor(data.main.temp - 273.15), // Convert from Kelvin to Celcius 
                // and set the temperature to the api call
                cloudPercentage: data.clouds.all,
                humidityPercentage: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather[0].icon,
                description: data.weather[0].description
              },
            }]);
          }

          resolve()
        }).catch(error => reject(error));
    })
  }

  // Handle the event that user press enter
  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }
  // Handle the event the user clicks a city to view their temperature
  const handleOnCityClick = (city: City) => {
    setSelectedCity(city)
  }

  return (
    <div className='web-cover'>
      <div className='image'>
        <div className='city-details'>
          {selectedCity && (
            <CityDetails
              temperature={selectedCity.weather.temperature}
              cityName={selectedCity.name}
              weatherIcon={selectedCity?.weather.icon}
              weatherDescription={selectedCity?.weather.description}
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
        <div className='weather-details'>
          <WeatherDetails
            humidityPercentage={selectedCity?.weather.humidityPercentage}
            cloudPercentage={selectedCity?.weather.cloudPercentage}
            windSpeed={selectedCity?.weather.windSpeed}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
