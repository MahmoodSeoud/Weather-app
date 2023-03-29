import React from "react";
import moment from 'moment';

interface cityDetailsProps {
    temperature: number;
    cityName: string;
    weatherIcon: string;
    weatherDescription: string;
}

function CityDetails(props: cityDetailsProps) {
    let today = ""
    today = moment(new Date()).format("HH:mm - dddd, DD MMM 'YY ")


    return (
        <>
            <div className="city-details-container">
                <div className="city-temp">{props.temperature}<sup className="temp-sup">&deg;</sup></div>
                <div className="city-more-info">
                    <p className="city-location">{props.cityName}</p>
                    <p className="date">{today}</p>
                </div>
                <div className="weather-icon-container">
                    <img
                        alt="Weather icon"
                        src={`https://openweathermap.org/img/wn/${props.weatherIcon}@2x.png`}
                        className="weather-icon"
                    />
                    <div className="weather-description">{props.weatherDescription}</div>
                </div>
            </div>
        </>
    );
}

export default CityDetails;
