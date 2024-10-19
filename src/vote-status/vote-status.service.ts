import { HttpStatus, Injectable,OnModuleInit } from '@nestjs/common';
import { CreateVoteStatusDto } from './dto/create-vote-status.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class VoteStatusService extends PrismaClient implements OnModuleInit{
  onModuleInit() {
    this.$connect();
    console.log("Data base connected");
  }

  create(createVoteStatusDto: CreateVoteStatusDto) {
    return this.voteStatus.create({
      data: createVoteStatusDto
    });
  }

  async findAll(paginationDto : PaginationDto) {
    const {page , limit}= paginationDto;

    const totalPages = await this.voteStatus.count();
    const lastPage = Math.ceil(totalPages / limit);

    return{
      data: await this.voteStatus.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta:{
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
    const votestatus = await this.voteStatus.findFirst({
      where:{id},
    });

    if(!votestatus){
      throw new RpcException({
        message:`El voteStatus con el id ${id} no existe`,
        status: HttpStatus.BAD_REQUEST
      })
    }

    return {
      data:votestatus,
      status:  HttpStatus.ACCEPTED
    };
  }

  async remove(id:number){
    await this.findOne(id);

    const votestatus = await this.voteStatus.delete({
      where:{id}
    })

    return {
      data:votestatus,
      status: HttpStatus.ACCEPTED
    };
  }

  async validationStatus(id_user: number, id_election: number) {
    const votestatus = await this.voteStatus.findFirst({
      where:{
        users_id: id_user,
        elections_id: id_election
      },
    });

    if(!votestatus){
      throw new RpcException({
        message:`El voteStatus no existe`,
        status: HttpStatus.NOT_FOUND
      })
    }

    return {
      data:votestatus,
      status:  HttpStatus.OK
    };
  }



}
