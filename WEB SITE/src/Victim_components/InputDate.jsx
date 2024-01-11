import React, { useEffect, useState } from 'react';

const InputDate = (prop) => {
  const [selectedDate, setSelectedDate] = useState('');
  // Function to check if the selected date is from the past
  const isDateValid = (date) => {
    const currentDate = new Date();
    return new Date(date) < currentDate;
  };

  // Event handler for date and time input
  const handleDateTimeChange = (event) => {
    const inputValue = event.target.value;
    if (isDateValid(inputValue)) {
      setSelectedDate(inputValue);
      if(prop.prev){
          prop.change({...prop.prev,date:inputValue})
      }else{

        prop.change(inputValue)
      }
    } else {
      // Handle invalid date (date from the past)
      alert('Please enter a date and time from the past.');
    }
  };

  // Event handler for confirmation button click
  const handleConfirmation = () => {
    if (selectedDate) {
      // Perform any action with the selected date here
      console.log('Selected Date and Time:', selectedDate);
    } else {
      // Handle case where no date is selected
      alert('Please select a date and time.');
    }
  };
  
  return (
    <>
      <div className='dropdownLabel'>Select Date and Time :- </div>
      <input
        type="datetime-local"
        
        value={selectedDate}
        onChange={handleDateTimeChange}
        />
      <button id='handleConfirmation' onClick={handleConfirmation}>Confirm</button>
    </>
  );
};

export default InputDate;
