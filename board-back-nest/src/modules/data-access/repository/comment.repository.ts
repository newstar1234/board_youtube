import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "../entities";
import { DataSource, Repository } from "typeorm";
import { PostCommentRequestDto } from "modules/board/dto/request";
import { ResponseDto } from "types/classes";
import { nowDatetime } from "utils";

@Injectable()
export default class CommentRepository {

  private readonly logger = new Logger('Comment Repository');

  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    private readonly dataSource: DataSource 
  ) {}

  create({ content }: PostCommentRequestDto, boardNumber: number, userEmail:string) {
    try {
      const commentEntity = this.repository.create({
        content,
        writeDatetime: nowDatetime,
        userEmail,
        boardNumber,
      })
      return commentEntity;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

  async save(commentEntity: CommentEntity) {
    try {
      return await this.repository.save(commentEntity);
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

}