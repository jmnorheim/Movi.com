/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterSignals, page } from "../../pages/HomePage/HomePage";
import { FilterState, MovieContent, MovieStats } from "../../interfaces";
import debounce from "lodash/debounce";
import { useMovieStats } from "../../services/getMovies";

interface FilterSideBarProps {
  open: boolean;
  movies: MovieContent[] | [];
}

const FilterSideBar: FC<FilterSideBarProps> = ({ open, movies }) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [isInitialSetupComplete, setIsInitialSetupComplete] = useState(false);
  const [filterStates, setFilterStates] = useState<FilterState>();
  // Get min and max values for each slider
  const { data: statsData, isLoading: isLoadingStats } = useMovieStats();

  useEffect(() => {
    console.log("isInitialSetupComplete", isInitialSetupComplete);
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

  useEffect(() => {
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
      console.log("statsData", statsData);
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
  }, [statsData, isLoadingStats]);

  const onSidebarTransitionEnd = () => {
    // Only show content if the sidebar is fully open
    setContentVisible(open);
  };

  const updateSessionStorage = () => {
    const statesToSave = {
      ...filterStates,
      selectedGenres: Array.from(filterStates?.selectedGenres ?? []),
    };
    sessionStorage.setItem("filterStates", JSON.stringify(statesToSave));
  };

  const uniqueGenres = Array.from(
    new Set(movies.flatMap((movie: MovieContent) => movie.genres))
  );

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

  const commitRuntimeChange = (event: Event, newValue: number[]) => {
    setFilterStates((prevState) => ({
      ...(prevState as FilterState),
      runtimeRange: newValue,
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
          max: newValue[1],
        },
      };
    }, 500),
    []
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

  const commitTotalVotesChange = (event: Event, newValue: number[]) => {
    setFilterStates((prevState) => ({
      ...(prevState as FilterState),
      totalVotesRange: newValue,
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
          max: newValue[1],
        },
      };
    }, 500),
    []
  );

  const commitIsAdultChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: boolean
  ) => {
    console.log("newValue", newValue);
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
              aria-labelledby="range-slider"
              min={minAndMaxValuesSliders.runtimeRange[0]}
              max={minAndMaxValuesSliders.runtimeRange[1]}
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
              aria-labelledby="range-slider"
              min={minAndMaxValuesSliders.totalVotesRange[0]}
              max={minAndMaxValuesSliders.totalVotesRange[1]}
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
            {/* =========================================================================================== */}
          </FormGroup>
          <h3>Filter by genres</h3>
          <FormGroup>
            {uniqueGenres.map((genre) => (
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
          {/* =========================================================================================== */}
        </>
      )}
    </div>
  );
};

export default FilterSideBar;
