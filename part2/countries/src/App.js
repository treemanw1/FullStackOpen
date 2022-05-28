import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Display from './components/Display'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterPhrase, setFilterPhrase] = useState('')
  const [noFilteredCountries, setNoFilteredCountries] = useState(100)
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState({'temperature': 0, 'wind_speed': 0, 'icon_src': ''})

  const handleFilter =(event) => {
    setNoFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes
      (event.target.value)).length)
    setFilterPhrase(event.target.value.toLowerCase())
  }

  const showCountry =(name) => {
    setFilterPhrase(name.toLowerCase())
    setNoFilteredCountries(1)
  }

  const countriesToShow =
    noFilteredCountries > 10 ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(filterPhrase))

  // hook for pulling info from rest-api
  const country_hook = () => {
    // console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(country_hook, [])

  if (noFilteredCountries===1) {
    console.log('API Call');
  }

  const weather_hook = () => {
    if (noFilteredCountries === 1) {
      // console.log(countriesToShow[0])
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${countriesToShow[0].capital}
          &appid=${api_key}`)
      .then(response => {
          // console.log('weather promise fulfilled')
          // console.log('icon:', response.data.weather[0].icon);
          setWeatherData({'temperature': Math.round((response.data.main.temp-273)*100)/100, 
            'wind_speed': response.data.wind.speed, 'icon_src': 
              `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`})
      })
    }
  }   
useEffect(weather_hook, [noFilteredCountries])


  return (
    <div>
      <Search phrase={filterPhrase} handle={handleFilter}/>
      <Display countries={countries} countriesToShow={countriesToShow} showCountry={showCountry}
        weatherData={weatherData}/>
    </div>
  )
}

export default App