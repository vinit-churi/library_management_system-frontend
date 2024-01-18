import { Outlet } from "react-router-dom";
import Navbar from "../Components/common/Navbar";

const RootLayout = () => {
  return (
    <div className="bg-[url('/images/background_02.jpg')] grid grid-rows-[max-content_auto] min-h-screen bg-no-repeat bg-cover ">
      <Navbar />
      <div className="w-auto h-auto overflow-hidden text-white pt-0 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
