"use client";

import React, { useState, DragEvent, ChangeEvent, useRef } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Button } from "./ui/Button";
import { useTranslation } from "react-i18next";

interface FileDropProps {
  onFileChange: (file: File | null) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onFileChange }) => {
  const { t } = useTranslation();

  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 1) {
      alert(t("fileDrop.error.multiple"));
      return;
    }

    const droppedFile = droppedFiles[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      onFileChange(droppedFile);
    } else {
      alert(t("fileDrop.error.invalidType"));
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];

    if (selectedFiles.length > 1) {
      alert(t("fileDrop.error.multiple"));
      return;
    }

    const selectedFile = selectedFiles[0];
    if (selectedFile && selectedFile.type.startsWith("audio/")) {
      onFileChange(selectedFile);
    } else {
      alert(t("fileDrop.error.invalidType"));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`drop-zone w-full h-full p-6 border-2 border-dashed border-primary-100 rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors ${
        dragOver
          ? "bg-primary-600 border-primary-300"
          : "bg-primary-700 border-primary-500"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FaFileUpload size={48} className="mb-2 text-primary-100" />
      <p className="text-lg font-bold text-primary-100">
        {dragOver ? t("fileDrop.dropFile") : t("fileDrop.noFile")}
      </p>
      <p className="text-sm text-primary-100">
        {dragOver ? t("fileDrop.dropHint") : t("fileDrop.browseHint")}
      </p>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {!dragOver && (
        <Button className="mt-3" onClick={handleButtonClick}>
          {t("fileDrop.selectFile")}
        </Button>
      )}
    </div>
  );
};

export default FileDrop;
