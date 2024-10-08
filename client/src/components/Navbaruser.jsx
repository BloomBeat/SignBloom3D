import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import {jwtDecode} from "jwt-decode"; 
import toast from "react-hot-toast";
import api from "../hooks/api.js";

const Navbaruser = ({ userToken }) => { 
  const [decodedToken, setDecodedToken] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await api.post(
        "/user/logout",
        {},
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error || "An error occurred");
    }
  };

  if (userToken && !decodedToken) {
    try {
      const decoded = jwtDecode(userToken); 
      setDecodedToken(decoded); 
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="px-12">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <HomeIcon className="size-5 text-primary-500" />
            </Link>
          </div>

          <div className="flex items-center gap-4 text-gray-90 px-3 py-2 text-sm font-medium">
            {/* Navigation Links */}
            <Link to="/vocabulary" className="hover:bg-gray-100 rounded-md p-2">
              คำศัพท์
            </Link>
            <Link to="/support" className="hover:bg-gray-100 rounded-md p-2">
              สนับสนุน
            </Link>
            <Link to="/aboutus" className="hover:bg-gray-100 rounded-md p-2">
              เกี่ยวกับเรา
            </Link>

            {!userToken ? (
              <>
                <Link to="/register">
                  <button className="bg-primary-base text-primary-content hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">
                    ลงทะเบียน
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-secondary-base text-secondary-content hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium">
                    เข้าสู่ระบบ
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative flex flex-row items-center gap-1">

                {/* Dropdown Menu */}
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="flex items-center gap-1">
                  {
                decodedToken?.picture_profile ? (
                  <img
                    src={decodedToken.picture_profile}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : 
                (
                  <img
                    src="/favicon.ico"
                    alt="Default Icon"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                )}
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-6 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/edit-profile"
                              className={`block px-4 py-2 text-sm ${
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                              }`}
                            >
                              Edit Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <hr className="border-t border-gray-200 my-1" />

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbaruser;
