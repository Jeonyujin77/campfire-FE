import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { __deleteCampReview, __modifyCampReview } from '../../apis/campApi';
import { __getUser } from '../../apis/userApi';
import useInput from '../../hooks/useInput';
import { CommentInfo } from '../../interfaces/Comment';
import { useAppDispatch } from '../../redux/store';

const Comment = ({ commentInfo }: { commentInfo: CommentInfo }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem('userId');
  const { content, userId, updatedAt, reviewId, campId } = commentInfo;
  const [userName, setUserName] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [isModify, setIsModify] = useState(false);
  const [comment, setComment, commentHandler] = useInput('');

  useEffect(() => {
    dispatch(__getUser(userId)).then(res => {
      const { type, payload } = res;
      // 조회 성공
      if (type === 'getUser/fulfilled') {
        const { userName, profileImg } = payload.user;
        setUserName(userName);
        setProfileImg(profileImg);
      }
      // 에러처리
      else if (type === 'getUser/rejected') {
        alert(`${payload.response.data.errorMessage}`);
        navigate(-1);
      }
    });
  }, []);

  // 리뷰 수정
  const onModifyReview = (reviewId: number) => {
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
        <Profile>
          <img src={profileImg} alt="프로필" />
          <p>{userName}</p>
        </Profile>
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

          <span>{updatedAt}</span>
        </CommentBox>
        {content.length > 500 ? <button>더보기</button> : <></>}
        {Number(loggedInUserId) === userId ? (
          !isModify ? (
            <>
              <button onClick={() => setIsModify(true)}>수정</button>
              <button onClick={() => onDeleteReview(reviewId)}>삭제</button>
            </>
          ) : (
            <>
              <button onClick={() => onModifyReview(reviewId)}>저장</button>
              <button onClick={() => setIsModify(false)}>취소</button>
            </>
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
`;

const CommentBox = styled.div`
  textarea {
    width: 100%;
    height: 150px;
    resize: none;
  }
  p {
    white-space: pre-wrap;
  }
`;

export default Comment;
