import { MdOutlineMail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/X.jsx";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(formData);
  };

  const isError = false;

  return (
    <div
      className="flex max-w-screen-xl mx-auto h-screen"
      onSubmit={handleSubmit}
    >
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <form className="flex gap-4 flex-col">
          <XSvg className="w-24 fill-white lg:hidden" />
          <h1 className="text-4xl font-extrabold">{"Let's"} go.</h1>
          <label className="input input-bordered rounded flex gap-2 items-center">
            <MdOutlineMail />
            <input
              className="grow"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label className="input input-bordered rounded flex gap-2 items-center">
            <MdPassword />
            <input
              className="grow"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <button className="btn btn-primary rounded-full text-white">
            Login
          </button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p>{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn btn-primary btn-outline rounded-full w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
