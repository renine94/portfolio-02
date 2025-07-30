import Image from "next/image";
import BannerCarousel from "@/components/(main)/BannerCarousel";

// 게시글 데이터 상수 정의
const loanQuestions = () => {
    // 랜덤 질문 목록
    const questionList = [
        "시설자 대출 다 안값되는데 다른 빌릴 없읍서군요?",
        "5분 안에 업무 가능한 발식이 진짜 있나요?",
        "신용점수 낮아도 다 안니냐는데요, 대역이 과년도?",
        "새로 떠오는 금리가 저금 없으면 빌릴 없더군요?",
        "내일 카드 페체가 당외다 들이 없어도, 급부한",
        "주말 장사 요며 서원 원료헌데, 배가키 가슬원씀야?",
        "은행에서 거절당했는데 다른 곳은 어떨까요?",
        "대출 한도가 부족해요. 더 받을 수 있나요?",
        "금리가 너무 높은데 낮출 수 있는 방법이 있나요?",
        "대출 심사 기간이 얼마나 걸리나요?",
        "무직자도 대출 받을 수 있나요?",
        "기존 대출을 갚고 새로 받을 수 있나요?",
        "담보 대출과 신용 대출 중 어느 게 좋나요?",
        "대출 상환 방법을 바꿀 수 있나요?",
        "카드빚이 많은데 대출로 정리할 수 있나요?"
    ];

    // 랜덤 작성자 목록
    const authorList = [
        "지금전체금융", "마동일모임", "대춘전체기업", "지영일정당시", 
        "무식거계사", "자영업주협회", "카드론상담", "부동산투자",
        "직장인모임", "소상공인회", "금융상담소", "대출문의",
        "경제연구소", "재정관리팀", "투자분석가"
    ];

    // 날짜 목록
    const dateList = [
        "2025.07.25", "2025.07.24", "2025.07.23", "2025.07.22", "2025.07.21"
    ];

    const data = [];
    
    // 반복문으로 10개 데이터 생성
    for (let i = 0; i < 10; i++) {
        const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)];
        const randomAuthor = authorList[Math.floor(Math.random() * authorList.length)];
        const randomDate = dateList[Math.floor(Math.random() * dateList.length)];
        const isAnswered = Math.random() > 0.5; // 50% 확률로 답변 완료/답변 전
        
        data.push({
            id: i + 1,
            question: randomQuestion,
            author: randomAuthor,
            date: randomDate,
            status: isAnswered ? "답변 완료" : "답변 전",
            isAnswered: isAnswered
        });
    }
    
    return data;
};

// 대출 정보 인기글 상수 정의
const loanInfoPopularPosts = () => {
    // 랜덤 제목 목록
    const titleList = [
        "대출 승인율을 높이는 신용점수 관리법",
        "무직자도 가능한 대출 상품 총정리",
        "금리 인하 요구권 신청 방법과 조건",
        "대출 갈아타기 전 반드시 확인할 사항들",
        "개인사업자 대출 한도 늘리는 방법",
        "담보대출 vs 신용대출 선택 가이드",
        "대출 심사 통과를 위한 필수 서류",
        "카드대출 vs 은행대출 비교분석",
        "주택담보대출 금리 비교 및 선택법",
        "소상공인 정책자금 대출 신청 가이드",
        "대출 연체 시 대처방법과 해결책",
        "P2P 대출의 장단점과 주의사항",
        "대출 중도상환 수수료 절약 방법",
        "신용회복 후 대출 가능 시기",
        "대출 보증서 발급 조건과 절차"
    ];

    // 랜덤 카테고리 목록
    const categoryList = [
        "신용대출", "담보대출", "정책자금", "개인사업자",
        "주택담보", "카드대출", "P2P대출", "소상공인",
        "금리정보", "대출가이드", "신용관리", "대출상품",
        "금융정보", "대출팁", "재정관리"
    ];

    // 날짜 목록
    const dateList = [
        "2025.07.25", "2025.07.24", "2025.07.23", "2025.07.22", 
        "2025.07.21", "2025.07.20", "2025.07.19"
    ];

    const data = [];
    
    // 반복문으로 6개 데이터 생성
    for (let i = 0; i < 9; i++) {
        const randomTitle = titleList[Math.floor(Math.random() * titleList.length)];
        const randomCategory = categoryList[Math.floor(Math.random() * categoryList.length)];
        const randomDate = dateList[Math.floor(Math.random() * dateList.length)];
        // 다양한 이미지를 위해 랜덤 ID 사용
        const randomImageId = Math.floor(Math.random() * 1000) + 100;
        
        data.push({
            id: i + 1,
            thumbnail: `https://picsum.photos/100/100?random=${randomImageId}`,
            title: randomTitle,
            category: randomCategory,
            createdAt: randomDate,
        });
    }
    
    return data;
};

