import React, { useRef } from "react";

const SelectAllInput = () => {
  const inputRef = useRef(null);

  const handleInputClick = () => {
    // Using the ref to reference the input element and selecting all text
    inputRef.current.select();
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef} // Set the ref to the input element
        onClick={handleInputClick} // Handle the click event
        value="ALlTEt"
        placeholder="Click to select all text"
      />
    </div>
  );
};

export default SelectAllInput;
