"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// 대출후기 타입 정의
interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;
  loanType: string;
  loanAmount: number;
  bank: string;
  authorName: string;
  authorAge: number;
  authorJob: string;
  createdAt: string;
  likes: number;
  isHelpful: boolean;
  tags: string[];
}

// 목 데이터 생성 함수
const generateMockReviews = (): Review[] => {
  const loanTypes = ["신용대출", "담보대출", "정책자금", "사업자대출", "주택담보대출"];
  const banks = ["KB국민은행", "신한은행", "하나은행", "우리은행", "NH농협은행", "IBK기업은행", "카카오뱅크", "토스뱅크"];
  const jobs = ["직장인", "자영업자", "프리랜서", "공무원", "주부", "학생"];
  const names = ["김철수", "이영희", "박민수", "최지영", "정우진", "한소라", "임동혁", "송미영"];
  
  const reviewTitles = [
    "급전이 필요할 때 도움이 되었어요",
    "금리가 생각보다 괜찮았습니다",
    "빠른 심사로 만족스러웠어요",
    "친절한 상담으로 좋은 조건을 받았습니다",
    "처음 대출인데 설명을 잘해주셨어요",
    "다른 곳보다 금리가 낮아서 선택했어요",
    "온라인으로 간편하게 신청했습니다",
    "담당자가 성실하게 도와주셨어요",
    "조건이 까다롭지 않아서 좋았습니다",
    "대출 한도가 충분해서 만족해요",
    "상환 조건이 유연해서 부담없어요",
    "중도상환수수료가 없어서 선택했어요"
  ];

  const reviewContents = [
    "갑작스럽게 급전이 필요한 상황이었는데, 빠른 심사와 승인으로 정말 도움이 되었습니다. 금리도 생각보다 괜찮았고, 상담 과정에서 친절하게 설명해주셔서 안심하고 진행할 수 있었어요.",
    "여러 은행을 비교해본 결과 이곳의 금리가 가장 합리적이었습니다. 온라인으로 간편하게 신청할 수 있어서 편리했고, 심사 결과도 빨리 나와서 만족스러웠어요.",
    "처음 대출을 받아보는 거라 걱정이 많았는데, 담당자분이 처음부터 끝까지 친절하게 안내해주셔서 수월하게 진행할 수 있었습니다. 필요한 서류나 절차에 대해서도 자세히 설명해주셨어요.",
    "사업 확장을 위해 자금이 필요했는데, 사업자 대출 조건이 다른 곳보다 좋았습니다. 담보 없이도 충분한 한도를 받을 수 있어서 사업 계획대로 진행할 수 있었어요.",
    "주택 구매를 위한 담보대출을 받았는데, 금리 혜택도 좋고 상환 조건도 유연해서 만족합니다. 중도상환수수료도 없어서 여유가 생기면 빨리 갚을 수 있을 것 같아요.",
    "신용점수가 그리 높지 않아서 걱정했는데, 생각보다 좋은 조건으로 승인받을 수 있었습니다. 상담 과정에서 신용 관리 방법에 대해서도 조언해주셔서 도움이 되었어요.",
    "카드빚이 많아서 정리하고 싶었는데, 대환대출로 월 상환액을 많이 줄일 수 있었습니다. 이자 부담이 줄어서 경제적으로 여유가 생겼어요.",
    "정책자금 대출을 받았는데, 절차가 복잡할 줄 알았는데 담당자분이 모든 과정을 도와주셔서 어렵지 않게 진행할 수 있었습니다. 저금리로 받을 수 있어서 매우 만족해요."
  ];

  const tagOptions = ["빠른심사", "저금리", "친절상담", "온라인신청", "중도상환수수료무료", "높은한도", "유연한조건", "담보불요"];

  return Array.from({ length: 24 }, (_, i) => {
    const rating = Math.floor(Math.random() * 3) + 3; // 3-5점
    const randomTags = tagOptions.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2);
    
    return {
      id: i + 1,
      title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
      content: reviewContents[Math.floor(Math.random() * reviewContents.length)],
      rating,
      loanType: loanTypes[Math.floor(Math.random() * loanTypes.length)],
      loanAmount: (Math.floor(Math.random() * 20) + 1) * 500, // 500만원 ~ 1억원
      bank: banks[Math.floor(Math.random() * banks.length)],
      authorName: names[Math.floor(Math.random() * names.length)],
      authorAge: Math.floor(Math.random() * 40) + 25, // 25-65세
      authorJob: jobs[Math.floor(Math.random() * jobs.length)],
      createdAt: new Date(2025, 0, 25 - Math.floor(i / 2)).toLocaleDateString('ko-KR'),
      likes: Math.floor(Math.random() * 50) + 5,
      isHelpful: Math.random() > 0.5,
      tags: randomTags
    };
  });
};

