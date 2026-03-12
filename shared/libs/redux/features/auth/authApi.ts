import { apiSlice } from '@/shared/libs/redux/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    usersAuthLogin: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    usersAuthLoginUsername: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-in-username',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    usersAuthRegister: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    usersAuthSocialLogin: builder.mutation({
      query: (data: FormData) => ({
        url: '/auth/social-login',
        method: 'POST',
        body: data,
      }),
    }),
    usersAuthCheckEmail: builder.mutation({
      query: (email) => ({
        url: '/auth/check-email',
        method: 'POST',
        body: { email },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    usersAuthCheckUsername: builder.mutation({
      query: (username) => ({
        url: '/auth/check-username',
        method: 'POST',
        body: { username },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    usersAuthSendOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/send-otp',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    usersAuthVerifyOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    usersAuthResetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    userProfile: builder.query({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
    }),
    userProfileUpdate: builder.mutation({
      query: (data: FormData) => ({
        url: '/users/profile',
        method: 'POST',
        body: data,
        // Don't set Content-Type header for FormData - let the browser/React Native set it automatically
        // This is important for multipart/form-data with proper boundary
      }),
    }),
  }),
});

export const {
  useUsersAuthLoginMutation,
  useUsersAuthLoginUsernameMutation,
  useUsersAuthRegisterMutation,
  useUsersAuthSocialLoginMutation,
  useUsersAuthCheckEmailMutation,
  useUsersAuthCheckUsernameMutation,
  useUsersAuthSendOtpMutation,
  useUsersAuthVerifyOtpMutation,
  useUsersAuthResetPasswordMutation,
  useUserProfileQuery,
  useLazyUserProfileQuery,
  useUserProfileUpdateMutation,
  util: { getRunningQueriesThunk },
} = authApi;
