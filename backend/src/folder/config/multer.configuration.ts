import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { path_dirRoot_src } from '../../url';
import { randomUUID } from 'crypto';

export const ConfigMulter = MulterModule.register({
  storage: diskStorage({
    destination(req, file, callback) {
      callback(null, `${path_dirRoot_src}/store/${req.query.nombre}`);
    },
    filename(req, file, callback) {
      const { originalname } = file;
      const parseArray = originalname.split('.');
      const type = parseArray[parseArray.length - 1];
      const userDesk = req.query.nombre;
      const uuid = randomUUID();

      let prefijo = '';

      if (type == 'png' || type == 'jpeg' || type == 'gif') {
        prefijo += 'image';
      } else if (type == 'pdf') {
        prefijo += 'pdf';
      } else if (type == 'docx') {
        prefijo += 'word';
      } else {
        prefijo += 'file';
      }

      callback(null, `${prefijo}-${userDesk}-${uuid}.${type}`);
    },
  }),
});
