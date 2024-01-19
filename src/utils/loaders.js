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
  const data = await response.json();
  return data;
}

export async function createBook(bookData) {
  try {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(bookData);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOSTNAME}/books/create`,
      requestOptions
    );
    if (response.status === 400) {
      console.log("re login required");
      return { success: false, status: response.status };
    }
    if (response.status !== 200) {
      return { success: false, status: response.status };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getBookById = async ({ params }) => {
  console.log(params);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOSTNAME}/books/${params.bookId}`
    );
    if (response.status !== 200) {
      return { success: false };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function deleteBookById(id) {
  try {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      // redirect: "follow",
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOSTNAME}/books/${id}`,
      requestOptions
    );
    if (response.status !== 200) {
      return { success: false };
    }
    const data = await response.json();
    return { success: true, data, status: response.status };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getLogs() {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOSTNAME}/logs`,
      requestOptions
    );
    console.log(response.status);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
