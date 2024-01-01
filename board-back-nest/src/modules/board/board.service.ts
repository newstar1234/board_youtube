import { Injectable } from '@nestjs/common';
import { BoardRepository, ImageRepository, UserRepository } from 'modules/data-access/repository';
import { PatchBoardRequestDto, PostBoardRequestDto } from './dto/request';
import { GetBoardResponseDto, PatchBoardResponseDto, PostBoardResponseDto } from './dto/response';

@Injectable()
export class BoardService {
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardRepository: BoardRepository,
    private readonly imageRepository: ImageRepository
  ) {}

  async postBoard(dto:PostBoardRequestDto, email:string): Promise<PostBoardResponseDto> {

    const isExistUser = await this.userRepository.existsByEmail(email);
    if(!isExistUser) PostBoardResponseDto.noExistUser();

    const boardEntity = this.boardRepository.create(dto, email);
    await this.boardRepository.save(boardEntity);

    const { boardImageList } = dto;
    const { boardNumber } = boardEntity;
    const imageEntities = this.imageRepository.createAll(boardImageList, boardNumber);
    await this.imageRepository.saveAll(imageEntities);

    return PostBoardResponseDto.success();

  }

  async getBoard(boardNumber: number): Promise<GetBoardResponseDto> {
    const resultSet = await this.boardRepository.getBoard(boardNumber);
    if(!resultSet) GetBoardResponseDto.noExistBoard();

    const imageEntities = await this.imageRepository.findByBoardNumber(boardNumber);

    return GetBoardResponseDto.success(resultSet, imageEntities);
  }

  async patchBoard(dto: PatchBoardRequestDto, boardNumber:number, email:string): Promise<PatchBoardResponseDto> {
    
    const isExistUser = await this.userRepository.existsByEmail(email);
    if(!isExistUser) PatchBoardResponseDto.noExistUser();
    
    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
    if(!boardEntity) PatchBoardResponseDto.noExistBoard();

    const { writerEmail } = boardEntity;
    const isWriter = writerEmail === email;
    if(!isWriter) PatchBoardResponseDto.noPermission();

    boardEntity.title = dto.title;
    boardEntity.content = dto.content;
    await this.boardRepository.save(boardEntity);

    await this.imageRepository.deleteByBoardNumber(boardNumber);

    const { boardImageList } = dto;
    const imageEntities = this.imageRepository.createAll(boardImageList, boardNumber);
    await this.imageRepository.saveAll(imageEntities);

    return PatchBoardResponseDto.success();

  }

}
