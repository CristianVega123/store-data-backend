import {
  Controller,
  Get,
  Post,
  Query,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FolderService } from './service/folder.service';
import { UserStorageService } from './service/user-storage.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('folder')
export class FolderController {
  constructor(
    private folderService: FolderService,
    private userService: UserStorageService,
  ) {}

  // Controlador para poder manejar el creado de su folder
  @Get()
  receiveParamsCreateFolder(@Query('nombre') nombre: string) {
    console.log(join(process.cwd()));

    this.folderService.createFolder(nombre);
  }

  // Controlador para capturar las imagenes y luego enviarselo a su carpeta correspondiente
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
  // Controloador para mandar toda la información guardada de un usuario

  @Get('findAllFiles')
  async getAllInfoFiles(@Query('idUser') idUser: string) {
    return await this.userService.findAll(idUser);
  }

  @Get('file')
  async sentFile(
    @Query('uuidImg') uuidImg: string,
    @Query('user') user: string,
  ) {
    const filewithUUID = await this.folderService.findFolderByUUID(
      uuidImg,
      user,
    );

    const file = createReadStream(
      join(process.cwd(), `/src/store/${user}/${filewithUUID}`),
    );
    return new StreamableFile(file);
  }
}
