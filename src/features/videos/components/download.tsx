"use client";
import { Button } from "@/components/ui/button";

export default function Download({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const downloadFile = async (url: string, fileName: string) => {
    console.log("URL:", url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch video");
      }
      const blob = await response.blob(); // Convert the data to a Blob
      const blobUrl = window.URL.createObjectURL(blob); // Create a temporary URL

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Cleanup: Remove the link and free up memory
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return <Button onClick={() => downloadFile(url, title)}>{title}</Button>;
}
