//라이브러리
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
//api
import { __withdrawalUser } from '../../apis/userApi';
//훅
import useInput from '../../hooks/useInput';
//컴포넌트
import Button from '../common/Button';
import Input from '../common/Input';
import closePopBtn from '../../asset/closePopupBtn.png';

interface Withdrawal {
  isWithdrawalOpen: boolean;
  setIsWithdrawalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WithdrawalModal = ({
  isWithdrawalOpen,
  setIsWithdrawalOpen,
}: Withdrawal) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [password, setPassword, passwordHandler] = useInput('');
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    setUserId(Number(localStorage.getItem('userId')));
  }, []);

  return (
    <>
      <ModalBackground
        onClick={() => {
          setIsWithdrawalOpen(!isWithdrawalOpen);
          setPassword('');
        }}
        isOpen={isWithdrawalOpen}
      ></ModalBackground>
      <ModalWrap isOpen={isWithdrawalOpen}>
        <ModalHeader>
          <ModalCloseBtn
            onClick={() => {
              setIsWithdrawalOpen(!isWithdrawalOpen);
              setPassword('');
            }}
          >
            <img src={closePopBtn} alt="닫기" width="19px" />
          </ModalCloseBtn>
        </ModalHeader>
        <p>CAMPFIRE를 탈퇴하시겠습니까?</p>
        <Input
          width="270px"
          height="37px"
          onChange={passwordHandler}
          value={password}
        />
        <Button
          width="286px"
          height="37px"
          bgColor="#A1C182"
          color="#fff"
          onClick={() => {
            if (window.confirm('정말 탈퇴하시겠습니까? \n')) {
              dispatch(
                __withdrawalUser({ userId: userId, password: password }),
              ).then(res => {
                const { type, payload } = res;
                if (type === 'withdrawalUser/fulfilled') {
                  alert(`${payload.message}`);
                  localStorage.clear();
                  navigate('/');
                  window.location.reload();
                }
                if (type === 'withdrawalUser/rejected') {
                  alert(`${payload.response.data.errorMessage}`);
                }
              });
            } else {
              setIsWithdrawalOpen(!isWithdrawalOpen);
            }
          }}
        >
          탈퇴하기
        </Button>
      </ModalWrap>
    </>
  );
};

const ModalBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1500;
`;

const ModalWrap = styled.div<{ isOpen: boolean }>`
  position: fixed;
  margin: auto;
  top: calc(50vh - 10vh);
  left: calc(50vw - 200px);
  background-color: white;
  width: 339px;
  max-height: 100%;
  min-height: 20vh;
  flex-direction: column;
  align-items: center;
  padding: 7px 10px;
  gap: 10px;
  z-index: 2000;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #fe802c;
  p {
    font-size: 20px;
    color: #fe802c;
    font-weight: bold;
    margin: 0;
    padding: 0;
  }

  input {
    border-radius: 101px;
    border: 1px solid #fe802c;
    padding: 0 8px;
  }

  @media (max-width: 600px) {
    width: calc(100% - 20px);
    left: 0;
    right: 0;

    p {
      font-size: 16px;
    }

    input {
      width: 250px;
      height: 37px;
    }
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default WithdrawalModal;
