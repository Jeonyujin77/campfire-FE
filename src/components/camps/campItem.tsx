//라이브러리
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import ReactGa from 'react-ga';
//인터페이스
import { CampType } from '../../interfaces/camp';
//컴포넌트
import Liked from './Liked';
//이미지
import likeOn from '../../asset/likeOn.png';
import campPremium from '../../asset/campItem/campPremium.png';
import noMainImg from '../../asset/campItem/noMainImg.png';
import reviewIcon from '../../asset/campItem/reviewIcon.png';

const CampItem = ({ camp }: { camp: CampType }) => {
  const navigate = useNavigate();
  const campMinAddress = camp.campAddress.split(' ');

  //리뷰 숫자 범위에따른 표현방식
  const countR = () => {
    if (camp.countReviews >= 100) {
      return ' 99+';
    } else {
      return ` ${camp.countReviews}`;
    }
  };

  const toDetail = () => {
    ReactGa.event({
      category: '메인페이지 버튼',
      action: '캠핑장 선택',
    });
    navigate(`/camp/${camp.campId}`);
  };

  return (
    <>
      {camp.premium ? (
        <ItemWrap>
          <PremiumImg src={campPremium} />
          <Liked
            campId={camp.campId}
            likeStatus={camp.likeStatus}
            likes={camp.likes}
          />
          <div style={{ position: 'relative' }} onClick={toDetail}>
            <CampImg src={camp.campMainImage} alt="캠프장 메인사진" />
          </div>
          <CampDescWrap onClick={toDetail}>
            <CampHeadDesc>{camp.campName}</CampHeadDesc>
            <CampDescBody>
              <CampDescLeft>
                <CampDescLAddress>
                  {campMinAddress[0]} {campMinAddress[1]}
                </CampDescLAddress>
                <CampDescL>
                  {camp.typeLists ? camp.typeLists.join(', ') : '캠핑장'}
                </CampDescL>
              </CampDescLeft>
              <CampDescRight>
                <CampDescR>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <img
                      style={{ width: '22px', height: '22px' }}
                      src={likeOn}
                      alt="하트"
                    />
                    <StarRate>{camp.likes}</StarRate>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <img
                      style={{ width: '22px', height: '22px' }}
                      src={reviewIcon}
                      alt="하트"
                    />
                    <StarRate>{countR()}</StarRate>
                  </div>
                </CampDescR>
              </CampDescRight>
            </CampDescBody>
          </CampDescWrap>
        </ItemWrap>
      ) : (
        <ItemWrap>
          <Liked
            campId={camp.campId}
            likeStatus={camp.likeStatus}
            likes={camp.likes}
          />
          <div style={{ position: 'relative' }} onClick={toDetail}>
            {camp.campMainImage ? (
              <CampImg
                src={camp.campMainImage}
                alt="캠프장 메인사진"
                onError={event => {
                  if (event.target instanceof HTMLImageElement) {
                    event.target.src = `${noMainImg}`;
                  }
                }}
              />
            ) : (
              <CampImg src={noMainImg} alt="캠프장 메인사진" />
            )}
          </div>
          <CampDescWrap onClick={toDetail}>
            <CampHeadDesc>{camp.campName}</CampHeadDesc>
            <CampDescBody>
              <CampDescLeft>
                {campMinAddress ? (
                  <CampDescLAddress>
                    {campMinAddress[0]} {campMinAddress[1]}
                  </CampDescLAddress>
                ) : (
                  <></>
                )}
                <CampDescL>
                  {camp.typeLists ? camp.typeLists.join(', ') : '캠핑장'}
                </CampDescL>
              </CampDescLeft>
              <CampDescRight>
                <CampDescR>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <img
                      style={{ width: '22px', height: '22px' }}
                      src={likeOn}
                      alt="하트"
                    />
                    <StarRate>{camp.likes}</StarRate>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <img
                      style={{ width: '22px', height: '22px' }}
                      src={reviewIcon}
                      alt="하트"
                    />
                    <StarRate>{countR()}</StarRate>
                  </div>
                </CampDescR>
              </CampDescRight>
            </CampDescBody>
          </CampDescWrap>
        </ItemWrap>
      )}
    </>
  );
};

const ItemWrap = styled.div`
  position: relative;
  width: 285px;
  height: 292px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  cursor: pointer;
  border-radius: 19px;
  box-shadow: 5px 5px 5px 0px #d9d9d9;
  &:hover {
    box-shadow: 5px 5px 5px 0px #c6c6c6;
  }
`;

const PremiumImg = styled.img`
  position: absolute;
  z-index: 500;
  top: 5px;
  left: 9px;
  width: 93px;
  height: 40px;
  border-radius: 7px;
`;

const CampImg = styled.img`
  width: 285px;
  height: 177px;
  border-top-left-radius: 19px;
  border-top-right-radius: 19px;
  display: block;
`;

const CampDescWrap = styled.div`
  width: 285px;
  height: 115px;
  background-color: #f3f3f3;
  border-bottom-left-radius: 19px;
  border-bottom-right-radius: 19px;
`;

const CampHeadDesc = styled.div`
  font-family: 'SEBANG_Gothic';
  word-break: break-all;
  word-wrap: break-word;
  font-size: 20px;
  font-weight: bold;
  margin: 13px 13px 13px 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CampDescBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CampDescLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 13px;
  align-items: center;
  gap: 10px;
`;

const CampDescRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 13px;
  align-items: center;
`;

const CampDescLAddress = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  width: 177px;
  font-size: 16px;
  display: flex;
  color: #888888;
`;

const CampDescL = styled.div`
  width: 160px;
  height: 22px;
  margin-right: 17px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CampDescR = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  width: 82px;
  font-size: 16px;
  gap: 10px;
`;

const StarRate = styled.div`
  font-weight: bold;
`;

export default memo(CampItem);
