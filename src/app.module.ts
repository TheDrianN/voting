import { Module } from '@nestjs/common';

import { VotingModule } from './voting/voting.module';

@Module({
  imports: [VotingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
