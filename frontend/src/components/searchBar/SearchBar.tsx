/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { FormControl, TextField, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

import debounce from "lodash/debounce";
import { currentSearch, page } from "../../pages/HomePage/HomePage.tsx";

/**
 * TypeSearch Component
 *
 * This component provides a search bar for users to type in and search for movies.
 * It features a debounced search functionality, which means the search query is only executed after the user stops typing for a specified duration.
 * The component also includes a clear button to empty the search field.
 *
 * Features:
 * - A text field allowing users to input their search query.
 * - Debounced search functionality to optimize performance and reduce unnecessary queries.
 * - The search query is stored in session storage for persistence and managed using `currentSearch` and `page` signals from `HomePage`.
 * - 'Clear' button to reset the search field and the stored search query.
 * - The component handles 'Enter' key events to immediately process the search query.
 */
const TypeSearch = () => {
  const [searchValue, setSearchValue] = useState(
    currentSearch.value ? currentSearch.value : ""
  );

  // Create the debounced function using useCallback
  const debouncedOnSearch = useCallback(
    debounce((searchString: string) => {
      page.value = 0;
      currentSearch.value = searchString;
      sessionStorage.setItem("search", searchString);
    }, 800),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    debouncedOnSearch(value); // This will trigger the debouncedOnSearch callback after 800ms
    setSearchValue(value);
    if (value === "") {
      page.value = 0;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      page.value = 0;
      currentSearch.value = searchValue;
      sessionStorage.setItem("search", searchValue);
    }
  };

  const handleClick = (): void => {
    setSearchValue("");
    currentSearch.value = "";
    sessionStorage.setItem("search", "");
    page.value = 0;
  };

  return (
    <div className="SearchbarContainer">
      <FormControl fullWidth>
        <TextField
          value={searchValue}
          variant="outlined"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for any movie..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderWidth: "4px",
              borderRadius: "30px",
              "&.Mui-focused fieldset": {
                borderWidth: "4px",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" onClick={handleClick}>
                <ClearIcon
                  style={{
                    cursor: "pointer",
                    opacity: searchValue ? 1 : 0,
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </div>
  );
};

export default TypeSearch;
