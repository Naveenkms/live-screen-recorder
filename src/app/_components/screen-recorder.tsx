"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { startDisplayCapture, stopDisplayCapture } from "@/lib/utils";

const TIME_SLICE = 2000;

export function ScreenRecorder() {
  const [isRecording, setIsRecording] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    wsRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080",
    );

    wsRef.current.onerror = (event) => {
      console.error("WebSocket error: ", event);
      toast.error("WebSocket error");
    };

    wsRef.current.binaryType = "arraybuffer"; // for sending raw video data

    wsRef.current.onopen = async () => {
      const { stream, error } = await startDisplayCapture({
        audio: true,
        video: true,
      });

      if (error) {
        toast.error(error);
        console.error(error);
      }

      if (stream) {
        const recordedChunks: Blob[] = [];

        streamRef.current = stream;

        const options = { mimeType: "video/webm; codecs=vp9" };
        const mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.ondataavailable = async (event) => {
          if (event.data.size > 0) {
            const arrayBuffer = await event.data.arrayBuffer();

            if (wsRef.current?.readyState === WebSocket.OPEN) {
              wsRef.current?.send(arrayBuffer);
            }
          }

          // closing the connection makes the server to stop recording
          if (mediaRecorder.state === "inactive") {
            wsRef.current?.close();
          }
        };

        mediaRecorder.start(TIME_SLICE);

        setIsRecording(true);

        mediaRecorder.onstop = () => {
          setIsRecording(false);
        };
      }
    };
  };

  const stopRecording = () => {
    if (streamRef.current) {
      // recording will stop automatically when the stream is stopped
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API#overview_of_the_recording_process
      stopDisplayCapture(streamRef.current);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? "Stop Recording" : "Start Recording"}
    </Button>
  );
}
