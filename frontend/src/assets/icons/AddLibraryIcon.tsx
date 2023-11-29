interface AddLibraryIconProps {
  className?: string;
}

export const AddLibraryIcon = ({ className }: AddLibraryIconProps) => {
  return (
    <svg
      className={`vuesax-linear-additem ${className}`}
      fill="none"
      height="128"
      viewBox="0 0 129 128"
      width="129"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="g" clipPath="url(#clip0_52_831)">
        <path
          className="path"
          d="M43.1665 85.3333H29.4598C17.2465 85.3333 11.1665 79.2533 11.1665 67.04V28.96C11.1665 16.7467 17.2465 10.6667 29.4598 10.6667H53.8332C66.0465 10.6667 72.1265 16.7467 72.1265 28.96"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          className="path"
          d="M99.5402 117.333H75.1669C62.9535 117.333 56.8735 111.253 56.8735 99.04V60.96C56.8735 48.7467 62.9535 42.6667 75.1669 42.6667H99.5402C111.754 42.6667 117.834 48.7467 117.834 60.96V99.04C117.834 111.253 111.754 117.333 99.5402 117.333Z"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          className="path"
          d="M79.8066 80H97.1933"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          className="path"
          d="M88.5 88.6933V71.3067"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <g className="g" opacity="0" />
      </g>
      <defs className="defs">
        <clipPath className="clip-path" id="clip0_52_831">
          <rect
            className="rect"
            fill="white"
            height="128"
            transform="translate(0.5)"
            width="128"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
