import { useLoaderData } from "react-router-dom";

const BookPage = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="flex items-center justify-center h-full w-auto">
      <div className="p-4 w-[90%] max-w-[500px] rounded-xl overflow-hidden bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
        {data ? (
          <>
            <p>
              <span className="font-bold">Title: </span>
              {data.data.title}
            </p>
            <p>
              <span className="font-bold">description: </span>
              {data.data.description}
            </p>
            <p>
              <span className="font-bold">author: </span>
              {data.data.author}
            </p>
            <p>
              <span className="font-bold">publishedDate: </span>
              {data.data.publishedDate}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BookPage;
