import React from 'react'

import '../Navigation/Navigation.css'

const SearchBar = () => {

  return (
    <div>
    <form onClick={(e) => e.preventDefault()}>
    <input type="text" 
     name="text"
     placeholder='Search products & brands'
     className='search-bar'
    />
    </form>
    </div>
  )
}

export default SearchBar
