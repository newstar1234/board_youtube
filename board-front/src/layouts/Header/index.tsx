import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';
import { fileUploadRequest, postBoardRequest } from 'apis';
import { PostBoardRequestDto } from 'apis/request/board';
import { PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';

export default function Header() {

  // state : 로그인 유저 상태 //
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();
  // state : path 상태 //
  const { pathname } = useLocation();
  // state : cookie 상태 //
  const [cookies, setCookie] = useCookies();
  // state : 로그인 상태 //
  const [isLogin, setLogin] = useState<boolean>(false);
  // state : 인증페이지 상태 //
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  // state : 메인페이지 상태 //
  const [isMainPage, setMainPage] = useState<boolean>(false);
  // state : 검색페이지 상태 //
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  // state : 게시물 상세페이지 상태 //
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  // state : 게시물 작성페이지 상태 //
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  // state : 게시물 수정페이지 상태 //
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  // state : 유저페이지 상태 //
  const [isUserPage, setUserPage] = useState<boolean>(false);

  // function : 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler : 로고 클릭 이벤트 처리 함수 //
  const onLogoClickHandler = () => {
    navigator(MAIN_PATH());
  }

  // component : 검색 버튼 컴포넌트 //
  const SearchButton = () => {

    // state : 검색버튼 요소 참조 상태 //
    const searchButtondRef = useRef<HTMLDivElement | null>(null);
    // state : 검색버튼 상태 //
    const [status, setStatus] = useState<boolean>(false);
    // state : 검색어 상태 //
    const [word, sethWord] = useState<string>('');
    // state : 검색어 path variable 상태 //
    const { searchWord } = useParams();
    
    // event handler : 검색어 변경 이벤트 처리 함수//
    const onSearchWordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      sethWord(value);
    }
    // event handler : 검색어 키 처리 이벤트 처리 함수 //
    const onSearchWordKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!searchButtondRef.current) return;
      searchButtondRef.current?.click();
    }
    // event handler : 검색 아이콘 클릭 이벤트 처리 함수 //
    const onSearchButtonClickHandler = () => {
      if(!status) {
        setStatus(!status);
        return;
      }
      navigator(SEARCH_PATH(word));
    }

    // effect : 검색어 path variable 변경 될 때마다 실행될 함수 //
    useEffect(() => {
      if(searchWord) {
        sethWord(searchWord);
        setStatus(true);
      }
    }, [searchWord]);

    if (!status) 
    // render (Click false 상태 )//
    return ( 
    <div className='icon-button' onClick={onSearchButtonClickHandler}>
      <div className='icon search-light-icon'></div>
    </div>
    );
    // render (Click true 상태 ) //
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler} />
        <div ref={searchButtondRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
  };

  // component : 마이페이지 버튼 컴포넌트 //
  const MyPageButton = () => {

    // state : userEmail path variable 상태 //
    const { userEmail } = useParams(); 

    // event handler : 마이페이지 버튼 클릭 이벤트 처리 함수 //
    const onMyPageButtonClickHandler = () => {
      if(!loginUser) return;
      const { email } = loginUser;
      navigator(USER_PATH(email));
    }
    // event handler : 로그아웃 버튼 클릭 이벤트 처리 함수 //
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      setCookie('accessToken', '', { path: MAIN_PATH(), expires: new Date() });
      navigator(MAIN_PATH());
    }
    // event handler : 로그인 버튼 클릭 이벤트 처리 함수 //
    const onSignInButtonClickHandler = () => {
      navigator(AUTH_PATH());
    }

    
    // render : 로그아웃 버튼 렌더링 //
    if(isLogin && userEmail === loginUser?.email)
    return <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>;

    // render : 마이페이지 버튼 렌더링 //
    if (isLogin) 
    return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;
    // render : 로그인 버튼 렌더링 //
    return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;

  }
  // component : 업로드 버튼 컴포넌트 //
  const UploadButton = () => {

    // state : 게시물 상태 //
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();

    // function : post board response 처리 함수 //
    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
      if(!responseBody) return;

      const { code } = responseBody;
      if(code === 'AF' || code === 'NU') {
        navigator(AUTH_PATH());
        return
      }
      if(code === 'VF') alert('제목과 내용을 필수입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      resetBoard();
      if(!loginUser) return;
      const { email } = loginUser;
      navigator(USER_PATH(email));
    }

    // event handler : 업로드 버튼 클릭 이벤트 처리 함수 //
    const onUploadButtonClickHandler = async () => {
      const accessToken = cookies.accessToken;
      if(!accessToken) return;

      const boardImageList: string[] = [];

      // description : 반복돌면서 boardImageList에 url 담아줌 //
      for(const file of boardImageFileList) {
        const data = new FormData();
        data.append('file', file);

        const url = await fileUploadRequest(data);
        if(url) boardImageList.push(url);
      }

      const requestBody : PostBoardRequestDto = {
        title, content, boardImageList
      }
      postBoardRequest(requestBody, accessToken).then(postBoardResponse);
    }

    // render : 업로드 버튼 렌더링 //
    if(title && content)
    return <div className='black-button' onClick={onUploadButtonClickHandler} >{'업로드'}</div>;
    // render : 업로드 불가 버튼 렌더링 //
    return <div className='disable-button' >{'업로드'}</div>;
  }

  // effect : path가 변경될 때 마다 실행될 함수 //
  useEffect (() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);
    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage);
    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage);
    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage);
    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage);
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);
  }, [pathname]);

  // effect : login user가 실행될 때 마다 실행될 함수 //
  useEffect (() => {
    setLogin(loginUser !== null);
  }, [loginUser]);

  // render //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'STARs BOARD'}</div>
        </div>
        <div className='header-right-box'>
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />} 
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton />}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton /> }
        </div>
      </div>
    </div>
  )
}
