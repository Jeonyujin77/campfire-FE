import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrap>
      <Header />
      <div>{children}</div>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding-top: 40px;
`;

export default Layout;
