import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { categoryFromBounds } from '../../utils/CampsUtil';

const CategoryFromBounds = ({
  campLat,
  campLng,
  campName,
}: {
  campLat: string;
  campLng: string;
  campName: string;
}) => {
  const mapContainer = useRef(null); // 캠핑장 지도

  useEffect(() => {
    if (mapContainer !== null) {
      categoryFromBounds(campLat, campLng, campName);
    }
  }, [campLat, campLng, campName]);
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
      <ul id="category">
        <li id="BK9" data-order="0">
          <span className="category_bg bank"></span>
          은행
        </li>
        <li id="MT1" data-order="1">
          <span className="category_bg mart"></span>
          마트
        </li>
        <li id="PM9" data-order="2">
          <span className="category_bg pharmacy"></span>
          약국
        </li>
        <li id="OL7" data-order="3">
          <span className="category_bg oil"></span>
          주유소
        </li>
        <li id="CE7" data-order="4">
          <span className="category_bg cafe"></span>
          카페
        </li>
        <li id="CS2" data-order="5">
          <span className="category_bg store"></span>
          편의점
        </li>
      </ul>
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

  #category {
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 5px;
    border: 1px solid #909090;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
    background: #fff;
    overflow: hidden;
    z-index: 2;
    li {
      float: left;
      list-style: none;
      width: 50px;
      border-right: 1px solid #acacac;
      padding: 6px 0;
      text-align: center;
      cursor: pointer;
    }
    li.on {
      background: #eee;
    }
    li:hover {
      background: #ffe6e6;
      border-left: 1px solid #acacac;
      margin-left: -1px;
    }
    li:last-child {
      margin-right: 0;
      border-right: 0;
    }
    li span {
      display: block;
      margin: 0 auto 3px;
      width: 27px;
      height: 28px;
    }
    li .category_bg {
      background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
        no-repeat;
    }
    li .bank {
      background-position: -10px 0;
    }
    li .mart {
      background-position: -10px -36px;
    }
    li .pharmacy {
      background-position: -10px -72px;
    }
    li .oil {
      background-position: -10px -108px;
    }
    li .cafe {
      background-position: -10px -144px;
    }
    li .store {
      background-position: -10px -180px;
    }
    li.on .category_bg {
      background-position-x: -46px;
    }
  }
  .placeinfo_wrap {
    position: absolute;
    bottom: 28px;
    left: -150px;
    width: 300px;
  }
  .placeinfo {
    position: relative;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    background: #fff;
  }
  .placeinfo:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }
  .placeinfo_wrap .after {
    content: '';
    position: relative;
    margin-left: -12px;
    left: 50%;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
  }
  .placeinfo a,
  .placeinfo a:hover,
  .placeinfo a:active {
    color: #fff;
    text-decoration: none;
  }
  .placeinfo a,
  .placeinfo span {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .placeinfo span {
    margin: 5px 5px 0 5px;
    cursor: default;
    font-size: 13px;
  }
  .placeinfo .title {
    font-weight: bold;
    font-size: 14px;
    border-radius: 6px 6px 0 0;
    margin: -1px -1px 0 -1px;
    padding: 10px;
    color: #fff;
    background: #d95050;
    background: #d95050
      url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
      no-repeat right 14px center;
  }
  .placeinfo .tel {
    color: #0f7833;
  }
  .placeinfo .jibun {
    color: #999;
    font-size: 11px;
    margin-top: 0;
  }
`;
export default CategoryFromBounds;
