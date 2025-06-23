"use client";
import {
  GraduationCap,
  MapPin,
  MapPinHouse,
  Phone,
  ReceiptText,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleSubmit = () => {
    alert("ส่งใบสมัครสำเร็จ รอตรวจสอบอีเมล");
    router.push("/");
  };
  return (
    <div className=" px-1">
      <div className=" relative group flex items-center justify-center  lg:w-[100%] md:w-[100%] md:h-[400px] lg:h-[550px] w-full h-[220px] sm:w-[100%] sm:h-[300px] overflow-hidden">
          <img
            className="absolute lg:w-[100%] lg:h-[550px] sm:w-[100%] sm:h-[300px] md:w-[100%] md:h-[400px] w-full h-[220px] object-cover duration-1000 group-hover:scale-[102%]"
            src="/banner/banner.jpg"
          />
          <div className="relative w-full h-full bg-gradient-to-t from-gray-900/0 to-gray-900/0"></div>
        </div>
      <div className="w-full mt-4 grid place-items-center">
        <div className="lg:px-10 px-10 py-3 rounded-md text-2xl bg-gradient-to-r from-gray-900 text-white  to-gray-500 ">
          แบบฟอร์มสมัครเข้าศึกษา
        </div>
      </div>

      <div className="px-8 py-5 border-[1px] my-5 border-gray-200 w-full rounded-md shadow-sm shadow-gray-200 lg:px-12 ">
        <div className="px-8 text-xl py-2 mt-4 gap-2 flex bg-gradient-to-r from-blue-900 text-white  to-gray-500  w-fit rounded-md">
          {" "}
          <UserRound
            style={{ width: "1.7rem", height: "1.6rem" }}
            className="text-white pt-0 "
          />
          ประวัติส่วนตัว
        </div>
        <div className="lg:flex  grid gap-4 lg:gap-0 my-5">
          <select className="border-[1px] py-1 w-fit border-slate-200 mr-4 rounded-md px-2">
            <option defaultValue={"คำนำหน้าชื่อ"}>คำนำหน้าชื่อ</option>
            <option>นาย</option>
            <option>นาง</option>
            <option>นางสาว</option>
          </select>
          <div className="flex">
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ชื่อ (ภาษาไทย) :{" "}
            </div>
            <input
              type="text"
              className="line-clamp-1 text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="ชื่อ"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              นามสกุล (ภาษาไทย) :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="นามสกุล"
            />
          </div>
        </div>
        <div className=" lg:flex md:flex sm:grid sm:gap-4 md:gap-0  grid gap-4  lg:gap-0">
          <div className="flex">
            <div className="rounded-l-md line-clamp-1 text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ชื่อ (อังกฤษ) :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="Firstname"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md line-clamp-1 text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              นามสกุล (อังกฤษ) :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="Lastname"
            />
          </div>
        </div>
        <div className="lg:flex grid gap-4 my-5">
          <div className="flex">
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              บัตรประชาชน :
            </div>
            <input
              maxLength={13}
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[180px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="เลขบัตร 13 หลัก"
            />
          </div>

          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              วันออกบัตร :{" "}
            </div>

            <input
              type="date"
              className=" text-md border-2  border-gray-300 text-gray-600 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              วันหมดอายุ :{" "}
            </div>

            <input
              type="date"
              className=" text-md border-2  border-gray-300 text-gray-600 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            />
          </div>
        </div>
        <div className=" lg:flex grid gap-4 my-5">
          <div className="flex">
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
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              วันเกิด :{" "}
            </div>

            <input
              type="date"
              className=" text-md border-2  border-gray-300 text-gray-600 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
            />
          </div>
        </div>

        <div className="lg:flex grid gap-4 my-5">
          <select className="border-[2px] py-2 w-fit border-slate-200 mr-4 rounded-md px-2">
            <option defaultValue="เพศ">เพศ</option>
            <option>ชาย</option>
            <option>หญิง</option>
            <option>อื่นๆ</option>
          </select>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              สถานะภาพ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[80px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="-"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ศาสนา :
            </div>
            <input
              maxLength={13}
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[110px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="-"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              สัญชาติ :
            </div>
            <input
              maxLength={13}
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[110px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="-"
            />
          </div>
        </div>
        <hr className="my-4 border-slate-200" />

        <div className="px-8 text-xl py-2 bg-gradient-to-r from-blue-900 text-white  to-gray-500 0 w-fit rounded-md gap-3 flex">
          {" "}
          <MapPinHouse
            style={{ width: "1.4rem", height: "1.7rem" }}
            className="text-white pt-1 "
          />
          ที่อยู่ตามทะเบียนบ้าน
        </div>
        <div className="my-4 overflow-hidden lg:flex items-start gap-2 ">
          <div>ที่อยู่ :</div>
          <textarea
            rows={2}
            className="w-[200px] px-4 lg:w-[300px] border border-slate-300 rounded-md  focus:outline-blue-400 py-1"
            placeholder="บ้านเลขที่"
          />
        </div>
        <div className="lg:flex grid gap-4 mt-4 mb-5">
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ตำบล :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder=""
            />
          </div>
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              อำเภอ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder=""
            />
          </div>
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              จังหวัด :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder=""
            />
          </div>
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              รหัสไปรษณีย์ :{" "}
            </div>
            <input
              maxLength={5}
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="00000"
            />
          </div>
        </div>

        <div className="px-8 text-xl py-2 bg-gradient-to-r from-blue-900 text-white  to-gray-500  w-fit rounded-md gap-3 flex">
          {" "}
          <MapPin
            style={{ width: "1.4rem", height: "1.7rem" }}
            className="text-white pt-1 "
          />
          ที่อยู่ปัจจุบัน
        </div>
        <div className="my-4 overflow-hidden lg:flex items-start gap-2 ">
          <div>ที่อยู่ :</div>
          <textarea
            rows={2}
            className="w-[200px] px-4 lg:w-[300px] border border-slate-300 rounded-md  focus:outline-blue-400 py-1"
            placeholder="บ้านเลขที่"
          />
          <i>*** ที่สามารถติดต่อได้ ***</i>
        </div>
        <div className="lg:flex grid gap-4 mt-4 mb-5">
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ตำบล :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder=""
            />
          </div>
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              อำเภอ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder=""
            />
          </div>
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              จังหวัด :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder=""
            />
          </div>
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              รหัสไปรษณีย์ :{" "}
            </div>
            <input
              maxLength={5}
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="00000"
            />
          </div>
        </div>

        <hr className="my-4 border-slate-200" />
        <div className="px-8 text-xl py-2 bg-gradient-to-r from-blue-900 text-white  to-gray-500  w-fit rounded-md gap-3 flex">
          {" "}
          <Phone
            style={{ width: "1.4rem", height: "1.7rem" }}
            className="text-white pt-1 "
          />
          ข้อมูลติดต่อ
        </div>
        <div className="lg:flex grid gap-4 my-5">
          <div className="flex">
            {" "}
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              เบอร์ติดต่อ :{" "}
            </div>
            <input
              type="text"
              maxLength={10}
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="09X-XXX-XXXX"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              Email :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[160px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="-"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md line-clamp-1  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              Facebook :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[160px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="-"
            />
          </div>
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
        <div className="px-8 text-xl py-2 bg-gradient-to-r from-blue-900 text-white  to-gray-500  w-fit rounded-md gap-2 flex">
          <UsersRound
            style={{ width: "1.4rem", height: "1.7rem" }}
            className="text-white pt-1 "
          />
          ข้อมูลผู้ปกครอง
        </div>
        <div className="text-xl mt-5 px-5 bg-slate-200 rounded-md py-1 w-fit mb-2">
          ข้อมูลบิดา
        </div>
        <div className="lg:flex grid gap-4 mt-1 mb-5">
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ชื่อ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="ชื่อ"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md line-clamp-1 text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              นามสกุล :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="นามสกุล"
            />
          </div>

          <select className="border-[2px] py-2 w-fit  border-slate-200 mr-4 rounded-md px-2">
            <option defaultValue="สถานะ">สถานะ</option>
            <option>อยู่ด้วยกัน</option>
            <option>แยกกันอยู่</option>
            <option>เสียชีวิต</option>
            <option>ไม่ทราบสถานะ</option>
            <option>อื่นๆ</option>
          </select>
        </div>
        <div className="my-5 lg:flex lg:items-start  grid gap-4 ">
          <div className="flex ">
            <div className="rounded-l-md h-fit  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              อาชีพ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2 h-fit  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="-"
            />
          </div>
          <div className=" overflow-hidden lg:flex items-start gap-2 ">
            <div>ที่อยู่ :</div>
            <textarea
              rows={2}
              className="w-[250px] px-4 lg:w-[400px] border border-slate-300 rounded-md  focus:outline-blue-400 py-1"
              placeholder="..."
            />
          </div>
        </div>
        <div className="text-xl mt-5  px-5 bg-slate-200 rounded-md py-1 w-fit mb-2">
          ข้อมูลมารดา
        </div>
        <div className="lg:flex grid gap-4 mt-1 mb-5">
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ชื่อ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="ชื่อ"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md line-clamp-1 text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              นามสกุล :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="นามสกุล"
            />
          </div>

          <select className="border-[2px] py-2 w-fit  border-slate-200 mr-4 rounded-md px-2">
            <option defaultValue="สถานะ">สถานะ</option>
            <option>อยู่ด้วยกัน</option>
            <option>แยกกันอยู่</option>
            <option>เสียชีวิต</option>
            <option>ไม่ทราบสถานะ</option>
            <option>อื่นๆ</option>
          </select>
        </div>
        <div className="my-5 lg:flex grid gap-4 lg:items-start ">
          <div className="flex">
            <div className="rounded-l-md h-fit  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              อาชีพ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2 h-fit  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="-"
            />
          </div>
          <div className=" overflow-hidden lg:flex items-start gap-2 ">
            <div>ที่อยู่ :</div>
            <textarea
              rows={2}
              className="w-[250px] px-4 lg:w-[400px] border border-slate-300 rounded-md  focus:outline-blue-400 py-1"
              placeholder="..."
            />
          </div>
        </div>
        <div className="text-xl mt-5  px-5 bg-slate-200 rounded-md py-1 w-fit mb-2">
          ข้อมูลผู้ปกครองที่ดูแล
        </div>
        <div className="lg:flex grid gap-4 mt-1 mb-5">
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ชื่อ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="ชื่อ"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md line-clamp-1 text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              นามสกุล :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="นามสกุล"
            />
          </div>

          <select className="border-[2px] py-2 w-fit  border-slate-200 mr-4 rounded-md px-2">
            <option defaultValue="ความสัมพันธ์">ความสัมพันธ์</option>
            <option>มารดา</option>
            <option>บิดา</option>
            <option>ญาติ</option>
            <option>อื่นๆ</option>
          </select>
        </div>
        <div className="my-5 lg:flex grid gap-4 lg:items-start ">
          <div className="flex">
            <div className="rounded-l-md h-fit  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              อาชีพ :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2 h-fit  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="-"
            />
          </div>
          <div className=" overflow-hidden lg:flex items-start gap-2 ">
            <div>ที่อยู่ :</div>
            <textarea
              rows={2}
              className="w-[250px] px-4 lg:w-[400px] border border-slate-300 rounded-md  focus:outline-blue-400 py-1"
              placeholder="..."
            />
          </div>
        </div>

        <hr className="my-4 border-slate-200" />
        <div className="px-8 text-xl py-2 bg-gradient-to-r from-blue-900 text-white  to-gray-500  w-fit rounded-md gap-2 flex">
          <GraduationCap
            style={{ width: "1.8rem", height: "1.9rem" }}
            className="text-white  "
          />
          ข้อมูลการศึกษา
        </div>
        <div className="my-5 lg:flex grid gap-4 lg:items-start ">
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ระดับวุฒิการศึกษาที่จบมา :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="ระดับวุฒิ"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              สาขา :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[200px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="สาขาการศึกษา"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ปีที่จบการศึกษา :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[100px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="พ.ศ."
            />
          </div>
        </div>
        <div className="my-5 lg:flex grid gap-4 lg:items-start ">
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              สถานศึกษา :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[200px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="ชื่อสถาศึกษา"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              เบอร์ติดต่อ :{" "}
            </div>
            <input
              type="text"
              maxLength={10}
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[170px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="02-xxx-xxx"
            />
          </div>
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              เกรดสะสม :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[100px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="GPS"
            />
          </div>
        </div>
        <div className=" overflow-hidden lg:flex items-start gap-2 mb-5">
          <div>ที่อยู่สถานศึกษา :</div>
          <textarea
            rows={2}
            className="w-[250px] px-4 lg:w-[400px] border border-slate-300 rounded-md  focus:outline-blue-400 py-1"
            placeholder="..."
          />
        </div>
        <hr className="my-4 border-slate-200" />
        <div className="px-8 text-xl py-2 bg-gradient-to-r from-blue-900 text-white  to-gray-500  w-fit rounded-md gap-2 flex">
          <ReceiptText
            style={{ width: "1.8rem", height: "1.9rem" }}
            className="text-white  "
          />
          ข้อมูลการสมัคร
        </div>
        <div className="my-5 lg:flex grid gap-4 lg:items-start ">
        <div className="mr-4">
              ลำดับการเลือกหลักสูตรและสาขาวิชาที่จะเข้าศึกษา
            </div>
          <div className="flex items-center ">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              ในภาคการศึกษา :{" "}
            </div>
            <input
              type="text"
              className=" text-md border-2  border-gray-300 text-gray-700 border-l-0 w-[100px] mr-5 px-4 py-1 bg-white focus:outline-blue-300  rounded-r-md"
              placeholder="2568/?"
            />
          </div>
        </div>
        <div className="my-5 lg:flex grid gap-4 lg:items-center "><div>หลักสูตรประกาศนียบัตรวิชาชีพ(ปวช.)</div>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <label className="text-gray-700">เช้า</label>
              <input name="periode" type="radio" className="" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700">บ่าย</label>
              <input name="periode" type="radio" className="" />
            </div>
          </div>
          <select className="border-[2px] py-2 w-fit  border-slate-200 mr-4 rounded-md px-2">
            <option defaultValue="สาขาวิชา">สาขาวิชา</option>
            <option defaultValue="การบัญชี">การบัญชี</option>
            <option defaultValue="การตลาด">การตลาด</option>
            <option defaultValue="คอมพิวเตอร์ธุรกิจ">คอมพิวเตอร์ธุรกิจ</option>
            <option defaultValue="การท่องเที่ยว">การท่องเที่ยว</option>
            <option defaultValue="คอมพิวเตอร์กราฟฟิก">
              คอมพิวเตอร์กราฟฟิก
            </option>
          </select>
        </div>
        <hr className="my-4 border-slate-200" />
        <div className="mt-10 lg:flex grid gap-4 lg:items-center ">
          <div className="grid lg:flex gap-5">
            <div>ท่านมีรายวิชาที่ขอเทียบโอนหน่วยกิตจากสถาบันอื่นหรือไม่</div>
            <div className="flex lg:px-0 px-5 items-center gap-2">
              <label className="text-gray-700">ไม่มี</label>
              <input name="1" type="radio" className="" />
            </div>
            <div className="flex lg:px-0 px-5 items-center gap-2">
              <label className="text-gray-700">มี</label>
              <input name="1" type="radio" className="" />
            </div>
          </div>
        </div>
        <div className="my-5 lg:flex grid gap-4 lg:items-center ">
          <div className="grid lg:flex gap-5">
            <div>ท่านเคยกู้ยืมเงินกองทุนให้ยืมฯของทางรัฐบาลหรือไม่</div>
            <div className="flex lg:px-0 px-5 items-center gap-2">
              <label className="text-gray-700">ไม่เคย</label>
              <input name="2" type="radio" className="" />
            </div>
            <div className="flex lg:px-0 px-5 items-center gap-2">
              <label className="text-gray-700">เคย</label>
              <input name="2" type="radio" className="" />
            </div>
          </div>
        </div>
        <div className="my-5 lg:flex grid gap-4 lg:items-center ">
          <div className="grid lg:flex gap-5">
            <div>สมัครเรียนครั้งนี้ท่านมีความประสงค์จะขอรับทุนกู้ยืมรัฐบาล</div>
            <div className="flex lg:px-0 px-5 items-center gap-2">
              <label className="text-gray-700">ไม่กู้</label>
              <input name="3" type="radio" className="" />
            </div>
            <div className="flex lg:px-0 px-5 items-center gap-2">
              <label className="text-gray-700">กู้ใหม่</label>
              <input name="3" type="radio" className="" />
            </div>
            <div className="flex lg:px-0 px-5 items-center gap-2">
              <label className="text-gray-700">กู้ต่อเนื่อง</label>
              <input name="3" type="radio" className="" />
            </div>
          </div>
        </div>
        <div className="my-10 grid place-items-center overflow-hidden">
          <div className="border-[1px] border-gray-300 rounded-lg lg:w-[900px] px-10 py-2">
            <div className="flex justify-center my-4">
              <div className="text-lg w-fit  py-1 bg-slate-200 rounded-md px-10">
                ข้าพเจ้าขอรับรองว่า
              </div>
            </div>

            <div className="text-start text-gray-600">
              1.
              เป็นผู้สำเร็จการศึกษาตามที่กำหนดไว้ในเรื่องคุณสมบัติของผู้สมัครเข้าเป็นนักศึกษาวิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
              <br />
              2.ไม่เคยถูกไล่ออกจากสถาบันใดๆ
              เนื่องจากการกระทำผิดหรือมีความประพฤติเสื่อมเสีย
              <br />
              3.
              ไม่เคยเป็นผู้ที่มีโรคติดต่อร้ายแรงหรือโรคที่สำคัญที่เป็นอุปสรรคต่อการศึกษา
              <br />
              4. ข้าพเจ้าจะปฏิบัติตามระเบียบข้อบังคับ
              และกฎเกณฑ์ของวิทยาลัยทุกประการ
              <br />
              5. ข้าพเจ้าจะประพฤติตนเยี่ยงนักศึกษาที่ดี
              ไม่นำความเสื่อมเสียสู่วิทยาลัย
              อีกทั้งจะไม่ประพฤติตนเป็นปัญหาหรือเป็นอุปสรรคต่อการศึกษา
              การบริหารการศึกษา และการบริหารทั่วไปของวิทยาลัย
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i className="my-2 text-black">
                หากข้อความที่กล่าวมาข้างต้นนี้
                ไม่เป็นความจริงแม้เพียงข้อใดข้อหนึ่งและให้ข้อมูลที่ไม่ถูกต้องแก่วิทยาลัย
                ข้าพเจ้ายินยอมให้วิทยาลัย พิจารณาตามขั้นตอนของวิทยาลัย
              </i>
            </div>
            <div className="grid my-5 lg:flex gap-5 lg:gap-20 justify-center ">
              <div className="flex lg:px-0 px-5 items-center gap-2">
                <label className="text-gray-700">รับทราบ</label>
                <input name="4" type="radio" className="" />
              </div>
              <div className="flex lg:px-0 px-5 items-center gap-2">
                <label className="text-gray-700">ไม่รับทราบ</label>
                <input name="4" type="radio" className="" />
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/*  End of Boundary */}
      <div className="w-full grid place-items-center  my-8">
        <div className="lg:w-[520px] w-full py-2 px-5 border-red-500 border rounded-md">
          <div className="text-center">*** ตรวจสอบความถูกต้อง ***</div>

          <i className="text-start text-gray-600">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;โปรดตรวจสอบข้อมูลและรายละเอียดที่กรอกลงในฟอร์มให้ครบถ้วนเนื่องจากมีผลต่อการพิจารณาในการเข้าศึกษาในสถาบัน
            หากข้อมูลที่ท่านกรอกไม่ถูกต้องทางเราจะไม่รับผิดชอบต่อการตกหล่นของข้อมูล{" "}
          </i>
        </div>
      </div>
      <div className="w-full  grid place-items-center  my-5">
        <button
          onClick={handleSubmit}
          className="rounded-md px-10 py-2 shadow-md shadow-gray-200 bg-blue-500 text-white hover:bg-blue-700 hover:scale-105 duration-500"
        >
          ส่งใบสมัคร
        </button>
      </div>
    </div>
  );
}
