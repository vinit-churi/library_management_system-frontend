import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useMyContext from "../../hooks/useMyContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useMyContext();
  return (
    <>{user && user.role === "CREATOR" ? children : <Navigate to="/login" />}</>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
