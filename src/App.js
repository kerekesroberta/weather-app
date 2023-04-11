import dayPicture from "./assets/dayPicture.jpg"
import nightPicture from "./assets/nightPicture.jpg"
import rainNightPicture from "./assets/rainNightPicture.jpg"
import rainDayPicture from "./assets/rainDayPicture.jpg"
import dayPicture1 from "./assets/dayPicture1.jpg"
import dayCloudsPicture from "./assets/dayCloudsPicture.jpg"
import daySunnyPictures from "./assets/daySunnyPictures.jpg"
import React, {useState} from 'react'
import Favorite from "./components/FavoriteCityTask/Favorite";
import axios from 'axios'
import './index.css'


function App() {

  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [theme, setTheme] = useState(dayPicture1)


  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        setThemeByWeather(response.data)
      })
      setLocation('')
    }
  }

  const searchLocationFromFavourites = (city) => {
    const newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=62c8f7b27e7abc861e99d1f3014cd3b0`;
    axios.get(newUrl).then((response) => {
      setData(response.data)
      console.log(response.data)
      setThemeByWeather(response.data)
    })
    setLocation('')
  }

  const setThemeByWeather = (data) => {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (data.sys.sunrise <= currentTime && data.sys.sunset >= currentTime) {
      if(data.weather[0].main === "Clear")
        setTheme(dayPicture);
      else setTheme(rainDayPicture);
      if(data.weather[0].main === "Clouds")
        setTheme(dayCloudsPicture);
      else if(data.weather[0].main === "Sunny")
        setTheme(daySunnyPictures);
    }

    else {
      if(data.weather[0].main === "Clear")
        setTheme(nightPicture);
      else setTheme(rainNightPicture);
    }
  }

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=62c8f7b27e7abc861e99d1f3014cd3b0`

  return (
      <div className="app" style={{backgroundImage: `url(${theme})`}}>
        <div className="search">
          <input
              value={location}
              onChange={event =>setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter location'
              type="text"/>
              <Favorite sendCity={searchLocationFromFavourites} />

        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>
                {data.name}
              </p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> :null}

            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main} </p> :null}

            </div>


          </div>

          {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              {data.main ?  <p>{data.main.feels_like.toFixed()} °C</p> : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ?  <p>{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind speed</p>
              {data.main ?  <p>{data.wind.speed.toFixed()} Km/H</p> : null}
            </div>
          </div>
          }
        </div>
      </div>
  );
}
export default App;
