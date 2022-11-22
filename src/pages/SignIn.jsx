import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleAuth from "../components/GoogleAuth";
import Lottie from "lottie-react";
import vrarCubes from "../assets/animation/vrar-cubes.json";

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState("");

  const onSubmit = async (data) => {
    setData(JSON.stringify(data));

    const { email, password } = data;

    // sign in

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Something went wront with login");
    }
  };

  return (
    <div className="container px-2 mx-auto">
      <div className="grid lg:grid-cols-12 items-center min-h-screen py-5 lg:py-20">
        <div className="lg:col-span-6 max-w-[36rem] h-max p-2 lg:p-6 space-y-4 md:space-y-6 sm:p-8 w-full bg-white rounded-lg shadow lg:dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-blue-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="name@company.com"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      Please insert a valid Email address
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="••••••••"
                    {...register("password", { required: true, maxLength: 80 })}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      This field is required.
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-sm text-blue-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="relative sm:col-span-2">
                  <div className="flex w-full justify-center items-center">
                    <hr className="my-4 w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <span className="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-800">
                      or
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <GoogleAuth />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:col-span-6">
          <Lottie animationData={vrarCubes} />;
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SignIn;
