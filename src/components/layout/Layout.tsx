//라이브러리
import styled from '@emotion/styled';
import { ReactNode } from 'react';
//컴포넌트
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrap>
      <Header />
      <div>{children}</div>
      <Footer />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding-top: 40px;
  padding-bottom: 50px;
`;

export default Layout;
