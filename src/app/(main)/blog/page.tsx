"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// 블로그 포스트 타입 정의
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  thumbnail: string;
  createdAt: string;
  readTime: number;
  views: number;
  likes: number;
  isFeatured: boolean;
  isPopular: boolean;
}

// 목 데이터 생성 함수
const generateMockBlogPosts = (): BlogPost[] => {
  const categories = ["대출가이드", "금융뉴스", "투자정보", "신용관리", "부동산", "경제트렌드"];
  const authors = [
    { name: "김금융", avatar: "https://picsum.photos/100/100?random=1", role: "금융 전문가" },
    { name: "이대출", avatar: "https://picsum.photos/100/100?random=2", role: "대출 상담사" },
    { name: "박투자", avatar: "https://picsum.photos/100/100?random=3", role: "투자 분석가" },
    { name: "최부동산", avatar: "https://picsum.photos/100/100?random=4", role: "부동산 전문가" },
    { name: "정경제", avatar: "https://picsum.photos/100/100?random=5", role: "경제 연구원" }
  ];

  const blogTitles = [
    "2025년 대출 금리 전망과 대출 전략",
    "신용점수 올리는 확실한 방법 7가지",
    "주택담보대출 vs 전세자금대출 완벽 비교",
    "무직자도 받을 수 있는 대출 상품 총정리",
    "카드대출에서 은행대출로 갈아타기 가이드",
    "대출 심사 통과율을 높이는 노하우",
    "소상공인 정책자금 신청 완벽 가이드",
    "대출 연체 시 대처방법과 신용회복 전략",
    "부동산 투자를 위한 레버리지 활용법",
    "개인회생 vs 개인파산, 어떤 것을 선택할까?",
    "대출 중도상환, 언제가 가장 유리할까?",
    "P2P 대출의 모든 것, 장단점과 주의사항",
    "직장인을 위한 스마트한 자금 관리법",
    "창업 자금 조달의 다양한 방법들",
    "금리 상승기, 대출자가 알아야 할 것들",
    "대출 보증서 발급 조건과 활용 방법",
    "신혼부부를 위한 대출 상품 가이드",
    "프리랜서의 대출 승인 확률 높이는 법",
    "대출 갈아타기의 최적 타이밍",
    "재테크 초보자를 위한 대출 활용법"
  ];

  const blogExcerpts = [
    "2025년 금리 변동 전망과 함께 개인별 상황에 맞는 최적의 대출 전략을 제시합니다. 금리 상승기에 대출받는 방법부터 기존 대출 관리법까지 상세히 알아보세요.",
    "신용점수 향상을 위한 구체적이고 실천 가능한 방법들을 소개합니다. 단기간에 점수를 올릴 수 있는 팁부터 장기적인 신용 관리 전략까지 모두 담았습니다.",
    "주택 구매를 위한 두 가지 대출 상품의 차이점과 각각의 장단점을 비교 분석합니다. 내 상황에 맞는 최적의 선택을 도와드립니다.",
    "소득이 불안정하거나 무직 상태에서도 받을 수 있는 다양한 대출 상품들을 정리했습니다. 각 상품의 조건과 신청 방법을 자세히 설명합니다.",
    "높은 금리의 카드대출에서 저금리 은행대출로 갈아타는 과정을 단계별로 안내합니다. 갈아타기 시 주의사항과 유리한 조건도 함께 소개합니다."
  ];

  const blogContents = [
    `2025년 금융시장의 변화와 함께 대출 시장도 새로운 국면을 맞이하고 있습니다.

## 금리 전망

전문가들은 2025년 상반기까지는 현재의 고금리 기조가 유지될 것으로 전망하고 있습니다. 하반기부터는 점진적인 금리 인하가 시작될 가능성이 높습니다.

### 주요 변화 요인
- 글로벌 인플레이션 동향
- 중앙은행의 통화정책 변화
- 국내 경제 성장률 회복세

## 대출 전략

현재 상황에서는 다음과 같은 전략을 권장합니다.

### 1. 고정금리 vs 변동금리
금리 상승기에는 고정금리가 유리할 수 있지만, 향후 금리 인하를 고려하면 변동금리도 검토해볼 만합니다.

### 2. 대출 시기 조절
급하지 않은 대출이라면 하반기까지 기다리는 것도 좋은 전략입니다.

### 3. 금융기관 비교
은행별로 금리 차이가 크므로 반드시 여러 곳을 비교해보시기 바랍니다.

자세한 상담은 전문가와 함께 진행하시길 권장합니다.`,

    `신용점수는 대출뿐만 아니라 다양한 금융 서비스 이용에 중요한 지표입니다.

## 신용점수 올리는 7가지 방법

### 1. 연체 기록 없애기
가장 중요한 것은 현재 연체 중인 금액을 즉시 상환하는 것입니다.

### 2. 신용카드 이용률 관리
신용카드 한도의 30% 이하로 사용하는 것이 좋습니다.

### 3. 다양한 금융거래 이력 쌓기
- 적금, 예금 거래
- 공과금 자동이체
- 신용카드 적절한 사용

### 4. 신용정보 오류 정정
본인의 신용정보를 정기적으로 확인하고 오류가 있다면 즉시 정정 신청하세요.

### 5. 장기간 거래관계 유지
한 금융기관과 오래 거래할수록 신용점수에 유리합니다.

### 6. 소액결제 서비스 활용
통신비, 보험료 등을 신용카드로 자동결제하면 좋습니다.

### 7. 신용관리 서비스 이용
정기적으로 신용점수를 확인하고 관리하세요.

이러한 방법들을 꾸준히 실천하면 3-6개월 내에 눈에 띄는 개선 효과를 볼 수 있습니다.`
  ];

  const tagOptions = ["금리", "신용점수", "담보대출", "신용대출", "갈아타기", "심사", "연체", "투자", "부동산", "창업", "재테크", "정책자금"];

  return Array.from({ length: 20 }, (_, i) => {
    const randomTags = tagOptions.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2);
    const randomImageId = Math.floor(Math.random() * 1000) + 100;
    
    return {
      id: i + 1,
      title: blogTitles[i] || `블로그 포스트 제목 ${i + 1}`,
      excerpt: blogExcerpts[i % blogExcerpts.length],
      content: blogContents[i % blogContents.length],
      category: categories[Math.floor(Math.random() * categories.length)],
      tags: randomTags,
      author: authors[Math.floor(Math.random() * authors.length)],
      thumbnail: `https://picsum.photos/400/250?random=${randomImageId}`,
      createdAt: new Date(2025, 0, 25 - i).toLocaleDateString('ko-KR'),
      readTime: Math.floor(Math.random() * 8) + 3, // 3-10분
      views: Math.floor(Math.random() * 5000) + 100,
      likes: Math.floor(Math.random() * 100) + 10,
      isFeatured: i < 3,
      isPopular: Math.random() > 0.7
    };
  });
};

