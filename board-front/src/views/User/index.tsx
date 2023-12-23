import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import DefaultImage from 'assets/image/urshifu.jpg';
import { useParams } from 'react-router-dom';

export default function User() {

  // state : 마이페이지 여부 상태 //
  const { userEmail} = useParams();
  
  // component : 유저 화면 상단 //
  const UserTop = () => {

    // state : 이미지 파일 인풋 참조 상태 //
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    // state : 마이페이지 여부 상태 //
    const [isMyPage, setMyPage] = useState<boolean>(true);
    // state : 닉네임 변경 여부 상태 //
    const [isNicknameChange, setNicknameChange] = useState<boolean>(false);
    // state : 닉네임 상태 //
    const [nickname, setNickname] = useState<string>('');
    // state : 변경 닉네임 상태 //
    const [changeNickname, setChangeNickname] = useState<string>('');
    // state : 프로필 이미지 상태 //
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // event handler : 프로필 박스 클릭 이벤트 처리 //
    const onProfileBoxClickHandler = () => {
      if(!isMyPage)return;
      if(!imageInputRef.current) return;
      imageInputRef.current.click();
    }
    // event handler : nickname edit buttom 수정 버튼 클릭 이벤트 처리 //
    const onNicknameEditButtonClickHandler = () => {
      setChangeNickname(nickname); // 변경버튼 클릭시 닉네임 표시
      setNicknameChange(!isNicknameChange); // 닉네임 여부상태
    }
    // event handler : 프로필 이미지 변경 이벤트 처리 //
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files ||!event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
    }
    // event handler : 닉네임 변경 이벤트 처리 //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setChangeNickname(value);
    }

    // effect : user email path variable 변경시 실행될 함수 //
    useEffect(() => {
      if(!userEmail) return;
      setNickname('nicknamedes');
      // setProfileImage(DefaultImage);
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
    // render //
    return (
      <div></div>
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
