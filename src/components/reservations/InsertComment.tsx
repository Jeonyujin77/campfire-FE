import styled from '@emotion/styled';
import { __writeCampReview } from '../../apis/campApi';
import useInput from '../../hooks/useInput';
import { useAppDispatch } from '../../redux/store';

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
          <button>등록</button>
        </WriteCommentForm>
      )}
    </>
  );
};

const WriteCommentForm = styled.form`
  width: 100%;
  textarea {
    width: 100%;
    height: 150px;
    resize: none;
  }
`;

export default InsertComment;
