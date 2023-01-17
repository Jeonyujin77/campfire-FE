import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import likeOn from '../../asset/likeOn.png';
import Liked from './Liked';
import { CampType } from '../../interfaces/camp';

const CampItem = ({ camp }: { camp: CampType }) => {
  const navigate = useNavigate();

  // campAddress: string;
  // campAmenities: any;
  // campDesc: string;
  // campId: number;
  // campMainImage: string;
  // campName: string;
  // campPrice: number;
  // campSubImages: any;
  // checkIn: any;
  // checkOut: any;
  // cretedAt: any;
  // hostId: number;
  // updatedAt: any;
  // campTypeLists: [string];
  // likes: number;

  const campMinAddress = camp.campAddress.split(' ');

  const countR = () => {
    if (camp.countReviews >= 100) {
      return '📃 99+';
    } else {
      return `📃 ${camp.countReviews}`;
    }
  };

  return (
    <>
      <ItemWrap>
        <Liked campId={camp.campId} likeStatus={camp.likeStatus} />
        {/* <button
          onClick={() => {
            console.log(camp);
          }}
        ></button> */}
        <div
          style={{ position: 'relative' }}
          onClick={() => {
            navigate(`/camp/${camp.campId}`);
          }}
        >
          <CampImg src={camp.campMainImage} alt="캠프장 메인사진" />
        </div>
        {/* </CampImg> */}
        <CampDescWrap
          onClick={() => {
            navigate(`/camp/${camp.campId}`);
          }}
        >
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
                <StarRate>{countR()}</StarRate>
              </CampDescR>
            </CampDescRight>
          </CampDescBody>
        </CampDescWrap>
      </ItemWrap>
    </>
  );
};

const ItemWrap = styled.div`
  position: relative;
  width: 285px;
  height: 292px;
  /* border-bottom: 1px solid blue; */
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

const CampImg = styled.img`
  /* border: 1px solid green; */
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
  /* border: 1px solid gray; */
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
  /* gap: 10px; */
  align-items: center;
`;

const CampDescLAddress = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  width: 177px;
  font-size: 16px;
  display: flex;
  color: #888888;
  /* border: 1px solid gray; */
`;

const CampDescL = styled.div`
  width: 160px;
  height: 22px;
  margin-right: 17px;
  font-size: 16px;
  font-weight: bold;
  /* border: 1px solid black; */
  /* display: flex; */
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
  /* height: 24px; */
  font-size: 16px;
  /* border: 1px solid gray; */
  gap: 10px;
`;

const StarRate = styled.div`
  font-weight: bold;
`;

export default CampItem;
