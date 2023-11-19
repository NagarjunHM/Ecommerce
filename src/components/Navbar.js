import React from "react";
import { useUserContext } from "../contexts/userContextProvider";
import { useProductContext } from "../contexts/productContextProvider";
import { Outlet } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import { CustomToaster } from "../utilities/Toaster";

const Navbar = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useUserContext();
  const { resetFilters } = useProductContext();
  return (
    <>
      <div className="fixed z-0 w-40 bg-red-400 border rounded-full h-14 md:ml-9 "></div>
      <div className="sticky top-0 z-10 flex items-center justify-between w-full px-1 bg-white border-b shadow border-slate-400 h-14 md:px-10">
        <div className="flex items-baseline text-base">
          <div className="pl-5 text-3xl font-semibold tracking-wider">
            BusyBuy
          </div>

          {/* NavLink */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-700" : ""
              } px-3 py-2 m-5 my-2 font-semibold duration-200 rounded cursor-pointer  hover:text-blue-700`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            onClick={resetFilters}
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-700" : ""
              }  py-2 m-5 my-2 font-semibold duration-200 hidden sm:flex rounded cursor-pointer  hover:text-blue-700`
            }
          >
            Cart
          </NavLink>

          <NavLink
            to="/order"
            onClick={resetFilters}
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-700" : ""
              }  py-2 m-5 my-2 font-semibold duration-200 rounded cursor-pointer hidden sm:flex hover:text-blue-700`
            }
          >
            Order
          </NavLink>
        </div>
        {username ? (
          <div
            className="py-2 px-3 m-5 rounded bg-slate-300  border border-slate-900 cursor-pointer active:scale-[0.9] duration-200"
            onClick={() => {
              setUsername("");
              CustomToaster(`${username} logged out Successful`, "info");
            }}
          >
            Signed in as :{" "}
            <span className="font-bold underline">{username}</span>
          </div>
        ) : (
          <div
            className=" py-2 px-3 m-5 rounded bg-slate-300  border border-slate-900 cursor-pointer active:scale-[0.9] duration-200"
            onClick={() => {
              if (username === "") {
                navigate("./login");
              }
            }}
          >
            Log In
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
