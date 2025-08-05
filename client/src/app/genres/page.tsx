import { CreateGenreForm } from "./(components)/create-genre-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="w-full space-y-4">
          <CreateGenreForm />
        </div>
      </div>
    </div>
  );
}
