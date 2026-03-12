import { DeviceToken, User } from '@/shared/libs/types/user.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  deviceToken: DeviceToken | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check stored auth
  error: null,
  deviceToken: null,
};


const STORAGE_KEYS = {
  USER: '@user',
  TOKEN: '@token',
  DEVICE_TOKEN: '@deviceToken',
} as const;


// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setDeviceToken: (state, action: PayloadAction<DeviceToken | null>) => {
      state.deviceToken = action.payload;
      // Store FCM token in AsyncStorage
      if (action.payload) {
        AsyncStorage.setItem(STORAGE_KEYS.DEVICE_TOKEN, action.payload.fcmToken);
      }
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.deviceToken = null;
      // Clear AsyncStorage
      AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.TOKEN, STORAGE_KEYS.DEVICE_TOKEN]);
    },
  },
});

export const {
  setUser,
  setToken,
  setIsAuthenticated,
  setIsLoading,
  setError,
  clearError,
  setDeviceToken,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;