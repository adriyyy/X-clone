import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import XSvg from "../svgs/X";

const Sidebar = () => {
  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700">
        <Link className="flex justify-center md:justify-start" to="/">
          <XSvg className="w-12 px-2 h-12 fill-white rounded-full hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-4 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              className="flex gap-3 items-center hover:bg-stone-900 transition duration-300 cursor-pointer rounded-full py-2 px-4"
              to="/"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              className="flex gap-3 items-center hover:bg-stone-900 transition duration-300 cursor-pointer rounded-full py-2 px-4"
              to="/notifications"
            >
              <IoNotifications className="w-8 h-8" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              className="flex gap-3 items-center hover:bg-stone-900 transition duration-300 cursor-pointer rounded-full py-2 px-4"
              to="/profile"
            >
              <FaUser className="w-8 h-8" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        <Link className="mt-auto mb-10 flex gap-2 items-start hover:bg-stone-900 transition duration-300 cursor-pointer rounded-full py-2 px-4">
          <div className="avatar hidden md:inline-flex">
            <div className="w-8 h-8 rounded-full">
              <img src="/avatars/boy1.png" />
            </div>
          </div>
          <div className="flex justify-between flex-1">
            <div className="hidden md:block">
              <p className="text-white font-bold">John Doe</p>
              <p className="text-slate-500 text-sm">@johndoe</p>
            </div>
            <BiLogOut className="w-8 h-8 cursor-pointer hover:text-red-500 md:w-5 md:h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};
7;
export default Sidebar;
