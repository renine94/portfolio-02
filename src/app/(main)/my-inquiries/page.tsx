"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// 문의글 타입 정의
interface Inquiry {
  id: number;
  title: string;
  content: string;
  category: string;
  status: "답변 대기" | "답변 완료" | "처리 중";
  createdAt: string;
  authorName: string;
  authorPhone: string;
  answer?: string;
  answeredAt?: string;
}

// 목 데이터 생성 함수
const generateMockInquiries = (): Inquiry[] => {
  const categories = ["신용대출", "담보대출", "정책자금", "개인사업자", "주택담보"];
  const statuses: Array<"답변 대기" | "답변 완료" | "처리 중"> = ["답변 대기", "답변 완료", "처리 중"];
  const names = ["김대출", "이금융", "박상담", "최은행", "정신용"];
  const phones = ["010-1234-5678", "010-2345-6789", "010-3456-7890", "010-4567-8901", "010-5678-9012"];
  
  const questions = [
    "무직자도 대출 받을 수 있나요?",
    "신용점수가 낮은데 대출 가능한가요?",
    "기존 대출을 갈아타고 싶어요",
    "사업자 대출 한도가 궁금합니다",
    "주택담보대출 금리 문의드려요",
    "카드빚 정리 대출 가능한가요?",
    "급하게 돈이 필요한데 빠른 대출 있나요?",
    "대출 심사 기간이 얼마나 걸리나요?",
    "중도상환수수료가 없는 대출 있나요?",
    "소상공인 정책자금 신청 방법이 궁금해요"
  ];

  const answers = [
    "안녕하세요. 무직자분도 조건에 따라 대출이 가능합니다. 자세한 상담을 위해 연락드리겠습니다.",
    "신용점수가 낮으시더라도 다양한 대출 상품이 있습니다. 개별 상담을 통해 최적의 상품을 찾아드리겠습니다.",
    "기존 대출 갈아타기 상품을 안내해드리겠습니다. 현재 대출 조건을 확인 후 더 나은 조건으로 도와드리겠습니다.",
    "사업자 대출 한도는 사업 규모와 매출에 따라 달라집니다. 자세한 한도 조회를 도와드리겠습니다.",
    "현재 주택담보대출 우대금리 상품을 안내해드릴 수 있습니다. 상담 신청해주세요."
  ];

  return Array.from({ length: 15 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const hasAnswer = status === "답변 완료";
    
    return {
      id: i + 1,
      title: questions[Math.floor(Math.random() * questions.length)],
      content: `${questions[Math.floor(Math.random() * questions.length)]} 자세한 상담 부탁드립니다.`,
      category: categories[Math.floor(Math.random() * categories.length)],
      status,
      createdAt: new Date(2025, 0, 25 - i).toLocaleDateString('ko-KR'),
      authorName: names[Math.floor(Math.random() * names.length)],
      authorPhone: phones[Math.floor(Math.random() * phones.length)],
      answer: hasAnswer ? answers[Math.floor(Math.random() * answers.length)] : undefined,
      answeredAt: hasAnswer ? new Date(2025, 0, 26 - i).toLocaleDateString('ko-KR') : undefined,
    };
  });
};

export default function MyInquiriesPage() {
  const [inquiries] = useState<Inquiry[]>(generateMockInquiries());
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  // 필터링된 문의글 목록
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inquiry => {
      const matchesSearch = inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inquiry.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "전체" || inquiry.category === selectedCategory;
      const matchesStatus = selectedStatus === "전체" || inquiry.status === selectedStatus;
      const matchesName = searchName === "" || inquiry.authorName.includes(searchName);
      const matchesPhone = searchPhone === "" || inquiry.authorPhone.includes(searchPhone);

      return matchesSearch && matchesCategory && matchesStatus && matchesName && matchesPhone;
    });
  }, [inquiries, searchTerm, selectedCategory, selectedStatus, searchName, searchPhone]);

  const categories = ["전체", "신용대출", "담보대출", "정책자금", "개인사업자", "주택담보"];
  const statuses = ["전체", "답변 대기", "답변 완료", "처리 중"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "답변 완료":
        return "text-blue-600 bg-blue-50";
      case "처리 중":
        return "text-orange-600 bg-orange-50";
      case "답변 대기":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 페이지 헤더 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">내 문의글 찾기</h1>
        <p className="text-gray-600">이름과 전화번호로 문의하신 글을 찾아보세요.</p>
      </div>

      {/* 검색 필터 영역 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 이름으로 검색 */}
          <div>
            <label htmlFor="searchName" className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              id="searchName"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="문의자 이름을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 전화번호로 검색 */}
          <div>
            <label htmlFor="searchPhone" className="block text-sm font-medium text-gray-700 mb-2">
              전화번호
            </label>
            <input
              type="text"
              id="searchPhone"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="전화번호를 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 키워드 검색 */}
          <div>
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">
              내용 검색
            </label>
            <input
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="문의 내용을 검색하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 카테고리 필터 */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* 상태 필터 */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              처리 상태
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 검색 결과 헤더 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            검색 결과 ({filteredInquiries.length}건)
          </h2>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("전체");
              setSelectedStatus("전체");
              setSearchName("");
              setSearchPhone("");
            }}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            필터 초기화
          </button>
        </div>
      </div>

      {/* 문의글 목록 */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600">검색 조건을 확인하고 다시 시도해보세요.</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedInquiry(inquiry)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-500">#{inquiry.id}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {inquiry.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{inquiry.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{inquiry.content}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>작성자: {inquiry.authorName}</span>
                    <span>연락처: {inquiry.authorPhone}</span>
                  </div>
                  <span>작성일: {inquiry.createdAt}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 상세보기 모달 */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 모달 헤더 */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-500">#{selectedInquiry.id}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {selectedInquiry.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(selectedInquiry.status)}`}>
                      {selectedInquiry.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedInquiry.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 문의 정보 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">작성자:</span>
                    <span className="ml-2 text-gray-900">{selectedInquiry.authorName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">연락처:</span>
                    <span className="ml-2 text-gray-900">{selectedInquiry.authorPhone}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">작성일:</span>
                    <span className="ml-2 text-gray-900">{selectedInquiry.createdAt}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">카테고리:</span>
                    <span className="ml-2 text-gray-900">{selectedInquiry.category}</span>
                  </div>
                </div>
              </div>

              {/* 문의 내용 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">문의 내용</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.content}</p>
                </div>
              </div>

              {/* 답변 내용 */}
              {selectedInquiry.answer && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">답변</h3>
                    <span className="text-sm text-gray-500">({selectedInquiry.answeredAt})</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.answer}</p>
                  </div>
                </div>
              )}

              {/* 모달 푸터 */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedInquiry(null)}
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