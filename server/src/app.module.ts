import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { EpisodesModule } from './episodes/episodes.module';
import { LocationsModule } from './locations/locations.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVER_ENDPOINT: Joi.string().default('www.error.com'),
      }),
    }),
    CharactersModule,
    EpisodesModule,
    LocationsModule,
  ],
})
export class AppModule {}
