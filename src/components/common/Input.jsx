//라이브러리
import styled from '@emotion/styled';

const Input = ({ width, height = '26px', ...props }) => {
  return <StInput width={width} height={height} {...props} />;
};

const StInput = styled.input`
  width: ${props => props.width};
  height: ${props => props.height};
  border: ${props => (props.border ? props.border : '1px solid #dadada')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '4px')};
  padding: 3px 0 3px 8px;
  min-width: 150px;
  font-size: ${props => (props.fontSize ? props.fontSize : '12px')};
  background-color: ${props => props.bgColor};
  ::placeholder {
    font-size: 20px;
  }
  :focus {
    outline: ${props => props.outline};
  }
  @media (max-width: 1200px) {
    width: 80%;
    height: 70%;
    font-size: 16px;
    ::placeholder {
      font-size: 16px;
    }
  }
`;

export default Input;
