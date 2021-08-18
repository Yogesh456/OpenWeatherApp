
import './App.css';

  
import React, { useState } from 'react';
const api = {
  key: "c2c76e50ba38e96fa62e9a63f78a8a02",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [News, setNews] = useState('Nonews')
  const [News2,setNews2] = useState('NoNews') 
 
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
         fetch ('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json').then(news => news.json()).then(todayNews => {setNews(todayNews);
            console.log(todayNews)} 
              );
            
            
        
          
         


    }
  }
            

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
        
        {(typeof News.articles != "undefined") ? (
          <div className="NewsBox" >
       <div className='img-box'> <img src={News.articles[2].urlToImage}/> </div>
          <h3>  {News.articles[2].title}</h3> 
          <h4> Source :  {News.articles[2].author}</h4>
            
        
            </div>

        ) : ('')}
        
      </main>
      

    </div>
  );
}

export default App;

