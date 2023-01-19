//라이브러리
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface AmenityProps {
  children: ReactNode;
}

const CampAmenities = ({ children }: AmenityProps) => {
  return <Amenity>{children}</Amenity>;
};

const Amenity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f1efef;
  border-radius: 10px;
  padding: 0px 10px;
  max-width: 100%;
  min-width: 60px;
  height: 30px;
`;

export default CampAmenities;
