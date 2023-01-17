import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterMenu>
        <Menu>
          <Link to="/">홈</Link>
        </Menu>
        <Menu>
          <Link to="/search">검색</Link>
        </Menu>
        <Menu>
          <Link to="/mypage">마이페이지</Link>
        </Menu>
      </FooterMenu>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  background-color: whitesmoke;
`;

const FooterMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Menu = styled.div`
  min-width: 100px;
  text-align: center;
  margin: 0 5px;

  &:hover {
    color: rgb(254, 128, 44);
  }

  a {
    width: 100%;
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
`;

export default Footer;
