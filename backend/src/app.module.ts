import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FolderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: process.env.USERNAME_DATABASE,
      password: process.env.PASSWORD_DATABASE,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
