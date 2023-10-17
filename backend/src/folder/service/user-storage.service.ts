import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageImg } from '../entity/storage-img.entity';

@Injectable()
export class UserStorageService {
  constructor(
    @InjectRepository(StorageImg)
    private StorageImgRepository: Repository<StorageImg>,
  ) {}

  async save(dataUser: StorageImg): Promise<StorageImg> {
    return await this.StorageImgRepository.save(dataUser);
  }

  async findAll(idUser: string): Promise<StorageImg[]> {
    return await this.StorageImgRepository.find({
      where: {
        nameUser: idUser,
      },
    });
  }
}
