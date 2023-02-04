//라이브러리
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import ReactGa from 'react-ga';
//api
import { __deleteCampReview, __modifyCampReview } from '../../apis/campApi';
import { __getUser } from '../../apis/userApi';
//훅
import useInput from '../../hooks/useInput';
//인터페이스
import { CommentInfo } from '../../interfaces/Comment';
//컴포넌트
import Button from '../common/Button';

const Comment = ({ commentInfo }: { commentInfo: CommentInfo }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem('userId');
  const { content, userId, updatedAt, reviewId, campId, userName, profileImg } =
    commentInfo;
  const [isModify, setIsModify] = useState(false);
  const [comment, setComment, commentHandler] = useInput('');

  // 리뷰 수정
  const onModifyReview = (reviewId: number) => {
    ReactGa.event({
      category: '디테일페이지 버튼',
      action: '리뷰 수정',
    });
    if (comment === '') {
      alert('리뷰 입력후 수정해주세요.');
      return;
    }

    dispatch(__modifyCampReview({ campId, reviewId, content: comment })).then(
      res => {
        const { type, payload } = res;
        // 수정 성공
        if (type === 'modifyCampReview/fulfilled') {
          alert(`${payload.message}`);
          window.location.reload();
        }
        // 에러처리
        else if (type === 'modifyCampReview/rejected') {
          alert(`${payload.response.data.errorMessage}`);
          navigate(-1);
        }
      },
    );
  };

  // 리뷰 삭제
  const onDeleteReview = (reviewId: number) => {
    ReactGa.event({
      category: '디테일페이지 버튼',
      action: '리뷰 삭제',
    });
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(__deleteCampReview({ campId, reviewId })).then(res => {
        const { type, payload } = res;
        // 삭제 성공
        if (type === 'deleteCampReview/fulfilled') {
          alert(`${payload.message}`);
          window.location.reload();
        }
        // 에러처리
        else if (type === 'deleteCampReview/rejected') {
          alert(`${payload.response.data.errorMessage}`);
          navigate(-1);
        }
      });
    }
  };

  return (
    <>
      <CommentWrapper>
        <CommentBoxWrap>
          <CommentBox>
            {!isModify ? (
              <p>{content}</p>
            ) : (
              <textarea
                defaultValue={content}
                onChange={commentHandler}
                maxLength={500}
              />
            )}
          </CommentBox>
          <CommentBoxBottom>
            <Profile>
              <img src={profileImg} alt="프로필" />
              <p>{userName}</p>
            </Profile>
            <span>{updatedAt.split(' ').join(' / ')}</span>
          </CommentBoxBottom>
        </CommentBoxWrap>
        {content.length > 500 ? <button>더보기</button> : <></>}
        {Number(loggedInUserId) === userId ? (
          !isModify ? (
            <BtnWrap>
              <Button
                margin="0px"
                bgColor="#ffece0"
                onClick={() => setIsModify(true)}
              >
                수정
              </Button>
              <Button
                margin="0px"
                bgColor="#ffece0"
                onClick={() => onDeleteReview(reviewId)}
              >
                삭제
              </Button>
            </BtnWrap>
          ) : (
            <BtnWrap>
              <Button
                margin="0px"
                bgColor="#ffece0"
                onClick={() => onModifyReview(reviewId)}
              >
                저장
              </Button>
              <Button
                margin="0px"
                bgColor="#ffece0"
                onClick={() => setIsModify(false)}
              >
                취소
              </Button>
            </BtnWrap>
          )
        ) : (
          <></>
        )}
      </CommentWrapper>
    </>
  );
};

const CommentWrapper = styled.div`
  width: 100%;
  padding: 10px 0px 10px 0px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    margin-right: 10px;
  }
  p {
    line-height: 0;
    font-weight: bold;
  }

  @media (max-width: 1200px) {
    font-size: 12px;
    img {
      width: 25px;
      height: 25px;
    }
  }
`;

const CommentBoxWrap = styled.div`
  padding: 10px 10px;
  background-color: #f3f3f3;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const CommentBoxBottom = styled.div`
  padding: 0px 20px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentBox = styled.div`
  textarea {
    width: 100%;
    height: 150px;
    resize: none;
    border-radius: 5px;
  }
  p {
    white-space: pre-wrap;
    margin: 10px 0px;
  }

  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 1200px) {
    button {
      font-size: 12px;
    }
  }
`;

export default Comment;
