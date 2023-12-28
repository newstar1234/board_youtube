import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export default class UserRepository {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly dataSource: DataSource
  ){}

}