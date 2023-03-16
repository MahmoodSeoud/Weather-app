import React from "react";

function CityDetails({ temperature }: { temperature: number }) {
    const today = new Date()
    return (
        <div>
            <p>Temperature: {temperature}</p>
            <p>{today.toISOString()}</p>
        </div>
    );
}

export default CityDetails;