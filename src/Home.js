import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 20,
    speed: 2,
    image: '/cloudy.png'
  });
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a2ac3fe381df340cdcd31da4f2027787&&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          let imagePath='';
          if(res.data.weather[0].main === "Clouds"){
              imagePath ="/cloudy.png"
          }else if(res.data.weather[0].main === "Clear"){
            imagePath = "/sunny.png"
          }else if(res.data.weather[0].main === "Rain"){
            imagePath = "/rainy.png"
          }else if(res.data.weather[0].main === "Drizzle"){
            imagePath = "/rainy.png"
          }else{
            imagePath = "/cloudy.png"
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath

          });
          setError('');
        })
        .catch(err => {
          if(err.response.status === 404){
            setError('Invalid City Name')
          }else{
            setError('')
          }
          console.log(err)});
    }
  }

  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input type='text' placeholder='Enter city name' onChange={e => setName(e.target.value)} />
          <button onClick={handleClick}><i class="ri-search-line"></i>
          </button>
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>
        <div className='winfo'>
          <img className='imgs' src={data.image} alt='' />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <img src='/humidity.png' alt='' />
              <div className='humidity'>
                <p>
                  {Math.round(data.humidity)}%
                </p>
                <p>
                  Humidity
                </p>
              </div>
            </div>
            <div className='col'>
              <img src='/wind.png' alt='' />
              <div className='wind'>
                <p>
                  {Math.round(data.speed)} km/hr
                </p>
                <p>
                  Wind Speed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
