import { auth0 } from "@/lib/auth";
import fetchApi from "@/lib/fetch-api";
import Download from "@/features/videos/components/download";
import { VideoRecording } from "@/features/videos/types";

export default async function Recordings() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    return <div>Please login to view your recordings</div>;
  }

  let recordings: VideoRecording[] = [];

  try {
    const response = await fetchApi("/videos");

    recordings = (await response.json()).data;
    console.log("REC:", recordings);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <h1>Recordings</h1>
      <ul>
        {recordings.map((recording) => (
          <li key={recording._id}>
            {/* <a
              href={recording.url}
              download={recording.title}
              rel="noopener noreferrer"
            >
              {recording.title}
            </a> */}
            <Download url={recording.url} title={recording.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
