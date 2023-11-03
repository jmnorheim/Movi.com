import React, { createContext, useState, useContext, useEffect } from "react";

const NavbarColorContext = createContext({
  isBlack: false,
  setIsBlack: (boolean: boolean) => {},
});

export const useNavbarColor = () => useContext(NavbarColorContext);

type NavbarColorProviderProps = {
  children: React.ReactNode;
};

export const NavbarColorProvider: React.FC<NavbarColorProviderProps> = ({
  children,
}) => {
  const [isBlack, setIsBlack] = useState(false);

  // You can still synchronize with localStorage if needed
  useEffect(() => {
    const navbarColor = localStorage.getItem("navbarIsBlack") === "true";
    setIsBlack(navbarColor);
  }, []);

  return (
    <NavbarColorContext.Provider value={{ isBlack, setIsBlack }}>
      {children}
    </NavbarColorContext.Provider>
  );
};
