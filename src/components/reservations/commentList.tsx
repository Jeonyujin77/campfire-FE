import Comment from './comment';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import InsertComment from './InsertComment';
import { __getCampReviews } from '../../apis/campApi';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { CommentInfo } from '../../interfaces/Comment';

interface CommentProps {
  isCmtOpen: boolean;
  setIsCmtOpen: React.Dispatch<React.SetStateAction<boolean>>;
  campId: number
}

const CommentList = (props: CommentProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [cmtPage, setCmtPage] = useState(1);
  const [moreCnt, setMoreCnt] = useState(true);
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const { campId } = props;

  useEffect(() => {
    dispatch(__getCampReviews({ campId, pageno: cmtPage })).then((res) => {
      const { type, payload } = res;

      // 조회 성공
      if (type === "getCampReviews/fulfilled") {
        const reviews = payload.reviews;
        // 결과가 존재할 경우에만 저장한다
        if (reviews.length !== 0) {
          setComments([...comments, ...payload.reviews])
        } else {
          setMoreCnt(false);
        }

      }
      // 에러처리
      else if (type === "getCampReviews/rejected") {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, [cmtPage]);

  const getCommentsByPageno = () => {
    setCmtPage(cmtPage + 1);
  }


  return (
    <List isCmtOpen={props.isCmtOpen}>
      <CommentTitle>리뷰</CommentTitle>
      <InsertComment campId={campId} />
      {comments.length !== 0 ? comments.map((comment) => <Comment key={comment.reviewId} commentInfo={comment} />) : <>작성된 리뷰가 없습니다.</>}
      {moreCnt ? <MoreComment
        onClick={getCommentsByPageno}
      >
        리뷰 더보기
      </MoreComment> : <></>}

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
