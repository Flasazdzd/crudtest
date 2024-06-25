import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
  const [itemName, setItemName] = useState('');
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName) {
      console.error('Item name is required');
      return;
    }

    // Post data to the API endpoint
    axios.post('https://fluffy-memory-5wr44xwjvq734vgp-3000.app.github.dev/api/items', { name: itemName })
      .then(response => {
        console.log('Item added:', response.data);
        // Clear the input after successful posting
        setItemName(''); 

        if (!cityName) {
          console.error('City name is required');
          return;
        }

        // Fetch weather data from OpenWeatherMap API
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4e76e28a7b263ddeae2d5e0cd6809393`;

        axios.get(apiUrl)
          .then(response => {
            console.log('Weather data:', response.data);
            setWeatherData(response.data); // Save the weather data to the state
            setCityName(''); // Clear the input after successful fetching
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });

      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
        placeholder="Enter item name"
      />
      <input
        type="text"
        value={cityName}
        onChange={e => setCityName(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Add Item and Get Weather</button>
      {weatherData && (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </form>
  );
};

export default CreateItem;
