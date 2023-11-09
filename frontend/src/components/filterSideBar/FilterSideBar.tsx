/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from "react";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterSignals } from "../../pages/HomePage/HomePage";
import { Movie } from "../../interfaces";

interface FilterSideBarProps {
  open: boolean;
  movies: Movie[] | [];
}

const FilterSideBar: FC<FilterSideBarProps> = ({ open, movies }) => {
  const [contentVisible, setContentVisible] = useState(false);

  const onSidebarTransitionEnd = () => {
    // Only show content if the sidebar is open
    setContentVisible(open);
  };

  const uniqueGenres = Array.from(
    new Set(movies.flatMap((movie: Movie) => movie.genres))
  );

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    filterSignals.value = {
      ...filterSignals.value,
      releaseYearRange: {
        min: newValue[0],
        max: newValue[1],
      },
    };
  };

  const handleRuntimeChange = (event: Event, newValue: number | number[]) => {
    filterSignals.value = {
      ...filterSignals.value,
      runtimeMinutesRange: {
        min: newValue[0],
        max: newValue[1],
      },
    };
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    filterSignals.value = {
      ...filterSignals.value,
      averageRatingRange: {
        min: newValue[0],
        max: newValue[1],
      },
    };
  };

  const handleTotalVotesChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    filterSignals.value = {
      ...filterSignals.value,
      totalVotesRange: {
        min: newValue[0],
        max: newValue[1],
      },
    };
  };

  const handleIsAdultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterSignals.value = {
      ...filterSignals.value,
      isAdult: event.target.checked,
    };
  };

  const handleGenreChange = (genre: string) => {
    const genresSet = new Set(filterSignals.value.genres);

    // Update the genres signal based on whether the genre is already selected or not
    if (genresSet.has(genre)) {
      genresSet.delete(genre); // Remove genre from the set if it's already there
    } else {
      genresSet.add(genre); // Add genre to the set if it's not
    }

    // Update the filterSignals with the new set of genres
    filterSignals.value = {
      ...filterSignals.value,
      genres: Array.from(genresSet),
    };
  };

  const sidebarStyle = {
    height: "100vh",
    width: open ? "250px" : "0",
    position: "fixed" as const,
    zIndex: 1001,
    top: 0,
    left: 0,
    backgroundColor: "#FFF",
    overflowX: "hidden" as const,
    transition: "0.4s",
    padding: open ? "10px 20px" : "10px 0",
    flexDirection: "column" as const,
    display: "flex",
    boxShadow: open ? "4px 0px 10px rgba(0, 0, 0, 0.7)" : "none",
  };

  return (
    <div style={sidebarStyle} onTransitionEnd={onSidebarTransitionEnd}>
      {contentVisible && (
        <>
          <h2>Filter movies:</h2>
          <div>
            <p>Release year</p>
            <Slider
              value={[
                filterSignals.value.releaseYearRange.min,
                filterSignals.value.releaseYearRange.max,
              ]}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1900}
              max={2023}
            />
          </div>
          <div>
            <p>Runtime (minutes)</p>
            <Slider
              value={[
                filterSignals.value.runtimeMinutesRange.min,
                filterSignals.value.runtimeMinutesRange.max,
              ]}
              onChange={handleRuntimeChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={300}
            />
          </div>
          <div>
            <p>Average rating</p>
            <Slider
              value={[
                filterSignals.value.averageRatingRange.min,
                filterSignals.value.averageRatingRange.max,
              ]}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10}
            />
          </div>
          <div>
            <p>Total Votes</p>
            <Slider
              value={[
                filterSignals.value.totalVotesRange.min,
                filterSignals.value.totalVotesRange.max,
              ]}
              onChange={handleTotalVotesChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={1000000}
            />
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterSignals.value.isAdult}
                  onChange={handleIsAdultChange}
                  name="adultCheckbox"
                />
              }
              label="Age-limit 18+"
            />
          </FormGroup>
          <h3>Filter by genres</h3>
          <FormGroup>
            {uniqueGenres.map((genre) => (
              <FormControlLabel
                key={genre}
                control={
                  <Checkbox
                    checked={filterSignals.value.genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    name={genre}
                  />
                }
                label={genre}
              />
            ))}
          </FormGroup>
        </>
      )}
    </div>
  );
};

export default FilterSideBar;
