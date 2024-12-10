import { createContext, ReactNode, useState } from "react";

interface Captain {
  fullname: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password: string;
  _id: string;
}

interface CaptainContextType {
  captain: Captain | null;
  setCaptain: (captain: Captain | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  updateCaptain: (captainData: Captain) => void;
}

export const CaptainDataContext = createContext<CaptainContextType | undefined>(
  undefined
);

const CaptainContext = ({ children }: { children: ReactNode }) => {
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCaptain = (captainData: Captain) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
