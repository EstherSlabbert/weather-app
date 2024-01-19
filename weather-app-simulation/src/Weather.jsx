import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotdef, faSun, faMoon, faWind, faTemperatureLow, faCloudSun, faCloud, faSmog, faCloudSunRain, faCloudShowersHeavy,
        faSnowflake, faCloudBolt, faBoltLightning } from '@fortawesome/free-solid-svg-icons';
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

// Function to simulate an asynchronous API call (change info in "current_weather" section to see display changes)
const fetchDataFromApi = async () => {
  return {
    "latitude": 51.5,
    "longitude": 0.119999886,
    "generationtime_ms": 0.07593631744384766,
    "utc_offset_seconds": 0,
    "timezone": "GMT",
    "timezone_abbreviation": "GMT",
    "elevation": 6.0,
    "current_weather_units": {
      "time": "iso8601",
      "interval": "seconds",
      "temperature": "°C",
      "windspeed": "km/h",
      "winddirection": "°",
      "is_day": "",
      "weathercode": "wmo code"
    },
    "current_weather": {
      "time": "2024-01-16T15:30",
      "interval": 900,
      "temperature": 3.2,
      "windspeed": 9.0,
      "winddirection": 217,
      "is_day": 1,
      "weathercode": 1
    }
  };
};

export default function Weather({ latitude, longitude }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call by calling the fetchDataFromApi function
        const data = await fetchDataFromApi();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  let temperatureClassName;

  if (weatherData && weatherData.current_weather.temperature >= 18) {
    temperatureClassName = 'warm';
  } else {
    temperatureClassName = 'cold';
  }

  // Code Test to ensure/compare latitude and longitude are passed in correctly
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
          <p className='conditions'>
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
          </p>
          <div className={temperatureClassName}>
            <FontAwesomeIcon icon={faTemperatureLow} title="Temperature" className='temperature icon' />  
            <br/>{ weatherData.current_weather.temperature }°C
          </div>
          <Tooltip anchorSelect=".cold" place="top">
                Temperature
          </Tooltip>
          <Tooltip anchorSelect=".warm" place="top">
                Temperature
          </Tooltip>
          <p className='nightnday'>
            { (weatherData.current_weather.is_day === 1) ? <><FontAwesomeIcon icon={faSun} title="Daylight" className='day' />
            <Tooltip anchorSelect=".day" place="top">
                Daytime
            </Tooltip></>
            : <><FontAwesomeIcon icon={faMoon} title="Night" className='night' />
            <Tooltip anchorSelect=".night" place="top">
                Nighttime
            </Tooltip></> }
          </p>
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
