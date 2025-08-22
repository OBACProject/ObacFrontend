import { Button } from "@/components/ui/button";

export interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export default function ConfirmationPopup({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: ConfirmationPopupProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45 z-[60]"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-lg shadow-gray-400 rounded-lg w-4/12 z-100 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-5">
          <div className="py-2 text-center text-xl text-gray-900 rounded-t-lg bg-white w-full mb-4">
            {title}
          </div>
          <div className="px-4 py-2 text-center text-gray-700 mb-6">
            {message}
          </div>
          <div className="flex justify-center gap-4 px-4">
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-24 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "กำลังบันทึก..." : "ตกลง"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-24"
              disabled={isLoading}
            >
              ยกเลิก
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}