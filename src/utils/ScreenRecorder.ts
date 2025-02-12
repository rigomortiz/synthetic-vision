import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";

class ScreenRecorder {
  private ffmpeg: FFmpeg;

  constructor() {
    this.ffmpeg = createFFmpeg({ log: false });
  }

  loadFFmpeg(): Promise<void> {
    return this.ffmpeg.load();
  }

  async recordScreenWithAudio(): Promise<MediaStream> {
    const screenStream: MediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: 60, facingMode: "user" },
    });

    const audioStream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const combinedStream = new MediaStream([
      ...screenStream.getTracks(),
      ...audioStream.getTracks(),
    ]);

    screenStream.onremovetrack = (): void => console.log("Screen stream removed");

    return combinedStream;
  }

  async recordScreen(): Promise<MediaStream> {
    const screenStream: MediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: 60, facingMode: "user" },
    });

    screenStream.onremovetrack = (): void => console.log("Screen stream removed");

    return screenStream;
  }

  createRecorder(stream: MediaStream, isGif: boolean, type: string): MediaRecorder {
    let recordedChunks: BlobPart[] = [];
    const filename: string = new Date().toISOString().replace(/:/g, "-");
    const options = {
      mimeType: 'video/webm;codecs=vp8,opus',
      bitsPerSecond: 800 * 1024 * 1024,
    };
    const mediaRecorder = new MediaRecorder(stream, options);
    const ffmpeg: FFmpeg = this.ffmpeg;

    mediaRecorder.ondataavailable = (e: BlobEvent): void => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = async (): Promise<void> => {
      if (type === "video") {
        this.downloadVideo(recordedChunks, filename);
      } else if (type === "gif") {
        await this.convertToGif(recordedChunks, filename, ffmpeg);
      }
      recordedChunks = [];
    };

    mediaRecorder.start();
    if (isGif) setTimeout((): void => mediaRecorder.stop(), 7000);

    return mediaRecorder;
  }

  private downloadVideo(recordedChunks: BlobPart[], filename: string): void {
    const blobVideo = new Blob(recordedChunks, { type: "video/mp4" });
    const downloadLink: HTMLAnchorElement = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blobVideo);
    downloadLink.download = `${filename}.mp4`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
    document.body.removeChild(downloadLink);
  }

  private async convertToGif(recordedChunks: BlobPart[], filename: string, ffmpeg: FFmpeg): Promise<void> {
    const blobVideo = new Blob(recordedChunks, { type: "video/mp4" });
    ffmpeg.FS('writeFile', `${filename}.mp4`, await fetchFile(blobVideo));
    await ffmpeg.run('-i', `${filename}.mp4`, '-t', '5.0', '-ss', '1.0', '-vf', 'crop=640:640:(in_w-640)/2:(in_h-640)/2', '-f', 'gif', `${filename}.gif`);
    const data: Uint8Array = ffmpeg.FS('readFile', `${filename}.gif`);
    // @ts-ignore
    const blobToGif = new Blob([data.buffer], { type: 'image/gif' });
    const url: string = URL.createObjectURL(blobToGif);

    const downloadLink: HTMLAnchorElement = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${filename}.gif`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  }
}

export default ScreenRecorder;