import { APP_UPLOADS } from './../configs/app';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, APP_UPLOADS);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage, preservePath: true });

export default upload;
