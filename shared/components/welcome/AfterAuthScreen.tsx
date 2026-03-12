import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { splashLogo } from '@/shared/constants/images'
import { useRouter } from 'expo-router';

const AfterAuthScreen = () => {
    const router = useRouter();

    const handleStartLearning = () => {
        //@ts-ignore
        router.push('/auth/register');
    };

    const handleLogin = () => {
        //@ts-ignore
        router.push(`/auth/login`);
    };

    return (
        <View className="flex-1 bg-[#00C897]">
            {/* Header */}
            <View className="pt-16 pb-10 items-center">
                <Text className="text-[26px] font-bold text-[#0D2B1E]">
                    Welcome
                </Text>
            </View>

            {/* White card */}
            <View className="flex-1 bg-[#F0FFF4] rounded-tl-[40px] rounded-tr-[40px] items-center justify-between pb-10 pt-0">

                {/* Logo + App name — centered in card */}
                <View className="flex-1 items-center justify-center gap-6">
                    {/* Logo */}
                    <Image
                        source={splashLogo}
                        className="w-[160px] h-[100px]"
                        resizeMode="contain"
                    />
                    {/* App name */}
                    <Text className="text-[40px] font-extrabold text-[#00C897]">
                        Nano Loan
                    </Text>
                </View>

                {/* Bottom buttons */}
                <View className="w-full flex-row items-center justify-between px-6 gap-4">
                    {/* Sign Up */}
                    <TouchableOpacity
                        onPress={handleStartLearning}
                        activeOpacity={0.8}
                        className="flex-1 h-[54px] bg-[#E4F7EE] rounded-full items-center justify-center"
                    >
                        <Text className="text-[17px] font-semibold text-[#1A1A1A]">
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                    {/* Log In */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        activeOpacity={0.8}
                        className="flex-1 h-[54px] bg-[#00C897] rounded-full items-center justify-center"
                    >
                        <Text className="text-[17px] font-semibold text-white">
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default AfterAuthScreen