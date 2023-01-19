//라이브러리
import styled from '@emotion/styled';
//인터페이스
import { Reservation } from '../../interfaces/Users';

const CompReserveItem = ({ book }: { book: Reservation }) => {
  return (
    <>
      <ReserveWrap key={book.bookId}>
        <div>
          <MainImg src={book.siteMainImage} alt="캠핑장 메인 이미지" />
        </div>
        <CampDesc>
          <SiteName>{book.siteName} </SiteName>
          <DescText height="30px">
            {book.checkInDate.split(' ')[0] +
              ' ~ ' +
              book.checkInDate.split(' ')[0]}
          </DescText>
          <SiteDesc>
            <p>{book.siteDesc}</p>
          </SiteDesc>
          <SiteInfo>
            <p>{book.siteInfo}</p>
          </SiteInfo>
        </CampDesc>
      </ReserveWrap>
    </>
  );
};

const ReserveWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  width: 950px;
  height: 280px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px 1px #c0bdbd;
  }
  border: 1px solid black;
  position: relative;
`;

const MainImg = styled.img`
  width: 500px;
  height: 260px;
`;

const SiteName = styled.div`
  width: 400px;
  height: 30px;
  padding: 5px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 1px solid black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CampDesc = styled.div`
  width: 400px;
  padding: 10px;
  min-height: 240px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescText = styled.div<{ height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: ${({ height }) => height};
  border-bottom: 1px solid black;
  padding-bottom: 7px;
`;

const SiteDesc = styled.div`
  white-space: pre-wrap;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px;
  height: 80px;
  border-bottom: 1px solid black;
`;

const SiteInfo = styled.div`
  white-space: pre-wrap;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px;
  height: 77px;
  margin-bottom: 7px;
`;

export default CompReserveItem;
