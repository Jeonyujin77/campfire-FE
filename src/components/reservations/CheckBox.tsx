//라이브러리
import styled from '@emotion/styled';
import { useState } from 'react';
//컴포넌트
import TextModal from '../common/TextModal';

interface CheckProps {
  isAllChecked: boolean;
  setAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checkedState: any;
  setCheckedState: React.Dispatch<React.SetStateAction<any>>;
  handleAllCheck: any;
  handleMonoCheck: any;
}

const CheckBox = ({
  isAllChecked,
  setAllChecked,
  checkedState,
  setCheckedState,
  handleAllCheck,
  handleMonoCheck,
}: CheckProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [headText, setHeadText] = useState('이용 시 주의사항');
  const [bodyText, setBodyText] = useState('');

  return (
    <>
      <TextModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        headText={headText}
        bodyText={bodyText}
      />
      <CheckWrap>
        <CheckHeader>
          <div>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={() => handleAllCheck()}
            />
            전체 이용약관에 동의합니다.
          </div>
        </CheckHeader>
        <CheckBody>
          <CheckMono>
            <CheckLeft>
              <CheckInput
                type="checkbox"
                checked={checkedState[0]}
                onChange={() => handleMonoCheck(0)}
              />
              (필수) 취소 및 환불 수수료에 동의합니다.
            </CheckLeft>
            <CheckBtn
              onClick={() => {
                setIsOpen(!isOpen);
                setBodyText('1번박스');
              }}
            >
              보기
            </CheckBtn>
          </CheckMono>
          <CheckMono>
            <CheckLeft>
              <CheckInput
                type="checkbox"
                checked={checkedState[1]}
                onChange={() => handleMonoCheck(1)}
              />
              (필수) 취소 및 환불 수수료에 동의합니다.
            </CheckLeft>
            <CheckBtn
              onClick={() => {
                setIsOpen(!isOpen);
                setBodyText('2번박스');
              }}
            >
              보기
            </CheckBtn>
          </CheckMono>
          <CheckMono>
            <CheckLeft>
              <CheckInput
                type="checkbox"
                checked={checkedState[2]}
                onChange={() => handleMonoCheck(2)}
              />
              (필수) 취소 및 환불 수수료에 동의합니다.
            </CheckLeft>
            <CheckBtn
              onClick={() => {
                setIsOpen(!isOpen);
                setBodyText('3번박스');
              }}
            >
              보기
            </CheckBtn>
          </CheckMono>
          <CheckMono>
            <CheckLeft>
              <CheckInput
                type="checkbox"
                checked={checkedState[3]}
                onChange={() => handleMonoCheck(3)}
              />
              (필수) 취소 및 환불 수수료에 동의합니다.
            </CheckLeft>
            <CheckBtn
              onClick={() => {
                setIsOpen(!isOpen);
                setBodyText('4번박스');
              }}
            >
              보기
            </CheckBtn>
          </CheckMono>
          <CheckMono>
            <CheckLeft>
              <CheckInput
                type="checkbox"
                checked={checkedState[4]}
                onChange={() => handleMonoCheck(4)}
              />
              (필수) 취소 및 환불 수수료에 동의합니다.
            </CheckLeft>
            <CheckBtn
              onClick={() => {
                setIsOpen(!isOpen);
                setBodyText('5번박스');
              }}
            >
              보기
            </CheckBtn>
          </CheckMono>
        </CheckBody>
      </CheckWrap>
    </>
  );
};

const CheckWrap = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  width: 1160px;
  align-items: center;
  padding: 10px 0px;
  gap: 10px;
`;

const CheckHeader = styled.div`
  border: 1px solid red;
  width: 1100px;
  height: 30px;
  display: flex;
  align-items: center;
`;

const CheckBody = styled.div`
  border: 1px solid blue;
  width: 800px;
`;

const CheckMono = styled.div`
  border: 1px solid green;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckLeft = styled.div`
  border: 1px solid yellow;
`;

const CheckInput = styled.input``;

const CheckBtn = styled.button``;

export default CheckBox;
