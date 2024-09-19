import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [parsedUser, setParsedUser] = useState(null);

  return (
    <UserContext.Provider value={{ parsedUser, setParsedUser }}>
      {children}
    </UserContext.Provider>
  );
};
