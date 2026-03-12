
import { apiUrl } from '@/shared/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLogout } from './features/auth/authSlice';
import { RootState } from './store';

const STORAGE_KEYS = {
    USER: '@user',
    TOKEN: '@token',
    DEVICE_TOKEN: '@deviceToken',
} as const;

const baseQuery = fetchBaseQuery({
    baseUrl: `${apiUrl}/v1`,
    prepareHeaders: async (headers, { getState }) => {
        const state: RootState = getState() as RootState;
        const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN) || state.auth.token;
        headers.delete('Content-Type');
        headers.set('Accept', 'application/json');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithAutoLogout = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    // Check for 401 Unauthorized status
    if (result.error && result.error.status === 401) {
        console.log('🔒 Unauthorized access detected (401). Auto-logging out user...');
        console.log('API Error:', JSON.stringify(result.error, null, 2));

        try {
            // Clear AsyncStorage
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.USER,
                STORAGE_KEYS.TOKEN,
                STORAGE_KEYS.DEVICE_TOKEN
            ]);
            console.log('✅ AsyncStorage cleared');

            // Dispatch logout action to clear Redux state
            api.dispatch(setLogout());
            console.log('✅ Redux state cleared');
        } catch (error) {
            console.error('❌ Error during auto-logout:', error);
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAutoLogout,
    tagTypes: ['user'],
    endpoints: () => ({})
});
