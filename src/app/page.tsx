import { ScreenRecorder } from "./_components/screen-recorder";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-4xl font-bold">Live Screen Recorder</h1>
      <ScreenRecorder />
    </main>
  );
}
