import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userDetails = async () => {
      try {
        const res = await axios.get("/user");
        setUser(res.data.user);
      } catch (error) {
        console.log("");
      }
    };
    userDetails();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContext;
