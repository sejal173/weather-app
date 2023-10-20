import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('pune');
  const [weatherDescription, setWeatherDescription] = useState('');

  async function loadWeatherData() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a98a72af7abee04e9ac0e54dc987e8b9`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadWeatherData();
  }, []);

  useEffect(() => {
    setWeatherDescription(
      `${weatherData?.weather?.[0]?.description} (${weatherData?.weather?.[0]?.main})`
    );
  }, [weatherData]);

  useEffect(() => {
    loadWeatherData();
  }, [city]);

  return (
    <div  className='container'>
      <h1 className='  text-center space-containt weather-heading'>Weather app of {city}</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}  className='inputbox'/>

      <h1 className='center-containt text-center space-containt'>City: {weatherData?.name}</h1>

      <div className='flex-container'>
              <div className='info-box'>
                  <h1>Temperature: {(weatherData?.main?.temp - 273).toFixed(2)} °C</h1>
              </div>
              
              <div className='info-box'>
                  <h1>Description: {weatherDescription} </h1>
              </div>

              <div className='info-box'>
                  <h1>Visibility: {weatherData?.visibility} meters </h1>
              </div>

      </div>
      
     
    </div>
  );
}
