import { ChangeYourPasswordForm } from "@/components/edit-your-profile-form";

export default function Page() {
  return (
    <main className="background w-full h-[calc(100vh-9.75rem)] flex justify-center items-center">
      <div className="bg-white max-w-[1300px] flex flex-col gap-8 py-12 px-8 rounded-lg">
        <ChangeYourPasswordForm />
      </div>
    </main>
  );
}
