import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchChange, type }) => {
  return(
    <div className="form-inline mb-2">
      <i className="fas fa-search"></i> &nbsp;
      <input 
        type="search" 
        className="form-control form-control-sm search-box" 
        onChange={searchChange} 
        placeholder={type} />
    </div>
    
  )
}

export default SearchBox;