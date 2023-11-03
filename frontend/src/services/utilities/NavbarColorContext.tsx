import React, { createContext, useState, useContext, useEffect } from "react";

const NavbarColorContext = createContext({
  isBlack: false,
  setIsBlack: () => {},
});

export const useNavbarColor = () => useContext(NavbarColorContext);

export const NavbarColorProvider = ({ children }) => {
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
