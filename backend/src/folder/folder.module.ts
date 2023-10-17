import { Module } from '@nestjs/common';
import { FolderService } from './service/folder.service';
import { UserStorageService } from './service/user-storage.service';
import { FolderController } from './folder.controller';
import { ConfigMulter } from './config/multer.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageImg } from './entity/storage-img.entity';

@Module({
  imports: [ConfigMulter, TypeOrmModule.forFeature([StorageImg])],
  controllers: [FolderController],
  providers: [FolderService, UserStorageService],
})
export class FolderModule {}
