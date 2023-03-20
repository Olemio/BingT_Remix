import React, {useState, useEffect} from 'react'

export default function TimerClock({ intervalCount, parentCallBack }) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

  // Timer start and stop
  useEffect(() => {
    if (intervalCount === 1){
      setSeconds(0);
    }else if (intervalCount === 2) {
        setIsRunning(true);
    } else if (intervalCount === 3) {
        setIsRunning(false);  
    }
  }, [intervalCount]);

  // Timer milliseconds counter
  useEffect(() => {
      let interval;
      if (isRunning) {
        interval = setInterval(() => {
          setSeconds(seconds => +(seconds + 0.01).toFixed(2));
        }, 10);
      } else {
        clearInterval(interval);
      }

      // Passing value of sec on timer stop 
      if (intervalCount === 3) {
        parentCallBack(seconds);        
      }

      return () => clearInterval(interval);
    }, [isRunning]);
      
  return (
    <h1>{ seconds }</h1>
  )
}
