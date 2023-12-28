import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardListViewEntity } from "../entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export default class BoardListViewRepository {

  constructor(
    @InjectRepository(BoardListViewEntity)
    private readonly repository: Repository<BoardListViewEntity>,
    private readonly dataSource: DataSource
  ){}
  
}