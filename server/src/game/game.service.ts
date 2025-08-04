import { Injectable, NotFoundException } from "@nestjs/common";
import { Game } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { GameFilterDto } from "./dto/game-filter.dto";
import { UpdateGameDto } from "./dto/update-game.dto";

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto): Promise<Game> {
    const { genreIds, platformIds, ...gameData } = dto;
    const releaseDate = new Date(dto.releaseDate);

    return await this.prisma.game.create({
      data: {
        ...gameData,
        releaseDate,
        genres: {
          connect: genreIds.map((id) => ({ id })),
        },
        platforms: {
          connect: platformIds.map((id) => ({ id })),
        },
      },
    });
  }

  async getAll(filters: GameFilterDto): Promise<Game[]> {
    const { genres, platforms, minYear, minMetascore, maxMetascore, maxYear, minUserScore, maxUserScore } = filters;

    return await this.prisma.game.findMany({
      where: {
        genres: {
          some: {
            slug: { in: genres },
          },
        },
        platforms: {
          some: {
            slug: { in: platforms },
          },
        },
        metascore: {
          gte: minMetascore,
          lte: maxMetascore,
        },
        userScore: {
          gte: minUserScore,
          lte: maxUserScore,
        },
        releaseDate: {
          gte: minYear ? new Date(minYear, 0, 1) : undefined,
          lte: maxYear ? new Date(maxYear, 11, 31, 23, 59, 59) : undefined,
        },
      },
      include: {
        genres: true,
        platforms: true,
      },
    });
  }

  async getById(id: string): Promise<Game | null> {
    try {
      return await this.prisma.game.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          genres: true,
          platforms: true,
        },
      });
    } catch {
      throw new NotFoundException("Game not found.");
    }
  }

  async deleteById(id: string) {
    try {
      return await this.prisma.game.delete({
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException("Game not found.");
    }
  }

  async updateById(id: string, dto: UpdateGameDto): Promise<Game | null> {
    const { genreIds, platformIds, ...gameData } = dto;
    const releaseDate = new Date(dto.releaseDate);

    try {
      return await this.prisma.game.update({
        where: { id },
        data: {
          ...gameData,
          releaseDate,
          genres: {
            connect: genreIds.map((id) => ({ id })),
          },
          platforms: {
            connect: platformIds.map((id) => ({ id })),
          },
        },
      });
    } catch {
      throw new NotFoundException("Game not found.");
    }
  }
}
