import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';
import { GetPopularListResponseDto, GetRelationListResponseDto } from './dto/response';

@Controller('api/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/popular-list')
  getPopularList():Promise<GetPopularListResponseDto> {
    const response = this.searchService.getPopularList();
    return response;
  }
  
  @Get('/:searchWord/relation-list')
  getRelationList(
    @Param('searchWord') searchWord: string
  ):Promise<GetRelationListResponseDto> {
    const response = this.searchService.getRelationList(searchWord);
    return response;
  }
}
