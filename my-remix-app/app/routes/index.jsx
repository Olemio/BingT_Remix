import React, { useState, useEffect } from 'react';
import GenerateScramble from '../components/ScrambleGenerator';
import TimerClock from '../components/TimerClock';
import Statistics from '../components/Statistics';

export default function Index() {
  const [spacebarIntervalCount, setSpacebarIntervalCount] = useState(1);
  const [intervalCount, setIntervalCount] = useState(0);
  const [timeArray, setTimeArray] = useState([]);

  // Insert timer value to timeArray
  const callBackFunction = (sec) => {
    setTimeArray([...timeArray, sec]);
  };

  // Spacebar interval
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== "Space") return;
      if (spacebarIntervalCount === 1){
        setIntervalCount(1);

        setSpacebarIntervalCount(2);
      } else if (spacebarIntervalCount === 3){
        setIntervalCount(3);

        setSpacebarIntervalCount(4);
      }
    };
    const handleKeyUp = (event) => {
      if (event.code !== "Space") return;
      if (spacebarIntervalCount === 2){
        setIntervalCount(2);

        setSpacebarIntervalCount(3);
      } else if (spacebarIntervalCount === 4){
        setIntervalCount(4);

        setSpacebarIntervalCount(1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [spacebarIntervalCount]);

  return (
    <>
       <a href="/hello">hello</a>
      <GenerateScramble intervalCount={intervalCount}/>
      
      <TimerClock parentCallBack={callBackFunction} intervalCount={intervalCount}/>

      <Statistics timeArray={timeArray}/>
    </>
    
  );
}
