import { Injectable } from '@nestjs/common';
import { validateFolder } from '../../helpers/func.helpes';
import { readdir, rm } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FolderService {
  async createFolder(nameFolder: string) {
    try {
      await validateFolder('\\store');
      if (nameFolder) {
        await validateFolder(`\\store\\${nameFolder}`);
      } else {
        throw new Error('Not found querys');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findFolderByUUID(uuid: string, user: string) {
    const arrayFiles = await readdir(join(process.cwd(), `/src/store/${user}`));
    const filename = arrayFiles.find((name) => {
      const filterName = name.split('.')[0].slice(10, name.length - 1);
      return filterName == uuid;
    });

    return filename;
  }

  async findAndDeleteFolderById(user: string, filename: string) {
    await rm(join(process.cwd(), `/src/store/${user}/${filename}`));
  }
}
