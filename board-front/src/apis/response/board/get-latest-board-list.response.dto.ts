import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetLatestBaordListResponseDto extends ResponseDto {

  latestList : BoardListItem[];

}