import SwitchMenu from "./switchMenu";

export default function Page() {
  return (
    <header className="mx-4 sm:mx-10 lg:mx-10 p-4 ">
      <div className="w-full flex justify-start ">
        <SwitchMenu />
      </div>
    </header>
  );
}
