/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { MovieContent } from "../../interfaces";

import MovieContainerGrid from "../../components/movieContainerGrid/MovieContainerGrid";
import "./HomePage.css";
import { useAuth } from "../../services/auth/AuthContext";

import SortMenu from "../../components/sortMenu/SortMenu";
import HomePageHeader from "../../components/homePageHeader/HomePageHeader";
import PageFooter from "../../components/pageFooter/PageFooter";
import { MovieFilter, SortType } from "../../generated/graphql";
import NewsLetterBox from "../../components/newsletterBox/NewsLetterBox";

import { effect, signal } from "@preact/signals-react";
import { navbarColor } from "../../App";
import { handlePreFetch, useMovies } from "../../services/getMovies";
import { TablePagination } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

interface FilterSettings {
  releaseYearRange: { max: number; min: number };
  runtimeMinutesRange: { max: number; min: number };
  averageRatingRange: { max: number; min: number };
  totalVotesRange: { max: number; min: number };
  genres: string[];
  isAdult: boolean;
}

//Signals that contain the selected filters from the FilterSideBar-component
export const filterSignals = signal<FilterSettings>({
  releaseYearRange: { max: 2023, min: 1900 },
  runtimeMinutesRange: { max: 300, min: 1 },
  averageRatingRange: { max: 10, min: 0 },
  totalVotesRange: { max: 2900000, min: 0 },
  genres: [],
  isAdult: false,
});

export const currentSearch = signal<string>(
  sessionStorage.getItem("search") || ""
);

//Signals that contain the current page number and the number of rows per page - stored externally from the page component
//Initialvalue of page is either the value stored in sessionStorage or 0
export const page = signal<number>(0);
const rowsPerPage = signal<number>(10);

/**
 * Render the HomePage component.
 * @returns {React.FC}
 */
const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<MovieContent[] | null>(null);
  const [currentSort, setCurrentSort] = useState<SortType | null>(
    (sessionStorage.getItem("sort") as SortType) || null
  );

  const { data, isLoading } = useMovies(
    page.value,
    rowsPerPage.value,
    currentSearch.value,
    filterSignals.value as MovieFilter,
    currentSort as SortType
  );

  // Set color of text in Navbar to white
  effect(() => {
    navbarColor.value = "white";
  });

  // Set initial-value of page-signal =======================================================================================

  useEffect(() => {
    const storedPageValue = sessionStorage.getItem("pageNumber");
    if (storedPageValue) {
      page.value = Number(JSON.parse(storedPageValue));
    }
  }, []);

  // Automatic scrolling when searching =====================================================================================

  const contentContainerRef = useRef<HTMLDivElement>(null);

  const prevSearchValueRef = useRef("");

  useEffect(() => {
    const currentSearchValue = currentSearch.value;

    if (currentSearchValue === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (
      contentContainerRef.current &&
      currentSearchValue.length > prevSearchValueRef.current.length
    ) {
      contentContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }

    prevSearchValueRef.current = currentSearchValue;
  }, [currentSearch.value]);

  // Set movies=============================================================================================================

  useEffect(() => {
    if (data) {
      setMovies(data.movies);
    }
  }, [data]);

  // Sorting=================================================================================================================

  const handleSort = (sortType: SortType) => {
    setCurrentSort(sortType);
  };

  // Pagination==============================================================================================================

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    page.value = newPage;
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    rowsPerPage.value = parseInt(event.target.value, 10);

    page.value = 0;
  };

  const queryClient = useQueryClient();
  const handlePreFetching = async (): Promise<void> => {
    await handlePreFetch(
      queryClient,
      page.value,
      rowsPerPage.value,
      currentSearch.value,
      filterSignals.value as MovieFilter,
      currentSort as SortType
    );
  };

  const handleHoverOnRightArrow = () => {
    void handlePreFetching();
  };

  // Handle pre-fetching when hovering over the right arrow on the HandlePagination component
  useEffect(() => {
    const attachHoverListener = () => {
      const rightArrowButton = document.querySelector(
        '.MuiTablePagination-actions button[aria-label="Go to next page"]'
      );
      if (rightArrowButton) {
        rightArrowButton.addEventListener(
          "mouseenter",
          handleHoverOnRightArrow
        );
      }
    };

    attachHoverListener();

    // Re-attach the listener when pagination updates
    return () => {
      const rightArrowButton = document.querySelector(
        '.MuiTablePagination-actions button[aria-label="Go to next page"]'
      );
      if (rightArrowButton) {
        rightArrowButton.removeEventListener(
          "mouseenter",
          handleHoverOnRightArrow
        );
      }
    };
  }, [movies]);

  // JSX====================================================================================================================

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="homePageContainer">
      <div className="pageContainer>">
        <div className="headerContainer">
          {data && <HomePageHeader genres={data.genres}></HomePageHeader>}
        </div>
        <div ref={contentContainerRef} className="contentContainer">
          <div className="paginationAndSortContainer">
            <div className="spacer"></div>
            <div className="paginationContainer">
              {data && (
                <TablePagination
                  sx={{ size: "large" }}
                  className="pagination custom-pagination"
                  component="div"
                  count={data.count}
                  page={page.value}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage.value}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </div>
            <div className="spacer-2"></div>
            <div className="sortMenuContainer">
              <SortMenu
                onSort={(value) => handleSort(value as SortType)}
              ></SortMenu>
            </div>
          </div>

          <div className="gridContainer">
            {movies?.length ? (
              <MovieContainerGrid movies={movies} />
            ) : (
              <h2 className="noMatchesText">No matches found</h2>
            )}
          </div>
          <div className="footerContainer">
            <NewsLetterBox></NewsLetterBox>
            <PageFooter></PageFooter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
