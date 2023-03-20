import React, { useState, useEffect } from 'react'
import TimeTable from './child_components/TimeTable'
import Record_Table from './child_components/RecordTable'

export default function Statistics({ timeArray }) {
    // Calculating average of given array
    const calculateAverage = (array) => {

        let arraySum = 0 // Sum off array after 5% removed
        let fivePrecent = array.length * 0.05
    
        // Error message
        if (array.length < 3) { 
            return "-"
        } else if (array.length === 3) { // Median of 3
            for (let i = 0; array.length > i; i++) {
                arraySum += array[i]
            }
            return (arraySum / array.length).toFixed(2);
        }  
    
        array.sort()
    
        // Removes 5% highest and lowest values
        for (let i = 0; fivePrecent > i; i++) {
            array = array.slice(1, -1);
        }
    
        // Adding numbers in "array" to "arraySum"
        for (let i = 0; array.length > i; i++) {
            arraySum += array[i]
        }
    
        return (arraySum / array.length).toFixed(2);
    }

    // Calculate avg of given number of last times in "timeArray" 
    const averageOfXLastTimes = (x) => {
        let xtimes = [];

        if (timeArray.length < x) {
            return "-"
        }

        for (let i = 1; i <= x; i++) {
            xtimes.push(timeArray[timeArray.length -i])
        }

        return calculateAverage(xtimes)
    }


  return (
    <>
    {/* Displays your best and current time, median of 3, and averages */}
    <Record_Table timeArray={timeArray} averageOfXLastTimes={averageOfXLastTimes} calculateAverage={calculateAverage} />
    <br></br>
    {/* A table displaying all your previous times with their "index" and averages */}
    <TimeTable timeArray={timeArray} calculateAverage={calculateAverage} />
    </>
  )
}



