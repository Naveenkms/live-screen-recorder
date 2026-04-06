import fetchApi from "@/lib/fetch-api";
import { Recording } from "@/features/recordings/types/recording.type";
import RecordingsList from "@/features/recordings/components/recordings-list";

export default async function RecordingsPage() {
  let recordings: Recording[] = [];

  try {
    const response = await fetchApi("/videos");

    recordings = (await response.json()).data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch recordings");
  }

  return (
    <div>
      <h1>Recordings</h1>
      <RecordingsList recordings={recordings} />
    </div>
  );
}
