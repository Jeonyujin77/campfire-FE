import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: ReactNode;
  width?: string;
  height?: string;
  bgColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  onClick?: any;
  display?: any;
}

const Button = ({
  children,
  width,
  height,
  bgColor,
  borderRadius,
  fontSize,
  onClick,
  fontWeight,
  display,
}: ButtonProps) => {
  return (
    <Btn
      width={width}
      height={height}
      bgColor={bgColor}
      borderRadius={borderRadius}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onClick={() => onClick()}
      display={display}
    >
      {children}
    </Btn>
  );
};

const Btn = styled.button<ButtonProps>`
  margin: 10px;
  border: none;
  cursor: pointer;
  user-select: none;
  width: ${({ width }) => (width ? width : '100px')};
  height: ${({ height }) => (height ? height : '30px')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '10px'};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : 'lightgray')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '15px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  display: ${({ display }) => (display ? display : 'inline-block')};
  &:hover {
    filter: brightness(95%);
  }
`;

export default Button;
