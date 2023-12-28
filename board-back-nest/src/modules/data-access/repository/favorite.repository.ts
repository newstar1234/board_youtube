import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FavoriteEntity } from "../entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export default class FavoriteRepository {

  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly repository: Repository<FavoriteEntity>,
    private readonly dataSource: DataSource
  ){}

}