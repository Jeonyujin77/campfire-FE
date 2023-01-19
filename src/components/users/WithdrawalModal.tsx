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
        }}
        isOpen={isWithdrawalOpen}
      ></ModalBackground>
      <ModalWrap isOpen={isWithdrawalOpen}>
        <ModalHeader>
          <ModalCloseBtn
            onClick={() => {
              setIsWithdrawalOpen(!isWithdrawalOpen);
            }}
          >
            x
          </ModalCloseBtn>
        </ModalHeader>
        <Input width="200px" height="30px" onChange={passwordHandler} />
        <Button
          onClick={() => {
            if (window.confirm('정말 탈퇴하시겠습니까? \n')) {
              dispatch(
                __withdrawalUser({ userId: userId, password: password }),
              ).then(res => {
                const { type, payload } = res;
                console.log(type);
                console.log(res);
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
          탈퇴
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
  border: 1px solid red;
  position: fixed;
  margin: auto;
  top: calc(50vh - 10vh);
  left: calc(50vw - 200px);
  background-color: white;
  width: 400px;
  max-height: 100%;
  min-height: 20vh;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  gap: 10px;
  z-index: 2000;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ModalHeader = styled.div`
  border: 1px solid green;
  width: 380px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: red;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

export default WithdrawalModal;