export default function BlogPage() {
  const [posts] = useState<BlogPost[]>(generateMockBlogPosts());
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedTag, setSelectedTag] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("최신순");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // 필터링된 포스트 목록
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory;
      const matchesTag = selectedTag === "전체" || post.tags.includes(selectedTag);
      const matchesSearch = searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFeatured = !showFeaturedOnly || post.isFeatured;

      return matchesCategory && matchesTag && matchesSearch && matchesFeatured;
    });

    // 정렬
    switch (sortBy) {
      case "최신순":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "인기순":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "좋아요순":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
    }

    return filtered;
  }, [posts, selectedCategory, selectedTag, searchTerm, sortBy, showFeaturedOnly]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 인기 포스트
  const popularPosts = useMemo(() => {
    return posts.filter(post => post.isPopular).slice(0, 5);
  }, [posts]);

  // 추천 태그
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [posts]);

  const categories = ["전체", "대출가이드", "금융뉴스", "투자정보", "신용관리", "부동산", "경제트렌드"];
  const tags = ["전체", ...allTags.slice(0, 10)];
  const sortOptions = ["최신순", "인기순", "좋아요순"];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* 페이지 헤더 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">금융 블로그</h1>
        <p className="text-gray-600">대출과 금융에 대한 유용한 정보와 노하우를 공유합니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-3">
          {/* 검색 및 필터 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="제목 또는 내용 검색"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
                <select
                  value={selectedTag}
                  onChange={(e) => {
                    setSelectedTag(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
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
              <div className="flex items-center gap-4">
                <span>총 {filteredPosts.length}개의 글</span>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => {
                      setShowFeaturedOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded"
                  />
                  <span>추천글만 보기</span>
                </label>
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("전체");
                  setSelectedTag("전체");
                  setSortBy("최신순");
                  setShowFeaturedOnly(false);
                  setCurrentPage(1);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                필터 초기화
              </button>
            </div>
          </div>

          {/* 포스트 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                onClick={() => setSelectedPost(post)}
              >
                {/* 썸네일 */}
                <div className="relative">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  {post.isFeatured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        추천
                      </span>
                    </div>
                  )}
                  {post.isPopular && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        인기
                      </span>
                    </div>
                  )}
                </div>

                {/* 콘텐츠 */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}분 읽기</span>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 작성자 및 메타 정보 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.author.name}</div>
                        <div className="text-xs text-gray-500">{post.author.role}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {post.createdAt}
                    </div>
                  </div>

                  {/* 통계 */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {post.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {post.likes}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
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
        </div>

        {/* 사이드바 */}
        <div className="lg:col-span-1">
          {/* 인기 포스트 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              인기 포스트
            </h3>
            <div className="space-y-4">
              {popularPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.views.toLocaleString()} 조회</span>
                      <span>•</span>
                      <span>{post.likes} 좋아요</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 추천 태그 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              인기 태그
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 상세보기 모달 */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 모달 헤더 */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {selectedPost.category}
                    </span>
                    {selectedPost.isFeatured && (
                      <span className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        추천
                      </span>
                    )}
                    {selectedPost.isPopular && (
                      <span className="text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                        인기
                      </span>
                    )}
                    <span className="text-sm text-gray-500">{selectedPost.readTime}분 읽기</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedPost.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-gray-600 ml-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 작성자 및 메타 정보 */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Image
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{selectedPost.author.name}</div>
                    <div className="text-sm text-gray-600">{selectedPost.author.role}</div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{selectedPost.createdAt}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {selectedPost.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {selectedPost.likes}
                    </span>
                  </div>
                </div>
              </div>

              {/* 썸네일 */}
              <div className="mb-6">
                <Image
                  src={selectedPost.thumbnail}
                  alt={selectedPost.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* 포스트 내용 */}
              <div className="mb-6">
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedPost.content}
                  </div>
                </div>
              </div>

              {/* 태그 */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">태그</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <span key={index} className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 공유 버튼 */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">공유하기:</span>
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.777-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.336-.445-.342-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.394.513-.394.513s-.677.678-.677 1.654.394 1.605.678 1.697c.099.099 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.906.130 1.247.079.380-.058 1.171-.480 1.338-.943.164-.464.164-.863.114-.946-.049-.099-.182-.148-.38-.247z"/>
                        </svg>
                      </button>
                      <button className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}