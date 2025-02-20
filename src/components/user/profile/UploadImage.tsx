"use client";
import icons from "@/public/icons";
import Image from "next/image";
import { useRef, useState } from "react";

const UploadImage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full gap-4 md:gap-0 flex md:flex-row flex-col md:items-center md:justify-between dark:text-white">
      <div className="flex items-center gap-2">
        <div className="w-fit">
          {previewUrl ? (
            <div className="flex justify-center items-center bg-[#FAFAFA] border border-[#D1D1D6] border-dashed rounded-lg relative group">
              <Image
                src={previewUrl}
                alt="profile preview"
                width={80}
                height={80}
                className="object-cover rounded-lg"
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-50 rounded-lg hidden group-hover:flex items-center justify-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewUrl(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleUploadClick();
              }}
              className="cursor-pointer flex justify-center items-center bg-[#FAFAFA] dark:bg-[#FAFAFA0D] border border-[#D1D1D6] dark:border-[#515151] border-dashed rounded-lg min-w-[100px] min-h-[100px] md:min-w-[120px] md:min-h-[120px]"
            >
              <Image
                src={icons.profile.UploadIcon}
                alt="upload"
                width={24}
                height={24}
                className="w-4 h-4 md:w-6 md:h-6"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Profile Picture</p>
          <p className="text-sm text-[#7F7F7F] dark:text-[#FFFFFFB2]">
            Upload your logo. Only .JPG and .PNG supported
          </p>
        </div>
      </div>

      {/* Upload button */}
      <div className="w-fit cursor-pointer rounded-3xl py-2 px-6 flex items-center gap-2 border border-[#9D9D9]">
        <Image
          src={icons.profile.UploadIcon}
          alt="upload"
          width={12}
          height={12}
        />
        <p className="font-semibold">Upload Image</p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};

export default UploadImage;
