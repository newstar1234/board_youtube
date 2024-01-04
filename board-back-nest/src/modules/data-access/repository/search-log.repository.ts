import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchLogEntity } from "../entities";
import { DataSource, Repository } from "typeorm";
import { exec } from "child_process";
import { ResponseDto } from "types/classes";

@Injectable()
export default class SearchLogRepository {

  private readonly logger = new Logger('Search Lot Repository');

  constructor(
    @InjectRepository(SearchLogEntity)
    private readonly repository: Repository<SearchLogEntity>,
    private readonly dataSource: DataSource
  ){}

  create(searchWord: string, relationWord: string | null, relation: boolean) {
    try {
      const searchLogEntity = this.repository.create({
        searchWord,
        relationWord,
        relation,
      })
      return searchLogEntity;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

  async save(searchLogEntity: SearchLogEntity) {
    try {
      return this.repository.save(searchLogEntity);
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

}