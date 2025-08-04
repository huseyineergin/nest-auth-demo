import { Injectable, NotFoundException } from "@nestjs/common";
import { Platform } from "@prisma/client";
import { generateSlug } from "src/common/utils/slug.util";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { PlatformFilterDto } from "./dto/platform-filter";
import { UpdatePlatformDto } from "./dto/update-platform.dto";

@Injectable()
export class PlatformService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlatformDto): Promise<Platform> {
    return await this.prisma.platform.create({
      data: {
        ...dto,
        slug: generateSlug(dto.name),
      },
    });
  }

  async getAll(filters: PlatformFilterDto): Promise<Platform[]> {
    return await this.prisma.platform.findMany({
      where: {
        ...filters,
      },
    });
  }

  async getById(id: string): Promise<Platform | null> {
    try {
      return await this.prisma.platform.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException("Platform not found.");
    }
  }

  async deleteById(id: string) {
    try {
      return await this.prisma.platform.delete({
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException("Platform not found.");
    }
  }

  async updateById(id: string, dto: UpdatePlatformDto): Promise<Platform | null> {
    try {
      return await this.prisma.platform.update({
        where: { id },
        data: {
          ...dto,
          slug: generateSlug(dto.name),
        },
      });
    } catch {
      throw new NotFoundException("Platform not found.");
    }
  }
}
