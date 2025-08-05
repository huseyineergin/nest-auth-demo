import { Genre } from "./genre";
import { Platform } from "./platform";

export type Game = {
  id: string;
  name: string;
  description: string;
  releaseDate: string;
  metascore: number;
  userScore: number;
  developer: string;
  publisher: string;
  genres: Genre[];
  platforms: Platform[];
};
