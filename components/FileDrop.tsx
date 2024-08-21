// FileDropComponent.tsx
import React, { useState, DragEvent, ChangeEvent, useRef } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { Button } from './ui/Button';

interface FileDropProps {
    onFileChange: (file: File | null) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onFileChange }) => {
    const [dragOver, setDragOver] = useState(false);
    const [file, setFile] = useState<File | null>(null);
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
            alert('Only one file is allowed.');
            return;
        }

        const droppedFile = droppedFiles[0];
        if (droppedFile && droppedFile.type.startsWith('audio/')) {
            setFile(droppedFile);
            onFileChange(droppedFile);
        } else {
            alert('Only audio files are allowed.');
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
        if (selectedFiles.length > 1) {
            alert('Only one file is allowed.');
            return;
        }

        const selectedFile = selectedFiles[0];
        if (selectedFile && selectedFile.type.startsWith('audio/')) {
            setFile(selectedFile);
            onFileChange(selectedFile);
        } else {
            alert('Only audio files are allowed.');
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`drop-zone bg-primary-700 border-2 border-dashed w-full h-96 ${dragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <FaFileUpload size={50} className='mb-2' />
            <p>Select audio to continue</p>
            <p>Drag and drop an audio file here, or click to select a file</p>
            <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <Button className="mt-2" onClick={handleButtonClick}>
                Select File
            </Button>
            {/* {file && <p>{file.name}</p>} */}
        </div>
    );
};

export default FileDrop;
