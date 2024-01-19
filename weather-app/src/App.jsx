import { useState } from 'react'
import './index.css'
import Location from './Location';
import Weather from './Weather';
import Coordinates from './Coordinates';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  return (
    <>
        <h1>Weather App</h1>
        <h3>Current weather:</h3>
        <Coordinates 
          onLocationChange={(lat, lon) => {
            setLatitude(lat);
            setLongitude(lon);
          }}
        />
        <div className='display'>
          { latitude !== null && longitude !== null && <Location latitude={latitude} longitude={longitude} /> }
          { latitude !== null && longitude !== null && <Weather latitude={latitude} longitude={longitude} /> }
        </div>
    </>
  )
}

export default App
