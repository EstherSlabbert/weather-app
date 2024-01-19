import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

export default function Location({ latitude, longitude }) {
  const baseLocationApiUrl = "https://geocode.maps.co/reverse";
  const [locationData, setLocationData] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const getLocationData = async () => {
      const locationApi = `${baseLocationApiUrl}?lat=${latitude}&lon=${longitude}&api_key=${apiKey}`;
      try {
        const response = await fetch(locationApi);
        const data = await response.json();
        setLocationData(data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };
    if (latitude && longitude) {
      const delay = 1000; // in milliseconds
      setTimeout(() => {
        getLocationData();
      }, delay);
    }
  }, [latitude, longitude, apiKey]);

  return (
    <div>
      {locationData && (
        <div className='location'>
          <div className="location-details">
            <div>
              <FontAwesomeIcon icon={faLocationDot} title="Location" className='location icon' />
              <Tooltip anchorSelect=".location.icon" place="top">
                Location
              </Tooltip>
            </div>
            <p><strong>City:</strong> {locationData.address.city}<br /><strong>Country:</strong> {locationData.address.country}</p>
          </div>

          <h4>Location: {Number(parseFloat(locationData.lat).toFixed(2))}, {Number(parseFloat(locationData.lon).toFixed(2))}</h4>

        </div>
      )}
    </div>
  );
}

Location.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
};
