export async function registerUser(userData, callback) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      username: userData.username,
      password: userData.password,
      email: userData.email,
      role: "VIEW_ALL",
      firstName: userData.firstName,
      lastName: userData.lastName,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOSTNAME}/users/register`,
      requestOptions
    );
    if (response.status !== 200) {
      return { success: false };
    }
    const { user, token } = await response.json();
    callback(user);
    localStorage.setItem("token", token);
  } catch (error) {
    // console.log(error);
  }
}

export async function loginUser(userData, callback) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      email: userData.email,
      password: userData.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOSTNAME}/users/login`,
      requestOptions
    );
    if (response.status !== 200) {
      return { success: false };
    }
    const { user, token } = await response.json();
    callback(user);
    localStorage.setItem("token", token);
    return { success: true };
  } catch (error) {
    // console.log(error);
    return { success: false };
  }
}

export async function getUserByToken(callback) {
  // console.log("getUserByToken called");
  try {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    if (!token) {
      callback(null);
      return;
    }
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOSTNAME}/users/getUserByToken`,
      requestOptions
    );
    if (response.status !== 200) {
      return { success: false };
    }
    const user = await response.json();
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  } catch (error) {
    // console.log(error);
  }
}
