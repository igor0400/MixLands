import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    if (!file) return;

    const fileFormat = file.originalname.split('.')[1];
    const normalFormats = ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp'];

    const checkFormat = normalFormats.filter((item) => item === fileFormat);
    if (!checkFormat.length) {
      throw new HttpException(
        'Данное расширение файла не поддерживается',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (file.buffer.length > 2097152) {
      throw new HttpException(
        'Размер файла превышает 2МБ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const fileName = uuid() + `.${fileFormat}`;
      const filePath = path.resolve(__dirname, '../../../dist/static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
