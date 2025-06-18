import React, { useState, DragEvent, ChangeEvent, useRef } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Button } from "./ui/Button";

interface FileDropProps {
  onFileChange: (file: File | null) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onFileChange }) => {
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
      alert("Only one file is allowed.");
      return;
    }

    const droppedFile = droppedFiles[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      onFileChange(droppedFile);
    } else {
      alert("Only audio files are allowed.");
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent click event from bubbling to parent
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    if (selectedFiles.length > 1) {
      alert("Only one file is allowed.");
      return;
    }

    const selectedFile = selectedFiles[0];
    if (selectedFile && selectedFile.type.startsWith("audio/")) {
      onFileChange(selectedFile);
    } else {
      alert("Only audio files are allowed.");
    }

    // Reset the input to allow re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent click from bubbling to parent div
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
        {dragOver ? "Drop the audio file to upload" : "No audio file selected"}
      </p>
      <p className="text-sm text-primary-100">
        {dragOver
          ? "Drop it like it's hot"
          : "Drag & drop an audio file here, or click the button to browse and upload."}
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
          Select File
        </Button>
      )}
    </div>
  );
};

export default FileDrop;
