import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchChange }) => {
  return(
    <div className="form-inline mb-2">
      <i class="fas fa-search"></i> &nbsp;
      <input 
        type="search" 
        className="form-control form-control-sm search-box" 
        onChange={searchChange} 
        placeholder="Search Country..." />
    </div>
    
  )
}

export default SearchBox;