import { useEffect, useState } from "react";
import {
  invalidateIsMovieInFavorites,
  useIsMovieInFavorites,
} from "../../services/isMovieInFavorite";
import "./HeartButton.css";
import { HeartIcon } from "../../assets/icons/HeartIcon";
import { addMovieToFavorite } from "../../services/addMovieToFavorites";
import { useQueryClient } from "@tanstack/react-query";

interface HeartButtonProps {
  userID: string;
  movieID: string;
}

const HeartButton = ({ userID, movieID }: HeartButtonProps) => {
  const [isHearted, setIsHearted] = useState<boolean | null>(null);
  const queryClient = useQueryClient();

  const { data } = useIsMovieInFavorites(userID, movieID);
  console.log(userID, movieID);

  useEffect(() => {
    if (data !== undefined) {
      setIsHearted(data);
    }
  }, [data]);

  const handleHeartClick = async () => {
    console.log("noe");

    if (isHearted) {
      setIsHearted(false);
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
