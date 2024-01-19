import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotdef, faSun, faMoon, faWind, faTemperatureLow, faCloudSun, faCloud, faSmog, faCloudSunRain, faCloudShowersHeavy, faSnowflake, faCloudBolt, faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

const weatherCodes = [
  {"weatherCode": 0, "description": "Clear sky", "icon": faSun},
  {"weatherCode": 1, "description": "Mainly clear", "icon": faCloudSun},
  {"weatherCode": 2, "description": "Partly cloudy", "icon": faCloudSun},
  {"weatherCode": 3, "description": "Overcast", "icon": faCloud},
  {"weatherCode": 45, "description": "Fog", "icon": faSmog},
  {"weatherCode": 48, "description": "Depositing rime fog", "icon": faSmog},
  {"weatherCode": 51, "description": "Drizzle: Light intensity", "icon": faCloudSunRain},
  {"weatherCode": 53, "description": "Drizzle: Moderate intensity", "icon": faCloudSunRain},
  {"weatherCode": 55, "description": "Drizzle: Dense intensity", "icon": faCloudSunRain},
  {"weatherCode": 56, "description": "Freezing Drizzle: Light intensity", "icon": faCloudSunRain},
  {"weatherCode": 57, "description": "Freezing Drizzle: Dense intensity", "icon": faCloudSunRain},
  {"weatherCode": 61, "description": "Rain: Slight intensity", "icon": faCloudShowersHeavy},
  {"weatherCode": 63, "description": "Rain: Moderate intensity", "icon": faCloudShowersHeavy},
  {"weatherCode": 65, "description": "Rain: Heavy intensity", "icon": faCloudShowersHeavy},
  {"weatherCode": 66, "description": "Freezing Rain: Light intensity", "icon": faCloudShowersHeavy},
  {"weatherCode": 67, "description": "Freezing Rain: Heavy intensity", "icon": faCloudShowersHeavy},
  {"weatherCode": 71, "description": "Snow fall: Slight intensity", "icon": faSnowflake},
  {"weatherCode": 73, "description": "Snow fall: Moderate intensity", "icon": faSnowflake},
  {"weatherCode": 75, "description": "Snow fall: Heavy intensity", "icon": faSnowflake},
  {"weatherCode": 77, "description": "Snow grains", "icon": faSnowflake},
  {"weatherCode": 80, "description": "Rain showers: Slight intensity", "icon": faCloudShowersHeavy},
  {"weatherCode": 81, "description": "Rain showers: Moderate intensity", "icon": faCloudShowersHeavy},
  {"weatherCode": 82, "description": "Rain showers: Violent intensity", "icon": faCloudShowersHeavy},
  {"weatherCode": 85, "description": "Snow showers: Slight intensity", "icon": faSnowflake},
  {"weatherCode": 86, "description": "Snow showers: Heavy intensity", "icon": faSnowflake},
  {"weatherCode": 95, "description": "Thunderstorm: Slight or moderate", "icon": faCloudBolt},
  {"weatherCode": 96, "description": "Thunderstorm with slight hail", "icon": faBoltLightning},
  {"weatherCode": 99, "description": "Thunderstorm with heavy hail", "icon": faBoltLightning}
];

export default function Weather({ latitude, longitude }) {
  const baseWeatherApiUrl = 'https://api.open-meteo.com/v1/forecast';
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const weatherApi = `${baseWeatherApiUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const response = await fetch(weatherApi);
      const data = await response.json();
      setWeatherData(data);
    };

    if (latitude && longitude) {
      const delay = 1000; // in milliseconds
      setTimeout(() => {
        getWeatherData();
      }, delay);
    }
  }, [latitude, longitude]);

  // test for checking coords are correctly passed along
  // if (weatherData) {
  //   console.log(`Coords: ${Number(weatherData.latitude.toFixed(2))}, ${Number(weatherData.longitude.toFixed(2))}`);
  // }

  return (
    <div>
      {weatherData && (
        <div className='weather'>
          <p className='date'>
            <strong>{weatherData.current_weather.time}</strong>
          </p>
          <Tooltip anchorSelect='.date' place='top'>
            Date & Time
          </Tooltip>
          <div className='conditions'>
            {(weatherCodes.find(item => item.weatherCode === weatherData.current_weather.weathercode) && 
            (weatherCodes.find(item => item.weatherCode === weatherData.current_weather.weathercode).icon)) 
            ? <><FontAwesomeIcon icon={weatherCodes.find(item => item.weatherCode === weatherData.current_weather.weathercode).icon} 
            className='weather icon' />
            <Tooltip anchorSelect=".weather.icon" place="top">
                Weather Conditions
            </Tooltip>
            <Tooltip anchorSelect=".weather.icon" place="bottom">
                {weatherCodes.find(item => item.weatherCode === weatherData.current_weather.weathercode).description}
            </Tooltip></>
            : <><FontAwesomeIcon icon={faNotdef} title="Not Defined" className='weather icon' />
            <Tooltip anchorSelect=".weather.icon" place="top">
                Weather Conditions
            </Tooltip></>}
          </div>
          <div className={(weatherData.current_weather.temperature >= 18) ? 'warm': 'cold'}>
            <FontAwesomeIcon icon={faTemperatureLow} title="Temperature" className='temperature icon' />  
            <br/>{ weatherData.current_weather.temperature }°C
          </div>
          <Tooltip anchorSelect=".cold" place="top">
                Temperature
          </Tooltip>
          <Tooltip anchorSelect=".warm" place="top">
                Temperature
          </Tooltip>
          <div className='nightnday'>
            { (weatherData.current_weather.is_day === 1) ? <><FontAwesomeIcon icon={faSun} title="Daylight" className='day' />
            <Tooltip anchorSelect=".day" place="top">
                Daytime
            </Tooltip></>
            : <><FontAwesomeIcon icon={faMoon} title="Night" className='night' />
            <Tooltip anchorSelect=".night" place="top">
                Nighttime
            </Tooltip></> }
          </div>
          <div className='wind'>
            <FontAwesomeIcon icon={faWind} title="Wind Speed" className='wind icon' />
            <br/>{ weatherData.current_weather.windspeed } km/h
          </div>
          <Tooltip anchorSelect=".wind" place="top">
              Wind Speed
          </Tooltip>          
        </div>
      )}
    </div>
  );
}

Weather.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
};