"use client";
import { ComponentProps, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import fetchApi from "@/lib/fetch-api";

type VideoProps = Omit<ComponentProps<"video">, "ref" | "onError"> & {
  videoId: string;
};

export default function RecordingsPlayer({
  videoId,
  className,
  ...props
}: VideoProps) {
  const [isRecovering, setIsRecovering] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(props.src);

  const videoElement = useRef<HTMLVideoElement>(null);

  const handleError = async () => {
    const videoEl = videoElement.current;

    if (!videoEl) {
      console.error("Video element not found");
      return;
    }

    const error = videoEl.error;
    console.error("Video failed to load", error);

    if (error?.code === MediaError.MEDIA_ERR_NETWORK) {
      setIsRecovering(true);
      console.log("Video stream interrupted. Attempting to recover...");

      const timeAtCrash = videoEl.currentTime;
      const wasPlaying = !videoEl.paused;

      try {
        const newSrc = await fetchApi(`/videos/signed-url/${videoId}`);
        const { signedUrl } = (await newSrc.json()).data;

        console.log("newSrc", signedUrl);
        setCurrentUrl(signedUrl);

        videoEl.onloadedmetadata = () => {
          videoEl.currentTime = timeAtCrash;
          if (wasPlaying) {
            videoEl.play();
          }
          setIsRecovering(false);
        };
      } catch (error) {
        console.error("Failed to recover video stream", error);
        setIsRecovering(false);
      }
    }
  };
  return (
    <video
      src={currentUrl}
      onError={handleError}
      className={cn("w-3/4 h-screen", className)}
      ref={videoElement}
      controls
      {...props}
    />
  );
}
