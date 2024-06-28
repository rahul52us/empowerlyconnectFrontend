import React, { useState } from 'react';
import axios from 'axios';

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const PunchAttendance: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [remarks, setRemarks] = useState<string>(''); // State for remarks
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<string>('');

  // Function to get geolocation data
  const getGeolocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => resolve(position),
          (error) => reject(error)
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  // Function to get device information
  const getDeviceInfo = () => {
    setDeviceInfo(navigator.userAgent);
  };


  console.log('The device info:', deviceInfo);
      console.log('The latitude:', latitude);
      console.log('The longitude:', longitude);


  // Punch-in function
  const handlePunchIn = async () => {
    try {
      const position = await getGeolocation();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      getDeviceInfo();

      console.log('The device info:', deviceInfo);
      console.log('The latitude:', latitude);
      console.log('The longitude:', longitude);
    }
    catch{

    }
  };

  // Punch-out function
  const handlePunchOut = async () => {
    try {
      const position = await getGeolocation();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      getDeviceInfo();

      console.log('The device info:', deviceInfo);
      console.log('The latitude:', latitude);
      console.log('The longitude:', longitude);

      // Optionally send data to server
      const response = await axios.post('http://localhost:3000/punchout', {
        userId,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        deviceInfo
      });
      console.log('Punch-out successful:', response.data);
    } catch (error: any) {
      console.error('Error during punch-out:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>PunchAttendance System</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Remarks"
        value={remarks} // Bind input to remarks state
        onChange={(e) => setRemarks(e.target.value)}
      />
      <button onClick={handlePunchIn}>Punch In</button>
      <button onClick={handlePunchOut}>Punch Out</button>
    </div>
  );
};

export default PunchAttendance;
