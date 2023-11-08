import React, { FunctionComponent, useCallback, useState } from "react";
import { FormControl, TextField, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

import debounce from "lodash/debounce";
import { currentSearch } from "../../pages/HomePage/HomePage.tsx";

const TypeSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnSearch = debounce((searchString: string) => {
    currentSearch.value = searchString; // Set the signal with the debounced value
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    debouncedOnSearch(value); // This will trigger the debouncedOnSearch callback after 500ms
    setSearchValue(value);
  };

  const handleClick = (): void => {
    setSearchValue("");
    currentSearch.value = "";
  };

  return (
    <div className="SearchbarContainer">
      <FormControl fullWidth>
        <TextField
          value={searchValue}
          variant="outlined"
          onChange={handleChange}
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
