import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CHARACTERS_CONTROLLER, GET_CHARACTER } from './routes';
import { GetAllCharactersUseCase } from 'src/characters/application/get-all.usecase';
import { Response } from 'express';
import { GetCharactersUseCase } from 'src/characters/application/get.usecase';
import { ConfigService } from '@nestjs/config';
import { CharacterDto } from '../dto/characters.dto';
import { CreateCharactersUseCase } from 'src/characters/application/create.usecase';
import { Character } from 'src/characters/domain/entities/character.entity';
import { UpdateCharactersUseCase } from 'src/characters/application/update.usecase';
import { DeleteCharactersUseCase } from 'src/characters/application/delete.usecase';

@Controller(CHARACTERS_CONTROLLER)
export class CharactersController {
  constructor(
    private configService: ConfigService,
    private readonly getAllCharactersUseCase: GetAllCharactersUseCase,
    private readonly getCharacterUseCase: GetCharactersUseCase,
    private readonly createCharacterUseCase: CreateCharactersUseCase,
    private readonly updateCharacterUseCase: UpdateCharactersUseCase,
    private readonly deleteCharacterUseCase: DeleteCharactersUseCase,
  ) {}

  @Get()
  async getAll(
    @Res() res: Response,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('species') species?: string,
    @Query('gender') gender?: string,
  ) {
    try {
      const characters = await this.getAllCharactersUseCase.execute(
        parseInt(limit),
        parseInt(page),
        name,
        status,
        type,
        species,
        gender,
      );
      if (characters.results.length === 0) {
        return res.status(HttpStatus.OK).send([]);
      }

      return res.status(HttpStatus.OK).json(characters);
    } catch (error) {
      console.log(error);
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
        return res.status(HttpStatus.OK).send([]);
      }

      return res.status(HttpStatus.OK).json(characters);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Post()
  async create(@Body() data: CharacterDto, @Res() res: Response) {
    try {
      await this.createCharacterUseCase.execute({
        ...data,
        created: '',
      } as unknown as Character);
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Put()
  async update(@Body() data: CharacterDto, @Res() res: Response) {
    try {
      await this.updateCharacterUseCase.execute(data as unknown as Character);
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Delete(GET_CHARACTER)
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.deleteCharacterUseCase.execute(`${id}`);
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
