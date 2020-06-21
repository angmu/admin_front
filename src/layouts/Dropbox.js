import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const Dropbox = ({ text, options, selectedOption, onChange }) => {
  return (
    <>
      <span style={{ fontSize: '0.75em' }}>{text}</span>
      <Select
        value={selectedOption}
        onChange={onChange}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
      />
    </>
  );
};

export default Dropbox;
