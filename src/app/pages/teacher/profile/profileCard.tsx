import React from "react";

interface Props {
  isLoading: boolean;
  imgPath: string | null;
  // FnameTH :string
  // LNameTH :string
  // FNameEN :string
  // LNameEN :string
}

export default function ProfileCard({ isLoading, imgPath }: Props) {
  return (
    <div className="w-full sm:place-items-center lg:place-items-end ">
      <div className="w-4/5 bg-blue-800 px-2 py-10 rounded-md my-0">
        <div className="grid grid-cols-[30%_70%]">
          <div className="place-items-center">
            <img
              src={imgPath || "/asset/user.jpg"}
              className="rounded-md"
              width={100}
              height={100}
            />
          </div>
          <div className="text-white text-lg w-full ">
            <div className="my-2">
              <span className="text-xl font-semibold">ชื่อ :</span> นาย
              ภัทรจาริน
            </div>
            <div className="my-2">
              <span className="text-xl font-semibold">นามสกุล :</span> นภากาญจน์
            </div>
          </div>
        </div>

        {/* information */}
        <div className="text-white px-5">
          <div className="my-3">
            <span className="text-xl font-semibold">First Name :</span> Mr.
            Patarajarin
          </div>
          <div className="my-3">
            <span className="text-xl font-semibold">Last Name :</span>Napakarn
          </div>
          <div className="my-3">
            <span className="text-xl font-semibold">Card ID :</span>
            1104-300-128-569
          </div>
        </div>
        <div className="my-20 text-xl text-center text-white font-semibold">
          Card Information
        </div>
      </div>
    </div>
  );
}
