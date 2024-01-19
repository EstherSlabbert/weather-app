import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

// Function to simulate an asynchronous API call
// Change info in 'address' section and 'lat'/'lon' to change display
const fetchDataFromReverseGeolocationApi = async () => {
  return {
    "place_id": 85969007,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "osm_type": "way",
    "osm_id": 289609243,
    "lat": "51.49991634140558",
    "lon": "0.11985080102556078",
    "display_name": "Wolsey Close, Thamesmead, Royal Borough of Greenwich, London, Greater London, England, SE2 9AW, United Kingdom",
    "address": {
      "road": "Wolsey Close",
      "suburb": "Thamesmead",
      "city_district": "Royal Borough of Greenwich",
      "ISO3166-2-lvl8": "GB-GRE",
      "city": "London",
      "state_district": "Greater London",
      "state": "England",
      "ISO3166-2-lvl4": "GB-ENG",
      "postcode": "SE2 9AW",
      "country": "United Kingdom",
      "country_code": "gb"
    },
    "boundingbox": ["51.499526", "51.5001728", "0.119078", "0.1199645"]
  }  
};

export default function Location({ latitude, longitude }) {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call by calling the fetchDataFromApi function
        const data = await fetchDataFromReverseGeolocationApi();
        setLocationData(data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };
    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  // test to see if latitude & longitude are passed in correctly
  // if (locationData) {
  //   console.log(`${latitude}, ${longitude}`);
  // }

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
