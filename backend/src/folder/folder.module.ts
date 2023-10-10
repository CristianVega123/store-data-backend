import { Module } from '@nestjs/common';
import { FolderService } from './service/folder.service';
import { FolderController } from './folder.controller';
import { ConfigMulter } from './config/multer.configuration';

@Module({
  imports: [ConfigMulter],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
