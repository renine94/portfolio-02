"use client";

import { useState, useMemo } from "react";

// 공지사항 타입 정의
interface Notice {
  id: number;
  title: string;
  content: string;
  category: string;
  priority: "일반" | "중요" | "긴급";
  isPinned: boolean;
  createdAt: string;
  updatedAt?: string;
  author: string;
  views: number;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
}

// 목 데이터 생성 함수
const generateMockNotices = (): Notice[] => {
  const categories = ["시스템", "대출상품", "이벤트", "정책변경", "서비스", "점검"];
  const priorities: Array<"일반" | "중요" | "긴급"> = ["일반", "중요", "긴급"];
  const authors = ["관리자", "대출팀", "시스템관리자", "고객센터", "상품팀"];

  const noticeTitles = [
    "[긴급] 시스템 점검으로 인한 서비스 일시 중단 안내",
    "[중요] 새로운 대출 상품 출시 안내",
    "2025년 설 연휴 운영시간 변경 안내",
    "대출 금리 인하 이벤트 실시",
    "개인정보처리방침 개정 안내",
    "모바일 앱 업데이트 안내 (v2.1.0)",
    "신용점수 조회 서비스 개선 사항",
    "카카오톡 상담 서비스 오픈",
    "대출 한도 산정 기준 개선 안내",
    "고객센터 운영시간 확대 공지",
    "[이벤트] 신규 가입 고객 특별 혜택",
    "SSL 보안 인증서 갱신 완료",
    "대출 승인 프로세스 간소화 안내",
    "여름휴가 기간 상담 시간 조정",
    "금융소비자보호법 시행에 따른 변경사항",
    "온라인 대출 신청 절차 개선",
    "비대면 본인인증 서비스 도입",
    "대출 상환 방법 다양화 안내"
  ];

  const noticeContents = [
    "안녕하세요. 시스템 점검으로 인해 2025년 1월 26일(일) 02:00~06:00까지 서비스가 일시 중단됩니다. 이용에 불편을 드려 죄송합니다.",
    "새로운 대출 상품이 출시되었습니다. 기존보다 더 낮은 금리와 높은 한도로 고객님께 더 나은 서비스를 제공하겠습니다.",
    "2025년 설 연휴 기간 동안 고객센터 운영시간이 변경됩니다. 1월 28일~30일은 오전 9시부터 오후 6시까지 운영됩니다.",
    "고객님들의 성원에 보답하고자 대출 금리 인하 이벤트를 실시합니다. 기간 중 신청하시면 최대 0.5%p 금리 혜택을 받으실 수 있습니다.",
    "개인정보보호법 개정에 따라 개인정보처리방침이 일부 변경되었습니다. 변경된 내용을 확인해주시기 바랍니다.",
    "모바일 앱이 업데이트되었습니다. 더욱 편리한 UI/UX와 새로운 기능들을 만나보세요. 앱스토어에서 업데이트해주세요.",
    "신용점수 조회 서비스가 개선되어 더욱 정확하고 빠른 조회가 가능해졌습니다. 실시간으로 신용점수 변동을 확인하세요.",
    "카카오톡을 통한 대출 상담 서비스가 시작되었습니다. 더욱 편리하게 언제든지 상담받으실 수 있습니다.",
    "고객님들의 편의를 위해 대출 한도 산정 기준이 개선되었습니다. 더 정확하고 합리적인 한도 산정이 가능해졌습니다.",
    "고객센터 운영시간이 확대되었습니다. 평일 오전 8시부터 오후 10시까지, 주말에도 오전 9시부터 오후 6시까지 운영합니다."
  ];

  return Array.from({ length: 20 }, (_, i) => {
    const priority = i < 2 ? "긴급" : i < 6 ? "중요" : "일반";
    const isPinned = i < 3;
    
    return {
      id: i + 1,
      title: noticeTitles[i] || `공지사항 제목 ${i + 1}`,
      content: noticeContents[i % noticeContents.length] + `\n\n자세한 내용은 고객센터(1588-0000)로 문의주시기 바랍니다. 항상 고객님의 편의를 위해 최선을 다하겠습니다.\n\n감사합니다.`,
      category: categories[Math.floor(Math.random() * categories.length)],
      priority,
      isPinned,
      createdAt: new Date(2025, 0, 25 - Math.floor(i / 2)).toLocaleDateString('ko-KR'),
      updatedAt: Math.random() > 0.7 ? new Date(2025, 0, 26 - Math.floor(i / 3)).toLocaleDateString('ko-KR') : undefined,
      author: authors[Math.floor(Math.random() * authors.length)],
      views: Math.floor(Math.random() * 500) + 50,
      attachments: Math.random() > 0.7 ? [
        {
          name: "공지사항_상세안내.pdf",
          size: "1.2MB",
          type: "pdf"
        }
      ] : undefined
    };
  });
};

