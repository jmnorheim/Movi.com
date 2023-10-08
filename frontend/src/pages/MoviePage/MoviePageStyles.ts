import { styled } from "@mui/material/styles";

export const StyledMovieContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  gap: theme.spacing(3),
}));

export const StyledPoster = styled("img")({
  width: "100%",
  maxWidth: 400,
  objectFit: "cover",
  borderRadius: 8, // Optional, for rounded edges on the poster
});

export const StyledInfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  textAlign: "center",
  width: "100%",
}));
