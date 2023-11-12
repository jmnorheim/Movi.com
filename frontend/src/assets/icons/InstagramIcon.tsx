/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

interface InstagramIconProps {
  className?: string;
  color?: string;
}

export const InstagramIcon = ({
  color = "black",
  className,
}: InstagramIconProps) => {
  return (
    <svg
      className={`icon-instagram-1 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        clipRule="evenodd"
        d="M16 3.5H8C5.23858 3.5 3 5.73858 3 8.5V16.5C3 19.2614 5.23858 21.5 8 21.5H16C18.7614 21.5 21 19.2614 21 16.5V8.5C21 5.73858 18.7614 3.5 16 3.5ZM19.25 16.5C19.2445 18.2926 17.7926 19.7445 16 19.75H8C6.20735 19.7445 4.75549 18.2926 4.75 16.5V8.5C4.75549 6.70735 6.20735 5.25549 8 5.25H16C17.7926 5.25549 19.2445 6.70735 19.25 8.5V16.5ZM16.75 8.75C17.3023 8.75 17.75 8.30228 17.75 7.75C17.75 7.19772 17.3023 6.75 16.75 6.75C16.1977 6.75 15.75 7.19772 15.75 7.75C15.75 8.30228 16.1977 8.75 16.75 8.75ZM12 8C9.51472 8 7.5 10.0147 7.5 12.5C7.5 14.9853 9.51472 17 12 17C14.4853 17 16.5 14.9853 16.5 12.5C16.5027 11.3057 16.0294 10.1596 15.1849 9.31508C14.3404 8.47059 13.1943 7.99734 12 8ZM9.25 12.5C9.25 14.0188 10.4812 15.25 12 15.25C13.5188 15.25 14.75 14.0188 14.75 12.5C14.75 10.9812 13.5188 9.75 12 9.75C10.4812 9.75 9.25 10.9812 9.25 12.5Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

InstagramIcon.propTypes = {
  color: PropTypes.string,
};
