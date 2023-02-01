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
import swimmingpoolIcon from '../../asset/amenities/swimmingpoolIcon.png';
import firewoodIcon from '../../asset/amenities/firewoodIcon.png';
import excerciseIcon from '../../asset/amenities/exerciseIcon.png';
import trampolineIcon from '../../asset/amenities/trampolineIcon.png';
import trailIcon from '../../asset/amenities/trailIcon.png';
import playgroundIcon from '../../asset/amenities/playgroundIcon.png';
import playfieldIcon from '../../asset/amenities/playfieldIcon.png';

interface AmenityProps {
  children?: ReactNode;
  amenity: string;
}

const CampAmenities = ({ children, amenity }: AmenityProps) => {
  let srcs = new Map([
    //캠핑톡 캠핑장 아이콘
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
    //공공api 캠핑장 아이콘
    ['무선인터넷', internetIcon],
    ['장작판매', firewoodIcon],
    ['온수', hotwaterAvailableIcon],
    ['트렘폴린', trampolineIcon],
    ['물놀이장', swimmingpoolIcon],
    ['놀이터', playgroundIcon],
    ['산책로', trailIcon],
    ['운동시설', excerciseIcon],
    ['마트.편의점', storeIcon],
    ['운동장', playfieldIcon],
  ]);
  return (
    <Amenity>
      {srcs.get(amenity) ? <Icon src={srcs.get(amenity)} alt="" /> : <></>}
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
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
  font-size: 12px;
  gap: 5px;
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

export default CampAmenities;
