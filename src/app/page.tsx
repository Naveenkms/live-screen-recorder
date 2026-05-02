import { ScreenRecorder } from "@/features/recordings/components/screen-recorder";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-10 py-10">
      <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto px-4">
        <ScreenRecorder />
      </div>
    </div>
  );
}
