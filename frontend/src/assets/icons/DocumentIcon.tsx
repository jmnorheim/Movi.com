/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface DocumentIconProps {
  className?: string;
}

export const DocumentIcon = ({ className }: DocumentIconProps) => {
  return (
    <svg
      className={`vuesax-linear-document-copy ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M14.1665 11.1667V13.6667C14.1665 17 12.8332 18.3333 9.49984 18.3333H6.33317C2.99984 18.3333 1.6665 17 1.6665 13.6667V10.5C1.6665 7.16666 2.99984 5.83333 6.33317 5.83333H8.83317"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M14.1668 11.1667H11.5002C9.50016 11.1667 8.8335 10.5 8.8335 8.49999V5.83333L14.1668 11.1667Z"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M9.6665 1.66667H12.9998"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M5.8335 4.16667C5.8335 2.78334 6.95016 1.66667 8.3335 1.66667H10.5168"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M18.3334 6.66667V11.825C18.3334 13.1167 17.2834 14.1667 15.9917 14.1667"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M18.3335 6.66667H15.8335C13.9585 6.66667 13.3335 6.04167 13.3335 4.16667V1.66667L18.3335 6.66667Z"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <g className="g" opacity="0" />
    </svg>
  );
};
