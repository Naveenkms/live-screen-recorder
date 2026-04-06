"use client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import fetchApi from "@/lib/fetch-api";

export default function Download({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  console.log("cdc", url);
  const downloadVideo = async (url: string) => {
    try {
      const response = await fetchApi(url);

      if (!response.ok) {
        throw new Error("Failed to fetch video");
      }

      const {
        data: { downloadUrl },
      } = await response.json();

      const link = document.createElement("a");
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed: ", error);
      toast.error("Download failed");
    }
  };

  return <Button onClick={() => downloadVideo(url)}>{title}</Button>;
}
