import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import BookPage from "./Pages/BookPage";
import { getAllBooks } from "./utils/loaders";
import useMyContext from "./hooks/useMyContext";
import { useEffect } from "react";
import { getUserByToken } from "./utils/auth";
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
        element: <DashboardPage />,
      },
      {
        path: "/book/:bookId",
        element: <BookPage />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
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
