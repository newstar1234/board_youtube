import React, { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { useNavigate } from 'react-router-dom';
import { EmailCertificationReqeustDto, IdCheckRequestDto } from 'apis/request/auth';
import { emailCertificationRequest, idCheckRequest } from 'apis';
import { EmailCertificationResponseDto, IdCheckResponseDto } from 'apis/response/auth';
import { ResponseCode } from 'types/enums';
import { ResponseBody } from 'types';

export default function SignUp() {

  // 레퍼런스 객체
  const idRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordCheckRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const certificationNumberRef = useRef<HTMLInputElement | null>(null);

  // 상태값
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [certificationNumber, setCertificationNumber] = useState<string>('');

  // 에러 상태 값
  const [isIdError, setIdError] = useState<boolean>(false);
  const [isPasswordError, setPasswordError] = useState<boolean>(false);
  const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isCertificationNumberError, setCertificationNumberError] = useState<boolean>(false);

  // 메세지 상태 값
  const [idMessage, setIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [certificationNumberMessage, setCertificationNumberMessage] = useState<string>('');
  
  const [isIdCheck, setIdCheck] = useState<boolean>(false);

  // 회원가입 버튼 //
  const signUpButtonClass = id && password && passwordCheck && email && certificationNumber ? 
        'primary-button-lg' : 'disable-button-lg';
  // 이메일 패턴 //
  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9]*\.[a-zA-Z]{2,4})$/;

  // navigate // 
  const navigate = useNavigate();

  // 아이디 중복 response //
  const idCheckResponse = (responseBody: ResponseBody<IdCheckResponseDto>) => {
    if(!responseBody) return;
    const { code } = responseBody;
    if(code === ResponseCode.VALIDATION_FAIL) alert('아이디를 입력하세요.');
    if(code === ResponseCode.DUPLICATIOM_ID) {
      setIdError(true);
      setIdMessage('이미 사용중인 아이디입니다.');
      setIdCheck(false);
    }
    if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
    if(code !== ResponseCode.SUCCESS) return;
    
    setIdError(false);
    setIdMessage('사용 가능한 아이디입니다.');
    setIdCheck(true);

  };

  const emailCertificationResponse = (responseBody: ResponseBody<EmailCertificationResponseDto>) => {
    if(!responseBody) return;

    const { code } = responseBody;
    if(code === ResponseCode.VALIDATION_FAIL) alert('아이디와 이메일을 모두 입력하세요.');
    if(code === ResponseCode.DUPLICATIOM_ID) {
      setIdError(true);
      setIdMessage('이미 사용중인 아이디입니다.');
      setIdCheck(false);
    }
    if(code === ResponseCode.MAIL_FAIL) alert('이메일 전송에 실패했습니다.');
    if(code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
    if(code !== ResponseCode.SUCCESS) return;
    
    setEmailError(false);
    setEmailMessage('인증번호가 전송되었습니다.');
  };

  // onChange
  const onIdChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
    setIdMessage('');
    setIdCheck(false);
  };
  const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordMessage('');
  };
  const onPasswordCheckChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordCheck(value);
    setPasswordCheckMessage('');
  };
  const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailMessage('');
  };
  const onCertificationNumberChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCertificationNumber(value);
    setCertificationNumberMessage('');
  }; 

  // button handler
  const onIdButtonClickHandler = () => {
    if(!id) return;
    const requestBody: IdCheckRequestDto = { id };

    idCheckRequest(requestBody).then(idCheckResponse);
  };
  const onEmailButtonClickHandler = () => {
    if(!id && !email) return;

    const checkedEmail = emailPattern.test(email);
    if(!checkedEmail) {
      setEmailError(true);
      setEmailMessage('이메일 형식이 아닙니다.');
      return;
    }

    const requestBody : EmailCertificationReqeustDto = { id,email };
    emailCertificationRequest(requestBody).then(emailCertificationResponse);
  };
  const onCertificationNumberButtonClickHandler = () => {

  };

  const onSignUpButtonClickHandler = () => {

  };

  const onSignInButtonClickHandler = () => {
    navigate('/auth/sign-in');
  };

  // key down
  const onIdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    onIdButtonClickHandler();
  };
  const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!passwordCheckRef.current) return;
    passwordCheckRef.current.focus();
  };
  const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!emailRef.current) return;
    emailRef.current.focus();
  };
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    onEmailButtonClickHandler();
  };
  const onCertificationNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    onCertificationNumberButtonClickHandler();
  };

  return (
    <div id='sign-up-wrapper'>
      <div className='sign-up-image'></div>
      <div className='sign-up-container'>
        <div className='sign-up-box'>
          <div className='sign-up-title'>{'임대주택 가격 서비스'}</div>
          <div className='sign-up-content-box'>
            <div className='sign-up-content-sns-sign-in-box'>
              <div className='sign-up-content-sns-sign-in-title'>{'SNS 회원가입'}</div>
              <div className='sign-up-content-sns-sign-in-button-box'>
                <div className='kakao-sign-in-button'></div>
                <div className='naver-sign-in-button'></div>
              </div>
            </div>
            <div className='sign-up-content-divider'></div>
            <div className='sign-up-content-input-box'>
              <InputBox ref={idRef} title='아이디' placeholder='아이디를 입력해주세요.' type='text' value={id} onChange={onIdChangeHandler} isErrorMessage={isIdError} message={idMessage} buttonTitle='중복 확인' onButtonClick={onIdButtonClickHandler} onKeyDown={onIdKeyDownHandler} />
              <InputBox ref={passwordRef} title='비밀번호' placeholder='비밀번호를 입력해주세요.' type='password' value={password} onChange={onPasswordChangeHandler} isErrorMessage={isPasswordError} message={passwordMessage} onKeyDown={onPasswordKeyDownHandler}/>
              <InputBox ref={passwordCheckRef} title='비밀번호 확인' placeholder='비밀번호를 입력해주세요.' type='password' value={passwordCheck} onChange={onPasswordCheckChangeHandler} isErrorMessage={isPasswordCheckError} message={passwordCheckMessage} onKeyDown={onPasswordCheckKeyDownHandler}/>
              <InputBox ref={emailRef} title='이메일' placeholder='이메일 주소를 입력해주세요.' type='text' value={email} onChange={onEmailChangeHandler} isErrorMessage={isEmailError} message={emailMessage} buttonTitle='이메일 인증' onButtonClick={onEmailButtonClickHandler} onKeyDown={onEmailKeyDownHandler}/>
              <InputBox ref={certificationNumberRef} title='인증번호' placeholder='인증번호 4자리를 입력해주세요.' type='text' value={certificationNumber} onChange={onCertificationNumberChangeHandler} isErrorMessage={isCertificationNumberError} message={certificationNumberMessage} buttonTitle='인증 확인' onButtonClick={onCertificationNumberButtonClickHandler} onKeyDown={onCertificationNumberKeyDownHandler}/>
            </div>
            <div className='sign-up-content-button-box'>
              <div className={`${signUpButtonClass} full-width`} onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
              <div className='text-link-lg full-width' onClick={onSignInButtonClickHandler} >{'로그인'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
