interface ArrowDownIconProps {
  className?: string;
}

export const ArrowDownIcon = ({ className }: ArrowDownIconProps) => {
  return (
    <svg
      className={`icon ${className}`}
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M11.62 5.22083L7.81667 9.02416C7.3675 9.47333 6.6325 9.47333 6.18333 9.02416L2.38 5.22083"
        stroke="#F5F5F5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
};
