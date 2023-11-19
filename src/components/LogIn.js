import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { useForm } from "react-hook-form";
import { Message, Loader, Whisper, Popover, Button } from "rsuite";
import { doc, getDoc } from "firebase/firestore";
import { useUserContext } from "../contexts/userContextProvider";
import { useNavigate } from "react-router-dom";
import { CustomToaster } from "../utilities/Toaster";

const LogIn = () => {
  const navigate = useNavigate();
  const { setUsername } = useUserContext();
  const [loaderToggle, setLoaderToggle] = useState(false);

  const speaker = (
    <Popover title="Demo User Details">
      <hr />
      <p className="text-sm">username = testuser</p>
      <p className="text-sm">password = testuser</p>
    </Popover>
  );

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoaderToggle(true);
      const docRef = doc(db, "users", data.username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // checking the password
        if (docSnap.data().password === data.password) {
          setUsername(data.username);
          CustomToaster("Login Successful", "success");
          navigate("/");
          reset();
          clearErrors();
        } else {
          // pushing the notification if password does not match
          CustomToaster("Password does not match", "error");
        }
      } else {
        CustomToaster("User not found", "error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderToggle(false);
    }
  };

  return (
    <div className="flex h-[85vh] items-center justify-center">
      {loaderToggle ? <Loader center backdrop size="lg" /> : <></>}
      <div className="top-[20%] w-[500px] md:w-[700px] rounded shadow border border-slate-400 p-10">
        <div className="fixed top-[80%] left-[80%]">
          <Whisper
            placement="top"
            trigger="hover"
            controlId="control-id-hover"
            speaker={speaker}
          >
            <Button appearance="link">Login details</Button>
          </Whisper>
        </div>
        <div className="pb-3 text-3xl font-semibold border-b border-slate-500">
          Login In
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="string"
            placeholder="Enter Username"
            defaultValue=""
            className="p-3 w-[100%] my-5 border border-slate-400 rounded "
            autoFocus
            {...register("username", {
              required: "Enter Username",
            })}
          />
          {errors.username && (
            <Message showIcon type="error">
              {errors.username.message}
            </Message>
          )}
          <input
            type="password"
            placeholder="Enter Password"
            default=""
            className="p-3 w-[100%] my-5 border   border-slate-500 rounded}"
            {...register("password", {
              required: "Enter Password",
              minLength: {
                value: 4,
                message: "Password must be atleast 4 character length",
              },
            })}
          />
          {errors.password && (
            <Message showIcon type="error">
              {errors.password.message}
            </Message>
          )}

          <button className="py-2 px-3 mr-5 rounded bg-blue-300  cursor-pointer active:scale-[0.9] duration-200 border border-slate-900">
            Log In
          </button>

          <button
            className="ml-5 text-blue-500 underline duration-200 hover:text-violet-800 "
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            or istead Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
