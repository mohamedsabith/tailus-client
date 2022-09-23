import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {gapi} from 'gapi-script';
import { toast } from 'react-toastify';
import { Button } from '@material-tailwind/react';
import { GoogleLogin } from 'react-google-login';
import { reset, login } from '../../features/auth/authSlice';
import logo from '../../assets/logo.svg';
import google from '../../assets/google.svg';
import signinImage from '../../assets/signin.jpg';

const SigninForm = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      Navigate('/dashboard');
      dispatch(reset());
    }
    gapi.load("client:auth2",()=>{
      gapi.auth2.init({clientId:process.env.REACT_APP_GOOGLE_ID})
    })
  }, [isSuccess,Navigate,dispatch]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const user = {
      email: result.email,
      password: res.googleId,
    };
    dispatch(login(user))
  };


  const onFailure = (err) => {
    toast.error('🦄 Something went wrong!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    console.log('Google sigin error : ', err);
    Navigate('/signup');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Email must be required')
        .max(255),
      password: Yup.string()
        .required('Password must be required')
        .max(255)
        .min(8),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  return (
    <React.Fragment>
      <div className="2xl:container h-screen m-auto">
        <div hidden className="fixed inset-0 w-7/12 lg:block">
          <img src={signinImage} alt="sideimage" />
        </div>
        <div
          hidden
          className="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block"
        ></div>
        <div className="relative h-full ml-auto lg:w-6/12 mt-14">
          <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
            <div className="space-y-4">
              <img src={logo} className="w-40" alt="tailus logo" />
              <p className="font-medium text-lg text-gray-600">
                Welcome to tailus ! Login first
              </p>
            </div>

            <div className="mt-10 grid gap-6">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                render={(renderProps) => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="py-3 px-6 rounded-xl bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200">
                        <div className="flex gap-4 justify-center">
                            <img src={google} className="w-5" alt="google icon" />
                            <span className="block w-max font-medium tracking-wide text-sm text-blue-700">Sign In with  Google</span>
                        </div>
                    </button>
                )}
      
                onSuccess={googleSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>

            <div className="mt-10 border-t">
              <span className="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">
                Or
              </span>
              {isError && (
                <span className="text-red-400 text-md">{message}</span>
              )}
            </div>

            <form className="space-y-4 py-6" onSubmit={formik.handleSubmit}>
              <div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched?.email && formik.errors?.email}
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className={`w-full rounded-xl border py-3 px-6 ring-gray-300 placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:outline-none ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.email}
                  </span>
                )}
              </div>

              <div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={formik.touched?.password && formik.errors?.password}
                  name="password"
                  type="password"
                  placeholder="What's the secret word ?"
                  className={`w-full rounded-xl border py-3 px-6 ring-gray-300 placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.password}
                  </span>
                )}
              </div>
              <div
                className="flex flex-col items-end"
                onClick={() => {
                  Navigate('/forgotPassword');
                }}
              >
                <button type="reset" className="w-max p-3 -mr-3">
                  <span className="text-sm tracking-wide text-blue-600">
                    Forgot password ?
                  </span>
                </button>
              </div>

              <div>
                {isLoading ? (
                  <button
                    type="button"
                    class="w-full flex items-center rounded-lg bg-blue-700 px-4 py-2 text-white"
                    disabled
                  >
                    <svg
                      class="mr-3 h-9 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span class="font-medium"> Processing... </span>
                  </button>
                ) : (
                  <Button
                  type='submit'
                    className="w-full px-6 py-3 rounded-xl bg-blue-500 transition hover:bg-blue-600 focus:bg-sky-600 active:bg-blue-800"
                    disabled={Boolean(
                      formik.errors.password ||
                        formik.values.password === '' ||
                        formik.errors.email ||
                        formik.values.email === ''
                    )}
                  >
                    <span className="font-semibold text-white text-lg">
                      login
                    </span>
                  </Button>
                )}
                <div
                  className="mt-4"
                  onClick={() => {
                    Navigate('/signup');
                  }}
                >
                  <span className="text-sm tracking-wide text-blue-600">
                    Create new account ?
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SigninForm;
