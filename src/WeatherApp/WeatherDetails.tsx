import React from 'react';
import '../App.css';

interface weatherDetailsProps {
    cloudPercentage: number | undefined,
    humidityPercentage: number | undefined,
    windSpeed: number | undefined
}

function WeatherDetails(props: weatherDetailsProps) {
    return (
        <>
            <div className='weather-details-cover'>
                <hr className='underscore'></hr>
                <div className='weather-details-title'>Weather details</div>
                <ul className="weather-details-list">
                    <li className="weather-details-list-element">
                        <div className="weater-details-list-element-text">Cloudy</div>
                        <div className="weater-details-list-element-text">{props.cloudPercentage}%</div>
                    </li>
                    <li className="weather-details-list-element">
                        <div className="weater-details-list-element-text">Humidity</div>
                        <div className="weater-details-list-element-text">{props.humidityPercentage}%</div>
                    </li>
                    <li className="weather-details-list-element">
                        <div className="weater-details-list-element-text">Wind</div>
                        <div className="weater-details-list-element-text">{props.windSpeed}km/h</div>
                    </li>
                </ul>
            </div>
        </>
    );

}

export default WeatherDetails;