import { useEffect, useState } from "react";
import {
  invalidateIsMovieInFavorites,
  useIsMovieInFavorites,
} from "../../services/isMovieInFavorite";
import "./HeartButton.css";
import { HeartIcon } from "../../assets/icons/HeartIcon";
import { addMovieToFavorite } from "../../services/addMovieToFavorites";
import { useQueryClient } from "@tanstack/react-query";
import { useRemoveMovieFromFavorites } from "../../services/removeMovieFromFavorites";

interface HeartButtonProps {
  userID: string;
  movieID: string;
}

/**
 * HeartButton Component
 *
 * This component renders a heart-shaped button that allows users to add or remove a movie from their favorites.
 * The heart icon's appearance changes based on whether the movie is in the user's favorites list.
 * It uses services to check the movie's favorite status, add it to favorites, and remove it from favorites.
 *
 * Props:
 * @param {string} userID - The ID of the user for whom the favorite status is being managed.
 * @param {string} movieID - The ID of the movie to be added or removed from favorites.
 *
 * Features:
 * - The heart icon indicates whether the movie is in the user's favorites.
 * - Clicking the heart icon adds or removes the movie from the user's favorites.
 * - Integrates with the `useIsMovieInFavorites`, `addMovieToFavorite`, and `useRemoveMovieFromFavorites` services for functionality.
 * - Utilizes `useQueryClient` from `@tanstack/react-query` for managing query cache.
 * - State management for the favorite status of the movie.
 */
const HeartButton = ({ userID, movieID }: HeartButtonProps) => {
  const [isHearted, setIsHearted] = useState<boolean | null>(null);
  const queryClient = useQueryClient();
  const { mutate } = useRemoveMovieFromFavorites(userID);

  const { data } = useIsMovieInFavorites(userID, movieID);

  useEffect(() => {
    if (data !== undefined) {
      setIsHearted(data);
    }
  }, [data]);

  const handleHeartClick = async () => {
    if (isHearted) {
      setIsHearted(false);
      mutate(movieID);
    } else {
      setIsHearted(true);
      await addMovieToFavorite(userID, movieID);
      await invalidateIsMovieInFavorites(userID, movieID, queryClient);
    }
  };

  return (
    <>
      {isHearted !== null && (
        <button
          className="favorite-button"
          onClick={() => void handleHeartClick()}
        >
          <HeartIcon className={isHearted} />
        </button>
      )}
    </>
  );
};

export default HeartButton;
