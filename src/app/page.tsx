import { ScreenRecorder } from "./_components/screen-recorder";
import { auth0 } from "@/lib/auth";
import LoginButton from "@/components/login-button";
import LogoutButton from "@/components/logout-button";
import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-4xl font-bold">Live Screen Recorder</h1>
      {user ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <ScreenRecorder />
          <Profile />
          <LogoutButton />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 w-full">
          <LoginButton />
        </div>
      )}
    </main>
  );
}
