/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface ArrowIconProps {
  className?: string;
}

export const ArrowIcon = ({ className }: ArrowIconProps) => {
  return (
    <svg
      className={`vuesax-linear-arrow-up ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M3.39998 7.45834L8.83331 12.8917C9.47498 13.5333 10.525 13.5333 11.1666 12.8917L16.6 7.45834"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
};
