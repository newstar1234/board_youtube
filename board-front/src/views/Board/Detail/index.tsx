import React, { useEffect, useState } from 'react';
import './style.css';
import FavoriteItem from 'components/FavoriteItem';
import { Board, CommentListItem, FavoriteListItem } from 'types/interface';
import { boardMock, commentListMock, favoriteListMock } from 'mocks';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';
import defaultImage from 'assets/image/urshifu.jpg';
import { useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant';

export default function BoardDetail() {

  // state : 게시물 번호 path variable 상태 //
  const { boardNumber } = useParams();
  // state : 로그인 유저 상태 //
  const { loginUser } = useLoginUserStore();

  // function : 네비게이터 함수 //
  const navigator = useNavigate();

  // component : 게시물 상세 상단 컴포넌트 //
  const BoardDatailTop = () => {

    // state :  //
    const [board, setBoard] = useState<Board | null>(null);

    // state : more button 상태 //
    const [showMore, setShowMore] = useState<boolean>(false);

    // event handler : 닉네임 클릭 이벤트 처리 //
    const onNicknameButtonClickHandler = () => {
      if(!board) return;
      navigator(USER_PATH(board.writerEmail));
    }
    // event handler : more 버튼 클릭 이벤트 처리 //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    }
    // event handler : 수정 버튼 클릭 이벤트 처리 //
    const onUpdateButtonClickHandler = () => {
      if(!board || !loginUser) return;
      if(loginUser.email !== board.writerEmail) return;
      navigator(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(board.boardNumber)); 
    }
    // event handler : 삭제 버튼 클릭 이벤트 처리 //
    const onDeleteButtonClickHandler = () => {
      if(!board || !loginUser) return;
      if(loginUser.email !== board.writerEmail) return;
      // todo : Delete Request //
      navigator(MAIN_PATH()); 
    }

    // effect : 게시물 번호 path variable 이 바뀔 때마다 게시물 불러오기 //
    useEffect (() => {
      setBoard(boardMock);
    }, [boardNumber]);

    // render //
    if(!board) return <></>
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{board.title}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{backgroundImage: `url(${board.writerProfileImage ? board.writerProfileImage : defaultImage})`}} ></div>
              <div className='board-detail-writer-nickname' onClick={onNicknameButtonClickHandler} >{board.writerNickname}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{board.writeDatetime}</div>
            </div>
            <div className='icon-button' onClick={onMoreButtonClickHandler}>
              <div className='icon more-icon'></div>
            </div>
            {showMore &&
            <div className='board-detail-more-box'>
              <div className='board-detail-update-button' onClick={onUpdateButtonClickHandler} >{'수정'}</div>
              <div className='divider'></div>
              <div className='board-detail-delete-button' onClick={onDeleteButtonClickHandler} >{'삭제'}</div>
            </div>
            }
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{board.content}</div>
          {board.boardImageList.map(image => <img className='board-detail-main-image' src={image}/> )}
          
        </div>
      </div>
    )
  }

  // component : 게시물 상세 하단 컴포넌트 //
  const BoardDetailBottom = () => {

    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    const [commentList, setCommentList] = useState<CommentListItem[]>([]);

    useEffect(() => {
      setFavoriteList(favoriteListMock);
      setCommentList(commentListMock);
    }, []);
    
    // render //
    return (
      <div id='board-detail-bottom'>
        <div className='board-detail-button-box'>
          <div className='board-detail-button-group'>
            <div className='icon-button'>
              <div className='icon favorite-fill-icon'></div>
            </div>
            <div className='board-detail-bottom-text'>{`좋아요 ${12}`}</div>
            <div className='icon-button'>
              <div className='icon up-light-icon'></div>
            </div>
          </div>
          <div className='board-detail-button-group'>
            <div className='icon-button'>
              <div className='icon comment-icon'></div>
            </div>
            <div className='board-detail-bottom-text'>{`댓글 ${12}`}</div>
            <div className='icon-button'>
              <div className='icon up-light-icon'></div>
            </div>
          </div>
        </div>
        <div className='board-detail-favorite-box'>
          <div className='board-detail-bottom-favorite-container'>
            <div className='board-detail-bottom-favorite-title'>{'좋아요'}<span className='emphasis'>{'12'}</span></div>
            <div className='board-detail-bottom-favorite-contents'>
              {favoriteList.map(item => <FavoriteItem favoriteListItem={item}/>)}
            </div>
          </div>
        </div>
        <div className='board-detail-comment-box'>
          <div className='board-detail-bottom-comment-container'>
            <div className='board-detail-bottom-comment-title'>{'댓글'}<span className='emphasis'>{'12'}</span></div>
            <div className='board-detail-bottom-comment-list-contianer'>
              {commentList.map(item => <CommentItem commentListItem={item}/>)}
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-bottom-comment-pagination-box'>
            <Pagination/>
          </div>
          <div className='board-detail-bottom-comment-input-container'>
            <div className='board-detail-bottom-comment-input-container'>
              <textarea className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' />
              <div className='board-detail-bottom-comment-button-box'>
                <div className='disable-button'>{'댓글달기'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDatailTop/>
        <BoardDetailBottom />
      </div>
    </div>
  )
}
