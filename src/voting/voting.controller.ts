import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VotingService } from './voting.service';
import { CreateVotingDto } from './dto/create-voting.dto';


@Controller()
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @MessagePattern('createVoting')
  create(@Payload() createVotingDto: CreateVotingDto) {
    return this.votingService.createVote(createVotingDto);
  }



  @MessagePattern('findOneVoting')
  findOne(@Payload('id',ParseIntPipe ) id: number) {
    return this.votingService.getVoteById(id);
  }


}
