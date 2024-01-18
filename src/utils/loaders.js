import { defer } from "react-router-dom";
export const getAllBooks = async ({ params, request }) => {
  console.log(params, request);
  const url = new URL(request.url);
  const oldBooks = url.searchParams.get("old");
  const newBooks = url.searchParams.get("new");
  console.log("look here", oldBooks, newBooks);

  const data = fetchAllBooks({ oldBooks, newBooks });
  return defer({
    books: data,
  });
};

async function fetchAllBooks({ oldBooks, newBooks }) {
  let url = `${import.meta.env.VITE_BACKEND_HOSTNAME}/books`;
  if (oldBooks === "1") {
    url = `${import.meta.env.VITE_BACKEND_HOSTNAME}/books?sort=old`;
  } else if (newBooks === "1") {
    url = `${import.meta.env.VITE_BACKEND_HOSTNAME}/books?new=new`;
  }
  const response = await fetch(url);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(1000);
  const data = await response.json();
  return data;
}
