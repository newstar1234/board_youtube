import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardEntity } from "../entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export default class BoardRepository {

  constructor(
    @InjectRepository(BoardEntity)
    private readonly repository: Repository<BoardEntity>,
    private readonly dataSource: DataSource
  ) {}
  
}
