import React, { useState, useEffect } from 'react'

// Single row in RecordTable
const Row = ({ avg, current, best }) => {
    return(
        <>
        <tr>
            <th>{ avg }</th>
            <td>{ current }</td>
            <td>{ best }</td>
        </tr>
        </>
    )
}

// Entire RecordTable
const Table = (props) => {
    const { data } = props
    return(
        <>
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>Current</th>
                    <th>Best</th>
                </tr>
                { data.map(row => 
                    <Row key = {row.key} avg = {row.avg} current = {row.current} best = {row.best} />
                ) }
            </tbody>
        </table>
        </>
    )
}

export default function Record_Table({ timeArray, averageOfXLastTimes, calculateAverage }) {

    // Finds the lowest average of x consecutive times from a array
    function findLowestAverage(numbers, x) {
        let lowestAvg = 9999999;
        for (let i = 0; i <= numbers.length - x; i++) {
            let xArray = [];
            
            for (let j = i; j < i + x; j++) {
                xArray.push(numbers[j]);
            }

            let currentAvg = calculateAverage(xArray);
      
            if (currentAvg < lowestAvg) {
                lowestAvg = currentAvg;
            }
        }
        return lowestAvg;
    }
      
    const recordTable = [
    {
        key: 0,
        avg: "Time",
        current:  "-",
        best: "-"
    }];
    const [rows, setRows] = useState([]);

    // Displaying diffrent averages based on timeArray.length
    const createRecordTable = () => {
       if (timeArray.length > 0){
            recordTable[0] = {
                key: 1,
                avg: "Time",
                current:  timeArray[timeArray.length -1],
                best: Math.min(...timeArray)
            }
        }
        if (timeArray.length >= 3) {
            recordTable.push({
                key: 3,
                avg: "Mo3",
                current: averageOfXLastTimes(3),
                best: findLowestAverage(timeArray, 3)
            })
        }
        if (timeArray.length >= 5) {
            recordTable.push({
                key: 5,
                avg: "Ao5",
                current: averageOfXLastTimes(5),
                best: findLowestAverage(timeArray, 5)
            })
        }
        if (timeArray.length >= 12) {
            recordTable.push({
                key: 12,
                avg: "Ao12",
                current: averageOfXLastTimes(12),
                best: findLowestAverage(timeArray, 12)
            })
        }
        if (timeArray.length >= 100) {
            recordTable.push({
                key: 100,
                avg: "Ao100",
                current: averageOfXLastTimes(100),
                best: findLowestAverage(timeArray, 100)
            })
        }
        setRows(recordTable);
    }

    // Updating when timeArray changes
    useEffect(() => {
        createRecordTable();
    }, [timeArray]);

    return (
        <>
        <Table timeArray={timeArray} data={rows}/>
        </>
    )
}
