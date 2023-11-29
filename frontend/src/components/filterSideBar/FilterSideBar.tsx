/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterSignals, page } from "../../pages/HomePage/HomePage";
import { FilterState } from "../../interfaces";
import debounce from "lodash/debounce";
import { useMovieStats } from "../../services/getMovies";
import "./FilterSideBar.css";

interface FilterSideBarProps {
  open: boolean;
  genres: string[] | [];
}

/**
 * FilterSideBar Component
 *
 * This component renders a sidebar for filtering movies based on various criteria such as release year, runtime, rating, total votes, age limit, and genres.
 * It provides a user interface with sliders and checkboxes to set the filter parameters. The component fetches initial filter settings from the `HomePage` state or session storage.
 * Changes in filter settings are debounced to optimize performance and reduce unnecessary re-rendering or data fetching.
 *
 * Props:
 * @param {boolean} open - Determines if the sidebar is open or closed.
 * @param {string[] | []} genres - An array of genres to include in the filter options.
 *
 * Features:
 * - Sliders for adjusting ranges of year, runtime, rating, and total votes.
 * - Checkbox for filtering adult content.
 * - Checkboxes for selecting genres.
 * - Debounced input handling for efficient state updates.
 * - Uses `useMovieStats` hook to fetch initial min and max values for sliders.
 * - Uses `filterSignals` and `page` from `HomePage` for global state management and pagination control.
 */
