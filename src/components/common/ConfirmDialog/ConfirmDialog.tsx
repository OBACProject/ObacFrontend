"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

type DialogType = "question" | "success" | "error" | "warning";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  text?: string;
  type?: DialogType;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  autoClose?: number;
}

const iconMap = {
  question: AlertCircle,
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
};

const colorMap = {
  question: "text-blue-500",
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
};

const bgColorMap = {
  question: "bg-blue-50",
  success: "bg-green-50",
  error: "bg-red-50",
  warning: "bg-yellow-50",
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  text,
  type = "question",
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  showCancel = true,
  autoClose,
}: ConfirmDialogProps) {
  const Icon = iconMap[type];

  React.useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, isOpen, onClose]);

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45 z-50"
          >
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-lg shadow-gray-400 rounded-lg w-4/12 min-w-[400px] max-w-lg mx-4 z-100 duration-500"
            >
              <div className="px-4 py-5">
                {/* Header */}
                <div className="py-2 text-center relative">
                  <button
                    onClick={onClose}
                    className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`${colorMap[type]} flex-shrink-0`}>
                      <Icon className="w-16 h-16" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {title}
                      </h3>
                      {text && (
                        <p className="text-gray-600 text-base leading-relaxed px-4">
                          {text}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                {(onConfirm || showCancel) && (
                  <div className="flex justify-center gap-5 mt-6">
                    {showCancel && (
                      <button
                        onClick={handleCancel}
                        className="px-8 text-white py-2 hover:bg-gray-300 hover:text-black bg-gray-400 rounded-sm transition-colors"
                      >
                        {cancelText}
                      </button>
                    )}
                    {onConfirm && (
                      <button
                        onClick={handleConfirm}
                        className={`px-8 text-white py-2 rounded-sm transition-colors ${
                          type === "error"
                            ? "bg-red-500 hover:bg-red-600"
                            : type === "success"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        {confirmText}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
