import { Injectable, NotFoundException } from "@nestjs/common";
import { Genre } from "@prisma/client";
import { generateSlug } from "src/common/utils/slug.util";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { GenreFilterDto } from "./dto/genre-filter.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenreDto): Promise<Genre> {
    return await this.prisma.genre.create({
      data: {
        ...dto,
        slug: generateSlug(dto.name),
      },
    });
  }

  async getAll(filters: GenreFilterDto): Promise<Genre[]> {
    return await this.prisma.genre.findMany({
      where: {
        ...filters,
      },
    });
  }

  async getById(id: string): Promise<Genre | null> {
    try {
      return await this.prisma.genre.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException("Genre not found.");
    }
  }

  async deleteById(id: string) {
    try {
      return await this.prisma.genre.delete({
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException("Genre not found.");
    }
  }

  async updateById(id: string, dto: UpdateGenreDto): Promise<Genre | null> {
    try {
      return await this.prisma.genre.update({
        where: { id },
        data: {
          ...dto,
          slug: generateSlug(dto.name),
        },
      });
    } catch {
      throw new NotFoundException("Genre not found.");
    }
  }
}