const loanReviews = () => {
    return [
        {
            id: 1,
            content: "대출 후기 1 내용",
        },
        {
            id: 2,
            content: "대출 후기 2 내용",
        },
        {
            id: 3,
            content: "대출 후기 3 내용",
        },
        
    ]
};

const loanNotices = () => {
    return [
        {
            id: 1,
            content: "공지사항 1 내용",
            createdAt: "2025.07.25",
        },
        {
            id: 2,
            content: "공지사항 2 내용",
            createdAt: "2025.07.24",
        },
        {
            id: 3,
            content: "공지사항 3 내용",
            createdAt: "2025.07.23",
        },
        
    ]
};

export default function MainPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-1">
            {/* Main Left */}
            <div className="col-span-1 p-4 rounded-md flex flex-col gap-6">
                {/* 배너 캐로셀 */}
                <BannerCarousel />

                {/* 실시간 대출 고민 현황 */}
                <div className="bg-white p-4 rounded-md">
                    <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
                        <h1 className="text-lg font-bold">실시간 대출 고민 현황</h1>
                        <p className="text-sm text-gray-500">더보기</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        {loanQuestions().map((item) => (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_120px_80px_80px] text-sm gap-4 py-1">
                                <p className="col-span-1 min-w-0 truncate">{item.question}</p>
                                <p className="col-span-1 min-w-0 truncate max-w-20 hidden md:block">{item.author}</p>
                                <p className="col-span-1 whitespace-nowrap hidden md:block">{item.date}</p>
                                <p className={`col-span-1 whitespace-nowrap text-center hidden md:block ${item.isAnswered
                                    ? 'text-blue-600'
                                    : 'text-gray-600'
                                    }`}>
                                    {item.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 대출 정보 인기글 */}
                <div className="bg-white p-4 rounded-md">
                    <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
                        <h1 className="text-lg font-bold">대출 정보 인기글</h1>
                        <p className="text-sm text-gray-500">더보기</p>
                    </div>

                    <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:overflow-x-visible">
                        {loanInfoPopularPosts().map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-md flex-shrink-0 w-60 md:w-auto">
                                <Image src={item.thumbnail} alt={item.title} priority width={100} height={100} className="w-full h-32 object-cover mb-2 rounded-lg" />
                                <h1 className="text-sm font-bold">{item.title}</h1>
                                <div className="flex justify-between">
                                    <p className="text-xs text-gray-500">{item.category}</p>
                                    <p className="text-xs text-gray-500">{item.createdAt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Right */}
            <div className="col-span-1 p-4 rounded-md flex flex-col gap-6">
                {/* 대출 문의하기 */}
                <div className="bg-white p-4 rounded-md">
                    <div className="flex flex-col gap-2 text-center p-2">
                        <p className="text-xs text-gray-500">지금 바로 내 상황에 맞는 대출을 알아보세요</p>
                        <button className="bg-blue-600 font-bold text-white px-6 py-2 rounded-lg h-16">대출 문의하기</button>
                    </div>
                </div>

                {/* 대출 후기 */}
                <div className="bg-white p-4 rounded-md">
                    <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
                        <h1 className="text-lg font-bold">대출 후기</h1>
                        <p className="text-sm text-gray-500">더보기</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        {loanReviews().map((item) => (
                            <div key={item.id} className="text-sm gap-2 py-1">
                                <p className="min-w-0 truncate">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 공지사항 */}
                <div className="bg-white p-4 rounded-md">
                    <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
                        <h1 className="text-lg font-bold">공지사항</h1>
                        <p className="text-sm text-gray-500">더보기</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        {loanNotices().map((item) => (
                            <div key={item.id} className="text-sm gap-2 py-1 flex justify-between">
                                <p className="min-w-0 truncate">{item.content}</p>
                                <p className="text-xs text-gray-500">{item.createdAt}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}