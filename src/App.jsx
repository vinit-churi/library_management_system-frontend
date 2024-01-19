import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import BookPage from "./Pages/BookPage";
import { getAllBooks, getBookById, getLogs } from "./utils/loaders";
import useMyContext from "./hooks/useMyContext";
import { useEffect } from "react";
import { getUserByToken } from "./utils/auth";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import LogsPage from "./Pages/LogsPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        loader: getAllBooks,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/dashboard",
        loader: getAllBooks,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/books/:bookId",
        loader: getBookById,
        element: <BookPage />,
      },
    ],
  },
  {
    path: "/user-logs",
    loader: getLogs,
    element: <LogsPage />,
  },
  {
    path: "*",
    element: (
      <div className=" mt-10 uppercase text-center w-full">page not found</div>
    ),
  },
]);

function App() {
  const { setUser } = useMyContext();
  useEffect(() => {
    getUserByToken(setUser);
  }, [setUser]);
  return <RouterProvider router={router} />;
}

export default App;
