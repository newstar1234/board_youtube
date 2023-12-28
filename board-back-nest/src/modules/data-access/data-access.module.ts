import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity, BoardListViewEntity, CommentEntity, FavoriteEntity, ImageEntity, SearchLogEntity, UserEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BoardEntity, CommentEntity, ImageEntity, SearchLogEntity, FavoriteEntity, BoardListViewEntity])]
})
export class DataAccessModule {}
