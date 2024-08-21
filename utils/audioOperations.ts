export const bufferToWave = (abuffer: AudioBuffer, offset: number, len: number): Blob => {
  const numOfChan = abuffer.numberOfChannels;
  const length = len * numOfChan * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  const channels: Float32Array[] = [];
  let i, sample, pos = 0;

  const setUint16 = (value: number) => {
      view.setUint16(pos, value, true);
      pos += 2;
  };

  const setUint32 = (value: number) => {
      view.setUint32(pos, value, true);
      pos += 4;
  };

  setUint32(0x46464952); // "RIFF" in ASCII
  setUint32(length - 8); // file size minus the size of the headers
  setUint32(0x45564157); // "WAVE"
  setUint32(0x20746d66); // "fmt " chunk marker
  setUint32(16); // length of format data
  setUint16(1); // format type (PCM)
  setUint16(numOfChan); // number of channels
  setUint32(abuffer.sampleRate); // sample rate
  setUint32(abuffer.sampleRate * 2 * numOfChan); // byte rate
  setUint16(numOfChan * 2); // block align
  setUint16(16); // bits per sample

  setUint32(0x61746164); // "data" chunk marker
  setUint32(length - pos - 8); // data size

  for (i = 0; i < numOfChan; i++) {
      channels.push(abuffer.getChannelData(i));
  }

  while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
          sample = Math.max(-1, Math.min(1, channels[i][offset]));
          sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
          view.setInt16(pos, sample, true);
          pos += 2;
      }
      offset++;
  }

  return new Blob([view], { type: 'audio/wav' });
};

export const trimAudio = (
  audioBuffer: AudioBuffer,
  audioContext: AudioContext,
  range: [number, number],
  setAudioBlob: (blob: Blob) => void,
  setFileUrl: (url: string) => void
) => {
  const { duration } = audioBuffer;
  const [start, end] = range;

  if (start >= end || start < 0 || end > duration) {
      alert('Invalid range');
      return;
  }

  const trimmedDuration = end - start;
  const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.sampleRate * trimmedDuration,
      audioBuffer.sampleRate
  );

  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start(0, start, trimmedDuration);

  offlineContext.startRendering().then((renderedBuffer) => {
      const wavBlob = bufferToWave(renderedBuffer, 0, renderedBuffer.length);
      setAudioBlob(wavBlob);
      setFileUrl(URL.createObjectURL(wavBlob));
  });
};
