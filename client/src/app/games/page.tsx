import { CreateGameForm } from "@/components/create-game-form";
import { getGenresAction } from "../genres/actions";
import { getPlatformsAction } from "../platforms/actions";

export default async function Page() {
  const platformsRes = await getPlatformsAction("game");
  const genresRes = await getGenresAction("game");

  if (!platformsRes.success || !genresRes.success) {
    return;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <div className="w-full space-y-4 text-center">
          <CreateGameForm platforms={platformsRes.data} genres={genresRes.data} />
        </div>
      </div>
    </div>
  );
}
