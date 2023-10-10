import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { path_dirRoot_src } from '../../url';

export const ConfigMulter = MulterModule.register({
  storage: diskStorage({
    destination(req, file, callback) {
      console.log(req.query);
      callback(null, `${path_dirRoot_src}/store/${req.query.nombre}`);
    },
    filename(req, file, callback) {
      const { originalname } = file;
      callback(null, originalname);
    },
  }),
});
