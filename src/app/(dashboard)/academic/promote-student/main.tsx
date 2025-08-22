"use client";

import React, { useEffect, useState } from "react";
import SelectTermAndYear from "@/components/Academic/SelectTermYear";
import GroupSelector, {
  GroupOption,
} from "@/components/Academic/GroupSelector";
import GradeFilter from "@/components/Academic/GradeFilter";
import ConfirmPromoteModal from "@/components/Academic/ConfirmPromoteModal";
import { ArrowUpDown } from "lucide-react";
import {
  StudentGroupItem,
  UpdateStudentGroupBody,
} from "@/dto/studentGroupItem";
import { GetGropGradeAboveModel, StudentInfo } from "@/dto/gradDto";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import StudentSelectListTable from "@/components/Academic/StudentSelectListTable";
import {
  genRandomGroupCode,
  getCurrentThaiTermYear,
  sortStudentGroupItems,
} from "@/lib/utils";
import {
  GetAllStudentGroupByTermYear,
  UpdateStudentGroupByStudentGroupId,
} from "@/api/studentGroup/route";
import { GetStudentIfGradeAbove } from "@/api/grad/route";
import LoadingDataTable from "@/components/common/loading/LoadingDataTable";
import { toast } from "react-toastify";

export default function Main() {
  const { defaultTerm, currentYear } = getCurrentThaiTermYear();

  const [groups, setGroups] = useState<StudentGroupItem[]>([]);
  const [groupID, setGroupID] = useState<number>(0);
  const [grads, setGrad] = useState(2);
  const [term, setTerm] = useState<string>(defaultTerm);
  const [year, setYear] = useState<number>(currentYear);
  const [newGroup, setNewGroup] = useState<StudentInfo[]>([]);
  const [nextGroupNameA, setNextGroupNameA] = useState<string>("");
  const [nextGroupNameB, setNextGroupNameB] = useState<string>("");
  const [promoteTrigger, SetPromoteTrigger] = useState<boolean>(false);
  const [confirmPromoteTrigger, setConfirmPromoteTrigger] =
    useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await GetAllStudentGroupByTermYear(term, year);
        const sorted = sortStudentGroupItems(data);
        setGroups(sorted || []);
      } catch (err) {
        console.error("Failed to fetch groups", err);
        setGroups([]);
      }
    };
    fetchGroups();
  }, [term, year]);

  const groupOptions: GroupOption[] = groups.map((item) => ({
    value: item.id,
    label: `${item.class}.${item.groupName}`,
  }));

  const onFilterGroup = async () => {
    setIsSearch(true);
    setNewGroup([]);
    try {
      const result = await GetStudentIfGradeAbove(groupID, grads);
      setNewGroup(result ?? []);
      setIsSearch(false);
    } catch (err) {
      console.error("Failed to filter group", err);
      setNewGroup([]);
      setIsSearch(false);
    }
  };

  const onPromoteStudentGroup = async () => {
    try {
      if (!newGroup || newGroup.length === 0) {
        toast.error?.("ไม่พบข้อมูลกลุ่มปัจจุบัน");
        return;
      }
      if (!nextGroupNameA || !nextGroupNameB) {
        toast.error?.("กรุณาเลือกชั้น/ห้องถัดไปให้ครบ");
        return;
      }
      if (selectedIds.length === 0) {
        toast.error?.("กรุณาเลือกนักเรียนอย่างน้อย 1 คน");
        return;
      }
      setConfirmPromoteTrigger(true);
      const level = 0;
      const groupName = `${nextGroupNameA}/${nextGroupNameB}`;

      const programID = 0;
      const randomGroupCode = genRandomGroupCode();
      const body: UpdateStudentGroupBody = {
        studentId: Array.from(new Set(selectedIds)),
        studentGroup: {
          groupName,
          class: "",
          groupCode: randomGroupCode,
          level,
          programID,
          isPublish: false,
          isComplete: false,
          isActive: true,
          year,
          term,
        },
      };
      const ok = await UpdateStudentGroupByStudentGroupId(body);
      if (ok) {
        toast.success?.("เลื่อนชั้นสำเร็จ");
        SetPromoteTrigger(false);
        await onFilterGroup();
      } else {
        toast.error?.("อัปเดตไม่สำเร็จ");
      }
    } catch (err) {
      console.error("onPromoteStudentGroup error:", err);
      toast.error?.("เกิดข้อผิดพลาดในการเลื่อนชั้น");
    }
  };

  return (
    <div className="pl-16 py-5">
      <div className="flex justify-start px-10 ">
        <HeaderLabel
          title="เลื่อนชั้นนักเรียน"
          Icon={<ArrowUpDown className="h-7 w-7  text-white" />}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 px-10 py-5">
        <SelectTermAndYear
          term={term}
          year={year}
          currentYear={currentYear}
          onChangeTerm={setTerm}
          onChangeYear={setYear}
        />
        <GradeFilter grade={grads} onChange={setGrad} />
        <GroupSelector
          groupOptions={groupOptions}
          selectedGroupID={groupID}
          onChange={(groupId) => setGroupID(groupId || 0)}
        />
        <button
          onClick={onFilterGroup}
          disabled={!groupID}
          className="bg-blue-400  px-5 py-1.5 enabled:bg-blue-500 enabled-hover:bg-blue-700 text-white rounded-md"
        >
          ค้นหา
        </button>
      </div>

      <div className="px-10">
        {isSearch ? (
          <LoadingDataTable />
        ) : (
          <div>
            {newGroup?.length > 0 && newGroup ? (
              <>
                <p className="mb-3 text-gray-600 font-medium">
                  ชั้นเรียนปัจจุบัน:
                  <span className="text-blue-800 font-semibold">
                    {newGroup[0].class}.{newGroup[0].groupName}
                  </span>
                </p>
                <div className="flex gap-3 items-center mb-4">
                  <p className="text-[18px] text-gray-700">
                    ระบุชั้นเรียนต่อไป:
                  </p>
                  <p className="px-2 py-1 text-green-500 font-semibold bg-slate-100 rounded-md">
                    {newGroup[0].class}
                  </p>
                  <select
                    className="border px-3 py-1 rounded-md"
                    value={nextGroupNameA}
                    onChange={(e) => setNextGroupNameA(e.target.value)}
                  >
                    <option value="">เลือกปี</option>
                    {[2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span className="text-xl">/</span>
                  <select
                    className="border px-3 py-1 rounded-md"
                    value={nextGroupNameB}
                    onChange={(e) => setNextGroupNameB(e.target.value)}
                  >
                    <option value="">เลือกห้อง</option>
                    {[...Array(15)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <StudentSelectListTable
                  students={newGroup}
                  onSelectedIdsChange={(ids) => setSelectedIds(ids)}
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => SetPromoteTrigger(true)}
                    disabled={!nextGroupNameA || !nextGroupNameB}
                    className="px-6 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    เลื่อนชั้นนักเรียน
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-10 text-2xl font-semibold border-2 border-dashed border-gray-300 rounded-md">
                {isSearch ? "ไม่พบข้อมูล" : "ยังไม่ได้เลือก"}
              </div>
            )}
          </div>
        )}
      </div>
      {newGroup && (
        <ConfirmPromoteModal
          open={promoteTrigger}
          currentGroup={`${newGroup[0]?.class}.${newGroup[0]?.groupName}`}
          nextGroup={`${newGroup[0]?.class}.${nextGroupNameA}/${nextGroupNameB}`}
          onCancel={() => SetPromoteTrigger(false)}
          onConfirm={onPromoteStudentGroup}
          isLoading={confirmPromoteTrigger}
        />
      )}
    </div>
  );
}
