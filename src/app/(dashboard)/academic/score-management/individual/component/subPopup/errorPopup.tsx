import { Button } from "@/components/ui/button";

// Error Popup Component
export interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function ErrorPopup({ isOpen, onClose, title, message }: ErrorPopupProps) {
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
          <div className="py-2 text-center text-xl text-red-600 rounded-t-lg bg-white w-full mb-4">
            ⚠ {title}
          </div>
          <div className="px-4 py-2 text-center text-gray-700 mb-6">
            {message}
          </div>
          <div className="flex justify-center px-4">
            <Button
              onClick={onClose}
              className="w-24 bg-red-500 hover:bg-red-600"
            >
              ตกลง
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}