import { ReactNode } from 'react';
import styled from '@emotion/styled';
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
`;

export default Layout;
