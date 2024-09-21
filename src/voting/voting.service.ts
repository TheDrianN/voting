import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateVotingDto } from './dto/create-voting.dto';
import { UpdateVotingDto } from './dto/update-voting.dto';
import { PrismaClient } from '@prisma/client';
import { Console } from 'console';
import { PaginationDto } from 'src/common';
import { take } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class VotingService extends PrismaClient implements OnModuleInit{
  onModuleInit() {
    this.$connect();
    console.log("Data base connected");
  }
  create(createVotingDto: CreateVotingDto) {
    return this.votes.create({
      data: createVotingDto
    });
  }

  async findAll(paginationDto : PaginationDto) {
    const {page , limit}= paginationDto;

    const totalPages = await this.votes.count();
    const lastPage = Math.ceil(totalPages / limit);

    return{
      data: await this.votes.findMany({
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
    const voto = await this.votes.findFirst({
      where:{id},
    });

    if(!voto){
      throw new RpcException({
        message:`El voto con el id ${id} no existe`,
        status: HttpStatus.BAD_REQUEST
      })
    }

    return voto;

  }

  async update(id: number, updateVotingDto: UpdateVotingDto) {
    const {id:_, ...data}= updateVotingDto;
    await this.findOne(id);

    return this.votes.update({
      where:{id},
      data: data
    });

  }

  async remove(id: number) {
    await this.findOne(id);
    
    const voto = await this.votes.update({
      where:{id},
      data:{
        vote_type:'Null'
      }
    })

    return voto;
  }
}
