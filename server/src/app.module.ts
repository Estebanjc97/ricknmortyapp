import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { EpisodesModule } from './episodes/episodes.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [CharactersModule, EpisodesModule, LocationsModule],
})
export class AppModule {}
