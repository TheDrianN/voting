import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VoteStatusService } from './vote-status.service';
import { CreateVoteStatusDto } from './dto/create-vote-status.dto';
import { UpdateVoteStatusDto } from './dto/update-vote-status.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class VoteStatusController {
  constructor(private readonly voteStatusService: VoteStatusService) {}

  @MessagePattern('createVoteStatus')
  create(@Payload() createVoteStatusDto: CreateVoteStatusDto) {
    return this.voteStatusService.create(createVoteStatusDto);
  }

  @MessagePattern('findAllVoteStatus')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.voteStatusService.findAll(paginationDto);
  }

  @MessagePattern('findOneVoteStatus')
  findOne(@Payload('id',ParseIntPipe) id: number) {
    return this.voteStatusService.findOne(id);
  }

  @MessagePattern('removeVoteStatus')
  remove(@Payload('id',ParseIntPipe) id: number) {
    return this.voteStatusService.remove(id);
  }

  @MessagePattern('validationStatus')
  validationStatus(
    @Payload('id_user',ParseIntPipe) id_user: number,
    @Payload('id_election',ParseIntPipe) id_election: number
  ) {
    return this.voteStatusService.validationStatus(id_user,id_election);
  }

  @MessagePattern('validationUser')
  validationUser(@Payload('id',ParseIntPipe) id: number) {
    return this.voteStatusService.validationUser(id);
  }

}
