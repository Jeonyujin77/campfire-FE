//라이브러리
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import ReactGa from 'react-ga';
//api
import { __getCampReviews } from '../../apis/campApi';
//인터페이스
import { CommentInfo } from '../../interfaces/Comment';
//컴포넌트
import Comment from './comment';
import InsertComment from './InsertComment';
import { __getUser } from '../../apis/userApi';

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
  const loggedInUserId = Number(localStorage.getItem('userId'));
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [loggedInUserImg, setLoggedInUserImg] = useState('');

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
        if (reviews.length < 5) {
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
    ReactGa.event({
      category: '디테일페이지 버튼',
      action: '리뷰 더보기',
    });
    setIsClicked(true);
    setPrevPage(prev);
    setCmtPage(next);
    getCampReviews(next);
  };

  //유저정보 가져오기
  useEffect(() => {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken') &&
      localStorage.getItem('userId')
    ) {
      dispatch(__getUser()).then(res => {
        const { type, payload } = res;
        if (type === 'getUser/fulfilled') {
          const {
            userName,
            profileImg,
          }: {
            userName: string;
            profileImg: string;
          } = payload.user;
          setLoggedInUserName(userName);
          setLoggedInUserImg(profileImg);
        }
        // 에러처리
        else if (type === 'getUser/rejected') {
          alert(`${payload.response.data.errorMessage}`);
        }
      });
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <List isCmtOpen={props.isCmtOpen}>
      <CommentTitle>
        <CommentTitleDiv>
          <Profile>
            <img src={loggedInUserImg} alt="프로필" />
            <p>{loggedInUserName}</p>
          </Profile>
          <p>리뷰</p>
        </CommentTitleDiv>
      </CommentTitle>
      <InsertComment campId={campId} />
      {comments.length !== 0 ? (
        comments.map(comment => (
          <Comment
            key={`${comment.reviewId}${Date.now()}`}
            commentInfo={comment}
          />
        ))
      ) : (
        <></>
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
  background-color: #fe802c;
  height: 58px;
  border-radius: 29px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* text-align: left; */
  font-size: 22px;
  font-weight: bold;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
`;

const CommentTitleDiv = styled.div`
  margin: 5px;
  max-width: 100%;
  min-width: calc(50% + 12.5px);
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 25px;
  p {
    margin: 0px;
  }
`;

const Profile = styled.div`
  background-color: white;
  padding: 0px 10px;
  max-width: 100%;
  min-width: 127px;
  height: 52px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 15px;
  color: black;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    margin-right: 10px;
  }
  p {
    line-height: 0;
    font-weight: bold;
    max-width: 100%;
  }

  @media (max-width: 1200px) {
    margin-right: 5px;
    font-size: 12px;
    img {
      width: 25px;
      height: 25px;
    }
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
  margin-bottom: 10px;
  &:hover {
    background-color: #e8d2c4;
  }

  @media (max-width: 1200px) {
    width: 100%;
    font-size: 12px;
  }
`;

export default CommentList;
