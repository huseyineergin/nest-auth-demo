import { ThemeToggler } from "@/components/theme-toggler";
import { SignInForm } from "../(components)/sign-in-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="w-full space-y-4 text-center">
          <SignInForm />
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}
