export function NavbarRegisterStudent() {
  return (
    <header className="flex w-screen top-0 bg-background shrink-0 justify-center items-center gap-2 border-b px-4 py-2">
      <img
        src="/images/obac_navbar_logo.png"
        alt="obac-logo"
        style={{
          width: "3.5rem",
          height: "3.5rem",
        }}
      />
      <span className="text-center text-lg py-2">
        วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
      </span>
    </header>
  );
}
