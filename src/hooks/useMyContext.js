import { useContext } from "react";
import { MyContext } from "../context/Context";
const useMyContext = () => {
  return useContext(MyContext);
};

export default useMyContext;
