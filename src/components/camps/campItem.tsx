import { useNavigate } from 'react-router-dom';
import { CampType } from './campItemList';
import starImg from '../../asset/starImg.png';
import styled from '@emotion/styled';

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

  const campMinAddress = camp.campAddress.split(' ');

  return (
    <ItemWrap
      onClick={() => {
        navigate(`/camp/${camp.campId}`);
      }}
    >
      {/* <button
        onClick={() => {
          console.log(camp);
        }}
      ></button> */}
      <CampImg src={camp.campMainImage} alt="캠프장 메인사진" />
      <CampDescWrap>
        <CampHeadDesc>{camp.campName}</CampHeadDesc>
        <CampDescBody>
          <CampDescLeft>
            <CampDescL>
              {camp.typeLists ? camp.typeLists.join(', ') : '캠핑장'}
            </CampDescL>
            <CampDescL>
              {campMinAddress[0]} {campMinAddress[1]}
            </CampDescL>
          </CampDescLeft>
          <CampDescRight>
            <CampDescR>
              <img
                style={{ width: '22px', height: '22px' }}
                src={starImg}
                alt="별점이미지"
              />
              <StarRate>4.5</StarRate>
              <div>99+</div>
            </CampDescR>
            <CampPrice>{camp.campPrice}~</CampPrice>
          </CampDescRight>
        </CampDescBody>
      </CampDescWrap>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  width: 285px;
  height: 292px;
  /* border-bottom: 1px solid blue; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  cursor: pointer;
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
  word-break: break-all;
  word-wrap: break-word;
  font-size: 20px;
  font-weight: bold;
  margin: 13px 13px 18px 13px;
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
`;

const CampDescRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 13px;
  align-items: center;
`;

const CampDescL = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  width: 177px;
  font-size: 16px;
  display: flex;
  /* border: 1px solid gray; */
`;

const CampDescR = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  display: flex;
  width: 82px;
  /* height: 24px; */
  font-size: 16px;
  /* border: 1px solid gray; */
  gap: 3px;
`;

const StarRate = styled.div`
  font-weight: bold;
`;

const CampPrice = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  display: flex;
  width: 82px;
  font-size: 18px;
  gap: 3px;
  color: rgb(255, 92, 0);
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default CampItem;
