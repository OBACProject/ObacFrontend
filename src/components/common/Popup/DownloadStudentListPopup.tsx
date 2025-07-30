"use client"
interface PropsDelete {
     onClosePopUp: (value: boolean) => void;
}

export default function DownloadStudentListPopup({
    onClosePopUp
}:PropsDelete) {

  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white shadow-lg shadow-gray-400 rounded-lg w-fit z-100 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-3xl font-extrabold text-black text-center py-20 px-40">
            ยังไม่พร้อมใช้งาน
        </div>
      </div>
    </div>
  );
}
