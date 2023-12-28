import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "../entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export default class ImageRepository {

  constructor(
    @InjectRepository(ImageEntity)
    private readonly repository: Repository<ImageEntity>,
    private readonly dataSource : DataSource
  ){}
}