/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useCallback, useState } from "react";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterSignals } from "../../pages/HomePage/HomePage";
import { Movie } from "../../interfaces";
import debounce from "lodash/debounce";

interface FilterSideBarProps {
  open: boolean;
  movies: Movie[] | [];
}

const FilterSideBar: FC<FilterSideBarProps> = ({ open, movies }) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [filterStates, setFilterStates] = useState({
    yearRange: [
      filterSignals.value.releaseYearRange.min,
      filterSignals.value.releaseYearRange.max,
    ],
    runtimeRange: [
      filterSignals.value.runtimeMinutesRange.min,
      filterSignals.value.runtimeMinutesRange.max,
    ],
    ratingRange: [
      filterSignals.value.averageRatingRange.min,
      filterSignals.value.averageRatingRange.max,
    ],
    totalVotesRange: [
      filterSignals.value.totalVotesRange.min,
      filterSignals.value.totalVotesRange.max,
    ],
    selectedGenres: new Set<string>(),
  });

  const onSidebarTransitionEnd = () => {
    // Only show content if the sidebar is open
    setContentVisible(open);
  };

  const uniqueGenres = Array.from(
    new Set(movies.flatMap((movie: Movie) => movie.genres))
  );

  const commitYearChange = (event: Event, newValue: number[]) => {
    setFilterStates((prevState) => ({
      ...prevState,
      yearRange: newValue,
    }));
  };

  const handleYearChange = useCallback(
    debounce((newValue: number[]) => {
      filterSignals.value = {
        ...filterSignals.value,
        releaseYearRange: {
          min: newValue[0],
          max: newValue[1],
        },
      };
    }, 500),
    []
  );

  const commitRuntimeChange = (event: Event, newValue: number[]) => {
    setFilterStates((prevState) => ({
      ...prevState,
      runtimeRange: newValue,
    }));
  };

  const handleRuntimeChange = useCallback(
    debounce((newValue: number[]) => {
      filterSignals.value = {
        ...filterSignals.value,
        runtimeMinutesRange: {
          min: newValue[0],
          max: newValue[1],
        },
      };
    }, 500),
    []
  );

  const commitRatingChange = (event: Event, newValue: number[]) => {
    setFilterStates((prevState) => ({
      ...prevState,
      ratingRange: newValue,
    }));
  };

  const handleRatingChange = useCallback(
    debounce((newValue: number[]) => {
      filterSignals.value = {
        ...filterSignals.value,
        averageRatingRange: {
          min: newValue[0],
          max: newValue[1],
        },
      };
    }, 500),
    []
  );

  const commitTotalVotesChange = (event: Event, newValue: number[]) => {
    setFilterStates((prevState) => ({
      ...prevState,
      totalVotesRange: newValue,
    }));
  };

  const handleTotalVotesChange = useCallback(
    debounce((newValue: number[]) => {
      filterSignals.value = {
        ...filterSignals.value,
        totalVotesRange: {
          min: newValue[0],
          max: newValue[1],
        },
      };
    }, 500),
    []
  );

  const handleIsAdultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterSignals.value = {
      ...filterSignals.value,
      isAdult: event.target.checked,
    };
  };

  const commitGenreChange = (genre: string) => {
    setFilterStates((prevState) => {
      const newSelectedGenres = new Set(prevState.selectedGenres);
      if (newSelectedGenres.has(genre)) {
        newSelectedGenres.delete(genre);
      } else {
        newSelectedGenres.add(genre);
      }
      return {
        ...prevState,
        selectedGenres: newSelectedGenres,
      };
    });
  };

  const handleGenreChange = useCallback(
    debounce(() => {
      filterSignals.value = {
        ...filterSignals.value,
        genres: Array.from(filterStates.selectedGenres),
      };
    }, 1000),
    [filterStates.selectedGenres]
  );

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
              value={[filterStates.yearRange[0], filterStates.yearRange[1]]}
              onChange={(event, value) =>
                commitYearChange(event, value as number[])
              }
              onChangeCommitted={(event, value) =>
                handleYearChange(value as number[])
              }
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
                filterStates.runtimeRange[0],
                filterStates.runtimeRange[1],
              ]}
              onChange={(event, value) =>
                commitRuntimeChange(event, value as number[])
              }
              onChangeCommitted={(event, value) =>
                handleRuntimeChange(value as number[])
              }
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={300}
            />
          </div>
          <div>
            <p>Average rating</p>
            <Slider
              value={[filterStates.ratingRange[0], filterStates.ratingRange[1]]}
              onChange={(event, value) =>
                commitRatingChange(event, value as number[])
              }
              onChangeCommitted={(event, value) =>
                handleRatingChange(value as number[])
              }
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
                filterStates.totalVotesRange[0],
                filterStates.totalVotesRange[1],
              ]}
              onChange={(event, value) =>
                commitTotalVotesChange(event, value as number[])
              }
              onChangeCommitted={(event, value) =>
                handleTotalVotesChange(value as number[])
              }
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={2900000}
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
                    checked={filterStates.selectedGenres.has(genre)}
                    onChange={() => {
                      commitGenreChange(genre);
                      handleGenreChange();
                    }}
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
