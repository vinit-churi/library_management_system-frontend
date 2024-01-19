import { useState, Suspense } from "react";
import Spinner from "../Components/common/Spinner";
import { createBook } from "../utils/loaders";
import {
  useLoaderData,
  Await,
  useRevalidator,
  useNavigate,
} from "react-router-dom";
import BooksGrid from "../Components/common/BooksGrid";
import useMyContext from "../hooks/useMyContext";
const DashboardPage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { setUser } = useMyContext();
  let revalidator = useRevalidator();
  const [formState, setFormState] = useState({
    title: "",
    author: "",
    publishedDate: "",
    pages: "",
    genre: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    setSubmitting(true);
    try {
      const { success, data = null, status } = await createBook(formState);
      console.log(status);
      if (status === 401) {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login");
      }
      if (success) {
        console.log("Book created successfully", data);
        revalidator.revalidate();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormState({
        title: "",
        author: "",
        publishedDate: "",
        pages: "",
        genre: "",
        description: "",
      });
      setSubmitting(false);
    }
  };
  return (
    <div className="bg-gray-600 flex py-6 items-center h-full max-[500px]:flex-col rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
      <div className="flex-[1_1_50%] max-[500px]:w-full mx-3 h-full">
        <h1 className="text-center text-2xl font-semibold">Add Book</h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex mb-3 w-[90%] flex-col mx-auto text-black"
          >
            <label className="mb-2 text-white text-lg font-semibold">
              Title:
            </label>
            <input
              className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              required
            />
            <label className="mb-2 text-white text-lg font-semibold">
              Author:
            </label>
            <input
              className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
              type="text"
              name="author"
              required
              value={formState.author}
              onChange={handleChange}
            />
            <label className="mb-2 text-white text-lg font-semibold">
              Published Date:
            </label>
            <input
              className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
              type="date"
              name="publishedDate"
              required
              value={formState.publishedDate}
              onChange={handleChange}
            />
            <label className="mb-2 text-white text-lg font-semibold">
              Pages:
            </label>
            <input
              className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
              type="number"
              name="pages"
              required
              value={formState.pages}
              onChange={handleChange}
            />
            <label className="mb-2 text-white text-lg font-semibold">
              Genre:
            </label>
            <input
              className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
              type="text"
              name="genre"
              required
              value={formState.genre}
              onChange={handleChange}
            />
            <label className="mb-2 text-white text-lg font-semibold">
              Description: (min 200 characters)
            </label>
            <input
              className="rounded-md pb-32 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
              name="description"
              required
              value={formState.description}
              pattern=".{200,}"
              title="200 characters minimum"
              minLength={200}
              onChange={handleChange}
            />
            <button
              className={`rounded-md w-[140px] h-10 text-white mt-4 px-6 cursor-pointer bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 block mx-auto ${
                submitting ? "cursor-wait !bg-slate-500" : ""
              }`}
              type="submit"
              disabled={submitting}
            >
              {submitting ? <Spinner /> : "Add Book"}
            </button>
          </form>
        </div>
      </div>
      <div className=" border border-slate-400/45 max-[500px]:w-[90%] h-full rounded-full"></div>
      <div className="flex-[1_1_50%] max-[500px]:w-full mx-3 h-full">
        <h1 className="text-center text-2xl font-semibold">Delete Book</h1>
        <div>
          <Suspense
            fallback={
              <p className="text-2xl text-center animate-pulse pt-[100px]">
                Loading the books...
              </p>
            }
          >
            <Await
              resolve={data.books}
              errorElement={<p>Error loading Books!</p>}
            >
              {(books) => <BooksGrid books={books} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
