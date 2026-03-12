import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { onBoarding1, onBoarding2 } from '@/shared/constants/images'

const { width } = Dimensions.get('window')

interface Props {
    setStep: (step: number) => void
}

const OnBoarding = ({ setStep }: Props) => {
    const [currentPage, setCurrentPage] = useState(0)
    const scrollViewRef = useRef<ScrollView>(null)

    const slides = [
        {
            id: 1,
            title: 'Welcome To\nExpense Manager',
            image: onBoarding1,
        },
        {
            id: 2,
            title: 'Get Started\nWith NanoLoan',
            image: onBoarding2,
        },
    ]

    const handleMomentumScrollEnd = (event: any) => {
        const xOffset = event.nativeEvent.contentOffset.x
        const pageIndex = Math.round(xOffset / width)
        if (pageIndex !== currentPage) {
            setCurrentPage(pageIndex)
        }
    }

    const handleNext = () => {
        if (currentPage < slides.length - 1) {
            const nextPage = currentPage + 1
            scrollViewRef.current?.scrollTo({ x: nextPage * width, animated: true })
            setCurrentPage(nextPage)
        } else {
            setStep(2)
        }
    }

    return (
        <View className="flex-1 bg-[#00C897]">
            {/* Green header — title changes per slide */}
            <View className="bg-[#00C897] pt-[60px] pb-10 px-8 items-center">
                <Text className="text-[28px] font-extrabold text-[#0D2B1E] text-center leading-9">
                    {slides[currentPage].title}
                </Text>
            </View>

            {/* White card — rounded top corners */}
            <View className="flex-1 bg-[#F0FFF4] rounded-t-[40px] overflow-hidden mb-0">
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    scrollEventThrottle={16}
                    className="flex-1"
                >
                    {slides.map((slide) => (
                        <View
                            key={slide.id}
                            style={{ width }}
                            className="flex-1 items-center justify-center px-8"
                        >
                            {/* Coin illustration circle */}
                            <View className="w-[260px] h-[260px] rounded-[130px] bg-[#DFF7E2] items-center justify-center overflow-hidden">
                                <Image
                                    source={slide.image}
                                    className="w-[200px] h-[200px]"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Bottom: Next + dots */}
                <View className="items-center pb-12 gap-4">
                    <TouchableOpacity onPress={handleNext} activeOpacity={0.7}>
                        <Text className="text-[22px] font-bold text-[#1A1A1A] text-center">
                            Next
                        </Text>
                    </TouchableOpacity>

                    {/* Pagination dots */}
                    <View className="flex-row items-center gap-2">
                        {slides.map((_, index) => (
                            <View
                                key={index}
                                className={`${index === currentPage ? 'w-3 h-3 bg-[#00C897]' : 'w-[10px] h-[10px] bg-[#C8E6C9]'
                                    } rounded-[6px]`}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default OnBoarding