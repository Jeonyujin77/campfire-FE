//라이브러리
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
//api
import { __getCampReviews } from '../../apis/campApi';
//인터페이스
import { CommentInfo } from '../../interfaces/Comment';
//컴포넌트
import Comment from './comment';
import InsertComment from './InsertComment';

interface CommentProps {
  isCmtOpen: boolean;
  setIsCmtOpen: React.Dispatch<React.SetStateAction<boolean>>;
  campId: number;
}

const CommentList = (props: CommentProps) => {
  const dispatch = useAppDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [prevPage, setPrevPage] = useState(1);
  const [cmtPage, setCmtPage] = useState(1);
  const [moreCnt, setMoreCnt] = useState(true);
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const { campId } = props;

  useEffect(() => {
    getCampReviews(cmtPage);
  }, [cmtPage]);

  const getCampReviews = (page: number) => {
    dispatch(__getCampReviews({ campId, pageno: page })).then(res => {
      const { type, payload } = res;

      // 조회 성공
      if (type === 'getCampReviews/fulfilled') {
        const reviews = payload.reviews;

        // 첫 조회
        if (reviews.length !== 0 && cmtPage === 1) {
          setComments([...payload.reviews]);
        }
        // 조회결과가 있고 이전페이지와 현페이지가 다를때 그리고 사용자가 더보기를 클릭한 경우에만
        // 페이지 리렌더링 시 데이터가 중복되는 버그가 발생하여 isClicked로 클릭유무를 판단하여 클릭한 경우에만 아래 데이터를 출력함
        else if (reviews.length !== 0 && prevPage !== cmtPage && isClicked) {
          setComments([...comments, ...payload.reviews]);
          setIsClicked(false);
        }
        // 조회 결과가 없는 경우 더보기버튼 숨김
        else {
          setMoreCnt(false);
        }
      }
      // 에러처리
      else if (type === 'getCampReviews/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  // 리뷰 더보기 클릭 시
  const getCommentsByPageno = (prev: number, next: number) => {
    setIsClicked(true);
    setPrevPage(prev);
    setCmtPage(next);
    getCampReviews(next);
  };

  return (
    <List isCmtOpen={props.isCmtOpen}>
      <CommentTitle>리뷰</CommentTitle>
      <InsertComment campId={campId} />
      {comments.length !== 0 ? (
        comments.map(comment => (
          <Comment
            key={`${comment.reviewId}${Date.now()}`}
            commentInfo={comment}
          />
        ))
      ) : (
        <>작성된 리뷰가 없습니다. 리뷰를 등록해보세요.</>
      )}
      {moreCnt ? (
        <MoreComment onClick={() => getCommentsByPageno(cmtPage, cmtPage + 1)}>
          리뷰 더보기
        </MoreComment>
      ) : (
        <></>
      )}
    </List>
  );
};

const List = styled.div<{ isCmtOpen: boolean }>`
  display: ${({ isCmtOpen }) => (isCmtOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const CommentTitle = styled.div`
  margin: 50px 0px 10px 0px;
  width: 100%;
  text-align: left;
  font-size: 22px;
  font-weight: bold;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
`;

const MoreComment = styled.div`
  background-color: #ffece0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1150px;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #e8d2c4;
  }

  @media (max-width: 1200px) {
    width: 100%;
    font-size: 12px;
  }
`;

export default CommentList;
