import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFile } from 'fs';
import { join } from 'path';

@Injectable()
export class MediaService {
  private readonly directoryPath: string;
  constructor() {
    this.directoryPath = join(__dirname, '..', 'public');
    if (!existsSync(this.directoryPath)) {
      mkdirSync(this.directoryPath);
    }
  }

  public async GetAllFiles() {
    return readdirSync(this.directoryPath);
  }

  public async Delete(fileName: string) {
    const filePath = join(this.directoryPath, fileName);
    console.log(filePath);
    if (!existsSync(filePath))
      return {
        message: 404,
      };
    unlinkSync(filePath);
    return {
      message: 200,
    };
  }

  public async GetAllFilteredFiles(fileType: string) {
    return readdirSync(this.directoryPath).filter((i) => i.endsWith(fileType));
  }

  public WriteFile(file: Buffer, name: string) {
    return new Promise((resolve, reject) => {
      const filePath = join(this.directoryPath, name);
      writeFile(filePath, file, (e) => {
        if (e) {
          console.trace(e);
          reject(e);
        } else {
          resolve('Created');
        }
      });
    });
  }
}