export default function ReviewPage() {
  const [reviews] = useState<Review[]>(generateMockReviews());
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedLoanType, setSelectedLoanType] = useState("전체");
  const [selectedBank, setSelectedBank] = useState("전체");
  const [selectedRating, setSelectedRating] = useState("전체");
  const [sortBy, setSortBy] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 필터링된 후기 목록
  const filteredReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const matchesLoanType = selectedLoanType === "전체" || review.loanType === selectedLoanType;
      const matchesBank = selectedBank === "전체" || review.bank === selectedBank;
      const matchesRating = selectedRating === "전체" || 
        (selectedRating === "5점" && review.rating === 5) ||
        (selectedRating === "4점 이상" && review.rating >= 4) ||
        (selectedRating === "3점 이상" && review.rating >= 3);

      return matchesLoanType && matchesBank && matchesRating;
    });

    // 정렬
    switch (sortBy) {
      case "최신순":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "평점순":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "추천순":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
    }

    return filtered;
  }, [reviews, selectedLoanType, selectedBank, selectedRating, sortBy]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 통계 계산
  const stats = useMemo(() => {
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const ratingCounts = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      totalReviews: reviews.length,
      avgRating: Math.round(avgRating * 10) / 10,
      ratingCounts
    };
  }, [reviews]);

  const loanTypes = ["전체", "신용대출", "담보대출", "정책자금", "사업자대출", "주택담보대출"];
  const banks = ["전체", "KB국민은행", "신한은행", "하나은행", "우리은행", "NH농협은행", "IBK기업은행", "카카오뱅크", "토스뱅크"];
  const ratings = ["전체", "5점", "4점 이상", "3점 이상"];
  const sortOptions = ["최신순", "평점순", "추천순"];

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const starSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${starSize} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating}.0)</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* 페이지 헤더 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">대출 후기</h1>
        
        {/* 통계 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.totalReviews}</div>
            <div className="text-sm text-gray-600">총 후기 수</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              {renderStars(Math.round(stats.avgRating), "lg")}
            </div>
            <div className="text-sm text-gray-600">평균 평점</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {Math.round((stats.ratingCounts[5] + stats.ratingCounts[4]) / stats.totalReviews * 100)}%
            </div>
            <div className="text-sm text-gray-600">만족도 (4점 이상)</div>
          </div>
        </div>
      </div>

      {/* 필터 및 정렬 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">대출 종류</label>
            <select
              value={selectedLoanType}
              onChange={(e) => {
                setSelectedLoanType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loanTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">은행/기관</label>
            <select
              value={selectedBank}
              onChange={(e) => {
                setSelectedBank(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {banks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">평점</label>
            <select
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ratings.map(rating => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">정렬</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>총 {filteredReviews.length}건의 후기</span>
          <button
            onClick={() => {
              setSelectedLoanType("전체");
              setSelectedBank("전체");
              setSelectedRating("전체");
              setSortBy("최신순");
              setCurrentPage(1);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            필터 초기화
          </button>
        </div>
      </div>

      {/* 후기 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedReview(review)}
          >
            <div className="p-6">
              {/* 후기 헤더 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  {renderStars(review.rating, "sm")}
                  <span className="text-xs text-gray-500">{review.createdAt}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{review.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {review.loanType}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {review.bank}
                  </span>
                </div>
              </div>

              {/* 후기 내용 */}
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{review.content}</p>

              {/* 태그 */}
              <div className="flex flex-wrap gap-1 mb-4">
                {review.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 작성자 정보 */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{review.authorName.charAt(0)}** ({review.authorJob}, {review.authorAge}세)</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{review.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 text-sm rounded-md ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      )}

      {/* 상세보기 모달 */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 모달 헤더 */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    {renderStars(selectedReview.rating, "md")}
                    <button
                      onClick={() => setSelectedReview(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedReview.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {selectedReview.loanType}
                    </span>
                    <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {selectedReview.bank}
                    </span>
                    <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      {selectedReview.loanAmount.toLocaleString()}만원
                    </span>
                  </div>
                </div>
              </div>

              {/* 대출 정보 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">대출 정보</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">대출 종류:</span>
                    <span className="ml-2 text-gray-900">{selectedReview.loanType}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">금융기관:</span>
                    <span className="ml-2 text-gray-900">{selectedReview.bank}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">대출금액:</span>
                    <span className="ml-2 text-gray-900">{selectedReview.loanAmount.toLocaleString()}만원</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">작성일:</span>
                    <span className="ml-2 text-gray-900">{selectedReview.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* 후기 내용 */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">후기 내용</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedReview.content}</p>
              </div>

              {/* 태그 */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">태그</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedReview.tags.map((tag, index) => (
                    <span key={index} className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 작성자 정보 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">작성자 정보</h3>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>{selectedReview.authorName.charAt(0)}** ({selectedReview.authorJob}, {selectedReview.authorAge}세)</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>{selectedReview.likes}</span>
                    </div>
                    {selectedReview.isHelpful && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        도움됨
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedReview(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}