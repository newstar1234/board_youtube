import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "../entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export default class CommentRepository {

  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    private readonly dataSource: DataSource 
  ) {}
}