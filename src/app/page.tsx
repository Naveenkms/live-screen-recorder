import { ScreenRecorder } from "@/features/recorder/components/screen-recorder";
import LogoutButton from "@/features/auth/components/logout-button";
import Profile from "@/features/auth/components/profile";

export default async function Home() {

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-4xl font-bold">Live Screen Recorder</h1>
      <div className="flex flex-col items-center gap-4 w-full">
        <ScreenRecorder />
        <Profile />
        <LogoutButton />
      </div>
    </main>
  );
}
