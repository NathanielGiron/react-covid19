import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchChange, placeholder }) => {
  return(
    <div className="form-inline mb-2">
      <i className="fas fa-search text-light"></i> &nbsp;
      <input 
        type="search" 
        className="form-control form-control-sm search-box" 
        onChange={searchChange} 
        placeholder={placeholder} />
    </div>
    
  )
}

export default SearchBox;