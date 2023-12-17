import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponseDto } from "./response";
import { GetSignInUserResponseDto } from "./response/user";
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from "./request/board";
import { PostBoardResponseDto, GetBoardResponseDto, IncreaseViewCountResponseDto, GetFavoriteListResponseDto, GetCommentListResponseDto, PutFavoriteResponseDto, PostCommentResponseDto, DeleteBoardResponseDto, PatchBoardResponseDto } from "./response/board";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken:string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` }}
};


// description : 로그인 //
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
export const signInRequest = async (requestBody : SignInRequestDto) => {
  const result = await axios.post(SIGN_IN_URL(), requestBody)
                .then(response => {
                  const responseBody: SignInResponseDto = response.data;
                  return responseBody;
                })
                .catch(error => {
                  if(!error.response.data) return null; 
                  const responseBody : ResponseDto = error.response.data;
                  return responseBody;
                })
                return result;
}

// description : 회원가입 //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios.post(SIGN_UP_URL(), requestBody)
                .then(response => {
                  const responseBody : SignUpResponseDto = response.data;
                  return responseBody;
                })
                .catch(error => {
                  if(!error.response.data) return null;
                  const responseBody : ResponseDto = error.response.data;
                  return responseBody;
                })
                return result;
}

// description : 게시물 불러오기 //
const GET_BOARD_URL = (boardNumber : number | string) => `${API_DOMAIN}/board/${boardNumber}`;
export const getBoardRequest = async (boardNumber : number | string) => {
  const result = await axios.get(GET_BOARD_URL(boardNumber))
              .then(response => {
                const responseBody : GetBoardResponseDto = response.data;
                return responseBody;
              })
              .catch(error => {
                if(!error.response) return null;
                const responseBody : ResponseDto = error.response.data;
                return responseBody;
              })
              return result;
}

// description : 게시물 조회수 증가 //
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
export const increaseViewCountRequest = async (boardNumber : number | string) => {
  const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
              .then(response => {
                const responseBody : IncreaseViewCountResponseDto = response.data;
                return responseBody;
              })
              .catch(error => {
                if(!error.response) return null;
                const responseBody : ResponseDto = error.response.data;
                return responseBody;
              })
              return result;
}

// description : 좋아요 리스트 불러오기 //
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
export const getFavoriteListRequest = async (boardNumber : number | string) => {
  const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
                .then(response => {
                  const responseBody : GetFavoriteListResponseDto = response.data;
                  return responseBody;
                })
                .catch(error => {
                  if(!error.response) return null;
                  const responseBody : ResponseDto = error.response.data;
                  return responseBody;
                });
                return result;
}

// description : 댓글 리스트 불러오기 //
const GET_COMMENT_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;
export const getCommentListRequest = async (boardNumber : number | string) => {
  const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
              .then(response => {
                const responseBody : GetCommentListResponseDto = response.data;
                return responseBody
              })
              .catch(error => {
                if(!error.response) return null;
                const responseBody : ResponseDto = error.response.data;
                return responseBody;
              });
              return result;
}

// description : 게시물 작성 //
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
export const postBoardRequest = async (requestBody:PostBoardRequestDto, accessToken: string) => {
  const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
              .then(response => {
                const responseBody : PostBoardResponseDto = response.data;
                return responseBody;
              })
              .catch(error => {
                if(!error.response) return null;
                const responseBody : ResponseDto = error.response.data;
                return responseBody;
              })
              return result;
}

// description : 댓글 작성 //
const POST_COMMENT_URL = (boardNumber : number|string) => `${API_DOMAIN}/board/${boardNumber}/comment`;
export const postCommentRequest = async (boardNumber : number|string, requestBody:PostCommentRequestDto, accessToken: string) => {
  const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
              .then(response => {
                const responseBody : PostCommentResponseDto = response.data;
                return responseBody;
              })
              .catch(error => {
                if(!error.response) return null;
                const responseBody : ResponseDto = error.response.data;
                return responseBody;
              })
              return result;
}

// description : 게시물 수정 기능 //
const PATCH_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
export const patchBoardReqeust = async (boardNumber : number | string, requestBody : PatchBoardRequestDto, accessToken: string) => {
  const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
                .then(response => {
                  const responseBody: PatchBoardResponseDto = response.data;
                  return responseBody;
                })
                .catch(error => {
                  if(!error.response) return null;
                  const responseBody : ResponseDto = error.response.data;
                  return responseBody;
                })
                return result;
}

// description : 좋아요 기능 //
const PUT_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite`;
export const putFavoriteRequest = async (boardNumber : number |string, accessToken: string) => {
  const result = await axios.put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
              .then(response => {
                const responseBody: PutFavoriteResponseDto = response.data;
                return responseBody;
              })
              .catch(error => {
                if(!error.response) return null;
                const responseBody : ResponseDto = error.response.data;
                return responseBody;
              })
              return result;
}

// description : 게시물 삭제하기 //
const DELETE_BOARD_URL = (boardNumber : number | string) => `${API_DOMAIN}/board/${boardNumber}`;
export const deleteBoardRequest = async (boardNumber : number | string, accessToken : string) => {
  const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
                .then(response => {
                  const responseBody : DeleteBoardResponseDto = response.data;
                  return responseBody;
                })
                .catch(error => {
                  if(!error.response) return null;
                  const responseBody : ResponseDto = error.response.data;
                  return responseBody;
                })
                return result;
}

// description : 로그인 유저 정보 불러오기 //
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
              .then(response => {
                const responseBody : GetSignInUserResponseDto = response.data;
                return responseBody;
              })
              .catch(error => {
                if(!error.response) return null;
                const responseBody : ResponseDto = error.response.data;
                return responseBody;
              })
              return result;
}

// description : 파일 업로드 //
const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;
const multipartFormData = { headers:{ 'Content-Type' : 'multipart/form-data' } };
export const fileUploadRequest = async (data:FormData) => {
  const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
              .then(response => {
                const responseBody : string = response.data;
                return responseBody;
              })
              .catch(error => {
                return null;
              })
              return result;
}