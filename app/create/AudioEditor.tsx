"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import WaveSurfer from "wavesurfer.js";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { clamp } from "@/lib/clamp";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";

import FileDrop from "@/components/FileDrop";
import CategorySelector from "@/components/CategorySelector";

import { FaPause, FaPlay } from "react-icons/fa6";
import Trimmer from "./Trimmer";
import { trimAudio } from "./trimAudio";
import { useTranslation } from "react-i18next";

type AudioContextType = AudioContext | null;
type AudioBufferType = AudioBuffer | null;

const MIN_DURATION = 3;
const MAX_DURATION = 30;
const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 250;

export default function AudioEditor() {
  const router = useRouter();
  const supabase = createClient();

  const { t } = useTranslation();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const audioRef = useRef<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBufferType>(null);
  const [audioContext, setAudioContext] = useState<AudioContextType>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  const [range, setRange] = useState<[number, number]>([0, 100]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFileProcessing, setIsFileProcessing] = useState(false);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setIsFileProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const context = new (window.AudioContext || window.AudioContext)();
      setAudioContext(context);

      await context.decodeAudioData(arrayBuffer, (buffer) => {
        setAudioBuffer(buffer);
        audioRef.current = URL.createObjectURL(file);
        setAudioBlob(file);
        setRange([
          buffer.duration / 10,
          buffer.duration - buffer.duration / 10,
        ]);
      });
    } catch (error) {
      toast.error(t("audioEditor.errors.processingUploadError"));
      console.error("Error in handleFileChange:", error);
    } finally {
      setIsFileProcessing(false);
    }
  };

  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    if (wavesurfer) {
      const [start, end] = range;

      if (!isPlaying) {
        if (
          wavesurfer.getCurrentTime() < start ||
          wavesurfer.getCurrentTime() > end
        ) {
          wavesurfer.setTime(start);
        }
        wavesurfer.play();
      } else {
        wavesurfer.pause();
      }

      setIsPlaying(!isPlaying);
    }
  };

  const handleCancel = () => {
    // Reset all states
    setTitle("");
    setDescription("");
    setSelectedCategories([]);
    setAudioBuffer(null);
    setAudioContext(null);
    setRange([0, 100]);
    setAudioBlob(null);
    setFileUrl(null);
    setIsPlaying(false);
    setLoading(false);
    setIsFileProcessing(false);

    // Clean up resources
    if (audioRef.current) {
      URL.revokeObjectURL(audioRef.current);
      audioRef.current = null;
    }
    if (wavesurfer) {
      wavesurfer.destroy();
      setWavesurfer(null);
    }
    if (audioContext) {
      audioContext
        .close()
        .catch((error) => console.error("Error closing AudioContext:", error));
    }
  };

  useEffect(() => {
    if (wavesurfer && wavesurfer.getCurrentTime() >= range[1]) {
      wavesurfer.pause();
      setIsPlaying(false);
    }
  }, [range, wavesurfer]);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (audioRef.current) {
        URL.revokeObjectURL(audioRef.current);
      }
      if (wavesurfer) {
        wavesurfer.destroy();
      }
      if (audioContext) {
        audioContext
          .close()
          .catch((error) =>
            console.error("Error closing AudioContext:", error)
          );
      }
    };
  }, [wavesurfer, audioContext]);

  const handleRangeChange = (values: number[]) => {
    let [start, end] = values;
    const maxEnd = audioBuffer?.duration ?? 100;
    const duration = end - start;

    // Enforce MIN_DURATION and MAX_DURATION
    if (duration < MIN_DURATION) {
      end = clamp(start + MIN_DURATION, 0, maxEnd);
    } else if (duration > MAX_DURATION) {
      end = clamp(start + MAX_DURATION, 0, maxEnd);
    }

    // Ensure start and end are within valid bounds
    start = clamp(start, 0, maxEnd - MIN_DURATION);
    end = clamp(end, 0, maxEnd);

    setRange([start, end]);
  };

  const uploadClip = async () => {
    if (!audioBuffer || !audioContext) {
      toast.error(t("audioEditor.errors.audioNotReady"), {
        description: t("audioEditor.errors.audioNotReadyDescription"),
      });
      return;
    }

    if (title.trim().length > MAX_TITLE_LENGTH) {
      toast.error(t("audioEditor.titleInput.longTitle"), {
        description: t("audioEditor.titleInput.titleLengthError", {
          min: MIN_TITLE_LENGTH,
          max: MAX_TITLE_LENGTH,
        }),
      });
      return;
    }

    if (title.trim().length < MIN_TITLE_LENGTH) {
      toast.error(t("audioEditor.titleInput.shortTitle"), {
        description: t("audioEditor.titleInput.titleLengthError", {
          min: MIN_TITLE_LENGTH,
          max: MAX_TITLE_LENGTH,
        }),
      });
      return;
    }

    if (selectedCategories.length < 1) {
      toast.error(t("audioEditor.errors.noSelectedCategories"), {
        description: t("audioEditor.errors.noSelectedCategoriesDescription"),
      });
      return;
    }

    if (description.trim().length > MAX_DESCRIPTION_LENGTH) {
      toast.error(t("audioEditor.errors.descriptionTooLong"), {
        description: t("audioEditor.errors.descriptionTooLongDescription"),
      });
      return;
    }

    setLoading(true);

    try {
      // Trim audio before upload
      const trimmedBlob = await trimAudio(audioBuffer, audioContext, range);
      setAudioBlob(trimmedBlob);
      setFileUrl(URL.createObjectURL(trimmedBlob));

      // Upload the trimmed audio file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("clips")
        .upload(`${Date.now()}.mp3`, trimmedBlob, {
          cacheControl: "3600",
          upsert: false,
          contentType: "audio/mp3",
        });

      if (uploadError) {
        toast.error(t("audioEditor.errors.uploadError"));
        setLoading(false);
        return;
      }

      // Generate public URL for the uploaded file
      const { data: publicURLData } = supabase.storage
        .from("clips")
        .getPublicUrl(uploadData.path);

      // Insert record into the clips table with the file's public URL
      const { error: insertError } = await supabase.from("clips").insert([
        {
          title,
          description,
          audiofile: publicURLData.publicUrl,
          categories: selectedCategories,
        },
      ]);

      if (insertError) {
        toast.error(
          t("audioEditor.errors.insertError", {
            message: insertError.message,
          })
        );
        setLoading(false);
        return;
      }

      toast.success(t("audioEditor.success.uploadSuccess"), {
        description: t("audioEditor.success.uploadSuccessDescription"),
      });

      router.push("/");
    } catch (error) {
      toast.error(t("audioEditor.errors.processingUploadError"));
      console.error("Error in uploadClip:", error);
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-primary-800 rounded-lg p-4 overflow-x-hidden">
      <div className="text-white w-full h-full">
        {isFileProcessing || (audioBlob && !wavesurfer) ? (
          <div className="flex flex-col items-center justify-center h-full bg-primary-800 text-white rounded-lg">
            <Spinner size="4" />
            <span className="mt-2 text-lg font-bold">
              {t("audioEditor.fileProcessing")}
            </span>
          </div>
        ) : (
          !wavesurfer && <FileDrop onFileChange={handleFileChange} />
        )}

        {audioBuffer && (
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Input
                  placeholder={t("audioEditor.titleInput.placeholder")}
                  disabled={loading}
                  minLength={3}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  value={title}
                  error={
                    title && title.trim().length > MAX_TITLE_LENGTH
                      ? t("audioEditor.titleInput.error")
                      : undefined
                  }
                  required
                />
              </div>
              <div>
                <CategorySelector onCategoryChange={setSelectedCategories} />
              </div>
            </div>

            <Input
              placeholder={t("audioEditor.descriptionInput.placeholder")}
              disabled={loading}
              onChange={(e) => setDescription(e.currentTarget.value)}
              value={description}
              rows={5}
              textarea
              error={
                description &&
                description.trim().length > MAX_DESCRIPTION_LENGTH
                  ? "The maximum length of the description is 250 characters"
                  : undefined
              }
            />

            <Trimmer
              audioBuffer={audioBuffer}
              audioRef={audioRef}
              onRangeChange={handleRangeChange}
              onReady={onReady}
              range={range}
              setIsPlaying={setIsPlaying}
            />
          </div>
        )}
        {wavesurfer && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button
                color="accent-secondary"
                onClick={onPlayPause}
                disabled={loading}
                icon={isPlaying ? <FaPause /> : <FaPlay />}
              >
                {isPlaying
                  ? t("audioEditor.buttons.pause")
                  : t("audioEditor.buttons.play")}
              </Button>

              {fileUrl && (
                <Button
                  color="accent-secondary"
                  onClick={() => window.open(fileUrl, "_blank")}
                  disabled={loading}
                >
                  {t("audioEditor.buttons.download")}
                </Button>
              )}

              <Button
                type="submit"
                onClick={uploadClip}
                disabled={loading}
                loading={loading}
              >
                {t("audioEditor.buttons.publish")}
              </Button>
            </div>

            <Button color="secondary" onClick={handleCancel} disabled={loading}>
              {t("audioEditor.buttons.cancel")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
