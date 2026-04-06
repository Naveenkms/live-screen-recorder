import { Recording } from "@/features/recordings/types/recording.type";
import Download from "./download";
import RecordingsPlayer from "./recordings-player";

type RecordingsListProps = {
  recordings: Recording[];
};

export default function RecordingsList({ recordings }: RecordingsListProps) {
  return (
    <>
      {recordings.length === 0 ? (
        <div>No recordings found</div>
      ) : (
        <ul>
          {recordings.map((recording) => (
            <li key={recording._id} className="flex justify-between">
              <RecordingsPlayer videoId={recording._id} src={recording.url} />
              <Download
                url={`/videos/download/${recording._id}`}
                title={recording.title}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
