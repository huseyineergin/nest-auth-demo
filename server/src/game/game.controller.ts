import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { GameFilterDto } from "./dto/game-filter.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { GameService } from "./game.service";

@Controller("games")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() dto: CreateGameDto) {
    return await this.gameService.create(dto);
  }

  @Get()
  async getAllGames(@Query() filters: GameFilterDto) {
    return await this.gameService.getAll(filters);
  }

  @Get(":id")
  async getGameById(@Param("id") id: string) {
    return await this.gameService.getById(id);
  }

  @Delete(":id")
  async deleteGameById(@Param("id") id: string) {
    return await this.gameService.deleteById(id);
  }

  @Put(":id")
  async updateGameById(@Param("id") id: string, @Body() dto: UpdateGameDto) {
    return await this.gameService.updateById(id, dto);
  }
}
