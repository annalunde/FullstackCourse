import React from "react";

const Filter = ({ value, onChange }) => {
    return (
      <div>
        Find Countries
        <input
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }
  export default Filter