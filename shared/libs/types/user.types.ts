export interface User {
    id: string;
    fullName: string;
    email: string;
    username: string;
    learningLanguage: string;
    dateOfBirth: string;
    isEmailVerified: string;
    profileImage: string;
    level: string;
    role: string;
    token: string;
}


export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        username: string,
        password: string,
        learningLanguage: string
    ) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (userData: Partial<User>) => void;
}

export interface DeviceToken {
    fcmToken: string;
    deviceType: 'ios' | 'android';
    deviceId?: string;
    appVersion?: string;
    osVersion?: string;
}