import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchLogEntity } from "../entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export default class SearchLogRepository {

  constructor(
    @InjectRepository(SearchLogEntity)
    private readonly repository: Repository<SearchLogEntity>,
    private readonly dataSource: DataSource
  ){}
}