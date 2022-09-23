import React,{useEffect} from 'react';
import logo from '../../assets/logo.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux' 
import {forgotPassword,reset} from '../../features/auth/authSlice'
import Spinner from '../Spinner/Spinner';
import { ToastContainer, toast} from "react-toastify";

const ForgetPassword = () => {
   
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success('🦄 Reset link sent to your email!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      dispatch(reset());
    }
  }, [isSuccess,dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Email must be required')
        .max(255),
    }),
    onSubmit: (values) => {
      dispatch(forgotPassword(values))
    },
  });

  if(isLoading){
    return <Spinner/>
   }

  return (
    <React.Fragment>
      <ToastContainer/>
      <section className="dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-40 lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-40 h-8 mr-2" src={logo} alt="logo" />
          </a>
          <div className="w-full p-6 bg-white rounded-lg drop-shadow-xl dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h6 className="mb-1 text-sm font-thin leading-tight tracking-tight text-gray-900 dark:text-white">
              Enter the email address associated with your account <br /> and
              we'll send you a link to reset your passwod.
            </h6>
            {isError && (
                <span className="text-red-400 text-md">{message}</span>
              )}
            <form
              className="space-y-4 md:space-y-5 mt-3"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  dot={true}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched?.email && formik.errors?.email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.email}
                  </span>
                )}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    for="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{' '}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="/"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 disabled:bg-primary-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={Boolean(
                    formik.errors.email ||
                    formik.values.email === ''
                )}
              >
                Forgot password
              </button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ForgetPassword;
