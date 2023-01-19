//라이브러리
import styled from '@emotion/styled';
//인터페이스
import { cancreser } from '../../interfaces/Users';

const CancReserveItem = ({ book }: { book: cancreser }) => {
  return (
    <div>
      <ReserveWrap key={book.bookId}>
        <Cover />
        <div>
          <MainImg src={book.siteMainImage} alt="캠핑장 메인 이미지" />
        </div>
        <CampDesc>
          <SiteName>{book.siteName}</SiteName>
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
    </div>
  );
};

const Cover = styled.div`
  z-index: 2500;
  background-color: red;
  position: absolute;
  width: 1014px;
  height: 5px;
  top: 147px;
  left: -23px;
  transform: rotate(-17deg);
`;

const ReserveWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  width: 950px;
  height: 280px;
  border: 1px solid black;
  position: relative;
`;

const MainImg = styled.img`
  display: block;
  width: 500px;
  height: 260px;
`;

const SiteName = styled.div`
  width: 400px;
  height: 30px;
  padding: 5px 10px 10px 10px;
  display: block;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
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

export default CancReserveItem;
