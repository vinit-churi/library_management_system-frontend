import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Components/common/Spinner";
import useMyContext from "../hooks/useMyContext";

import { loginUser } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { setUser } = useMyContext();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Handle form submission here
    try {
      setSubmitting(true);
      const { success } = await loginUser(
        {
          email,
          password,
        },
        setUser
      );
      console.log("what's the result?", success);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-auto">
      <div className="p-4 w-[90%] max-w-[400px] rounded-xl bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40">
        <form
          className="flex flex-col mb-4 w-full text-black"
          onSubmit={handleSubmit}
        >
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
            placeholder="abc@xyx.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
          />
          <label
            className="mb-2 text-white text-lg font-semibold"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="rounded-md placeholder:tracking-widest  h-10 w-full text-white px-2 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40"
            type="password"
            id="password"
            name="password"
            placeholder="********"
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
            {submitting ? <Spinner /> : "login"}
          </button>
        </form>
        <Link to="/register" className="underline mt-2">
          Yet to Registered? go to register form
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
