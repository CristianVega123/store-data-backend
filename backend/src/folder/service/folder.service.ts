import { Injectable } from '@nestjs/common';
import { validateFolder } from '../../helpers/func.helpes';

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
}
