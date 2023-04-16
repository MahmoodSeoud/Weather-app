import React, { useEffect, useState } from 'react';
import './App.css';
import CityCard from './WeatherApp/CityCard';
import CityDetails from './WeatherApp/CityDetails';
import Search from './WeatherApp/Search';
import { APITemp, APILocation } from './API_Key';
import WeatherDetails from './WeatherApp/WeatherDetails';
import { constants } from 'buffer';

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

// Initial value of the cities array
const initialCities = () => {
  const storedCities = localStorage.getItem('cities');
  return storedCities ? JSON.parse(storedCities) : [];
}

// Initial value of the selectedCity
const initialSelectedCity = () => {
  const storedSelectedCity = localStorage.getItem('selectedCity');
  return storedSelectedCity ? JSON.parse(storedSelectedCity) : null;
}


function App() {

  // UseState Hook
  const [name, setName] = useState('');
  const [cities, setCities] = useState<City[]>(initialCities);
  const [selectedCity, setSelectedCity] = useState<City | null>(initialSelectedCity);


  // Componenet did mount
  useEffect(() => {
    const fetchData = async () => {
      // If there was no cities to get from local storage, then get "Copenhagen"
      // This is because of my location
      if (!cities || cities.length === 0) {
        await getData('Copenhagen');
      }
    }
    fetchData();
  }, []);

  // Componenet did update for the cities
  useEffect(() => {
    // Update the local storage
    localStorage.setItem('cities', JSON.stringify(cities));
    setSelectedCity(cities[cities.length - 1]);
  }, [cities]);

  // Componenet did update for selectedCity
  useEffect(() => {
    // Update the local storage
    localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
  }, [selectedCity])

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

  // When submiting -> getData
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await getData(name);
    setSelectedCity(cities[cities.length - 1]);
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
          console.error("API error", e)
          alert('Please enter a valid city')
          reject(e)
        });
    })
  }

  // Check if data is already in the array.
  const checkIfExists = (data: any): boolean => {
    const foundCity = cities.find((city: City) => city.key === data.id);
    if (!foundCity) {
      return false;
    }
    setSelectedCity(foundCity);
    return true;
  }

  // API call to get the temperature of the given latitude and longitude 
  const getTemp = (API: any, name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Get data
      fetch(API)
        .then(response => response.json())
        .then(data => {

          const alreadyInArr = checkIfExists(data);

          if (!alreadyInArr) {
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
      <div className='input'>
        <div className='search-input'>
          <Search
            handleSubmit={handleSubmit}
            handleKeyDown={handleKeyDown}
            setName={setName}
            name={name}
          />
        </div>
        <div className='citycard-card-container'>
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
      <div className='image'>
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
  );
}

export default App;
