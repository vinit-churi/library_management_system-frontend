import PropTypes from "prop-types";
import {
  Link,
  useLocation,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import useMyContext from "../../hooks/useMyContext";
import { deleteBookById } from "../../utils/loaders";
const BooksGrid = ({ books }) => {
  // console.log(books);
  const location = useLocation();
  let revalidator = useRevalidator();
  const navigate = useNavigate();
  const { setUser } = useMyContext();
  async function deleteBook(id) {
    // console.log("deleteBook", id);
    try {
      const { success, status } = await deleteBookById(id);
      // console.log(success, data, status);
      // console.log(status);
      if (status === 401) {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login");
      }
      if (success) {
        // console.log("Book deleted successfully", data);
        revalidator.revalidate();
      }
    } catch (error) {
      // console.log(error);
    }
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {books && books.length > 0
        ? books.map((book) => (
            <div
              key={book._id}
              className="block h-[200px] max-w-sm max-[500px]:max-w-[90%] p-6 relative overflow-hidden group bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <Link
                to={`/books/${book._id}`}
                className="min-h-full mb-2 overflow-hidden "
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {book.title}
                </h5>
                <p className="font-normal max-h-[120px] overflow-hidden text-gray-700 dark:text-gray-400">
                  {book.description}
                </p>
              </Link>
              {location.pathname === "/dashboard" ? (
                <div className="bg-black flex items-center justify-center absolute inset-0 transition-transform translate-y-[100%] group-hover:translate-y-[0%] h-full w-full">
                  <img
                    onClick={() => deleteBook(book._id)}
                    src="/images/bin.png"
                    className="cursor-pointer"
                  />
                </div>
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
};

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BooksGrid;

{
  /* <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</a> */
}
