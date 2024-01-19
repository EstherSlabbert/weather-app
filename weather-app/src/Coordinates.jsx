import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import PropTypes from 'prop-types';

const Coordinates = ({ onLocationChange }) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated();

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      onLocationChange(coords.latitude, coords.longitude);
    } else {
      // Set default coordinates for London, UK
      onLocationChange(51.5074, 0.1278);
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled, onLocationChange]);

  return null; // This component doesn't render anything to the DOM
};

Coordinates.propTypes = {
    onLocationChange: PropTypes.func.isRequired
};

export default Coordinates;