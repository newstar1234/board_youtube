import React, {useState} from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import latestBoardListMock from 'mocks/latest-board-list.mock';
import Top3Item from 'components/Top3Item';
import { commentListMock, favoriteListMock, top3BoardListMock } from 'mocks';
import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import InputBox from 'components/InputBox';

function App() {

  const [value, setValue] = useState<string>('');

  return (
    <>
      <InputBox label='email' type='text' placeholder='이메일 주소를 입력해주세요.' value={value} error ={true} setValue={setValue} message='다시 확인해주세요.'/>
    </>
  );
}

export default App;
