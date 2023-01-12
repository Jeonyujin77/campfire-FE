import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';
import useInput from '../../hooks/useInput';
import Input from '../common/Input';
import { useAppDispatch } from '../../redux/store';
import { __withdrawalUser } from '../../apis/userApi';
import { Navigate, useNavigate } from 'react-router-dom';

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
                // console.log(payload.response.data.errorMessage);
                // console.log(payload.response.status);
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
  /* justify-content: center; */
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

const ReserveWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  width: 930px;
  height: 260px;
  border: 1px solid black;
`;

const CampDesc = styled.div`
  border: 1px solid blue;
  width: 400px;
  padding: 10px;
  min-height: 240px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DescText = styled.div<{ height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: ${({ height }) => height};
  border-bottom: 1px solid black;
`;

const PagenoBtnWrap = styled.div``;

export default WithdrawalModal;
