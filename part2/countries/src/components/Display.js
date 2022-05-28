import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Display = ({countries, countriesToShow, showCountry, weatherData}) => {

    if (countriesToShow.length===1) {
        const country = countriesToShow[0]
        const langs = Object.keys(country.languages).map(function(key) {return country.languages[key];});
        return (
            <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <b>languages:</b>
            <ul>{langs.map(lang => <li key={lang}>{lang}</li>)}</ul>
            <img src={country.flags.png} alt='country flag'/>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {weatherData.temperature} Celcius</p>
            <img src={weatherData.icon_src} alt='weather_icon'/>
            <p>wind {weatherData.wind_speed} m/s</p>
            </>
        )
    }
    return (
        <>
        {countriesToShow.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => showCountry(country.name.common)}>show</button></p>)}
        </>
    )
}

export default Display