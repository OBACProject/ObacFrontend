export default function HomeFooter() {
  return (
    <footer className="w-full bg-[#0C243C] px-4 sm:px-6 lg:px-10 py-10">
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-6 lg:gap-12 text-white">

        {/* Logo + School Name */}
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="hidden sm:block bg-white rounded-full p-2 w-fit h-fit">
            <img
              src="/images/obac_navbar_logo.png"
              alt="obac-logo"
              className="h-20 w-auto"
            />
          </div>

          {/* School Name */}
          <div className="flex flex-col justify-center font-inter font-bold">
            <span className="text-base sm:text-lg">
              Ekawit Business Administration Vocational College
            </span>
            <span className="text-sm sm:text-base font-normal">
              วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
            </span>
          </div>
        </div>

        {/* Address + Contact */}
        <div className="text-sm sm:text-base leading-relaxed text-center lg:text-left max-w-md mx-auto lg:mx-0">
          <p>
            5 ซอย ลาดกระบัง 34/1 ถนนลาดกระบัง แขวงลาดกระบัง เขตลาดกระบัง<br />
            กรุงเทพมหานคร 10520
          </p>
          <p className="mt-2">ติดต่อ : 02 327 2992</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-white mt-8 text-xs sm:text-sm">
        <p>©2024 วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ | OBAC</p>
      </div>
    </footer>
  );
}
