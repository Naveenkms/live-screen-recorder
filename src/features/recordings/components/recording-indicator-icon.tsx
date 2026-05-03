import { cn } from "@/lib/utils";

type RecordingIndicatorIconProps = {
  status: "not-recording" | "recording";
};

export default function RecordingIndicatorIcon({
  status,
}: RecordingIndicatorIconProps) {
  return (
    <div
      data-state={status}
      className={cn(
        "bg-brand size-6 transition-all duration-1000",
        "data-recording:rounded-md data-not-recording:rounded-full",
      )}
    />
  );
}
