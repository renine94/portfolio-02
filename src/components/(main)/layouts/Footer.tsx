export default function Footer() {
  return (
    <footer className="bg-white py-4 px-4 border-t border-gray-200">
      <div className="flex flex-col md:flex-row md:justify-start md:items-center max-w-7xl gap-4 md:gap-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold bg-black text-white px-4 py-2 rounded w-32 text-center">
            Logo
          </h1>
        </div>

        {/* Company Information */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-black text-sm font-light">
          <span>대출을 찾는 사람들</span>
          <span>E-mail : help@loanstory.com</span>
          <span>대표 : 김성현</span>
          <span>204-80-89651</span>
          <span>서빙고로 17 센트럴파크타워</span>
        </div>
      </div>
    </footer>
  );
}