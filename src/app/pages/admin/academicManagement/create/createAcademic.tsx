"use client";

import { LabelInput } from "@/app/components/input/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function CreateAcademicPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
      <div className="flex flex-col">
        <div>
          <Badge className="text-sm sm:text-base" variant="outline">
            เพิ่มบุคคลกรภายใน
          </Badge>
        </div>
        <div className="flex items-center justify-center p-4">
          {/* input image */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {previewImage ? (
                <div className="flex items-center justify-center gap-20">
                  {/* Display uploaded image as a small box */}
                  <div className="w-40 h-40 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div className="w-full flex ">
          {/* input name */}
          <div className="flex w-1/3">
            <LabelInput label="name" type="text" htmlFor="name" />
          </div>
          {/* input surname */}
          <div className="flex w-1/3">
            <LabelInput label="surname" type="text" htmlFor="surname" />
          </div>
          {/* input email */}
          <div className="flex w-1/3">
            <LabelInput type="text" label="email" htmlFor="email" />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/6 hover:bg-blue-600">
          <a href="/pages/admin/academicManagement/create">Add New Staff</a>
        </button>
      </div>
    </header>
  );
}

// {
//     id: "1",
//     name: "I Bell",
//     email: "test@gmail.com",
//   },
