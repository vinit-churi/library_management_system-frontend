import { Link, useNavigate } from "react-router-dom";
import useMyContext from "../../hooks/useMyContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useMyContext();
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="h-max w-auto bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-white m-4 p-4">
      <div className="flex justify-between">
        <div className="flex flex-row">
          <Link to="/" className="flex flex-col cursor-pointer">
            <div className="text-2xl max-[400px]:text-xl font-bold">
              Bookstore
            </div>
            <div className="text-xs max-[400px]:hidden">
              Your online bookstore
            </div>
          </Link>
        </div>
        {user ? (
          <div className="flex flex-row">
            <div className="flex flex-col cursor-pointer">
              <div className="text-2xl max-[400px]:text-xl font-bold">
                Welcome
              </div>
              <div className="text-xs">{user.username}</div>
            </div>
            <button
              title="logout"
              onClick={logoutUser}
              className="flex items-center justify-center w-[40px] rounded-lg mx-3 bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
            >
              <img
                src="/images/logout.png"
                height={30}
                width={30}
                className="invert-[1]"
              />
            </button>
          </div>
        ) : (
          <Link to="/login" className="flex flex-row">
            <div className="flex flex-col cursor-pointer">
              <div className="text-2xl font-bold">Login</div>
              <div className="text-xs">Login to your account</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
