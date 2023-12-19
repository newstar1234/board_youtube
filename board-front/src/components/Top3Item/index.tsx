import React from 'react';
import './style.css';
import defaultPrifileImage from 'assets/image/urshifu.jpg';
import { BoardListItem } from 'types/interface';
import {useNavigate} from 'react-router-dom';
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';

interface Props {
  top3ListItem : BoardListItem
}

export default function Top3Item({top3ListItem} : Props) {

  // properties //
  const { boardNumber, title, content, boardTitleImage, favoriteCount, commentCount, viewCount, writeDatetime, writerNickname, writerProfileImage } = top3ListItem;

  // function //
  const navigator = useNavigate();

  // event handler //
  const onClickHandler = () => {
    navigator(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
  }

  return (
    <div className='top-3-list-item' style={{backgroundImage: `url(${boardTitleImage})`}} onClick={onClickHandler} >
      <div className='top-3-list-item-main-box'>
        <div className='top-3-list-item-top'>
          <div className='top-3-list-item-profile-box'>
            <div className='top-3-list-item-profile-image' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultPrifileImage})`}}></div>
          </div>
          <div className='top-3-list-item-write-box'>
            <div className='top-3-list-item-nickname'>{writerNickname}</div>
            <div className='top-3-list-item-write-date'>{writeDatetime}</div>
          </div>
        </div>
        <div className='top-3-list-item-middle'>
          <div className='top-3-list-item-title'>{title}</div>
          <div className='top-3-list-item-content'>{content}</div>
        </div>
        <div className='top-3-list-item-bottom'>
          <div className='top-3-list-item-counts'>
            {`댓글 ${commentCount} · 좋아요 ${favoriteCount} · 조회수 ${viewCount}`}
          </div>
        </div>
      </div>
    </div>
  )
}
