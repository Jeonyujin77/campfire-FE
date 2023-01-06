import Comment from './comment';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface CommentProps {
  isCmtOpen: boolean;
  setIsCmtOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentList = (props: CommentProps) => {
  const dispatch = useDispatch();

  const [cmtPage, setCmtPage] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // dispatch(__getComments)
  }, [cmtPage]);
  return (
    <List isCmtOpen={props.isCmtOpen}>
      <CommentTitle>리뷰</CommentTitle>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <MoreComment
        onClick={() => {
          setCmtPage(cmtPage + 1);
        }}
      >
        리뷰 더보기
      </MoreComment>
    </List>
  );
};

const List = styled.div<{ isCmtOpen: boolean }>`
  display: ${({ isCmtOpen }) => (isCmtOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CommentTitle = styled.div`
  width: 100%;
  text-align: left;
`;

const MoreComment = styled.div`
  background-color: #e0dddd;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1150px;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #cccbcb;
  }
`;

export default CommentList;
