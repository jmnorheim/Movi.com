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

export default movieAPI;
