import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
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
  console.log(params);
  return (
    <SiteWrap
      onClick={() => {
        navigate(`/camp/${params}/sitedesc/${site.siteId}`, {
          state: { dateState: dateObj, countState: countObj },
        });
      }}
    >
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
  );
};

const SiteWrap = styled.div`
  border: 1px solid black;
  width: 1140px;
  min-height: 150px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 4px 4px 4px #d3d3d3;
  border-radius: 15px;
  &:hover {
    box-shadow: 4px 4px 4px #afafaf;
  }
`;

const MainImg = styled.img`
  /* border: 1px solid green; */
  border-radius: 15px;
  width: 340px;
  height: 170px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 5px 10px 5px 15px;
  /* border: 1px solid green; */
  width: 800px;
  height: 150px;
`;

const TextTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;

const TextFoot = styled.div`
  display: flex;
  justify-content: space-between;
  width: 800px;
`;

const CountWrap = styled.div``;

const Price = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: orange;
  padding: 0px 10px;
`;

export default Sites;
