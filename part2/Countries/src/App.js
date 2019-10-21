import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterVal, setFilterVal] = useState('')
  const [address] = useState('https://restcountries.eu/rest/v2/all')
  
    const filteredCountries = filterVal
    ? countries.filter(
          country =>
            country.name.toLowerCase().indexOf(filterVal.toLowerCase()) !==
            -1
        )
      : countries;
    
    const changeCountriesFilter = (filter) => {
        setFilterVal(filter);
      };

   const handleFilterValChange = (event) => {
      setFilterVal(event.target.value)
  }
  
  useEffect(() => {
    console.log('effect')
    axios
      .get(address)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <h1>Countries</h1>
      <Filter
        value={filterVal}
        onChange={handleFilterValChange}
      />
      <Country
        countries={filteredCountries}
        changeFilter={changeCountriesFilter}
      />
    </div>
  )
}


export default App 