import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { PlatformFilterDto } from "./dto/platform-filter";
import { UpdatePlatformDto } from "./dto/update-platform.dto";
import { PlatformService } from "./platform.service";

@Controller("platforms")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  async createPlatform(@Body() dto: CreatePlatformDto) {
    return await this.platformService.create(dto);
  }

  @Get()
  async getAllPlatforms(@Query() filters: PlatformFilterDto) {
    return await this.platformService.getAll(filters);
  }

  @Get(":id")
  async getPlatformById(@Param("id") id: string) {
    return await this.platformService.getById(id);
  }

  @Delete(":id")
  async deletePlatformById(@Param("id") id: string) {
    return await this.platformService.deleteById(id);
  }

  @Put(":id")
  async updatePlatformById(@Param("id") id: string, @Body() dto: UpdatePlatformDto) {
    return await this.platformService.updateById(id, dto);
  }
}
