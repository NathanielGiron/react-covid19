import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ searchChange }) => {
  return(
    <div className="form-inline mb-2">
      <div className="form-group row">
        <div className="col-md-1 col-xs-4">
          <FaSearch />
        </div>
        <div className="col-md-3 col-xs-8">
          <input 
            type="search" 
            className="form-control form-control-sm" 
            onChange={searchChange} 
            placeholder="Search Country..." />
        </div>
      </div>
    </div>
  )
}

export default SearchBox;