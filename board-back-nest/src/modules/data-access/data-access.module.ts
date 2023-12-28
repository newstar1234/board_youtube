import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity, BoardListViewEntity, CommentEntity, FavoriteEntity, ImageEntity, SearchLogEntity, UserEntity } from './entities';
import { BoardListViewRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, UserRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BoardEntity, CommentEntity, ImageEntity, SearchLogEntity, FavoriteEntity, BoardListViewEntity])],
  providers: [UserRepository, BoardRepository, CommentRepository, ImageRepository, SearchLogRepository, FavoriteRepository, BoardListViewRepository],
  exports: [UserRepository, BoardRepository, CommentRepository, ImageRepository, SearchLogRepository, FavoriteRepository, BoardListViewRepository],
})
export class DataAccessModule {}
