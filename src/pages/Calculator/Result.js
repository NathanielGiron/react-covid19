import React from 'react';

const Result = ({ message }) => (
  <div className="alert alert-primary alert-dismissible fade show" role="alert">
    {message}
    
  </div>
);

export default Result;