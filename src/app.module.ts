import { Module } from '@nestjs/common';

import { VotingModule } from './voting/voting.module';
import { VoteStatusModule } from './vote-status/vote-status.module';

@Module({
  imports: [VotingModule, VoteStatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
