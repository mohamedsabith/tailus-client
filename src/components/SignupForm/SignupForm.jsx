import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import { Button } from '@material-tailwind/react';
import {gapi} from 'gapi-script'
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { register, reset, googleSignup } from '../../features/auth/authSlice';
import logo from '../../assets/logo.svg';
import signupImage from '../../assets/signup.jpg';
import googleSvg from '../../assets/google.svg';

const SignupForm = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, active } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isSuccess && active){
       Navigate("/dashboard")
    }else if (isSuccess) {
      Navigate('/otpverify');
      dispatch(reset());
    }
    gapi.load("client:auth2",()=>{
      gapi.auth2.init({clientId:process.env.REACT_APP_GOOGLE_ID})
    })
  }, [isSuccess,active,Navigate,dispatch]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    // const token = res?.tokenId;
    const user = {
      email: result.email,
      fullname: result?.name,
      password: res.googleId,
    };
    dispatch(googleSignup(user))
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

  const phoneSchema = Yup.string()
    .phone('IN', true, 'Please enter a valid phone number.')
    .required('Phone number must be required');

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      email: '',
      username: '',
      fullname: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      phoneNumber: phoneSchema,
      email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Email must be required')
        .max(255),
      username: Yup.string()
        .trim('The username cannot include leading and trailing spaces')
        .min(3, 'The username needs to be at least 3 character')
        .required('Username must be required')
        .lowercase('Username must be lowercase')
        .max(255),
      fullname: Yup.string().required('Full name must be required'),
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
      dispatch(register(values));
    },
  });

  return (
    <React.Fragment>
      <div style={{}}  className="2xl:container h-screen m-auto">
        <div hidden className="fixed inset-0 w-7/12 lg:block mt-20">
          <img src={signupImage} alt="sideimage" />
        </div>
        <div
          hidden
          className="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block"
        ></div>
        <div className="relative h-full ml-auto lg:w-6/12">
          <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12 mt-7">
            <div className="space-y-4">
              <img src={logo} className="w-40" alt="tailus logo" />
              <p className="font-medium text-lg text-gray-600">
                Enter your details and start journey with us.
              </p>
            </div>

            <div className="mt-3 grid gap-6">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                render={(renderProps) => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="py-3 px-6 rounded-xl bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200">
                        <div className="flex gap-4 justify-center">
                            <img src={googleSvg} className="w-5" alt="google icon" />
                            <span className="block w-max font-medium tracking-wide text-sm text-blue-700">Sign up with  Google</span>
                        </div>
                    </button>
                )}
      
                onSuccess={googleSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>

            <div className="mt-5 border-t">
              <span className="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">
                Or
              </span>
              {isError && (
                <span className="text-red-400 text-md">{message}</span>
              )}
            </div>

            <form className="space-y-3 py-6" onSubmit={formik.handleSubmit}>
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
                  value={formik.values.phoneNumber}
                  error={
                    formik.touched?.phoneNumber && formik.errors?.phoneNumber
                  }
                  type="text"
                  name="phoneNumber"
                  placeholder="Your Number"
                  className={`w-full rounded-xl border py-3 px-6 ring-gray-300 placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:outline-none ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }`}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.phoneNumber}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    error={formik.touched?.username && formik.errors?.username}
                    type="text"
                    name="username"
                    placeholder="Your Username"
                    className={`w-full rounded-xl border py-3 px-6 ring-gray-300 placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:outline-none ${
                      formik.touched.username && formik.errors.username
                        ? 'border-red-400'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <span className="text-red-400 text-sm">
                      {formik.errors.username}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullname}
                    error={formik.touched?.fullname && formik.errors?.fullname}
                    name="fullname"
                    type="text"
                    placeholder="Your Full Name"
                    className={`w-full rounded-xl border py-3 px-6 ring-gray-300 placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:outline-none ${
                      formik.touched.fullname && formik.errors.fullname
                        ? 'border-red-400'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.fullname && formik.errors.fullname && (
                    <span className="text-red-400 text-sm">
                      {formik.errors.fullname}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched?.password && formik.errors?.password}
                    name="password"
                    type="password"
                    placeholder="Password"
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

                <div className="flex flex-col">
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
                    placeholder="Confirm Password"
                    className={`w-full rounded-xl border py-3 px-6 ring-gray-300 placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:outline-none ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? 'border-red-400'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <span className="text-red-400 text-sm">
                        {formik.errors.confirmPassword}
                      </span>
                    )}
                </div>
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
                    type="submit"
                    className="w-full px-6 py-3 rounded-xl bg-blue-500 transition hover:bg-blue-600 focus:bg-sky-600 active:bg-blue-800"
                    disabled={Boolean(
                      formik.errors.email ||
                        formik.values.email === '' ||
                        formik.errors.number ||
                        formik.values.number === '' ||
                        formik.errors.username ||
                        formik.values.username === '' ||
                        formik.errors.fullname ||
                        formik.values.fullname === '' ||
                        formik.errors.password ||
                        formik.values.password === '' ||
                        formik.errors.confirmPassword ||
                        formik.values.confirmPassword === ''
                    )}
                  >
                    <span className="font-semibold text-white text-lg">
                      Signup
                    </span>
                  </Button>
                )}
                <div
                  className="mt-4"
                  onClick={() => {
                    Navigate('/');
                  }}
                >
                  <span className="text-sm tracking-wide text-blue-600">
                    Have an account ?
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

export default SignupForm;
