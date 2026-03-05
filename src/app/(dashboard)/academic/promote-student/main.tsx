"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { GroupStudentsResponse } from "@/dto/gradDto";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import StudentSelectListTable from "@/components/Academic/StudentSelectListTable";
import { genRandomGroupCode, getCurrentThaiTermYear } from "@/lib/utils";
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

	const [grads, setGrad] = useState<number>(2.0);

	const [term, setTerm] = useState<string>(defaultTerm);
	const [year, setYear] = useState<number>(currentYear);

	const [newGroupTerm, setNewGroupTerm] = useState<string>("");
	const [newGroupYear, setNewGroupYear] = useState<number>(0);

	const [newGroup, setNewGroup] = useState<GroupStudentsResponse | null>(null);

	const [nextGroupNameA, setNextGroupNameA] = useState<string>("");
	const [nextGroupNameB, setNextGroupNameB] = useState<string>("");

	const [promoteDialogOpen, setPromoteDialogOpen] = useState<boolean>(false);
	const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);

	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [hasSearched, setHasSearched] = useState<boolean>(false);

	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const data = await GetAllStudentGroupByTermYear(term, year);
				setGroups(data || []);
			} catch (err) {
				console.error("Failed to fetch groups", err);
				setGroups([]);
			}
		};
		fetchGroups();
	}, [term, year]);

	const groupOptions: GroupOption[] = useMemo(
		() =>
			(groups ?? []).map((item) => ({
				value: item.id,
				label: `${item.class}.${item.groupName}`,
			})),
		[groups],
	);

	const onFilterGroup = async () => {
		if (!groupID || !Number.isFinite(grads)) return;
		setIsSearching(true);
		setHasSearched(true);
		setNewGroup(null);
		setSelectedIds([]);

		try {
			const result = await GetStudentIfGradeAbove(groupID, grads);
			setNewGroup(result);
			console.log("result : ", result);
		} catch (err) {
			console.error("Failed to filter group", err);
			setNewGroup(null);
		} finally {
			setIsSearching(false);
		}
	};

	const onPromoteStudentGroup = async () => {
		try {
			if (!newGroup || (newGroup.students ?? []).length === 0) {
				toast.error?.("กรุณาเลือกนักเรียนอย่างน้อย 1 คน");
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

			if (newGroupYear == 0 || newGroupTerm == "") {
				toast.error?.("กรุณาเลือกปีการศึกษาและเทอมการศึกษา");
				return;
			}

			setIsConfirmLoading(true);

			const groupName = `${nextGroupNameA}/${nextGroupNameB}`;
			const randomGroupCode = genRandomGroupCode();

			const body: UpdateStudentGroupBody = {
				studentId: Array.from(new Set(selectedIds)),
				studentGroup: {
					groupName,
					class: newGroup.class,
					// id: groupID,
					id: null,
					groupCode: randomGroupCode,
					level: Number(nextGroupNameA),
					programId: newGroup.programId,
					isPublish: false,
					isComplete: false,
					isActive: true,
					year: newGroupYear,
					term: newGroupTerm,
				},
				action: "promote",
			};
			console.log(body);
			const ok = await UpdateStudentGroupByStudentGroupId(body);
			if (ok) {
				toast.success?.("เลื่อนชั้นสำเร็จ");
				setPromoteDialogOpen(false);
				await onFilterGroup();
			} else {
				toast.error?.("อัปเดตไม่สำเร็จ");
			}
		} catch (err) {
			console.error("onPromoteStudentGroup error:", err);
			toast.error?.("เกิดข้อผิดพลาดในการเลื่อนชั้น");
		} finally {
			setIsConfirmLoading(false);
		}
	};

	return (
		<div className="pl-16 py-5">
			<div className="flex justify-start px-10">
				<HeaderLabel
					title="เลื่อนชั้นนักเรียน"
					Icon={<ArrowUpDown className="h-7 w-7 text-white" />}
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
					onChange={(id) => setGroupID(id || 0)}
				/>

				<button
					onClick={onFilterGroup}
					disabled={!groupID || !Number.isFinite(grads) || isSearching}
					className="bg-blue-400 px-5 py-1.5 text-white rounded-md enabled:bg-blue-500 enabled:hover:bg-blue-700 disabled:opacity-60"
				>
					ค้นหา
				</button>
			</div>

			<div className="px-10">
				{isSearching ? (
					<LoadingDataTable />
				) : newGroup && (newGroup.students ?? []).length > 0 ? (
					<>
						<div className="px-5 py-2 border border-gray-300 shadow-lg  rounded-lg mb-4">
							<p className="mb-3 text-gray-600 font-medium">
								ชั้นเรียนปัจจุบัน:{" "}
								<span className="text-blue-800 font-semibold">
									{newGroup.class}.{newGroup.groupName}
								</span>
							</p>

							<div className="flex gap-3 items-center mb-2">
								<p className="text-[16px] text-gray-700">ระบุชั้นเรียนต่อไป:</p>
								<p className="px-2 py-1 text-green-600 font-semibold bg-slate-100 rounded-md">
									{newGroup.class}
								</p>

								<select
									className="border px-3 py-1 rounded-md"
									value={nextGroupNameA}
									onChange={(e) => setNextGroupNameA(e.target.value)}
								>
									<option value="">เลือกปี</option>
									{[1, 2, 3].map((n) => (
										<option key={n} value={String(n)}>
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
										<option key={i + 1} value={String(i + 1)}>
											{i + 1}
										</option>
									))}
								</select>
							</div>
							<div className="flex gap-5 items-center justify-start ">
								<p className="text-[16px] text-gray-700">
									ระบุเทอม/ปีการศึกษาต่อไป
								</p>
								<SelectTermAndYear
									term={newGroupTerm}
									year={newGroupYear}
									currentYear={currentYear + 4}
									onChangeTerm={setNewGroupTerm}
									onChangeYear={setNewGroupYear}
								/>
							</div>
						</div>
						<StudentSelectListTable
							students={newGroup.students}
							onSelectedIdsChange={setSelectedIds}
						/>

						<div className="flex justify-center mt-4">
							<button
								onClick={() => setPromoteDialogOpen(true)}
								disabled={
									!nextGroupNameA ||
									!nextGroupNameB ||
									selectedIds.length === 0 ||
									!newGroupTerm ||
									!newGroupYear
								}
								className="px-6 py-2 rounded bg-blue-500 text-2xl text-white hover:bg-blue-600 disabled:opacity-60"
							>
								เลื่อนชั้นนักเรียน
							</button>
						</div>
						<div className="flex justify-center py-2 text-red-500">
							<p>โปรดอย่าลืมเลือก ภาคเรียนและปีการศึกษาใหม่ </p>
						</div>
					</>
				) : (
					<div className="text-center text-gray-500 py-10 text-2xl font-semibold border-2 border-dashed border-gray-300 rounded-md">
						{hasSearched ? "ไม่พบข้อมูล" : "ยังไม่ได้เลือก"}
					</div>
				)}
			</div>

			{newGroup && (
				<ConfirmPromoteModal
					open={promoteDialogOpen}
					currentGroup={`${newGroup.class}.${newGroup.groupName}`}
					nextGroup={`${newGroup.class}.${nextGroupNameA}/${nextGroupNameB}`}
					onCancel={() => setPromoteDialogOpen(false)}
					onConfirm={onPromoteStudentGroup}
					isLoading={isConfirmLoading}
					newGroupTerm={newGroupTerm}
					newGroupYear={newGroupYear}
					oldTerm={term}
					oldYear={year}
				/>
			)}
		</div>
	);
}
