import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';  // Importar ethers.js
import * as contractABI from '../common/abi/VotesContract.json'; // Importar el ABI del contrato
import { CreateVotingDto } from './dto/create-voting.dto';

@Injectable()
export class VotingService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  // Inicialización del módulo y configuración del contrato inteligente
  async onModuleInit() {
    // Conectar a la blockchain (puedes usar Ganache o Infura según tu red)
    this.provider = new ethers.JsonRpcProvider('http://192.168.100.24:8545/'); // Cambia la URL de acuerdo a tu red
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';  // Clave privada de la cuenta que firmará las transacciones
    this.signer = await this.provider.getSigner(0); 

    // Dirección del contrato desplegado en la blockchain
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    // Instancia del contrato con el ABI y la dirección
    this.contract = new ethers.Contract(contractAddress, contractABI.abi, this.signer);

    console.log("Conectado a la blockchain");
  }

  // Función para almacenar voto en la blockchain
  async createVote(createVotingDto: CreateVotingDto) {
    const { group_candidates_id, sub_election_id, vote_status_id } = createVotingDto;

    // Llamar a la función del contrato para almacenar el voto con parámetros desestructurados
    const tx = await this.contract.storeVote(group_candidates_id, sub_election_id, vote_status_id);

    // Esperar a que la transacción sea confirmada
    const receipt = await tx.wait();

    return receipt;  // Retornar el recibo de la transacción
  }

    // Función para convertir BigInt a string en un objeto
  bigIntToString(obj: any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  }

 // Obtener un voto específico por ID
async getVoteById(subElectionId: number) {
  // Llamar a la función del contrato para obtener los votos por subElectionsId
  const [groupCandidatesIds, subElectionsIds, voteStatusIds] = await this.contract.getVotesBySubElection(subElectionId);

  // Crear un array de objetos JSON combinando los tres arrays
  const votes = groupCandidatesIds.map((groupCandidatesId, index) => {
    return {
      groupCandidatesId: groupCandidatesId,
      subElectionsId: subElectionsIds[index],
      voteStatusId: voteStatusIds[index],
    };
  });

  // Convertir BigInt a string antes de retornar el resultado
  const result = this.bigIntToString(votes);

  // Retornar los datos crudos
  return {
    data: result,
    status: HttpStatus.ACCEPTED,
  };
}

  

}
