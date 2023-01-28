import { useCallback, useEffect, useState } from 'react';
//이미지
import likeOn from '../../asset/likeOn.png';
import likeOff from '../../asset/likeOff.png';
import { __getCampsByParams, __likeCampByParams } from '../../apis/campApi';
import { useAppDispatch } from '../../redux/store';

const CampLikeButton = ({ params }: { params: number }) => {
  const dispatch = useAppDispatch();
  const [like, setLike] = useState<boolean>(); // 좋아요

  //사이트 진입 시 params로 camp 좋아요 정보 가져오기
  useEffect(() => {
    dispatch(__getCampsByParams(params)).then(res => {
      const { payload, type }: any = res;
      if (type === 'getCampsByParams/fulfilled') {
        setLike(payload.camp.likeStatus);
      }
      // 에러처리
      else if (type === 'getCampsByParams/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, [params, dispatch]);

  //찜하기, 찜취소하기 버튼 onClick
  const likeCamp = useCallback(() => {
    dispatch(__likeCampByParams(params)).then(res => {
      const { type, payload }: any = res;
      if (type === 'likeCampByParams/fulfilled') {
        if (payload.message === '좋아요 성공!') {
          setLike(true);
        }
        if (payload.message === '좋아요 취소!') {
          setLike(false);
        }
      }
      // 에러처리
      else if (type === 'likeCampByParams/rejected') {
        alert(`${payload.response.data.errorMessage}`);
      }
    });
  }, [dispatch, params]);

  return (
    <div style={{ cursor: 'pointer' }} onClick={likeCamp}>
      {like ? (
        <img src={likeOn} width="40px" height="40px" alt="좋아요버튼" />
      ) : (
        <img src={likeOff} width="40px" height="40px" alt="좋아요버튼" />
      )}
    </div>
  );
};

export default CampLikeButton;
