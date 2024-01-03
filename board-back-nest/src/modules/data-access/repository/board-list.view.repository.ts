import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardListViewEntity } from "../entities";
import { DataSource, Repository } from "typeorm";
import { ResponseDto } from "types/classes";

@Injectable()
export default class BoardListViewRepository {

  private logger = new Logger('Board List View Repository');

  constructor(
    @InjectRepository(BoardListViewEntity)
    private readonly repository: Repository<BoardListViewEntity>,
    private readonly dataSource: DataSource
  ){}

  async getLatestList() {
    try {
      const boardListViewEntities = this.repository.find({order: {writeDatetime: 'DESC'}});
      return boardListViewEntities;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }
  
}