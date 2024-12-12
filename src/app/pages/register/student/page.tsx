'use client'
import {
  MapPinHouse,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleSubmit = ()=>{
    alert("ส่งใบสมัครสำเร็จ รอตรวจสอบอีเมล")
    router.push("/pages/home")
  }
  return (
    <div className="py-5 px-5">
      <div className="grid place-items-center w-full ">
        <div className="py-10 px-20 w-full grid place-items-center rounded-lg border-dashed text-2xl border-2 border-gray-500">
          พื้นที่โฆษณา
        </div>
      </div>
      <div className="w-full mt-4 grid place-items-center">
        <div className="px-10 py-3 rounded-md text-2xl bg-slate-200">
          แบบฟอร์มสมัครเข้าศึกษา
        </div>
      </div>

      <div className="border-[1px] my-5 border-gray-200 w-full rounded-md shadow-sm shadow-gray-200 px-12">
        <div className="px-8 text-xl py-2 mt-4 gap-2 flex bg-slate-100 w-fit rounded-md">
          {" "}
          <UserRound
            style={{ width: "1.7rem", height: "1.6rem" }}
            className="text-black pt-0 "
          />
          ประวัติส่วนตัว
        </div>
        <div className="flex my-5">
          <select className="border-[1px] border-slate-200 mr-4 rounded-md px-2">
            <option selected>คำนำหน้าชื่อ</option>
            <option>นาย</option>
            <option>นาง</option>
            <option>นางสาว</option>
          </select>
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            ชื่อ (ภาษาไทย) :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="ชื่อ"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            นามสกุล (ภาษาไทย) :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="นามสกุล"
          />
        </div>
        <div className="flex my-5">
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            ชื่อ (อังกฤษ) :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="Firstname"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            นามสกุล (อังกฤษ) :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="Lastname"
          />
        </div>
        <div className="flex my-5">
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            บัตรประชาชน :
          </div>
          <input
            maxLength={13}
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[180px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="13 หลัก"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            อายุ :{" "}
          </div>
          <input
            type="number"
            max={50}
            min={12}
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[80px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="ปี"
          />

          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            วันเกิด :{" "}
          </div>

          <input
            type="date"
            className=" text-md border-2  border-gray-300 text-gray-600 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
          />
        </div>

        <div className="flex my-5">
          <select className="border-[1px] border-slate-200 mr-4 rounded-md px-2">
            <option selected>เพศ</option>
            <option>ชาย</option>
            <option>หญิง</option>
            <option>อื่นๆ</option>
          </select>
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            สถานะภาพ :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[80px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="-"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            ศาสนา :
          </div>
          <input
            maxLength={13}
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[110px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="-"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            สัญชาติ :
          </div>
          <input
            maxLength={13}
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[110px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="-"
          />
        </div>
        <hr className="my-4 border-slate-200" />
        <div className="px-8 text-xl py-2 bg-slate-100 w-fit rounded-md gap-3 flex">
          {" "}
          <MapPinHouse
            style={{ width: "1.4rem", height: "1.7rem" }}
            className="text-black pt-1 "
          />
          ที่อยู่
        </div>
        <div className="my-5 flex">
          <div>ที่อยู่ :</div>
          <textarea
            className="border-2 ml-2 w-[350px] focus:outline-blue-400 py-1 border-slate-200 px-3 rounded-md"
            rows={2}
            placeholder="บ้านเลขที่..."
          />
        </div>

        <hr className="my-4 border-slate-200" />
        <div className="px-8 text-xl py-2 bg-slate-100 w-fit rounded-md gap-3 flex">
          {" "}
          <Phone
            style={{ width: "1.4rem", height: "1.7rem" }}
            className="text-black pt-1 "
          />
          ข้อมูลติดต่อ
        </div>
        <div className="flex my-5">
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            เบอร์ติดต่อ :{" "}
          </div>
          <input
            type="text"
            maxLength={10}
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="09X-XXX-XXXX"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            Email :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[160px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="-"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            Facebook :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[160px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="-"
          />
        </div>
        <div className="my-5 flex">
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            Line :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[160px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="@Line"
          />
        </div>
        <hr className="my-4 border-slate-200" />
        <div className="px-8 text-xl py-2 bg-slate-100 w-fit rounded-md gap-2 flex">
          <UsersRound
            style={{ width: "1.4rem", height: "1.7rem" }}
            className="text-black pt-1 "
          />
          ข้อมูลผู้ปกครอง
        </div>
        <div className="text-xl mt-5">ข้อมูลบิดา</div>
        <div className="flex mt-1 mb-5">
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            ชื่อ :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="ชื่อ"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            นามสกุล :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="นามสกุล"
          />
          <select className="border-[1px] border-slate-200 mr-4 rounded-md px-2">
            <option selected>สถานะ</option>
            <option>อยู่ด้วยกัน</option>
            <option>แยกกันอยู่</option>
            <option>เสียชีวิต</option>
            <option>ไม่ทราบสถานะ</option>
            <option>อื่นๆ</option>
          </select>
        </div>
        <div className="my-5 flex">
          <div className="rounded-l-md h-fit  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            อาชีพ :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2 h-fit  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="-"
          />
          <div>ที่อยู่ :</div>
          <textarea
            className="border-2 ml-2 w-[350px] focus:outline-blue-400 py-1 border-slate-200 px-3 rounded-md"
            rows={2}
            placeholder="บ้านเลขที่..."
          />
        </div>
        <div className="text-xl mt-5">ข้อมูลมารดา</div>
        <div className="flex mt-1 mb-5">
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            ชื่อ :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="ชื่อ"
          />
          <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            นามสกุล :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="นามสกุล"
          />
          <select className="border-[1px] border-slate-200 mr-4 rounded-md px-2">
            <option selected>สถานะ</option>
            <option>อยู่ด้วยกัน</option>
            <option>แยกกันอยู่</option>
            <option>เสียชีวิต</option>
            <option>ไม่ทราบสถานะ</option>
            <option>อื่นๆ</option>
          </select>
        </div>
        <div className="my-5 flex">
          <div className="rounded-l-md h-fit  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
            อาชีพ :{" "}
          </div>
          <input
            type="text"
            className=" text-md border-2 h-fit  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            placeholder="-"
          />
          <div>ที่อยู่ :</div>
          <textarea
            className="border-2 ml-2 w-[350px] focus:outline-blue-400 py-1 border-slate-200 px-3 rounded-md"
            rows={2}
            placeholder="บ้านเลขที่..."
          />
        </div>
      </div>
      <div className="w-full grid place-items-center  my-5"><button onClick={handleSubmit} className="rounded-md px-10 py-2 bg-green-500 text-white hover:opacity-75">
        ส่งใบสมัคร</button></div>
    </div>
  );
}
