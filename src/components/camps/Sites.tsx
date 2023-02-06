//라이브러리
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import ReactGa from 'react-ga';
//인터페이스
import { SiteListsRes } from '../../interfaces/camp';

const Sites = ({
  site,
  theme,
  type,
  dateObj,
  countObj,
}: {
  site: SiteListsRes;
  theme?: [];
  type?: [];
  dateObj: {};
  countObj: {};
}) => {
  const navigate = useNavigate();
  const params = useParams().campId;

  return (
    <>
      {site.bookStatus ? (
        <SiteWrap
          bookStatus={site.bookStatus}
          onClick={() => {
            ReactGa.event({
              category: '디테일페이지 버튼',
              action: '캠핑장 사이트 선택',
            });
            navigate(`/camp/${params}/sitedesc/${site.siteId}`, {
              state: { dateState: dateObj, countState: countObj },
            });
          }}
        >
          <CanBookText>예약가능</CanBookText>
          <MainImg src={site.siteMainImage} alt="사이트 메인이미지" />
          <TextWrap>
            <TextTitle>{site.siteName}</TextTitle>
            <TextBody>
              <div>{theme?.join(', ')}</div>
              <div>{type?.join(', ')}</div>
            </TextBody>
            <TextFoot>
              <CountWrap>
                기준인원: {site.minPeople} / 최대인원: {site.maxPeople}
              </CountWrap>
              <Price>{site.sitePrice}원~</Price>
            </TextFoot>
          </TextWrap>
        </SiteWrap>
      ) : (
        <SiteWrap bookStatus={site.bookStatus}>
          <CantBook />
          <CantBookText>예약불가</CantBookText>
          <MainImg src={site.siteMainImage} alt="사이트 메인이미지" />
          <TextWrap>
            <TextTitle>{site.siteName}</TextTitle>
            <TextBody>
              <div>{theme?.join(', ')}</div>
              <div>{type?.join(', ')}</div>
            </TextBody>
            <TextFoot>
              <CountWrap>
                기준인원: {site.minPeople} / 최대인원: {site.maxPeople}
              </CountWrap>
              <Price>{site.sitePrice}원~</Price>
            </TextFoot>
          </TextWrap>
        </SiteWrap>
      )}
    </>
  );
};

const CantBook = styled.div`
  position: absolute;
  width: 1140px;
  min-height: 170px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  background-color: #f1f1f1;
  opacity: 0.8;

  @media (max-width: 1200px) {
    width: 100%;
    min-height: 160px;
  }
`;

const CantBookText = styled.div`
  position: absolute;
  right: 3%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  width: 80px;
  height: 26px;
  border-radius: 10px;
  background-color: #e26715;
  @media (max-width: 1200px) {
    top: 40%;
  }
`;

const CanBookText = styled.div`
  position: absolute;
  right: 3%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  width: 80px;
  height: 26px;
  border-radius: 10px;
  background-color: #fe802c;
  @media (max-width: 1200px) {
    top: 40%;
  }
`;

const SiteWrap = styled.div<{ bookStatus: boolean }>`
  position: relative;
  border: 1px solid black;
  width: 1140px;
  min-height: 150px;
  display: flex;
  align-items: center;
  cursor: ${({ bookStatus }) => (bookStatus ? 'pointer' : 'default')};
  box-shadow: 4px 4px 4px #d3d3d3;
  border-radius: 15px;
  &:hover {
    box-shadow: ${({ bookStatus }) =>
      bookStatus ? '4px 4px 4px #afafaf' : '4px 4px 4px #d3d3d3'};
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const MainImg = styled.img`
  border-radius: 15px;
  width: 340px;
  height: 170px;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const TextWrap = styled.div`
  display: block;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 5px 10px 5px 15px;
  width: 800px;
  height: 150px;
  @media (max-width: 1200px) {
    width: 95%;
  }
`;

const TextTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 20px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 1200px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const TextBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const TextFoot = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1200px) {
    width: 100%;
    font-size: 14px;
  }
`;

const CountWrap = styled.div``;

const Price = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: orange;
  padding: 0px 10px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

export default Sites;
