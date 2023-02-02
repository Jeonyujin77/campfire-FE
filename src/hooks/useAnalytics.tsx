import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

const useAnalytics = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const analyticsKey = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY;
    // 로컬환경 작동방지
    if (analyticsKey) {
      if (!window.location.href.includes('localhost')) {
        ReactGA.initialize(analyticsKey);
      }
    }
    // state를 true로 만듦, 딱 한번만 실행됨
    setInitialized(true);
  }, []);

  return { initialized };
};
export default useAnalytics;
