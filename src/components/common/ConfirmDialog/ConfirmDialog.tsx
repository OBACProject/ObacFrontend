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
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden"
            >
              {/* Header */}
              <div className={`${bgColorMap[type]} p-6 relative`}>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-4">
                  <div className={`${colorMap[type]} flex-shrink-0`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {title}
                    </h3>
                    {text && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {text}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              {(onConfirm || showCancel) && (
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                  {showCancel && (
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      {cancelText}
                    </button>
                  )}
                  {onConfirm && (
                    <button
                      onClick={handleConfirm}
                      className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                        type === "error"
                          ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                          : type === "success"
                          ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                          : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                      }`}
                    >
                      {confirmText}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
