import {ChangeEvent, Dispatch, SetStateAction, forwardRef, KeyboardEvent} from 'react';
import './style.css';

interface Props {
  label : string;
  type : 'text' | 'password';
  placeholder : string;
  value : string;
  setValue : Dispatch<SetStateAction<string>>;
  error : boolean;

  icon? : string;
  onButtonClick? : () => void; 

  message? : string;

  onKeyDown? : (event : KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

  // state : properties //
  const { label, type, error, placeholder, value, setValue, icon, onButtonClick, message, onKeyDown } = props;

  // event handler : 값 변경 //
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
  };
  
  // event handler : Key 처리 //
  const onKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
    if(!onKeyDown) return;
    onKeyDown(event);
  };

  return (
    <div className='inputbox'>
      <div className='inputbox-label'>{label}</div>
      <div className={error ? 'inputbox-container-error' : 'inputbox-container' }>
        <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
        {onButtonClick !== undefined && (
          <div className='icon-button'>
            {icon !== undefined && <div className={`icon ${icon}`}></div>}
          </div>
        )}
      </div>
      {message !== undefined && <div className='inputbox-message'>{message}</div>}
    </div>
  )

});

export default InputBox;
