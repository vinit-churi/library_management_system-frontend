import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useMyContext from "../hooks/useMyContext";
import { registerUser } from "../utils/auth";
import Spinner from "../Components/common/Spinner";
const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useMyContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // Add more state variables as needed

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("First Name:", firstName);
    // console.log("Last Name:", lastName);
    // console.log("Username:", username);
    // console.log("Email:", email);
    // console.log("password", password);
    try {
      setSubmitting(true);
      await registerUser(
        {
          firstName,
          lastName,
          username,
          email,
          password,
        },
        setUser
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setFirstName("");
      setLastName("");
      setUsername("");
      setPassword("");
      setEmail("");
      setSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-full w-auto">
      <div className="p-4 w-[90%] max-w-[500px] rounded-xl bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
        <form
          className="flex mb-3 flex-col w-full text-black"
          onSubmit={handleSubmit}
        >
          <label
            className="mb-2 text-white text-lg font-semibold"
            htmlFor="firstName"
          >
            First Name:
          </label>
          <input
            className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            disabled={submitting}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label
            className="mb-2 text-white text-lg font-semibold"
            htmlFor="lastName"
          >
            Last Name:
          </label>
          <input
            className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            disabled={submitting}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label
            className="mb-2 text-white text-lg font-semibold"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
            type="text"
            id="username"
            name="username"
            required
            value={username}
            disabled={submitting}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            className="mb-2 text-white text-lg font-semibold"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            disabled={submitting}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="mb-2 text-white text-lg font-semibold"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="rounded-md h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            disabled={submitting}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={`rounded-md w-[100px] h-10 text-white mt-4 px-6 cursor-pointer bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 block mx-auto ${
              submitting ? "cursor-wait !bg-slate-500" : ""
            }`}
            type="submit"
            disabled={submitting}
          >
            {submitting ? <Spinner /> : "Register"}
          </button>
        </form>
        <Link to="/login" className="underline mt-2">
          Already Registered? go to login form
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
