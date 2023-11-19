import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Order from "./components/Order";
import { useUserContext } from "./contexts/userContextProvider";

const ProtectedRoute = ({ children }) => {
  const { username } = useUserContext();
  if (username === "") return <Navigate to="/login" replace={true} />;
  return children;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "login", element: <LogIn /> },
        { path: "signup", element: <SignUp /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
