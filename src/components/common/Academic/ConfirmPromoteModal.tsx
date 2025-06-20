import React from "react";

interface ConfirmPromoteModalProps {
  open: boolean;
  currentGroup: string;
  nextGroup: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function ConfirmPromoteModal({
  open,
  currentGroup,
  nextGroup,
  onCancel,
  onConfirm,
  isLoading,
}: ConfirmPromoteModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={onCancel}
    >
      <div
        className="bg-white shadow-lg rounded-lg w-fit z-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-2 text-center text-xl select-none">ยืนยัน</div>
        <div className="px-5">
          <p className="text-center text-sm text-gray-600">
            โปรดตรวจสอบข้อมูลการเลื่อนชั้นและรายละเอียดอื่นๆ ของนักเรียนว่าข้อมูลถูกต้อง
          </p>
          <p className="pt-2 w-full text-center">
            {currentGroup} &gt;&gt; {nextGroup}
          </p>
        </div>
        <div className="flex justify-center gap-5 py-5 px-10">
          <button
            className="px-5 py-1 rounded-md text-white bg-gray-400 hover:bg-gray-500"
            onClick={onCancel}
          >
            ยกเลิก
          </button>
          <button
            className="px-5 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "รอสักครู่..." : "ยืนยัน"}
          </button>
        </div>
      </div>
    </div>
  );
}
