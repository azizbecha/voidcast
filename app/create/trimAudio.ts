// @ts-expect-error lamejs has no TypeScript types
import lamejs from "lamejs";

// Convert AudioBuffer to MP3 using lamejs
const audioBufferToMp3 = (buffer: AudioBuffer): Blob => {
  const sampleRate = buffer.sampleRate;
  const numberOfChannels = buffer.numberOfChannels;
  const validChannels = numberOfChannels === 2 ? 2 : 1;
  const length = buffer.length;

  // Initialize MP3 encoder
  const mp3encoder = new lamejs.Mp3Encoder(validChannels, sampleRate, 128);

  const mp3Data = [];
  const sampleBlockSize = 1152; // samples per frame

  // Convert float32 to int16
  const convertFloat32ToInt16 = (buffer: Float32Array): Int16Array => {
    const int16Buffer = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      int16Buffer[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return int16Buffer;
  };

  // Process audio in blocks
  for (let i = 0; i < length; i += sampleBlockSize) {
    const leftChannelData = buffer
      .getChannelData(0)
      .subarray(i, i + sampleBlockSize);
    const leftChannel = convertFloat32ToInt16(leftChannelData);

    let rightChannel: Int16Array | undefined;
    if (numberOfChannels === 2) {
      const rightChannelData = buffer
        .getChannelData(1)
        .subarray(i, i + sampleBlockSize);
      rightChannel = convertFloat32ToInt16(rightChannelData);
    }

    const mp3buf = mp3encoder.encodeBuffer(leftChannel, rightChannel);
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
  }

  // Flush remaining data
  const mp3buf = mp3encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(mp3buf);
  }

  return new Blob(mp3Data, { type: "audio/mp3" });
};

export const trimAudio = async (
  buffer: AudioBuffer,
  context: AudioContext,
  range: [number, number]
): Promise<Blob> => {
  const [start, end] = range;
  const sampleRate = buffer.sampleRate;
  const startSample = Math.floor(start * sampleRate);
  const endSample = Math.floor(end * sampleRate);
  const trimmedLength = endSample - startSample;

  // Create new buffer for trimmed audio
  const trimmedBuffer = context.createBuffer(
    buffer.numberOfChannels,
    trimmedLength,
    sampleRate
  );

  // Copy audio data for each channel
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const originalData = buffer.getChannelData(channel);
    const trimmedData = trimmedBuffer.getChannelData(channel);
    for (let i = 0; i < trimmedLength; i++) {
      trimmedData[i] = originalData[startSample + i];
    }
  }

  // Convert trimmed buffer to MP3
  const mp3Blob = audioBufferToMp3(trimmedBuffer);
  return mp3Blob;
};
