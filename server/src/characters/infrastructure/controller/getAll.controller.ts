import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { CHARACTERS_CONTROLLER } from './routes';
import { GetAllCharactersUseCase } from 'src/characters/application/get-all.usecase';
import { Response } from 'express';

@Controller(CHARACTERS_CONTROLLER)
export class GetAllCharactersController {
  constructor(
    private readonly getAllCharactersUseCase: GetAllCharactersUseCase,
  ) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const characters = await this.getAllCharactersUseCase.execute();

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
