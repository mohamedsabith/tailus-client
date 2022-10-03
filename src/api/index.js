import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

//Auth Route
export const signUpUserApi = (userData) => API.post('/auth/signup', userData);
export const otpVerificationApi = (data) => API.post('/auth/verifyOtp',data);
export const signInUserApi = (userData) => API.post('/auth/signin',userData);
export const forgetPasswordApi = (data) => API.post('/auth/forgotPassword',data);
export const resetPasswordApi = (data) => API.post('/auth/resetPassword',data);
export const googleSignupApi = (userData) => API.post('auth/googleSignup',userData);

//Post Route
export const getTimelinePosts = (userId,token) => API.get(`/post/timeline/${userId}`,{headers:{AuthToken:token}})
export const createNewPost = (postData,token) => API.post('/post', postData,{headers:{AuthToken:token}})
export const likePost = (postId,userId,token) => API.put(`/user/like/${postId}`,userId,{headers:{AuthToken:token}})

//User Route
export const getUserData = (userId) => API.get(`/user/${userId}`)
export const suggestionUsers = (token,userId) => API.get(`/user/suggestion/${userId}`,{headers:{AuthToken:token}})
export const followAndUnfollow = (userId,followUserId,token) => API.put(`/user/follow/${userId}`,followUserId,{headers:{AuthToken:token}})