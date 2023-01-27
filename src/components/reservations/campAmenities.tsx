//라이브러리
import styled from '@emotion/styled';
import { ReactNode } from 'react';

//이미지
import barbecueIcon from '../../asset/amenities/barbecueIcon.png';
import cafeIcon from '../../asset/amenities/cafeIcon.png';
import electricIcon from '../../asset/amenities/electricIcon.png';
import hotwaterAvailableIcon from '../../asset/amenities/hotwaterAvailableIcon.png';
import internetIcon from '../../asset/amenities/internetIcon.png';
import parkinglotIcon from '../../asset/amenities/parkinglotIcon.png';
import showerroomIcon from '../../asset/amenities/showerroomIcon.png';
import sinkIcon from '../../asset/amenities/showerroomIcon.png';
import storeIcon from '../../asset/amenities/storeIcon.png';
import toiletIcon from '../../asset/amenities/toiletIcon.png';
// import boardgameIcon from '../../asset/amenities/boardgameIcon.png';
// import swimmingpoolIcon from '../../asset/amenities/swimmingpoolIcon.png';

interface AmenityProps {
  children?: ReactNode;
  amenity: string;
}

const CampAmenities = ({ children, amenity }: AmenityProps) => {
  let srcs = new Map([
    ['전기', electricIcon],
    ['인터넷', internetIcon],
    ['화장실', toiletIcon],
    ['샤워실', showerroomIcon],
    ['온수사용', hotwaterAvailableIcon],
    ['개수대', sinkIcon],
    ['매점', storeIcon],
    ['화로/바베큐', barbecueIcon],
    ['공용주차장', parkinglotIcon],
    ['까페', cafeIcon],
  ]);
  return (
    <Amenity>
      <Icon src={srcs.get(amenity)} alt="" />
      {amenity}
    </Amenity>
  );
};

const Amenity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* background-color: #f1efef; */
  border-radius: 10px;
  padding: 0px 10px;
  font-size: 12px;
  gap: 5px;
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

export default CampAmenities;
