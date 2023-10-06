import { MovieContent } from "../interfaces";

const movies: MovieContent[] = [
  {
    imdbID: "tt0076759",
    primaryTitle: "Star Wars: Episode IV - A New Hope",
    originalTitle: "Star Wars",
    isAdult: false,
    startYear: 1977,
    runtimeMinutes: 121,
    genres: ["Action", "Adventure", "Fantasy"],
    averageRating: 10,
    totalVotes: 100000,
    poster:
      "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",
  },
  {
    imdbID: "tt0080684",
    primaryTitle: "Star Wars: Episode V - The Empire Strikes Back",
    originalTitle: "Star Wars: Episode V - The Empire Strikes Back",
    isAdult: false,
    startYear: 1980,
    runtimeMinutes: 124,
    genres: ["Action", "Adventure", "Fantasy"],
    averageRating: 9.9,
    totalVotes: 100000,
    poster:
      "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0086190",
    primaryTitle: "Star Wars: Episode VI - Return of the Jedi",
    originalTitle: "Star Wars: Episode VI - Return of the Jedi",
    isAdult: false,
    startYear: 1983,
    runtimeMinutes: 131,
    genres: ["Action", "Adventure", "Fantasy"],
    averageRating: 9.8,
    totalVotes: 100000,
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
  },
];

const movieAPI = (): Promise<MovieContent | MovieContent[]> => {
  return new Promise((resolve, reject) => {
    try {
      // const movie = movies[0];
      resolve(movies);
    } catch (error) {
      reject(error);
    }
  });
};

export default movieAPI;
