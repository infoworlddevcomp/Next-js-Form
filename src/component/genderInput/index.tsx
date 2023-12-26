import React from 'react';

const GenderInput = (props:any) => {
    
  return (
    <div className="flex items-center space-x-4">
      <label className="flex items-center justify-center">
        <input
          type="radio"
          value="Male"
          checked={props.value === 'Male'}
          onChange={() => props.onChange('Male')}
          className="form-radio h-5 w-5 text-blue-600 mr-2"
        />
        <span className="ml-2 text-gray-700">Male</span>
      </label>
      <label className="flex items-center justify-center">
        <input
          type="radio"
          value="Female"
          checked={props.value === 'Female'}
          onChange={() => props.onChange('Female')}
          className="form-radio h-5 w-5 text-pink-500 ml-3 mr-2"
        />
        <span className="ml-2 text-gray-700">Female</span>
      </label>
    </div>
  );
};

export default GenderInput;
