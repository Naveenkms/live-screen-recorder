import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function startDisplayCapture(options?: DisplayMediaStreamOptions) {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia(options);
    return { stream, error: null };
  } catch (error: any) {
    return {
      stream: null,
      error: error.message || "Failed to get display capture permission",
    };
  }
}

export async function stopDisplayCapture(stream: MediaStream) {
  try {
    stream.getTracks().forEach((track) => track.stop());
    return { success: true, error: null };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to stop display capture",
    };
  }
}
