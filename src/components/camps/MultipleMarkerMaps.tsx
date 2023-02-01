import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { CampType } from '../../interfaces/camp';
import { multipleMarkerImage } from '../../utils/CampsUtil';

const MultipleMarkerMaps = ({ campList }: { campList: CampType[] }) => {
  const mapContainer = useRef(null); // 캠핑장 지도

  useEffect(() => {
    if (mapContainer !== null) {
      multipleMarkerImage(campList);
    }
  }, [campList]);

  return (
    <MapWrap>
      <div
        ref={mapContainer}
        id="map"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      ></div>
    </MapWrap>
  );
};

const MapWrap = styled.div`
  margin: 0;
  padding: 0;
  font-size: 12px;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default MultipleMarkerMaps;
