import axios from "axios";

const AUTH_API = axios.create({ baseURL: 'https://tailus-api-production.up.railway.app/api/v1/auth' });

export const signUpUserApi = (userData) => AUTH_API.post('/signup', userData);
export const otpVerificationApi = (data) => AUTH_API.post('/verifyOtp',data);
export const signInUserApi = (userData) => AUTH_API.post('/signin',userData);
export const forgetPasswordApi = (data) => AUTH_API.post('/forgotPassword',data);
export const resetPasswordApi = (data) => AUTH_API.post('/resetPassword',data);
export const googleSignupApi = (userData) => AUTH_API.post('/googleSignup',userData);