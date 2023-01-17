import styled from "@emotion/styled";

const Input = ({ width, height = "26px", ...props }) => {
  return <StInput width={width} height={height} {...props} />;
};

const StInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid #dadada;
  border-radius: 4px;
  padding: 3px 0 3px 8px;
  min-width: 150px;
`;

export default Input;
