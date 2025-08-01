"use client";

import { useState } from "react";

export default function QuestionPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    loanType: "",
    amount: "",
    content: "",
    privacyAgreed: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === "phone") {
      // 전화번호 포맷팅 처리
      const numericValue = value.replace(/[^0-9]/g, ''); // 숫자만 추출
      let formattedValue = numericValue;
      
      if (numericValue.length >= 3) {
        if (numericValue.length >= 7) {
          // 010-1234-1234 형식
          formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`;
        } else {
          // 010-1234 형식
          formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAgreed) {
      alert("개인정보 처리방침에 동의해주세요.");
      return;
    }

    console.log("Form submitted:", formData);
    alert("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");

    // 폼 초기화
    setFormData({
      name: "",
      phone: "",
      loanType: "",
      amount: "",
      content: "",
      privacyAgreed: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 헤더 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">대출 문의</h1>
        <p className="text-gray-600 text-lg">
          궁금한 사항이 있으시면 언제든지 문의해주세요.
          전문 상담사가 빠르고 정확한 답변을 드리겠습니다.
        </p>
      </div>

      {/* 안내 정보 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">24시간</div>
          <div className="text-gray-700">온라인 접수 가능</div>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">30분</div>
          <div className="text-gray-700">평균 답변 시간</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
          <div className="text-gray-700">무료 상담</div>
        </div>
      </div>

      {/* 문의 폼 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">문의 접수</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 이름 */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="이름을 입력해주세요"
              />
            </div>

            {/* 연락처 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                maxLength={13} // 010-1234-1234 (13자리)
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="010-0000-0000"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 대출 종류 */}
            <div>
              <label htmlFor="loanType" className="block text-sm font-semibold text-gray-700 mb-2">
                대출 종류 <span className="text-red-500">*</span>
              </label>
              <select
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">선택해주세요</option>
                <option value="personal">개인신용대출</option>
                <option value="mortgage">주택담보대출</option>
                <option value="business">사업자대출</option>
                <option value="car">자동차담보대출</option>
                <option value="other">기타</option>
              </select>
            </div>

            {/* 희망 대출 금액 */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                희망 대출 금액 <span className="text-red-500">*</span>
              </label>
              <select
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">선택해주세요</option>
                <option value="under-1000">1,000만원 미만</option>
                <option value="1000-3000">1,000만원 ~ 3,000만원</option>
                <option value="3000-5000">3,000만원 ~ 5,000만원</option>
                <option value="5000-10000">5,000만원 ~ 1억원</option>
                <option value="over-10000">1억원 이상</option>
              </select>
            </div>
          </div>

          {/* 문의 내용 */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
              문의 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="궁금한 사항을 자세히 적어주세요. 더 자세한 정보를 제공해주실수록 정확한 답변을 드릴 수 있습니다."
            />
          </div>

          {/* 개인정보 처리방침 동의 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacyAgreed"
                name="privacyAgreed"
                checked={formData.privacyAgreed}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 rounded appearance-none bg-white border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-[10px] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center"
              />
              <label htmlFor="privacyAgreed" className="text-sm text-gray-700">
                <span className="font-semibold text-red-500">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                <div className="mt-2 text-xs text-gray-500">
                  수집항목: 이름, 연락처, 대출 관련 정보<br />
                  이용목적: 대출 상담 및 서비스 제공<br />
                  보유기간: 상담 완료 후 1년
                </div>
              </label>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              문의 접수하기
            </button>
          </div>
        </form>
      </div>

      {/* 추가 안내 */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-800 mb-3">📞 빠른 상담을 원하시나요?</h3>
        <p className="text-yellow-700 mb-3">
          전화 상담을 원하시면 <strong className="text-yellow-800">1588-0000</strong>으로 연락주세요.
        </p>
        <p className="text-sm text-yellow-600">
          상담 시간: 평일 09:00~18:00, 토요일 09:00~13:00 (일요일, 공휴일 휴무)
        </p>
      </div>
    </div>
  );
} 