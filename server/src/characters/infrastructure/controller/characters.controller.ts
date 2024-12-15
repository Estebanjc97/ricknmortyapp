import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { CHARACTERS_CONTROLLER, GET_CHARACTER } from './routes';
import { GetAllCharactersUseCase } from 'src/characters/application/get-all.usecase';
import { Response } from 'express';
import { GetCharactersUseCase } from 'src/characters/application/get.usecase';
import { mapApiEndpoint } from 'src/utils/rickAndMortyApi/rickAndMortyApi.utils';

@Controller(CHARACTERS_CONTROLLER)
export class CharactersController {
  constructor(
    private readonly getAllCharactersUseCase: GetAllCharactersUseCase,
    private readonly getCharacterUseCase: GetCharactersUseCase,
  ) {}

  @Get()
  async getAll(
    @Res() res: Response,
    @Query('page') page?: number,
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('species') species?: string,
    @Query('gender') gender?: string,
  ) {
    try {
      const characters = await this.getAllCharactersUseCase.execute(
        page,
        name,
        status,
        type,
        species,
        gender,
      );
      if (characters.results.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).send();
      }

      return res.status(HttpStatus.OK).json(mapApiEndpoint(characters));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Get(GET_CHARACTER)
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      const characters = await this.getCharacterUseCase.execute(id);

      if (characters.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).send();
      }

      return res.status(HttpStatus.OK).json(characters);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
