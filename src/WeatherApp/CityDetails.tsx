import React from "react";

function CityDetails({ temperature }: { temperature: number }) {
    const today = new Date()
    return (
        <div className="city-details-container">
            <p className="city-temp">{temperature}<sup>o</sup></p>
            <p className="date">{today.toISOString()}</p>
        </div>
    );
}

export default CityDetails;