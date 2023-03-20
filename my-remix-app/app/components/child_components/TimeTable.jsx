import React, {useState, useEffect} from "react"

// A row single row printed out to TimeTable
const Row = ({ index, time, avg5, avg12 }) => {
    return(
        <>
        <tr>
            <td>{ index }</td>
            <td>{ time }</td>
            <td>{ avg5 }</td>
            <td>{ avg12 }</td>
        </tr>
        </>
    )
}

// The entire TimeTable
const Table = (props) => {
    const { data } = props
    return(
        <>
        <table>
            <tbody>
                <tr>
                    <th>Solve</th>
                    <th>Time</th>
                    <th>Avg5</th>
                    <th>Avg12</th>
                </tr>
                { data.map(row => 
                    <Row key =  {row.index}
                    index = {row.index}
                    time = {row.time}
                    avg5 = {row.avg5}
                    avg12 = {row.avg12} />
                ) }
            </tbody>
        </table>
        </>
    )
}

export default function TimeTable({ timeArray, calculateAverage }) {
    const nestedTimeArray = [];
    const [rows, setRows] = useState([]);
  
    // Creating a nested array with indexes and your times
    const createNestedArray = () => {
        if (timeArray.length === 0) {
            return "time undefined";
        } else {
            for (let i = 0; timeArray.length > i; i++) {
                nestedTimeArray.push({
                    index: i + 1,
                    time: timeArray[i],
                    avg5: "-",
                    avg12: "-"
                });
            }
            setRows(nestedTimeArray); // update the state
        }
    };
  
    // Inserting the avgs of 5 and 12 to the nested array
    const insertAvgToTimeTable = (x) => {
        var startIndex = 0;
  
        for (var n = x - 1; n < timeArray.length; n++) {
            var timesInAverage = [];
  
            for (var i = 0; i < x; i++) {
                timesInAverage.push(timeArray[startIndex]);
                startIndex++;
            }
            startIndex -= x - 1;
  
            if (timeArray.length >= x && timesInAverage.length === 5) {
                nestedTimeArray[n].avg5 = calculateAverage(timesInAverage);
            } else if (timeArray.length >= x && timesInAverage.length === 12) {
                nestedTimeArray[n].avg12 = calculateAverage(timesInAverage);
            }
        }
    };

    // Updating the TimeTable when timeArray changes
    useEffect(() => {
        createNestedArray();
        insertAvgToTimeTable(5);
        insertAvgToTimeTable(12);
    }, [timeArray]);
  
    return (
        <>
        <h4>
            Solve: {timeArray.length}
        </h4>
        
        {/* Displaying the TimeTable */}
        <Table data={rows} />
        </>
    );
}
  