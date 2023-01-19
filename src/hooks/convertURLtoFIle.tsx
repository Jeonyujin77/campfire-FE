import { useCallback } from 'react';

//현재 미사용 훅, 추후 사용여부 결정되면 사용/삭제 할 것
export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop(); // url 구조에 맞게 수정할 것
  const filename = url.split('/').pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};
