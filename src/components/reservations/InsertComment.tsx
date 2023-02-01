//라이브러리
import styled from '@emotion/styled';
import { useAppDispatch } from '../../redux/store';
//api
import { __writeCampReview } from '../../apis/campApi';
//커스텀훅
import useInput from '../../hooks/useInput';
//컴포넌트
import Button from '../common/Button';

const InsertComment = ({ campId }: { campId: number }) => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const [comment, setComment, commentHandler] = useInput('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment === '') {
      alert('리뷰 작성 후 등록해주세요.');
      return;
    }

    dispatch(__writeCampReview({ campId, content: comment })).then(res => {
      const { type, payload } = res;

      // 등록 성공
      if (type === 'writeCampReview/fulfilled') {
        alert(`${payload.message}`);
        setComment('');
        window.location.reload();
      }
      // 에러처리
      else if (type === 'writeCampReview/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  };

  return (
    <>
      {/* 로그인한 사람만 댓글등록이 가능함 */}
      {!accessToken || !refreshToken ? (
        <></>
      ) : (
        <WriteCommentForm onSubmit={onSubmit}>
          <textarea value={comment} onChange={commentHandler} maxLength={500} />
          <div>
            <Button bgColor="#A1C182" color="white">
              등록하기
            </Button>
          </div>
        </WriteCommentForm>
      )}
    </>
  );
};

const WriteCommentForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #fe802c;
  margin-bottom: 10px;
  border-radius: 20px;
  textarea {
    margin: 10px 10px 0px 10px;
    width: 98%;
    height: 150px;
    resize: none;
    border-radius: 5px;
    border: none;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  @media (max-width: 1200px) {
    textarea,
    button {
      font-size: 12px;
    }
  }
`;

export default InsertComment;
