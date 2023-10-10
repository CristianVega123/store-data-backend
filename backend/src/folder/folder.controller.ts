import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  Post,
  UploadedFiles,
} from '@nestjs/common';
import { FolderService } from './service/folder.service';
import { FilesInterceptor } from '@nestjs/platform-express';

// const multer = require("multer")

@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}
  @Get()
  receiveParamsCreateFolder(@Query('nombre') nombre: string) {
    this.folderService.createFolder(nombre);
    // console.log(nombre);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
