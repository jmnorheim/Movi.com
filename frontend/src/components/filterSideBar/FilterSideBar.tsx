import React, { FC, useState } from "react";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import "./FilterSideBar.css";

interface FilterSideBarProps {
  open: boolean;
}

const FilterSideBar: FC<FilterSideBarProps> = ({ open }) => {
  const [yearRange, setYearRange] = useState<number[]>([1990, 2020]);
  const [runtimeRange, setRuntimeRange] = useState<number[]>([90, 120]);
  const [ratingRange, setRatingRange] = useState<number[]>([5, 10]);
  const [isAdult, setIsAdult] = useState(false);

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
  };

  const handleRuntimeChange = (event: Event, newValue: number | number[]) => {
    setRuntimeRange(newValue as number[]);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setRatingRange(newValue as number[]);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdult(event.target.checked);
  };

  const sidebarStyle = {
    height: "100vh",
    width: open ? "250px" : "0",
    position: "fixed" as "fixed",
    zIndex: 10,
    top: 0,
    left: 0,
    backgroundColor: "#FFF",
    overflowX: "hidden" as "hidden",
    transition: "0.5s",
    padding: open ? "10px 20px" : "10px 0",
    flexDirection: "column" as "column",
    display: "flex",
  };

  return (
    <div style={sidebarStyle}>
      <h2>Filter movies:</h2>
      <div>
        <p>Release year</p>
        <Slider
          value={yearRange}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={1980}
          max={new Date().getFullYear()}
        />
      </div>
      <div>
        <p>Runtime (minutes)</p>
        <Slider
          value={runtimeRange}
          onChange={handleRuntimeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={30}
          max={300}
        />
      </div>
      <div>
        <p>Average rating</p>
        <Slider
          value={ratingRange}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={10}
        />
      </div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdult}
              onChange={handleCheckboxChange}
              name="adultCheckbox"
            />
          }
          label="Age-limit 18+"
        />
      </FormGroup>
    </div>
  );
};

export default FilterSideBar;
