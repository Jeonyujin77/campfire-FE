import DateChoiceModal from '../components/reservations/dateChoiceModal';
import { useState } from 'react';
import ImgSwiper from '../components/reservations/imgSwiper';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import CommentList from '../components/reservations/commentList';

const DetailPage = () => {
  const navigate = useNavigate();
  const params = useParams().campId;

  const [isOpen, setIsOpen] = useState(false);

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const getday = (dayNum: number) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dayNum];
  };

  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const adultMinusButton = () => {
    if (adult <= 1) return;
    setAdult(adult - 1);
  };
  const adultPlusButton = () => {
    setAdult(adult + 1);
  };
  const childMinusButton = () => {
    if (child <= 0) return;
    setChild(child - 1);
  };
  const childPlusButton = () => {
    setChild(child + 1);
  };

  const [isCmtOpen, setIsCmtOpen] = useState(false);
  const isCmtOpenChange = () => {
    setIsCmtOpen(!isCmtOpen);
  };

  return (
    <Wrap>
      <DateChoiceModal
        setStart={setStart}
        setEnd={setEnd}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ImgSwiper />
      <DescWrap>
        <div>
          <div>
            <div>name</div>
            <div>address</div>
            <div>phonenumber</div>
          </div>
        </div>
        <DateText
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div>
            {start?.getMonth() + 1}.{start?.getDate()}({getday(start?.getDay())}
            ){' / '}
            {end?.getMonth() + 1}.{end?.getDate()}({getday(end?.getDay())})
          </div>
        </DateText>
        <HeadCountWrap>
          <div>방문하시는 인원을 선택하세요</div>
          <div>
            <HeadCount>
              <div>
                성인
                <button
                  onClick={() => {
                    adultMinusButton();
                  }}
                >
                  -
                </button>
                {adult}
                <button
                  onClick={() => {
                    adultPlusButton();
                  }}
                >
                  +
                </button>
              </div>
              <div>
                아동
                <button
                  onClick={() => {
                    childMinusButton();
                  }}
                >
                  -
                </button>
                {child}
                <button
                  onClick={() => {
                    childPlusButton();
                  }}
                >
                  +
                </button>
              </div>
              <button
                // 예약페이지 만든 후 수정필요
                onClick={() => {
                  navigate(`/camp/${params}/campdesc`);
                }}
              >
                예약하기
              </button>
            </HeadCount>
          </div>
        </HeadCountWrap>
        {isCmtOpen ? (
          <CmtBox onClick={() => isCmtOpenChange()}>열기🔽</CmtBox>
        ) : (
          <CmtBox onClick={() => isCmtOpenChange()}>접기🔼</CmtBox>
        )}
        <CommentList isCmtOpen={isCmtOpen} setIsCmtOpen={setIsCmtOpen} />
      </DescWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  /* 헤더 크기에 따라 수정 필요 */
  margin: 0px auto;
  /* 헤더 아래 출력되도록 */
  margin-top: 100px;
  width: 1200px;
  max-height: 100%;
  min-height: 100vh;
  border: 1px solid red;
`;

const DescWrap = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DateText = styled.div`
  text-align: center;
  background-color: #afadad;
  width: 200px;
  height: 40px;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

const HeadCountWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeadCount = styled.div`
  display: flex;
  gap: 5px;
`;

const CmtBox = styled.div`
  border: 1px solid lightgray;
  text-align: center;
  font-size: 25px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DetailPage;
