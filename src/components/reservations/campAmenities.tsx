import { ReactNode } from 'react';
import styled from 'styled-components';

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
  width: 100px;
  height: 30px;
`;

export default CampAmenities;
