import { styled } from "@mui/material/styles";

export const StyledMovieContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  gap: theme.spacing(3),
  "@media (min-width: 940px)": {
    // Example breakpoint for larger screens
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export const StyledPoster = styled("img")({
  width: "100%",
  maxWidth: 400,
  objectFit: "cover",
  borderRadius: 8,
});

export const StyledInfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  textAlign: "center",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInfoBox = styled("div")(({ theme }) => ({
  border: "2px solid",
  borderColor: theme.palette.grey[400],
  backgroundColor: theme.palette.grey[100], // A lighter background color for the box
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  "@media (min-width: 768px)": {
    // Example breakpoint for larger screens
    width: "45%",
  },
}));
