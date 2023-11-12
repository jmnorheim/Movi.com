/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Icon1Props {
  className?: string;
}

export const Icon1 = ({ className }: Icon1Props) => {
  return (
    <svg
      className={`icon-1 ${className}`}
      fill="none"
      height="21"
      viewBox="0 0 20 21"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M16.6 7.63071L11.1667 13.064C10.525 13.7057 9.47503 13.7057 8.83336 13.064L3.40002 7.63071"
        stroke="#F5F5F5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
};
