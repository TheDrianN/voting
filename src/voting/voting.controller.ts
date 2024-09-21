import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VotingService } from './voting.service';
import { CreateVotingDto } from './dto/create-voting.dto';
import { UpdateVotingDto } from './dto/update-voting.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @MessagePattern('createVoting')
  create(@Payload() createVotingDto: CreateVotingDto) {
    return this.votingService.create(createVotingDto);
  }

  @MessagePattern('findAllVoting')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.votingService.findAll(paginationDto);
  }

  @MessagePattern('findOneVoting')
  findOne(@Payload('id',ParseIntPipe ) id: number) {
    return this.votingService.findOne(id);
  }

  @MessagePattern('updateVoting')
  update(@Payload() updateVotingDto: UpdateVotingDto) {
    return this.votingService.update(updateVotingDto.id, updateVotingDto);
  }

  @MessagePattern('removeVoting')
  remove(@Payload('id',ParseIntPipe ) id: number) {
    return this.votingService.remove(id);
  }
}
