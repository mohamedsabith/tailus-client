import React, { useState, useEffect } from 'react';
import OTPInput from 'otp-input-react';
import { Button } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyOtp, reset, register } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const OtpVerify = () => {
  const [Otp, setOTP] = useState('');
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...user.userDetails, Otp };
    dispatch(verifyOtp(data));
  };

  const resendOtp = (e) => {
    e.preventDefault();
    dispatch(register(...user.userDetails));
  };

  useEffect(() => {
    if (Otp.length === 4) {
      setValid(false);
    } else {
      setValid(true);
    }

    if (isSuccess) {
      Navigate('/dashboard');
      dispatch(reset());
    }
  }, [Otp, isSuccess, isLoading, Navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <div className="mt-36 before:py-20 px-3">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className="bg-white h-62 py-3 rounded-lg border-2 border-blue-700 text-center">
                <h1 className="text-2xl font-bold">OTP Verification</h1>
                <div className="flex flex-col mt-4">
                  <span>Enter the OTP you received at</span>
                  <span className="font-bold">
                    +91 ****** {user.userDetails.phoneNumber.slice(6)}
                  </span>
                  {isError && (
                    <span className="text-red-400 text-md">{message}</span>
                  )}
                </div>
                <form onSubmit={handleSubmit}>
                  <div
                    id="otp"
                    className="flex flex-row justify-center text-center px-2 mt-5"
                  >
                    <OTPInput
                      value={Otp}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={4}
                      otpType="number"
                      disabled={false}
                      autocomplete="off"
                      inputStyles={{
                        width: '2.5rem',
                        height: '2.5rem',
                        marginRight: '0.5rem',
                        fontSize: '1rem',
                        borderRadius: 4,
                        border: '1px solid rgba(0,0,0,0.3)',
                      }}
                    />
                  </div>
                  <Button
                    className="bg-blue-600 px-10 py-3 mt-5 rounded-md text-white hover:bg-blue-700"
                    type="submit"
                    style={{ color: 'white' }}
                    disabled={valid}
                  >
                    Submit OTP
                  </Button>
                </form>
                <div
                  onClick={resendOtp}
                  className="flex justify-center text-center mt-5"
                >
                  <a href="/">
                    <span>Haven't received yet? </span>
                    <span className="items-center text-blue-700 hover:text-blue-900 cursor-pointer font-bold">
                      Resend OTP
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OtpVerify;
