// 2.13
// cant figure this shit out 
// how to use a button inside a list ??

import React, { useState, useEffect } from "react"
import axios from "axios"

const View = ({ filteredCountries, handleView, country }) => {
  if(country[0]) {
    return (
      <div>
      <div> {country.name} </div>
      <div> inside county array </div>
      </div>
    )
  }
  console.log(country)
  if (filteredCountries.length > 10) {
    return <div>Too many... plz be more specific </div>
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name}>
            {country.name}
            <button onClick={() => handleView(country)}> show </button>
            {/* <button> show </button> */}
          </div>
        ))}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  const [country, setCountry] = useState([])

  useEffect(() => {
    console.log("effect")
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled")
      setCountries(response.data)
      // console.log(response.data)
      setSearch("ha")
    })
  }, [])
  // console.log(countries.length)

  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
  }
  const handleView = (country) => {
    console.log(country.name)
    setCountry(country)
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
      <View filteredCountries={filteredCountries} handleView={handleView} country={country}/>
    </div>
  )
}

export default App

// if (filteredCountries.length === 1) {
//   return (
//     <div>
//       {/* {console.log("hello", {weather})} */}
//       {filteredCountries.map((country) => (
//         <div key={country.name}>
//           <h1>{country.name}</h1>
//           <div>capital {country.capital}</div>
//           <div>population {country.population}</div>
//           <h1>languages</h1>
//           <ul>
//             {country.languages.map((lang) => (
//               <li key={lang.name}>{lang.name}</li>
//             ))}
//           </ul>
//           <img src={country.flag} alt="flag img" width="100" />
//         </div>
//       ))}
//     </div>
//   )
// } else
