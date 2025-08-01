"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between md:justify-start items-center px-4 py-4 h-20 md:gap-8">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold bg-black text-white p-2 rounded-md w-32 text-center">
            Logo
          </h1>
        </Link>

        {/* Desktop Links - hidden on mobile */}
        <nav className="hidden md:flex gap-8 text-lg font-bold">
          <Link href="/question" className="hover:text-blue-600 transition-colors">
            대출 문의
          </Link>
          <Link href="/my-inquiries" className="hover:text-blue-600 transition-colors">
            내 문의 글 찾기
          </Link>
          <Link href="/review" className="hover:text-blue-600 transition-colors">
            대출 후기
          </Link>
          <Link href="/notice" className="hover:text-blue-600 transition-colors">
            공지사항
          </Link>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">
            블로그
          </Link>
        </nav>

        {/* Hamburger Button - visible only on mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="메뉴 열기/닫기"
        >
          <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}></span>
        </button>
      </div>

      {/* Mobile Menu - slides down when hamburger is clicked */}
      <nav className={`md:hidden bg-white border-t shadow-lg transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="flex flex-col py-4 px-4 space-y-4">
          <Link 
            href="/question" 
            className="text-lg font-bold py-2 hover:text-blue-600 transition-colors border-b border-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            대출 문의
          </Link>
          <Link 
            href="/my-inquiries" 
            className="text-lg font-bold py-2 hover:text-blue-600 transition-colors border-b border-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            내 문의 글 찾기
          </Link>
          <Link 
            href="/review" 
            className="text-lg font-bold py-2 hover:text-blue-600 transition-colors border-b border-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            대출 후기
          </Link>
          <Link 
            href="/notice" 
            className="text-lg font-bold py-2 hover:text-blue-600 transition-colors border-b border-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            공지사항
          </Link>
          <Link 
            href="/blog" 
            className="text-lg font-bold py-2 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            블로그
          </Link>
        </div>
      </nav>
    </header>
  );
}