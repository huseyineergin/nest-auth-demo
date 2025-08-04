import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { GenreFilterDto } from "./dto/genre-filter.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { GenreService } from "./genre.service";

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async createGenre(@Body() dto: CreateGenreDto) {
    return await this.genreService.create(dto);
  }

  @Get()
  async getAllGenres(@Query() filters: GenreFilterDto) {
    return await this.genreService.getAll(filters);
  }

  @Get(":id")
  async getGenreById(@Param("id") id: string) {
    return await this.genreService.getById(id);
  }

  @Delete(":id")
  async deleteGenreById(@Param("id") id: string) {
    return await this.genreService.deleteById(id);
  }

  @Put(":id")
  async updateGenreById(@Param("id") id: string, @Body() dto: UpdateGenreDto) {
    return await this.genreService.updateById(id, dto);
  }
}
