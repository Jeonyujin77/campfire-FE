import styled from '@emotion/styled';
import { useEffect } from 'react';

const Timer = ({ minutes, seconds, setSeconds, setMinutes }) => {
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <TimerText>
      {minutes === 0 && seconds === 0 ? (
        <div>인증번호가 만료되었습니다</div>
      ) : (
        <>
          인증번호 만료시간 {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </>
      )}
    </TimerText>
  );
};

const TimerText = styled.div`
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  color: red;
  width: 95%;
`;

export default Timer;
