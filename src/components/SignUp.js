import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { Message, Loader, useToaster, Notification } from "rsuite";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [loaderToggle, setLoaderToggle] = useState(false);
  const toaster = useToaster();

  const successMessage = (
    <Notification type="success" header="success" closable>
      <p>Account creation successful</p>
    </Notification>
  );
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoaderToggle(true);
      await setDoc(doc(db, "users", data.username), {
        password: data.password,
      });

      await setDoc(doc(db, "cart", data.username), {});
      await setDoc(doc(db, "order", data.username), {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderToggle(false);
      clearErrors();
      reset();
      toaster.push(successMessage, { placement: "topCenter", duration: 2000 });
      navigate("/login");
    }
  };
  let pwd = watch("password");

  return (
    <>
      {loaderToggle ? (
        <div>
          <Loader center size="lg" backdrop />
        </div>
      ) : (
        <></>
      )}
      <div className="flex h-[85vh] items-center justify-center">
        <div className="top-[20%] w-[500px] md:w-[700px] rounded shadow border border-slate-400 p-10">
          <div className="pb-3 text-3xl font-semibold border-b border-slate-500">
            Sign Up
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
                minLength: {
                  value: 4,
                  message: "username must be atleast 4 character length",
                },
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
                required: "You must specify a Password",
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
            <input
              type="password"
              placeholder="Re-enter Password"
              defaultValue=""
              className="p-3 w-[100%] my-5 border   border-slate-500 rounded"
              {...register("reEnterPassword", {
                validate: (value) => value === pwd || "passwords do not match",
              })}
            />
            {errors.reEnterPassword && (
              <Message showIcon type="error">
                {errors.reEnterPassword.message}
              </Message>
            )}
            {errors.reEnterPassword &&
              errors.reEnterPassword.type === "passMatch" && (
                <Message showIcon type="error">
                  Password does not match
                </Message>
              )}

            <div>
              <button className="py-2 px-3 mr-5 rounded bg-blue-300 cursor-pointer active:scale-[0.9] duration-200 border border-slate-900">
                Sign Up
              </button>
              <button
                className="py-2 px-3 mr-5 rounded bg-slate-300 cursor-pointer active:scale-[0.9] duration-200 border border-slate-900"
                onClick={(e) => {
                  e.preventDefault();
                  clearErrors();
                  reset();
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
