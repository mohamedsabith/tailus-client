import React,{useEffect} from 'react';
import logo from '../../assets/logo.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { resetPassword, reset } from '../../features/auth/authSlice';
import { ToastContainer, toast} from "react-toastify";

const ResetPassword = () => {

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { token } = useParams();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success('🦄 Your password has been changed successfully.', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setTimeout(()=>{
        Navigate("/")
        dispatch(reset())
      },2040)
    }
  }, [isSuccess,Navigate,dispatch]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password must be required')
        .max(255)
        .min(8)
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          'Your password and confirmation password do not match'
        )
        .required('Your password and confirmation password do not match'),
    }),
    onSubmit: (values) => {
      const data={...values,token}
      dispatch(resetPassword(data))
    },
  });

  if(isLoading){
    return <Spinner/>
   }

  return (
    <React.Fragment>
      <ToastContainer/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-44 h-8 mr-2" src={logo} alt="logo" />
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            {isError && (
                <span className="text-red-400 text-md">{message}</span>
              )}
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={formik.touched?.password && formik.errors?.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }`}
                  required
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.password}
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched?.confirmPassword &&
                    formik.errors?.confirmPassword
                  }
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }`}
                  required
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <span className="text-red-400 text-sm">
                      {formik.errors.confirmPassword}
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
                disabled={Boolean(
                  formik.errors.password ||
                    formik.values.password === '' ||
                    formik.errors.confirmPassword ||
                    formik.values.confirmPassword === ''
                )}
                className="w-full text-white disabled:bg-primary-400 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ResetPassword;
