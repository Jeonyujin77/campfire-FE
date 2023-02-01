//라이브러리
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
//이미지
import upArrow from '../../asset/upArrow.png';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  //스크롤위치에따라 버튼이 생기고 사라지도록
  useEffect(() => {
    const ShowButtonClick = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', ShowButtonClick);
    return () => {
      window.removeEventListener('scroll', ShowButtonClick);
    };
  }, []);

  return (
    <>
      {showButton && (
        <ShowBtnWrap onClick={scrollToTop}>
          <Arrow src={upArrow} />
        </ShowBtnWrap>
      )}
    </>
  );
};

const ShowBtnWrap = styled.div`
  position: fixed;
  right: 25px;
  bottom: 100px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: rgb(254, 128, 44);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 500;

  @media (max-width: 1200px) {
    width: 25px;
    height: 25px;
    right: 3%;
    bottom: 100px;
  }
`;

const Arrow = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  @media (max-width: 1200px) {
    width: 25px;
    height: 25px;
  }
`;

export default TopButton;
