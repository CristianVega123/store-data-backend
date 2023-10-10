import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [ConfigModule.forRoot(), FolderModule],
})
export class AppModule {}
