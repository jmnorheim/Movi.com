import { useEffect, useState } from "react";
import { Movie, MovieContent } from "../../interfaces";

import MovieContainerGrid from "../../components/movieContainerGrid/MovieContainerGrid";
import "./HomePage.css";
import { useAuth } from "../../services/auth/AuthContext";

import SortMenu from "../../components/sortMenu/SortMenu";
import HomePageHeader from "../../components/homePageHeader/HomePageHeader";
import PageFooter from "../../components/pageFooter/PageFooter";
import { MovieFilter, SortType } from "../../generated/graphql";
import NewsLetterBox from "../../components/newsletterBox/NewsLetterBox";

import { Signal, effect, signal } from "@preact/signals-react";
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
  runtimeMinutesRange: { max: 300, min: 0 },
  averageRatingRange: { max: 10, min: 0 },
  totalVotesRange: { max: 2900000, min: 0 },
  genres: [],
  isAdult: false,
});

export const currentSearch = signal<string>("");

//Signal that contains the current page number and the number of rows per page are stored externally from the page component
export const page = signal<number>(0);
const rowsPerPage = signal<number>(10);

// export const currentSort = signal<SortType | null>(null);

/**
 * Render the HomePage component.
 * @returns {React.FC}
 */
const HomePage: React.FC = () => {
  const [originalMovies, setOriginalMovies] = useState<MovieContent[] | null>(
    null
  ); // All movies
  const [movies, setMovies] = useState<MovieContent[] | null>(null); // Movies that are actually displayed on the page (e.g. after filtering)
  const [currentSort, setCurrentSort] = useState<SortType | null>(null);
  const [currentFilter, setCurrentFilter] = useState<{
    isAdult?: boolean;
    genres?: string[];
  }>({ isAdult: false, genres: [] });

  const { data, isLoading } = useMovies(
    page.value,
    rowsPerPage.value,
    currentSearch.value,
    filterSignals.value as MovieFilter,
    currentSort as SortType
  );

  const { email } = useAuth();

  // Set color of text in Navbar to white
  effect(() => {
    navbarColor.value = "white";
  });

  // =======================================================================================================================

  useEffect(() => {
    if (data) {
      // Fetch the current user's favorites from localStorage
      setMovies(data.movies);
      setOriginalMovies(data.movies);
      console.log("Data has been set");
    }
  }, [data]);

  // Sorting==================================================================================================================

  const handleSort = (sortType: SortType) => {
    setCurrentSort(sortType); // Save the current sort type

    if (!movies) return;

    const sortedMovies = applySort(movies, sortType);
    setMovies(sortedMovies); // Cast sortedMovies to Movie[] type
  };

  const applySort = (
    movieList: MovieContent[],
    sortType: SortType
  ): MovieContent[] => {
    if (sortType === null) return originalMovies as Movie[];

    return [...movieList].sort((a: MovieContent, b: MovieContent): number => {
      switch (sortType) {
        case SortType.TitleAz:
          return a.primaryTitle.localeCompare(b.primaryTitle);
        case SortType.TitleZa:
          return b.primaryTitle.localeCompare(a.primaryTitle);
        case SortType.RatingHilo:
          return b.averageRating - a.averageRating;
        case SortType.RatingLohi:
          return a.averageRating - b.averageRating;
        case SortType.DurationHilo:
          return b.runtimeMinutes - a.runtimeMinutes;
        case SortType.DurationLohi:
          return a.runtimeMinutes - b.runtimeMinutes;
        case SortType.YearHilo:
          return b.startYear - a.startYear;
        case SortType.YearLohi:
          return a.startYear - b.startYear;
        default:
          return 0;
      }
    });
  };

  // =======================================================================================================================

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

  // Handle pre-fetching when hovering on the right arrow button setup
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="homePageContainer">
      <div>{filterSignals.value.genres}</div>
      <div className="pageContainer>">
        <div className="headerContainer">
          {data && <HomePageHeader genres={data.genres}></HomePageHeader>}
        </div>
        <div className="contentContainer">
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
