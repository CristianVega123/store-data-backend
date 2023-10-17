import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FolderService } from './service/folder.service';
import { UserStorageService } from './service/user-storage.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('folder')
export class FolderController {
  constructor(
    private folderService: FolderService,
    private userService: UserStorageService,
  ) {}
  @Get()
  receiveParamsCreateFolder(@Query('nombre') nombre: string) {
    this.folderService.createFolder(nombre);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('nombre') nombre: string,
  ) {
    for (const file of files) {
      const uuid = file.filename
        .split('.')[0]
        .slice(10, file.filename.length - 1);

      const { filename } = file;
      await this.userService.save({
        nameUser: nombre,
        uuidImg: uuid,
        fieldname: filename,
      });
    }
  }

  @Get('findAllFiles')
  async getAllInfoFiles(@Query('idUser') idUser: string) {
    return await this.userService.findAll(idUser);
  }
}
