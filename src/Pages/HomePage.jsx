import { useLoaderData, Await, useNavigate, Link } from "react-router-dom";
import { Suspense } from "react";
import BooksGrid from "../Components/common/BooksGrid";
import useMyContext from "../hooks/useMyContext";

const HomePage = () => {
  const data = useLoaderData();
  const { user } = useMyContext();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-600 h-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
      <div className="p-4 flex justify-between items-center">
        <div>
          <label
            htmlFor="books"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Filter by time
          </label>
          <select
            id="books"
            defaultValue={""}
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value === "new") {
                navigate("/?new=1");
              } else if (e.target.value === "old") {
                navigate("/?old=1");
              } else {
                navigate("/");
              }
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="new">10 min. ago (new)</option>
            <option value="old">10 min. later (old)</option>
          </select>
        </div>
        {user && user.role === "CREATOR" ? (
          <Link
            className="flex items-center justify-center px-4 py-3 cursor-pointer hover:bg-slate-800 text-lg w-max rounded-lg bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
            to="/dashboard"
          >
            Admin Dashboard
          </Link>
        ) : null}
      </div>
      <Suspense
        fallback={
          <p className="text-2xl text-center animate-pulse pt-[100px]">
            Loading the books...
          </p>
        }
      >
        <Await resolve={data.books} errorElement={<p>Error loading Books!</p>}>
          {(books) => <BooksGrid books={books} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default HomePage;
