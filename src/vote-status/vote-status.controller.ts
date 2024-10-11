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
    console.log(createVoteStatusDto)
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


}
