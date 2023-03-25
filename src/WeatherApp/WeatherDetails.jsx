import React from 'react';
import '../App.css';

function WeatherDetails() {
    return (
        <>
            <div>Weather details</div>
            <ul className="weather-details-list">
                <li className="weather-details-list-element">
                    <div className="weater-details-list-element-text">Cloudy <div>10%</div></div>
                </li>
                <li className="weather-details-list-element">
                    <div className="weater-details-list-element-text">
                        Humidity
                    </div>
                    <div className="weater-details-list-element-text">
                        10%
                    </div>
                </li>
                <li className="weather-details-list-element">
                    <div className="weater-details-list-element-text">
                        Wind
                    </div>
                    <div className="weater-details-list-element-text">
                        10km/h
                    </div>
                </li>
            </ul>
        </>
    );

}

export default WeatherDetails;