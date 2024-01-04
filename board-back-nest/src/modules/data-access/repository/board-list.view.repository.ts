import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardListViewEntity } from "../entities";
import { Between, DataSource, Like, Repository } from "typeorm";
import { ResponseDto } from "types/classes";
import { aweekAgoDatetime, nowDatetime } from "utils";

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

  async getTop3List() {
    try {
      const boardListViewEntities = this.repository
                      .find({ 
                        where: { writeDatetime:Between(aweekAgoDatetime, nowDatetime) }, 
                        order: { favoriteCount:'DESC', commentCount:'DESC', viewCount:'DESC', writeDatetime:'DESC' } ,
                        take: 3
                      });
      return boardListViewEntities;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

  async getSearchList(searchWord: string) {
    try {
      const boardListViewEntities = this.repository
                      .find({ 
                        where: [
                          { title: Like(`%${searchWord}%`) },  // %검색어%
                          { content : Like(`%${searchWord}%`) }
                        ],  
                        order: { writeDatetime:'DESC' } 
                      });
      return boardListViewEntities;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }
  
  async getUserList(writerEmail: string) {
    try {
      const boardListViewEntities = this.repository
                      .find({ 
                        where: { writerEmail },
                        order: { writeDatetime:'DESC' } 
                      });
      return boardListViewEntities;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

}