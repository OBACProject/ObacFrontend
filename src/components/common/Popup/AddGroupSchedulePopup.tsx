
import { CreateEnrollmentWithGradeAndSchedule } from "@/api/schedule/route";
import { GetAllStudentGroupByTermYear } from "@/api/studentGroup/route";
import { GetAllActiveSubjectAsync } from "@/api/subject/route";
import { GetAllTeachers } from "@/api/teacher/route";
import SelectTermAndYear from "@/components/Academic/SelectTermYear";
import { Input } from "@/components/ui/input";

import { StudentGroupItem } from "@/dto/studentGroupItem";
import { CreateEnrollmentWithGradeAndScheduleRequest, SubjectItem } from "@/dto/subjectDto";
import { GetAllTeacherResponse } from "@/dto/teacherDto";
import { usegetAllActiveSubjectsQuery } from "@/lib/api/hooks/queries/subject.queries";
import { GetAllActiveSubjectsResponse } from "@/lib/api/models/subject/subject.response";
import { getCurrentThaiTermYear } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type AddGroupSchedulePopUp = {
    onClosePopUp: (value: boolean) => void;
    groupId?: number
    term?: string
    year?: number
    teacherId?: number;
};

export default function AddGroupSchedulePopUp({
    onClosePopUp, groupId
}: AddGroupSchedulePopUp) {

    const [teachers, setTeacher] = useState<GetAllTeacherResponse[]>([]);
    const [subjects, setSubject] = useState<SubjectItem[]>([]);
    const [studentGroup, setStudentGroup] = useState<
        StudentGroupItem[]
    >([]);

    const { data: subjectActiveData = [] } = usegetAllActiveSubjectsQuery();
    const { defaultTerm, currentYear } = getCurrentThaiTermYear();
    const [term, setTerm] = useState<string>(defaultTerm);
    const [year, setYear] = useState<number>(
        currentYear
    );
    useEffect(() => {
        GetAllTeachers().then((item) => {
            setTeacher(item);
        });
        GetAllActiveSubjectAsync().then((item) => {
            setSubject(item);
        });
        GetAllStudentGroupByTermYear(term, year).then((item: StudentGroupItem[]) => {
            if (item) {
                setStudentGroup(item);
            }
        });



    }, []);
    useEffect(() => {
        GetAllStudentGroupByTermYear(term, year).then((item: StudentGroupItem[]) => {
            if (item) {
                setStudentGroup(item);
            }
        });
    }, [term, year]);

    useEffect(() => {
        if (groupId) {
            setStudentGroupId(groupId);
        }
        console.log("teacherId :", groupId)
    }, [groupId]);

    const days = [
        "วันอาทิตย์",
        "วันจันทร์",
        "วันอังคาร",
        "วันพุธ",
        "วันพฤหัสบดี",
        "วันศุกร์",
        "วันเสาร์",
    ];
    const [day, setDay] = useState<string>("");
    const [period, setPeriod] = useState<string>("");
    const [room, setRoom] = useState<string>("");

    const [teacherID, setTeacherID] = useState<number>(0);
    const [subjectID, setSubjectID] = useState<number>(0);
    const [studentGroupId, setStudentGroupId] = useState<number>(0);

    const subjectOptions = subjects.map((item: GetAllActiveSubjectsResponse) => ({
        value: item.id,
        label: `${item.code} : ${item.name}`,
    }));

    const teacherOptions = teachers.map((teacher, index) => ({
        value: teacher.teacherId,
        label: `${teacher.teacherCode ?? `${index + 1}`} : ${teacher.firstName} ${teacher.lastName
            }`,
    }));

    const groupOptions = studentGroup.map((item) => ({
        value: item.id,
        label: `${item.class}.${item.groupName}`,
    }));

    const selectedGroup = groupOptions.find(
        (item) => item.value === studentGroupId
    );

    const onSubmit = async () => {
        const studentGroupById = studentGroup.find(
            (item) => item.id === studentGroupId
        );
        const studentGroupName = studentGroupById?.groupName;
        const requestBody: CreateEnrollmentWithGradeAndScheduleRequest = {
            subjectId: Number(subjectID),
            teacherId: teacherID,
            term: term,
            year: Number(year),
            finalGrade: 0,//
            room: room,
            day: day,
            period: Number(period),
            collectScore: 0,
            affectiveScore: 0,
            assignmentScore: 0,
            midtermScore: 0,
            finalTermScore: 0,
            totalScore: 0,
            remarks: ""

        };


        try {
            const response = await CreateEnrollmentWithGradeAndSchedule(studentGroupId, requestBody);
            if (response.success) {
                toast.success("สร้างสำเร็จ");
                setTeacherID(0);
                setSubjectID(0);
                setStudentGroupId(0);
                setDay("");
                setRoom("");
                // if (onReload) {
                //     onReload();
                // }
                onClosePopUp(false);

            } else {
                toast.error(`สร้างไม่สำเร็จ: ${response.error}`);
            }
            onClosePopUp(false);
        } catch (err) {
            console.error("Error creating schedule:", err);
        }
    };

    return (
        <div
            className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
            onClick={() => onClosePopUp(false)}
        >
            <div
                className=" bg-white shadow-lg shadow-gray-400   rounded-lg w-4/12 z-100 duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-4 py-5">
                    <div className="py-2 text-center text-xl text-gray-900 rounded-t-lg bg-white w-full">
                        เพิ่มวิชาสอน
                    </div>
                    <div className="flex w-full justify-between px-4 py-2">

                        <SelectTermAndYear
                            term={term}
                            year={year}
                            currentYear={currentYear}
                            onChangeTerm={setTerm}
                            onChangeYear={setYear}
                        />
                    </div>
                    <div className="flex px-4 py-2">
                        <div className="w-full px-2">
                            <h1>ห้องเรียน</h1>
                            <Input
                                type="text"
                                placeholder="ห้องเรียน"
                                className="w-full pr-10"
                                onChange={(e) => setRoom(e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <h1>กลุ่มเรียน</h1>
                            <Select
                            isDisabled={true}
                                options={groupOptions.map((item) => ({
                                    value: item.value,
                                    label: `${item.label} `,
                                }))}
                                value={selectedGroup || null}
                                placeholder={selectedGroup?.label ??"-- เลือกกลุ่มเรียน --"}
                            />
                            
                        
                        </div>
                    </div>
                    <div className="flex px-4 py-2">
                        <div className="w-full px-2">
                            <h1>วิชาเรียน</h1>
                            <Select
                                options={subjectOptions}
                                value={
                                    subjectID
                                        ? subjectOptions.find((item) => item.value === subjectID) || null
                                        : null
                                }
                                onChange={(selectedOption) =>
                                    setSubjectID(Number(selectedOption?.value || 0))
                                }
                                placeholder="-- เลือกวิชา --"
                            />

                        </div>
                    </div>
                    <div className="flex  px-4 py-2">
                        <div className="w-full flex flex-col  px-2 relative">
                            <h1>วันที่สอน</h1>
                            <Select
                                options={days.map((item) => ({
                                    value: item,
                                    label: item,
                                }))}
                                value={
                                    day
                                        ? {
                                            value: day,
                                            label: day,
                                        }
                                        : null
                                }
                                onChange={(selectedOption) =>
                                    setDay(selectedOption?.value || "")
                                }
                                placeholder="-- เลือกวันที่สอน --"
                            />
                        </div>
                        <div className="w-full flex flex-col px-2 relative">
                            <h1>คาบเรียน</h1>
                            <Select
                                options={["1", "2", "3", "4", "5"].map((item) => ({
                                    value: item,
                                    label: item,
                                }))}
                                value={
                                    period
                                        ? {
                                            value: period,
                                            label: period,
                                        }
                                        : null
                                }
                                onChange={(selectedOption) =>
                                    setPeriod(selectedOption?.value || "")
                                }
                                placeholder="-- เลือกคาบเรียน --"
                            />
                        </div>
                    </div>
                    <div className="flex  px-4 py-2">
                        <div className="w-full px-2">
                            <h1>อาจารย์ผู้สอน</h1>
                            <Select
                                options={teacherOptions.map((item) => ({
                                    value: item.value,
                                    label: `${item.label} `,
                                }))}
                                value={
                                    teacherID
                                        ? teacherOptions.find((item) => item.value === teacherID)
                                        : null
                                }
                                onChange={(selectedOption) =>
                                    setTeacherID(Number(selectedOption?.value || 0))
                                }
                                placeholder="-- เลือกอาจารย์ผู้สอน --"
                            />

                        </div>
                    </div>

                    <div className="flex justify-center gap-5 mt-4">
                        <button
                            className="px-8 text-white py-1 hover:bg-gray-300 hover:text-black bg-gray-400 rounded-sm"
                            onClick={() => onClosePopUp(false)}
                        >
                            ยกเลิก
                        </button>{" "}
                        <button
                            className="px-8 text-white py-1 bg-blue-500 rounded-sm hover:bg-blue-600"
                            disabled={
                                !period ||
                                !day ||
                                !room ||
                                !teacherID ||
                                !subjectID ||
                                !studentGroup
                            }
                            onClick={onSubmit}
                        >
                            ตกลง
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



