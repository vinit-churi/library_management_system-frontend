import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const MyContext = createContext();
const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = {
    user,
    setUser,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

Context.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
