import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import DefaultImage from 'assets/image/urshifu.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import BoardItem from 'components/BoardItem';
import { BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';
import { fileUploadRequest, getUserBoardListRequest, getUserRequest, patchNicknameRequest, patchProfileImageRequest } from 'apis';
import { GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from 'apis/request/user';
import { useCookies } from 'react-cookie';
import { GetUserBoardListResponseDto } from 'apis/response/board';
import { usePagination } from 'hooks';
import Pagination from 'components/Pagination';

export default function User() {

  // state : user email path variable 상태 //
  const { userEmail} = useParams();
  // state : 로그인 유저 상태 //
  const { loginUser } = useLoginUserStore();
  // state : 쿠키 상태 //
  const [cookies, setCookie] = useCookies();
  // state : 마이페이지 여부 상태 //
  const [isMyPage, setMyPage] = useState<boolean>(false);

  // function : 네비게이터 함수 //
  const navigator = useNavigate();
  
  // component : 유저 화면 상단 //
  const UserTop = () => {

    // state : 이미지 파일 인풋 참조 상태 //
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    // state : 닉네임 변경 여부 상태 //
    const [isNicknameChange, setNicknameChange] = useState<boolean>(false);
    // state : 닉네임 상태 //
    const [nickname, setNickname] = useState<string>('');
    // state : 변경 닉네임 상태 //
    const [changeNickname, setChangeNickname] = useState<string>('');
    // state : 프로필 이미지 상태 //
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // function : get user response 처리 //
    const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'NU') alert('존재하지 않는 유저입니다.');
      if(code === 'DBE') alert('데이터베이스 에러입니다.');
      if(code !== 'SU') {
        navigator(MAIN_PATH());
        return;
      }
      const { email, nickname, profileImage } = responseBody as GetUserResponseDto;
      setNickname(nickname);
      setProfileImage(profileImage);
      const isMyPage = email === loginUser?.email;
      setMyPage(isMyPage);
    }

    // function : file uplade response 처리 함수 //
    const fileUploadResponse = (profileImage : string | null) => {
      if(!profileImage) return;
      if(!cookies.accessToken) return;

      const requestBody : PatchProfileImageRequestDto = { profileImage };
      patchProfileImageRequest(requestBody, cookies.accessToken).then(patchProfileImageResponse);
    }
    // function : patch profile image response 처리 함수 //
    const patchProfileImageResponse = ( responseBody : PatchProfileImageResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'AF') alert('인증에 실패!!!');
      if(code === 'NU') alert('존재하지 않는 유저입니다.');
      if(code === 'DBE') alert('데이터 베이스 에러입니다.');
      if(code !== 'SU') return;

      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
    }
    // function : patch nickname response 처리 함수 //
    const patchNicknameResponse = (responseBody : PatchNicknameResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'VF') alert('닉네임은 필수입니다.');
      if(code === 'AF') alert('인증에 실패!!!');
      if(code === 'DN') alert('중복되는 닉네임입니다.');
      if(code === 'NU') alert('존재하지 않는 유저입니다.');
      if(code === 'DBE') alert('데이터 베이스 에러입니다.');
      if(code !== 'SU') return;

      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
      setNicknameChange(false);
    }

    // event handler : 프로필 박스 클릭 이벤트 처리 //
    const onProfileBoxClickHandler = () => {
      if(!isMyPage)return;
      if(!imageInputRef.current) return;
      imageInputRef.current.click();
    }
    // event handler : 닉네임수정 버튼 클릭 이벤트 처리 //
    const onNicknameEditButtonClickHandler = () => {
      if(!isNicknameChange) {
        setChangeNickname(nickname); // 변경버튼 클릭시 닉네임 표시
        setNicknameChange(!isNicknameChange); // 닉네임 여부상태
        return;
      }

      if(!cookies.accessToken) return;
      const requestBody : PatchNicknameRequestDto = {
        nickname : changeNickname
      }
      patchNicknameRequest(requestBody, cookies.accessToken).then(patchNicknameResponse);
    }
    // event handler : 프로필 이미지 변경 이벤트 처리 //
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files ||!event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);

      fileUploadRequest(data).then(fileUploadResponse);
    }
    // event handler : 닉네임 변경 이벤트 처리 //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setChangeNickname(value);
    }

    // effect : user email path variable 변경시 실행될 함수 //
    useEffect(() => {
      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
    }, [userEmail]); 

    // render //
    return (
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ? 
          <div className='user-top-my-profile-image-box' onClick={onProfileBoxClickHandler} >
            {profileImage !== null ? 
            <div className='user-top-profile-image' style={{backgroundImage: `url(${profileImage})`}} ></div> :
            <div className='icon-box-large'>
              <div className='icon image-box-white-icon'></div>
            </div>
            }
            <input ref={imageInputRef} type='file' accept='image/*' style={{display:'none'}} onChange={onProfileImageChangeHandler} />
          </div> :
          <div className='user-top-profile-image-box' style={{backgroundImage: `url(${profileImage ? profileImage : DefaultImage})`}} ></div>
          }
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>
              {isMyPage ? 
              <>  
              {isNicknameChange ? 
              <input className='user-top-info-nickname-input' type='text' size={nickname.length + 1} value={changeNickname} onChange={onNicknameChangeHandler} /> : 
              <div className='user-top-info-nickname'>{nickname}</div>
              }
              <div className='icon-button' onClick={onNicknameEditButtonClickHandler} >
                <div className='icon edit-icon'></div>
              </div>
              </> :
              <div className='user-top-info-nickname'>{nickname}</div>
              }
            </div>
            <div className='user-top-info-email'>{'email@email.com'}</div>
          </div>
        </div>
      </div>
    )
  };

  // component : 유저 화면 하단 //
  const UserBottom = () => {

    // state : 페이지네이션 관련 상태 //
    const { currentPage, setCurrentPage, currentSection, setCurrentSection,
      viewList, viewPageList, totalSection, setTotalList
    } = usePagination<BoardListItem>(5);

    // state : 게시물 갯수 상태 //
    const [count, setCount] = useState<number>(0);

    // function : get user board list response 처리 함수 //
    const getUserBoardListResponse = (responseBody: GetUserBoardListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'NU') {
        alert('존재하지 않는 유저입니다.');
        navigator(MAIN_PATH());
        return;
      }
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const { userBoardList } = responseBody as GetUserBoardListResponseDto;
      setTotalList(userBoardList);
      setCount(userBoardList.length);
    };

    // event handler : 사이드 카드 클릭 이벤트 처리 //
    const onSideCardClickHandler = () => {
      if(isMyPage) navigator(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
      else if(loginUser) navigator(USER_PATH(loginUser.email));
    }

    // effect : userEmail path variable이 바뀔때마다 실행될 함수 //
    useEffect(() => {
      if(!userEmail) return;
      getUserBoardListRequest(userEmail).then(getUserBoardListResponse);
    }, [userEmail]);

    // render //
    return (
      <div id='user-bottom-wrapper'>
        <div className='user-bottom-container'>
          <div className='user-bottom-title'>{isMyPage ? '내 게시물 ' : '게시물 '}<span className='emphasis'>{count}</span></div>
          <div className='user-bottom-contents-box'>
            {count === 0 ? 
            <div className='user-bottom-contents-nothing'>{'게시물이 없습니다.'}</div> : 
            <div className='user-bottom-contents'>
              {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
            </div>
            }
            <div className='user-bottom-side-box'>
              <div className='user-bottom-side-card' onClick={onSideCardClickHandler} >
                <div className='user-bottom-side-container'>
                  {isMyPage ? 
                    <>
                    <div className='icon-box'>
                      <div className='icon edit-icon'></div>
                    </div>
                    <div className='user-bottom-side-text'>{'글쓰기'}</div>
                    </> :
                    <>
                    <div className='user-bottom-side-text'>{'내 게시물로 가기'}</div>
                    <div className='icon-box'>
                      <div className='icon arrow-right-icon'></div>
                    </div>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='user-bottom-pagination-box'>
          {count !== 0 && 
          <Pagination
            currentPage={currentPage}
            currentSection={currentSection}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            viewPageList={viewPageList}
            totalSection={totalSection} 
          />}
          </div>
        </div>
      </div>
    )
  };

  // render : 유저 화면 컴포넌트 렌더링//
  return (
    <>
      <UserTop />
      <UserBottom />
    </>
  )
}
