import { ArrowDown } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ConfirmPromoteModalProps {
  open: boolean;
  currentGroup: string;
  nextGroup: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  newGroupYear: number;
  newGroupTerm: string;
  oldTerm: string;
  oldYear: number;
}

export default function ConfirmPromoteModal({
  open,
  currentGroup,
  nextGroup,
  onCancel,
  onConfirm,
  newGroupYear,
  newGroupTerm,
  isLoading,
  oldTerm,
  oldYear,
}: ConfirmPromoteModalProps) {
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);

  useEffect(() => {
    if (open) {
      setFirstCheck(false);
      setSecondCheck(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700/45"
      onClick={onCancel}
    >
      <div
        className="bg-white shadow-lg rounded-lg w-fit z-100 px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-5 text-center font-prompt text-xl select-none">
          ยืนยัน
        </div>
        <p className="text-center text-base text-red-600">
          โปรดตรวจสอบข้อมูลการเลื่อนชั้นและรายละเอียดอื่นๆ
          ของนักเรียนว่าข้อมูลถูกต้อง
        </p>

        <div className="px-5 grid place-items-center gap-3 py-2 bg-blue-50 rounded-md my-5">
          <div className="flex gap-5 items-center">
            <p className="text-center py-1 px-5 rounded-md bg-gray-700 text-white w-fit">
              {currentGroup}
            </p>
            <p className="text-gray-700 px-4 py-1 bg-gray-200 rounded-md">
              {oldTerm} / {oldYear}
            </p>
            <div className="flex items-center gap-3">
              <input
                id="check-old"
                type="checkbox"
                className="w-5 h-5"
                checked={firstCheck}
                onChange={(e) => setFirstCheck(e.target.checked)}
              />
              <label
                htmlFor="check-old"
                className="text-blue-800 cursor-pointer select-none"
              >
                ตรวจสอบ
              </label>
            </div>
          </div>

          <ArrowDown className="w-12 h-12 text-gray-600" />

          <div className="flex gap-5 items-center">
            <p className="text-center py-1 px-5 rounded-md bg-green-500 text-white w-fit">
              {nextGroup}
            </p>
            <p className="text-gray-700 px-4 py-1 bg-gray-200 rounded-md">
              {newGroupTerm} / {newGroupYear}
            </p>
            <div className="flex items-center gap-3">
              <input
                id="check-new"
                type="checkbox"
                className="w-5 h-5"
                checked={secondCheck}
                onChange={(e) => setSecondCheck(e.target.checked)}
              />
              <label
                htmlFor="check-new"
                className="text-blue-800 cursor-pointer select-none"
              >
                ตรวจสอบ
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-5 py-4 px-10">
          <button
            className="px-5 py-1 rounded-md text-white bg-gray-400 hover:bg-gray-500"
            onClick={onCancel}
          >
            ยกเลิก
          </button>
          <button
            className="px-5 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-60"
            onClick={onConfirm}
            disabled={isLoading || !firstCheck || !secondCheck}
          >
            {isLoading ? "รอสักครู่..." : "ยืนยัน"}
          </button>
        </div>
      </div>
    </div>
  );
}
