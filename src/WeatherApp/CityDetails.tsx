import React from "react";
import moment from 'moment';
function CityDetails({ temperature, cityName}: { temperature: number, cityName:string }) {
    let today = ""
    today = moment(new Date()).format("HH:mm - dddd, DD MMM 'YY ")
    return (
        <div className="city-details-container">
            <p className="city-temp">{temperature} <sup className="temp-sup">&deg;</sup></p>
            <div className="city-more-info">
                <p className="city-location">{cityName}</p>
                <p className="date">{today}</p>
            </div>
        </div>
    );
}

export default CityDetails;
