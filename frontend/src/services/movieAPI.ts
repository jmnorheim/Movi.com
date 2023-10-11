import { MovieContent } from "../interfaces";

const movies: MovieContent[] = [
  {
    imdbID: "tt0076759",
    primaryTitle: "Star Wars: Episode IV - A New Hope",
    originalTitle: "Star Wars",
    isAdult: true,
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
  {
    imdbID: "tt0241527",
    primaryTitle: "Harry Potter and the Sorcerer's Stone",
    originalTitle: "Harry Potter and the Sorcerer's Stone",
    isAdult: false,
    startYear: 2001,
    runtimeMinutes: 152,
    genres: ["Adventure", "Family", "Fantasy"],
    averageRating: 6.8,
    totalVotes: 100420,
    poster:
      "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0304141",
    primaryTitle: "Harry Potter and the Prisoner of Azkaban",
    originalTitle: "Harry Potter and the Prisoner of Azkaban",
    isAdult: false,
    startYear: 2004,
    runtimeMinutes: 142,
    genres: ["Adventure", "Family", "Fantasy"],
    averageRating: 3.5,
    totalVotes: 69420,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0330373",
    primaryTitle: "Harry Potter and the Goblet of Fire",
    originalTitle: "Harry Potter and the Goblet of Fire",
    isAdult: false,
    startYear: 2005,
    runtimeMinutes: 157,
    genres: ["Adventure", "Family", "Fantasy"],
    averageRating: 6.9,
    totalVotes: 42069,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0295297",
    primaryTitle: "Harry Potter and the Chamber of Secrets",
    originalTitle: "Harry Potter and the Chamber of Secrets",
    isAdult: false,
    startYear: 2002,
    runtimeMinutes: 161,
    genres: ["Adventure", "Family", "Fantasy"],
    averageRating: 4.2,
    totalVotes: 452352,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_SX300.jpg",
  },
  {
    imdbID: "tt0373889",
    primaryTitle: "Harry Potter and the Order of the Phoenix",
    originalTitle: "Harry Potter and the Order of the Phoenix",
    isAdult: false,
    startYear: 2007,
    runtimeMinutes: 138,
    genres: ["Adventure", "Family", "Fantasy"],
    averageRating: 7.2,
    totalVotes: 432252,
    poster:
      "https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDc5LWFkN2YtNzNlY2UxZmY0N2IyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0417741",
    primaryTitle: "Harry Potter and the Half-Blood Prince",
    originalTitle: "Harry Potter and the Half-Blood Prince",
    isAdult: false,
    startYear: 2009,
    runtimeMinutes: 153,
    genres: ["Adventure", "Family", "Fantasy"],
    averageRating: 9.3,
    totalVotes: 234731,
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg",
  },
];

const movieAPI = (): Promise<MovieContent[]> => {
  return new Promise((resolve, reject) => {
    try {
      // const movie = movies[0];
      resolve(movies);
    } catch (error) {
      reject(error);
    }
  });
};

const getMovieById = (id: string): Promise<MovieContent> => {
  return new Promise((resolve, reject) => {
    try {
      const movie = movies.find((movie) => movie.imdbID === id);
      if (movie === undefined) throw new Error("Movie not found");
      resolve(movie);
    } catch (error) {
      reject(error);
    }
  });
};

export { getMovieById };
export default movieAPI;
