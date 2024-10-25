"use client"

import { useState, useRef, useEffect } from 'react';

import WavesurferPlayer from '@wavesurfer/react';
import WaveSurfer from 'wavesurfer.js';
import { Range } from 'react-range';
import toast from 'react-hot-toast';

import { createClient } from "@/utils/supabase/client";

import {  FaPause, FaPlay } from 'react-icons/fa6';
import { FaFileUpload } from 'react-icons/fa';

import { Button } from './ui/Button';
import { Input } from './ui/Input';

import FileDrop from './FileDrop'
;
import { trimAudio } from '@/utils/audioOperations';
import CategorySelector from '@/app/create/CategorySelector';

type AudioContextType = AudioContext | null;
type AudioBufferType = AudioBuffer | null;

export default function AudioTrimmer() {
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [audioBuffer, setAudioBuffer] = useState<AudioBufferType>(null);
    const [audioContext, setAudioContext] = useState<AudioContextType>(null);
    const [range, setRange] = useState<[number, number]>([0, 100]);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const audioRef = useRef<string | null>(null);

    const supabase = createClient();

    const MIN_DURATION = 3; // Minimum duration in seconds
    const MAX_DURATION = 30; // Maximum duration in seconds

    const handleFileChange = async (file: File | null) => {
        if (!file) return;

        const arrayBuffer = await file.arrayBuffer();
        const context = new (window.AudioContext || window.AudioContext)();
        setAudioContext(context);

        context.decodeAudioData(arrayBuffer, (buffer) => {
            setAudioBuffer(buffer);
            audioRef.current = URL.createObjectURL(file);
            setAudioBlob(file);
            setRange([buffer.duration / 10, buffer.duration - (buffer.duration / 10)]);
        });
    };

    const onReady = async (ws: WaveSurfer) => {
        setWavesurfer(ws);
        setIsPlaying(false);
        trimAudio(audioBuffer!, audioContext!, range, setAudioBlob, setFileUrl);
    };

    const onPlayPause = () => {
        if (wavesurfer) {
            const [start, end] = range;

            if (!isPlaying) {
                if (wavesurfer.getCurrentTime() < start || wavesurfer.getCurrentTime() > end) {
                    wavesurfer.setTime(start);
                }
                wavesurfer.play();
            } else {
                wavesurfer.pause();
            }

            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (wavesurfer && wavesurfer.getCurrentTime() >= range[1]) {
            wavesurfer.pause();
            setIsPlaying(false);
        }
    }, [range, wavesurfer]);

    const handleRangeChange = (values: number[]) => {
        const [start, end] = values;

        // Clamp values to ensure the range respects the min and max duration
        if (end - start < MIN_DURATION) {
            setRange([start, Math.min(start + MIN_DURATION, audioDuration)]);
        } else if (end - start > MAX_DURATION) {
            setRange([start, Math.max(start, start + MAX_DURATION)]);
        } else {
            setRange([start, end]);
        }
    };

    const uploadClip = async () => {
        if (!audioBlob || !title) { // Ensure title is also provided
            toast.error('Please provide a title and ensure the audio is ready.');
            return;
        }

        if (title.trim().length > 150) {
            toast.error('Title is too long..');
            return;
        }

        if (title.trim().length > 150) {
            toast.error('Description is too long..');
            return;
        }

        setLoading(true);

        // Upload the audio file to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('clips') // Replace 'clips' with your actual bucket name
            .upload(`${Date.now()}.wav`, audioBlob, {
                cacheControl: '3600',
                upsert: false,
                contentType: 'audio/wav',
            });

        if (uploadError) {
            toast.error('Error uploading file');
            setLoading(false);
            return;
        }

        // Generate public URL for the uploaded file
        const { data: publicURLData } = supabase.storage
            .from('clips')
            .getPublicUrl(uploadData.path);

        // Insert record into the clips table with the file's public URL
        const { data: insertData, error: insertError } = await supabase
            .from('clips')
            .insert([{
                title,
                description,
                audiofile: publicURLData.publicUrl,
                categories: selectedCategories,
            }]);

        if (insertError) {
            toast.error(`Error inserting record into clips table: ${insertError.message}`);
        } else {
            toast.success("Your clip has been published successfully");
        }

        setLoading(false);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const audioDuration = audioBuffer?.duration ?? 1;
    const leftWidth = (range[0] / (audioDuration)) * 100;
    const rightWidth = ((audioDuration) - range[1]) / (audioDuration) * 100;
    const selectedWidth = 100 - leftWidth - rightWidth;
    const selectedDuration = formatTime(range[1] - range[0]);

    return (
        <div className='h-full bg-primary-800 rounded-lg p-4 overflow-y-scroll overflow-x-hidden'>
            <div className="flex justify-between items-center mb-4 bg-primary-800">
                <h3 className="text-white">Create clip</h3>
                {
                    wavesurfer && (
                        <div className="flex gap-2">
                            <Button
                                color='accent-secondary'
                                size='small'
                                onClick={onPlayPause}
                                disabled={loading}
                                icon={isPlaying ? <FaPause /> : <FaPlay />}
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </Button>

                            <Button
                                type='submit'
                                size='small'
                                onClick={uploadClip}
                                disabled={loading}
                                loading={loading}
                                icon={<FaFileUpload />}
                            >
                                Publish
                            </Button>
                        </div>
                    )
                }
            </div>
            <div className='text-white w-full h-full'>
                {!wavesurfer && (
                    <FileDrop onFileChange={handleFileChange} />
                )}

                {audioBuffer && (
                    <div className='space-y-2'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    label='Title'
                                    placeholder='Please enter the clip title here (required)'
                                    disabled={loading}
                                    onChange={(e) => setTitle(e.currentTarget.value)}
                                    error={title && title.trim().length > 120 ? 'The maximum length of the title is 120 characters' : undefined}
                                    required
                                />
                            </div>
                            <div>
                                <p className="text-sm text-primary-300 mb-1">Category</p>
                                <CategorySelector onCategoryChange={setSelectedCategories} />
                            </div>
                        </div>

                        <Input
                            label='Description'
                            placeholder='Please enter the clip description here (optional)'
                            disabled={loading}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            rows={5}
                            textarea
                            error={description && description.trim().length > 150 ? 'The maximum length of the description is 150 characters' : undefined}
                        />

                        <div className="relative w-full rounded-lg z-35">
                            <Range
                                step={0.1}
                                min={0}
                                max={audioBuffer.duration}
                                values={range}
                                allowOverlap
                                draggableTrack
                                onChange={handleRangeChange}
                                onFinalChange={(values) => {
                                    handleRangeChange(values);
                                    trimAudio(audioBuffer!, audioContext!, range, setAudioBlob, setFileUrl);
                                }}
                                renderTrack={({ props, children }) => (
                                    <div
                                        className='absolute rounded-lg z-40 py-2'
                                        {...props}
                                        style={{
                                            ...props.style,
                                            width: "100%",
                                            background: `linear-gradient(to right, transparent ${leftWidth}%, #fd4d4d ${leftWidth}%, #fd4d4d ${100 - rightWidth}%, transparent ${100 - rightWidth}%)`,
                                        }}
                                    >
                                        {children}
                                        <div className="flex justify-center items-center">
                                            <div
                                                className="absolute text-sm text-center text-white cursor-grab"
                                                style={{
                                                    left: `${leftWidth}%`,
                                                    width: `${selectedWidth}%`,
                                                }}
                                            >
                                                <span>{selectedDuration}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                renderThumb={({ props, value, isDragged }) => (
                                    <div
                                        {...props}
                                        className='border-2 border-white'
                                        style={{
                                            ...props.style,
                                            height: "35px",
                                            width: "35px",
                                            borderRadius: "50%",
                                            backgroundColor: isDragged ? "#4A90E2" : "#151a21",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#fff",
                                        }}
                                    >
                                        <span className='text-xs'>{formatTime(value)}</span>
                                    </div>
                                )}
                            />
                            <div
                                className="absolute z-30 top-0 left-0 h-full bg-gray-900 opacity-80 rounded-l-lg cursor-not-allowed"
                                style={{ width: `${leftWidth}%`, borderRight: "2px solid #fff" }}>
                            </div>
                            <div
                                className="absolute z-30 top-0 right-0 h-full bg-gray-900 opacity-80 rounded-r-lg cursor-not-allowed"
                                style={{ width: `${rightWidth}%`, borderLeft: "2px solid #fff" }}
                            >
                            </div>
                            {audioBuffer && (
                                <WavesurferPlayer
                                    height={100}
                                    waveColor="#374151"
                                    progressColor="#fd4d4d"
                                    cursorColor='#5575e7'
                                    autoCenter
                                    url={audioRef.current!}
                                    onReady={onReady}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    normalize
                                    autoScroll
                                    dragToSeek
                                    cursorWidth={3}
                                />
                            )}

                            {/* Timestamps */}
                            <div className="absolute z-30 flex justify-between w-full p-2 bottom-0">
                                <span className='text-white px-1 bg-primary-600 rounded-lg'>{formatTime(0)}</span>
                                <span className='text-white px-1 bg-primary-600 rounded-lg'>{formatTime(audioBuffer?.duration ?? 0)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
