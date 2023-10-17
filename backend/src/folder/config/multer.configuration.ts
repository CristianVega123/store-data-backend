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
      const { mimetype } = file;
      const type = mimetype.split('/')[1];
      const userDesk = req.query.nombre;
      const uuid = randomUUID();

      callback(null, `image-${userDesk}-${uuid}.${type}`);
    },
  }),
});
