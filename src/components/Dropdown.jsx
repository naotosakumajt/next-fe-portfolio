import React from 'react';

const Dropdown = ({ options, onSelect }) => {
  const handleChange = (e) => {
    const selectedOption = e.target.value;
    onSelect(selectedOption);
  };

  return (
    <select onChange={handleChange}>
      <option value="">選択してください</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
