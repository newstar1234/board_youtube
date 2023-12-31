import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "../entities";
import { DataSource, Repository } from "typeorm";
import { ResponseDto } from "types/classes";

@Injectable()
export default class ImageRepository {

  private readonly logger = new Logger('Image Repository');

  constructor(
    @InjectRepository(ImageEntity)
    private readonly repository: Repository<ImageEntity>,
    private readonly dataSource : DataSource
  ){}

  createAll(imageList:string[], boardNumber: number) {
    try {
      const entities = [];
      for(const image of imageList) entities.push({ image, boardNumber });

      const imageEntities = this.repository.create(entities);
      return imageEntities;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

  async saveAll(imageEntities: ImageEntity[]) {
    try {
      return await this.repository.save(imageEntities);
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }
}