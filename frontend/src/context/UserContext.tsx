import React, { createContext, useState } from "react";

export const UserDataContext = createContext({});

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div>
      <UserDataContext.Provider value={user}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
