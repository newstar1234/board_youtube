import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { ImageFileFilter } from "filter";

config();

const multerModuleConfig: MulterOptions = {
  storage: diskStorage({
    destination: process.env.FILE_PATH,  // 업로드시 어느 경로로 저장할 것인지
    filename: (request, file, callback) => callback(null, uuidv4() + '.' + file.mimetype.split('/')[1])
  }),
  fileFilter: ImageFileFilter, // 확장자 제한 
  limits: {
    fileSize: 1024 * 1024 * 100
  }// 사이즈 제한
};
// 파일을 어떻게 저장할지 
export default multerModuleConfig;