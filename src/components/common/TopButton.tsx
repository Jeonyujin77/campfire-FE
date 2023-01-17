import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import upArrow from '../../asset/upArrow.png';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

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
  right: 50px;
  bottom: 100px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: rgb(254, 128, 44);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Arrow = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export default TopButton;
