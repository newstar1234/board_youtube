import axios, { AxiosResponse } from "axios";
import { EmailCertificationReqeustDto, IdCheckRequestDto } from "./request/auth";
import { EmailCertificationResponseDto, IdCheckResponseDto } from "./response/auth";
import { ResponseDto } from "./response";

// response 함수 //
const responseHandler = <T> (response:AxiosResponse<any, any>) => {
  const responseBody: T = response.data;
  return responseBody;
};
// error 함수 // 
const errorHandler = (error: any) => {
  if(!error.response || !error.response.data) return null;
  const responseBody: ResponseDto = error.response.data;
  return responseBody;
}

const DOMAIN = 'http://localhost:4040';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
  const result = await axios.post(ID_CHECK_URL(), requestBody)
              .then(responseHandler<IdCheckResponseDto>)
              .catch(errorHandler);
              return result;
};

const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;
export const emailCertificationRequest = async (requestBody: EmailCertificationReqeustDto) => {
  const result = await axios.post(EMAIL_CERTIFICATION_URL(), requestBody)
                .then(responseHandler<EmailCertificationResponseDto>)
                .catch(errorHandler);
                return result;
};