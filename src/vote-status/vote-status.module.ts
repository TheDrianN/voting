import { Module } from '@nestjs/common';
import { VoteStatusService } from './vote-status.service';
import { VoteStatusController } from './vote-status.controller';

@Module({
  controllers: [VoteStatusController],
  providers: [VoteStatusService],
})
export class VoteStatusModule {}
