import { createContext, useContext, useState } from "react";
export const userContext = createContext();

export const useUserContext = () => {
  return useContext(userContext);
};

const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <userContext.Provider value={{ username, setUsername }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