export default function NoticePage() {
  const [notices] = useState<Notice[]>(generateMockNotices());
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedPriority, setSelectedPriority] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // 필터링된 공지사항 목록
  const filteredNotices = useMemo(() => {
    let filtered = notices.filter(notice => {
      const matchesCategory = selectedCategory === "전체" || notice.category === selectedCategory;
      const matchesPriority = selectedPriority === "전체" || notice.priority === selectedPriority;
      const matchesSearch = searchTerm === "" || 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPriority && matchesSearch;
    });

    // 고정 공지를 먼저 정렬하고, 그 다음 날짜순으로 정렬
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [notices, selectedCategory, selectedPriority, searchTerm]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const currentNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = ["전체", "시스템", "대출상품", "이벤트", "정책변경", "서비스", "점검"];
  const priorities = ["전체", "긴급", "중요", "일반"];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "긴급":
        return "text-red-600 bg-red-50 border-red-200";
      case "중요":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "일반":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "긴급":
        return (
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case "중요":
        return (
          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 페이지 헤더 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">공지사항</h1>
        <p className="text-gray-600">중요한 공지사항과 업데이트 소식을 확인하세요.</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="제목 또는 내용을 검색하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">중요도</label>
            <select
              value={selectedPriority}
              onChange={(e) => {
                setSelectedPriority(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>총 {filteredNotices.length}건의 공지사항</span>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("전체");
              setSelectedPriority("전체");
              setCurrentPage(1);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            필터 초기화
          </button>
        </div>
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        {/* 테이블 헤더 */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-1 text-center">분류</div>
            <div className="col-span-6">제목</div>
            <div className="col-span-2 text-center">작성자</div>
            <div className="col-span-1 text-center">작성일</div>
            <div className="col-span-1 text-center">조회수</div>
          </div>
        </div>

        {/* 공지사항 목록 */}
        <div className="divide-y divide-gray-200">
          {currentNotices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>검색 결과가 없습니다.</p>
            </div>
          ) : (
            currentNotices.map((notice, index) => (
              <div
                key={notice.id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedNotice(notice)}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* 번호 */}
                  <div className="col-span-1 text-center text-sm text-gray-500">
                    {notice.isPinned ? (
                      <svg className="w-4 h-4 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path fillRule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      (currentPage - 1) * itemsPerPage + index + 1
                    )}
                  </div>
                  
                  {/* 분류 */}
                  <div className="col-span-1 text-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {notice.category}
                    </span>
                  </div>
                  
                  {/* 제목 */}
                  <div className="col-span-6">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(notice.priority)}
                      <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(notice.priority)}`}>
                        {notice.priority}
                      </span>
                      {notice.isPinned && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                          고정
                        </span>
                      )}
                      <span className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                        {notice.title}
                      </span>
                      {notice.attachments && notice.attachments.length > 0 && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      )}
                      {notice.updatedAt && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          수정됨
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* 작성자 */}
                  <div className="col-span-2 text-center text-sm text-gray-600">
                    {notice.author}
                  </div>
                  
                  {/* 작성일 */}
                  <div className="col-span-1 text-center text-sm text-gray-500">
                    {notice.createdAt}
                  </div>
                  
                  {/* 조회수 */}
                  <div className="col-span-1 text-center text-sm text-gray-500">
                    {notice.views.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 모달 헤더 */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {getPriorityIcon(selectedNotice.priority)}
                    <span className={`text-sm px-3 py-1 rounded-full border ${getPriorityColor(selectedNotice.priority)}`}>
                      {selectedNotice.priority}
                    </span>
                    <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {selectedNotice.category}
                    </span>
                    {selectedNotice.isPinned && (
                      <span className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        고정 공지
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedNotice.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="text-gray-400 hover:text-gray-600 ml-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 공지사항 메타 정보 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">작성자:</span>
                    <span className="ml-2 text-gray-900">{selectedNotice.author}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">작성일:</span>
                    <span className="ml-2 text-gray-900">{selectedNotice.createdAt}</span>
                  </div>
                  {selectedNotice.updatedAt && (
                    <div>
                      <span className="font-medium text-gray-700">수정일:</span>
                      <span className="ml-2 text-gray-900">{selectedNotice.updatedAt}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">조회수:</span>
                    <span className="ml-2 text-gray-900">{selectedNotice.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* 공지사항 내용 */}
              <div className="mb-6">
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedNotice.content}
                  </div>
                </div>
              </div>

              {/* 첨부파일 */}
              {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">첨부파일</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedNotice.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border mb-2 last:mb-0">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="font-medium text-gray-900">{attachment.name}</div>
                            <div className="text-sm text-gray-500">{attachment.size}</div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          다운로드
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 모달 푸터 */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
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