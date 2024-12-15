import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { EpisodesModule } from './episodes/episodes.module';
import { LocationsModule } from './locations/locations.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVER_ENDPOINT: Joi.string().required(),
        GCP_PROJECT_ID: Joi.string().required(),
        FIRESTORE_DATABASE_ID: Joi.string().required(),
        GCP_SA_CLIENT_EMAIL: Joi.string().required(),
        GCP_SA_PRIVATE_KEY: Joi.string().required(),
      }),
      load: [config],
    }),
    CharactersModule,
    EpisodesModule,
    LocationsModule,
  ],
})
export class AppModule {}
