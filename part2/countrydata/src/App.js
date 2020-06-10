// not complete -- last step
import React, { useState, useEffect } from "react"
import axios from "axios"

const Searched = ({ filteredCountries, search }) => {
  if (search !== ''){
    if (filteredCountries.length === 1) {
  
      const api_key = process.env.REACT_APP_API_KEY
      const query = filteredCountries[0].capital
      console.log(query)
      const weather = []
      const promise = axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`)
      promise.then(response => {
        console.log("fulfilled prom")
        console.log(response.data)
        const weatherObject = {
          city: response.data.location.name,
          temperature: response.data.current.temperature
        }
        console.log(weatherObject)
        weather.push(weatherObject)
        console.log(response)
      })

      return (
        <div>
          {/* {console.log("hello", {weather})} */}
          {filteredCountries.map((country) => (
            <div key={country.name}>
              <h1>{country.name}</h1>
              <div>capital {country.capital}</div>
              <div>population {country.population}</div>
              <h1 >languages</h1>
              <ul>
                {country.languages.map((lang) => (
                  <li key={lang.name}>{lang.name}</li>
                ))}
              </ul>
              <img src={country.flag} alt="flag img" width="100"/>
            </div>
          ))}
        </div>
      )
    } else if (filteredCountries.length < 10) {
      return (
        <div>
          {filteredCountries.map((country) => (
            <div key={country.name}>{country.name}</div>
          ))}
        </div>
      )} else {
        return <div> Too many... plz be more specific </div>
    }
  } else return null 
}

const App = () => {
  const [countries, setCountries] = useState([])
  // const [weather, setWeather] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    console.log("effect")
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled")
      setCountries(response.data)
      // console.log(response.data)
    })
  }, [])

  // console.log(countries.length)

  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
  }

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(search.toLowerCase())
  })
  console.log(filteredCountries)

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearch} />
      </div>
      <br></br>
      <Searched filteredCountries={filteredCountries} search={search}/>
    </div>
  )
}

export default App
