# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

**개발 서버 실행**:
```bash
pnpm dev
# Turbopack을 사용한 Next.js 개발 서버
# http://localhost:3000 에서 실행
```

**빌드 및 배포**:
```bash
pnpm build    # 프로덕션 빌드
pnpm start    # 프로덕션 서버 시작
pnpm lint     # ESLint 검사 실행
```

**패키지 매니저**: 이 프로젝트는 `pnpm`을 사용합니다 (pnpm-lock.yaml 파일 확인)

## 아키텍처 개요

**Next.js 15 기반의 대출 상담 웹사이트**로 App Router, TypeScript, Tailwind CSS를 사용합니다.

### 라우트 구조
- **이중 레이아웃 시스템**:
  - `(main)` 라우트 그룹: 일반 사용자용 대출 정보 사이트 (Navbar/Footer 포함)
  - `admin` 라우트: 관리자 인터페이스 (별도 네비게이션)
  - 루트 레이아웃: 전역 스타일과 한국어 설정 관리

### 컴포넌트 구조
```
src/components/
├── (main)/           # 메인 사이트 컴포넌트
│   ├── layouts/      # 메인 사이트용 Navbar, Footer
│   └── BannerCarousel.tsx
├── admin/            # 관리자 전용 컴포넌트
│   └── layouts/      # 관리자 네비게이션
└── common/           # 공통 컴포넌트
    ├── providers/    # Context 프로바이더
    └── ui/          # 재사용 가능한 UI 컴포넌트
```

### 주요 특징
- **목 데이터 생성**: 메인 페이지에서 클라이언트 사이드 함수로 랜덤 대출 질문, 인기글, 후기, 공지사항 생성
- **반응형 디자인**: 모바일에서 데스크톱까지 적응하는 그리드 레이아웃
- **이미지 최적화**: picsum.photos에 대한 리모트 패턴이 설정된 Next.js Image 컴포넌트
- **라우트 그룹**: Next.js 13+ 라우트 그룹을 사용한 레이아웃 구성

### 기술 스택
- **프레임워크**: Next.js 15.4.4 (App Router)
- **언어**: TypeScript (strict 모드)
- **스타일링**: Tailwind CSS v4 + PostCSS
- **런타임**: React 19.1.0
- **빌드 도구**: 개발용 Turbopack
- **린팅**: Next.js 권장 설정의 ESLint

### 경로 별칭
- `@/*`가 `./src/*`에 매핑되어 깔끔한 import 가능

### 콘텐츠 영역
메인 페이지는 대출 관련 콘텐츠를 섹션별로 구성:
- 배너 캐로셀
- 실시간 대출 고민 현황
- 대출 정보 인기글
- 대출 후기 및 공지사항
- 대출 문의 버튼