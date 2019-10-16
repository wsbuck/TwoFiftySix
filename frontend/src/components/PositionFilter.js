import React from "react";
import { Checkbox, Label } from "@blueprintjs/core";

export default function PositionFilter(props) {
  const { positions, setPositions } = props;


  function handleChange(pos) {
    if (positions.includes(pos)) {
      const tempPositions = positions.filter(ele => {
        return ele !== pos
      });
      setPositions(tempPositions);
    } else {
      setPositions([...positions, pos]);
    }
  }

  return (
    <div className="position-filter-container">
      <Label>Position</Label>
      <Checkbox
        label="QB"
        inline
        checked={positions.includes('QB')}
        onChange={() => handleChange('QB')}
      />
      <Checkbox
        label="RB" 
        inline
        checked={positions.includes('RB')}
        onChange={() => handleChange('RB')}
      />
      <Checkbox
        label="WR"
        inline
        checked={positions.includes('WR')}
        onChange={() => handleChange('WR')}
      />
      <Checkbox
        label="TE"
        inline
        checked={positions.includes('TE')}
        onChange={() => handleChange('TE')}
      />
    </div>
  );
}