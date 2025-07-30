'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

export default function BannerCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // 랜덤 배너 이미지 4개
    const bannerImages = [
        {
            id: 1,
            src: "https://picsum.photos/800/200?random=1",
            title: "슬기로운 대학생활",
            subtitle: "대학생 서포터즈 모집",
            description: "지금 바로 신청하여 다양한 혜택을 받아보세요!"
        },
        {
            id: 2,
            src: "https://picsum.photos/800/200?random=2",
            title: "금융 상품 안내",
            subtitle: "맞춤형 대출 서비스",
            description: "최적의 조건으로 대출 상담을 받아보세요!"
        },
        {
            id: 3,
            src: "https://picsum.photos/800/200?random=3",
            title: "특별 혜택",
            subtitle: "신규 가입 이벤트",
            description: "지금 가입하면 특별한 혜택을 드립니다!"
        },
        {
            id: 4,
            src: "https://picsum.photos/800/200?random=4",
            title: "전문 상담",
            subtitle: "1:1 맞춤 컨설팅",
            description: "전문가와 함께 최적의 해결책을 찾아보세요!"
        }
    ];

    // 자동 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
        }, 5000); // 5초마다 변경

        return () => clearInterval(interval);
    }, [bannerImages.length]);

    // 이전 슬라이드
    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    // 다음 슬라이드
    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    };

    return (
        <div className="relative h-52 rounded-md overflow-hidden">
            {/* 슬라이드 컨테이너 */}
            <div 
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {bannerImages.map((banner, index) => (
                    <div key={banner.id} className="relative min-w-full h-full">
                        {/* 배경 이미지 */}
                        <div className="absolute inset-0">
                            <Image
                                src={banner.src}
                                alt={banner.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>

                        {/* 컨텐츠 오버레이 */}
                        <div className="relative z-10 h-full flex items-center justify-between p-6">
                            <div className="text-white">
                                <h1 className="text-lg md:text-xl font-bold mb-1">
                                    {banner.title}
                                </h1>
                                <h2 className="text-xl md:text-2xl font-bold mb-2">
                                    {banner.subtitle}
                                </h2>
                                <p className="text-sm opacity-90">
                                    {banner.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 이전/다음 버튼 */}
            <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all z-20 hover:scale-110"
            >
                ‹
            </button>
            <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all z-20 hover:scale-110"
            >
                ›
            </button>

            {/* 인디케이터 */}
            <div className="absolute bottom-2 right-0 transform -translate-x-1/4 flex space-x-3 z-20">
                {bannerImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-300 rounded-full ${
                            index === currentIndex 
                                ? 'w-6 h-3 bg-blue-600 shadow-lg' 
                                : 'w-3 h-3 bg-white bg-opacity-50 hover:bg-opacity-70'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
