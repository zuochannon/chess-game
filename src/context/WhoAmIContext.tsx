import { createContext, useContext, ReactNode } from "react";
import useWhoAmI from "../hooks/useWhoAmI";

interface WhoAmIContextType {
  whoAmI: any;
  saveWhoAmI: (data: any) => void;
  clearWhoAmI: () => void;
}

// Create a context with a default value
const WhoAmIContext = createContext<WhoAmIContextType>({
  whoAmI: {},
  saveWhoAmI: () => {},
  clearWhoAmI: () => {},
});

// Provide the context value using the custom hook
export const WhoAmIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const whoAmIState = useWhoAmI();

  return (
    <WhoAmIContext.Provider value={{ ...whoAmIState }}>
      {children}
    </WhoAmIContext.Provider>
  );
};

// Custom hook to consume the context value
export const useWhoAmIContext = () => useContext(WhoAmIContext);