const FilterSideBar: FC<FilterSideBarProps> = ({ open, genres }) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [isInitialSetupComplete, setIsInitialSetupComplete] = useState(false);
  const [filterStates, setFilterStates] = useState<FilterState>();
  const { data: statsData, isLoading: isLoadingStats } = useMovieStats(); // Get min and max values for each slider

  useEffect(() => {
    if (isInitialSetupComplete) {
      updateSessionStorage();
    }
  }, [filterStates]);

  const [minAndMaxValuesSliders, setMinAndMaxValuesSliders] = useState({
    yearRange: [0, 0],
    runtimeRange: [0, 0],
    ratingRange: [0, 0],
    totalVotesRange: [0, 0],
  });

  // Fill filterStates with necessary data fetched either from the filterSignals in HomePage or from sessionStorage.
  // Fill min- and max-values for each slider with values fetched from backend
  useEffect(() => {
    getInitialState();
  }, [statsData, isLoadingStats]);

  const getInitialState = () => {
    let initialFilterStates;
    const savedFilterStates = sessionStorage.getItem("filterStates");
    if (savedFilterStates) {
      const parsedStates = JSON.parse(savedFilterStates) as FilterState;
      initialFilterStates = {
        ...parsedStates,
        isAdult: parsedStates.isAdult,
        selectedGenres: new Set<string>(parsedStates.selectedGenres),
      };
    } else if (statsData && !isLoadingStats) {
      initialFilterStates = {
        yearRange: [
          statsData.releaseYearRange.min,
          statsData.releaseYearRange.max,
        ],
        runtimeRange: [
          statsData.runtimeMinutesRange.min,
          statsData.runtimeMinutesRange.max,
        ],
        ratingRange: [
          statsData.averageRatingRange.min,
          statsData.averageRatingRange.max,
        ],
        totalVotesRange: [
          statsData.totalVotesRange.min,
          statsData.totalVotesRange.max,
        ],
        selectedGenres: new Set<string>(),
      };
    }

    if (initialFilterStates && statsData && !isLoadingStats) {
      if (initialFilterStates.runtimeRange[1] === 301) {
        initialFilterStates.runtimeRange[1] = statsData.runtimeMinutesRange.max;
      }
      if (initialFilterStates.totalVotesRange[1] === 10001) {
        initialFilterStates.totalVotesRange[1] = statsData.totalVotesRange.max;
      }
    }

    setFilterStates(initialFilterStates as FilterState);

    if (initialFilterStates) {
      page.value = 0;
      filterSignals.value = {
        releaseYearRange: {
          min: initialFilterStates.yearRange[0],
          max: initialFilterStates.yearRange[1],
        },
        runtimeMinutesRange: {
          min: initialFilterStates.runtimeRange[0],
          max: initialFilterStates.runtimeRange[1],
        },
        averageRatingRange: {
          min: initialFilterStates.ratingRange[0],
          max: initialFilterStates.ratingRange[1],
        },
        totalVotesRange: {
          min: initialFilterStates.totalVotesRange[0],
          max: initialFilterStates.totalVotesRange[1],
        },
        isAdult: initialFilterStates.isAdult ?? false,
        genres: Array.from(initialFilterStates.selectedGenres),
      };
    }

    if (statsData && !isLoadingStats) {
      setMinAndMaxValuesSliders({
        yearRange: [
          statsData.releaseYearRange.min,
          statsData.releaseYearRange.max,
        ],
        runtimeRange: [
          statsData.runtimeMinutesRange.min,
          statsData.runtimeMinutesRange.max,
        ],
        ratingRange: [
          statsData.averageRatingRange.min,
          statsData.averageRatingRange.max,
        ],
        totalVotesRange: [
          statsData.totalVotesRange.min,
          statsData.totalVotesRange.max,
        ],
      });
    }
    setIsInitialSetupComplete(true);
  };

  // Only show content if the sidebar is fully open
  const onSidebarTransitionEnd = () => {
    setContentVisible(open);
  };

  // Hide content when sidebar starts closing
  useEffect(() => {
    if (!open) {
      setContentVisible(false);
    }
  }, [open]);

  const updateSessionStorage = () => {
    const statesToSave = {
      ...filterStates,
      selectedGenres: Array.from(filterStates?.selectedGenres ?? []),
    };
    sessionStorage.setItem("filterStates", JSON.stringify(statesToSave));
  };

  const commitYearChange = (event: Event, newValue: number[]) => {
    setFilterStates((prevState) => ({
      ...(prevState as FilterState),
      yearRange: newValue,
    }));
    updateSessionStorage();
  };

  const handleYearChange = useCallback(
    debounce((newValue: number[]) => {
      page.value = 0;
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

  const runtimeLabelFormat = (value: number) => {
    return value > 300 ? "300+" : value;
  };

  const commitRuntimeChange = (event: Event, newValue: number[]) => {
    const newValues = newValue;
    if (newValues[1] === 301) {
      newValues[1] = statsData?.runtimeMinutesRange.max ?? 300;
    }
    setFilterStates((prevState) => ({
      ...(prevState as FilterState),
      runtimeRange: newValues,
    }));
    updateSessionStorage();
  };

  const handleRuntimeChange = useCallback(
    debounce((newValue: number[]) => {
      page.value = 0;
      filterSignals.value = {
        ...filterSignals.value,
        runtimeMinutesRange: {
          min: newValue[0],
          max:
            newValue[1] === 301 && statsData?.runtimeMinutesRange.max
              ? statsData?.runtimeMinutesRange.max
              : newValue[1],
        },
      };
    }, 500),
    [statsData]
  );

  const commitRatingChange = (event: Event, newValue: number[]) => {
    setFilterStates((prevState) => ({
      ...(prevState as FilterState),
      ratingRange: newValue,
    }));
    updateSessionStorage();
  };

  const handleRatingChange = useCallback(
    debounce((newValue: number[]) => {
      page.value = 0;
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

  const totalVotesLabelFormat = (value: number) => {
    return value > 10000 ? "10000+" : value;
  };

  const commitTotalVotesChange = (event: Event, newValue: number[]) => {
    const newValues = newValue;
    if (newValues[1] === 10001) {
      newValues[1] = statsData?.totalVotesRange.max ?? 10000;
    }
    setFilterStates((prevState) => ({
      ...(prevState as FilterState),
      totalVotesRange: newValues,
    }));
    updateSessionStorage();
  };

  const handleTotalVotesChange = useCallback(
    debounce((newValue: number[]) => {
      page.value = 0;
      filterSignals.value = {
        ...filterSignals.value,
        totalVotesRange: {
          min: newValue[0],
          max:
            newValue[1] === 10001 && statsData?.totalVotesRange.max
              ? statsData?.totalVotesRange.max
              : newValue[1],
        },
      };
    }, 500),
    [statsData]
  );

  const commitIsAdultChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: boolean
  ) => {
    setFilterStates((prevState) => ({
      ...(prevState as FilterState),
      isAdult: newValue,
    }));
    updateSessionStorage();
  };

  const handleIsAdultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    page.value = 0;
    filterSignals.value = {
      ...filterSignals.value,
      isAdult: event.target.checked,
    };
  };

  const handleGenreChange = (genre: string) => {
    setFilterStates((prevState) => {
      if (!prevState) {
        return;
      }
      const newSelectedGenres = new Set(prevState?.selectedGenres);
      if (newSelectedGenres.has(genre)) {
        newSelectedGenres.delete(genre);
      } else {
        newSelectedGenres.add(genre);
      }
      // Update filterSignals immediately with the new set of genres
      page.value = 0;
      filterSignals.value = {
        ...filterSignals.value,
        genres: Array.from(newSelectedGenres),
      };
      return {
        ...prevState,
        selectedGenres: newSelectedGenres,
      };
    });
  };

  return (
    <div
      className={`sidebar ${open ? "" : "sidebar-closed"}`}
      onTransitionEnd={onSidebarTransitionEnd}
    >
      {contentVisible && (
        <>
          <div className="title-text">Filter movies</div>
          <div>
            <p>Release year</p>
            <Slider
              value={[
                filterStates?.yearRange[0] ??
                  minAndMaxValuesSliders.yearRange[0],
                filterStates?.yearRange[1] ??
                  minAndMaxValuesSliders.yearRange[1],
              ]}
              onChange={(event, value) =>
                commitYearChange(event, value as number[])
              }
              onChangeCommitted={(event, value) =>
                handleYearChange(value as number[])
              }
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={minAndMaxValuesSliders.yearRange[0]}
              max={minAndMaxValuesSliders.yearRange[1]}
            />
          </div>
          <div>
            <p>Runtime (minutes)</p>
            <Slider
              value={[
                filterStates?.runtimeRange[0] ??
                  minAndMaxValuesSliders.runtimeRange[0],
                filterStates?.runtimeRange[1] ??
                  minAndMaxValuesSliders.runtimeRange[1],
              ]}
              onChange={(event, value) =>
                commitRuntimeChange(event, value as number[])
              }
              onChangeCommitted={(event, value) =>
                handleRuntimeChange(value as number[])
              }
              valueLabelDisplay="auto"
              valueLabelFormat={runtimeLabelFormat}
              aria-labelledby="range-slider"
              min={minAndMaxValuesSliders.runtimeRange[0]}
              max={301}
            />
          </div>
          <div>
            <p>Average rating</p>
            <Slider
              value={[
                filterStates?.ratingRange[0] ??
                  minAndMaxValuesSliders.ratingRange[0],
                filterStates?.ratingRange[1] ??
                  minAndMaxValuesSliders.ratingRange[1],
              ]}
              onChange={(event, value) =>
                commitRatingChange(event, value as number[])
              }
              onChangeCommitted={(event, value) =>
                handleRatingChange(value as number[])
              }
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={minAndMaxValuesSliders.ratingRange[0]}
              max={minAndMaxValuesSliders.ratingRange[1]}
            />
          </div>
          <div>
            <p>Total Votes</p>
            <Slider
              value={[
                filterStates?.totalVotesRange[0] ??
                  minAndMaxValuesSliders.totalVotesRange[0],
                filterStates?.totalVotesRange[1] ??
                  minAndMaxValuesSliders.totalVotesRange[1],
              ]}
              onChange={(event, value) =>
                commitTotalVotesChange(event, value as number[])
              }
              onChangeCommitted={(event, value) =>
                handleTotalVotesChange(value as number[])
              }
              valueLabelDisplay="auto"
              valueLabelFormat={totalVotesLabelFormat}
              aria-labelledby="range-slider"
              min={minAndMaxValuesSliders.totalVotesRange[0]}
              max={10001}
            />
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterStates?.isAdult ?? false}
                  onChange={(event, value) => {
                    commitIsAdultChange(event, value);
                    handleIsAdultChange(event);
                  }}
                  name="adultCheckbox"
                />
              }
              label="Age-limit 18+"
            />
          </FormGroup>
          <h3>Filter by genres</h3>
          <FormGroup>
            {genres.map((genre) => (
              <FormControlLabel
                key={genre}
                control={
                  <Checkbox
                    checked={filterStates?.selectedGenres?.has(genre) ?? false}
                    onChange={() => {
                      handleGenreChange(genre);
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
