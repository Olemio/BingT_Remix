import React, { useState, useEffect } from 'react'

const faces = ['R', 'L', 'U', 'D', 'F', 'B'];
const turns = ["", "2", "'"];

// Generate scramble
function generateScramble (){
    let lastFaceNum = [10, 10, 10];
    let scramble = "";

    for (let x = 0; x < 20; x++) {
        let faceNum;
        do {
            faceNum = Math.floor(Math.random() * 6);
        } while (faceNum === lastFaceNum[0] || faceNum === lastFaceNum[1] || faceNum === lastFaceNum[2]);
        lastFaceNum.shift();
        lastFaceNum.push(faceNum);

        let face = faces[faceNum];
        let turn = turns[Math.floor(Math.random() * 3)];
        let move = face + turn;
        scramble += move + " ";
    }
    return scramble;
}

// Renew scramble when timer stops(spacebar down)
export default function GenerateScramble({ intervalCount }) {
    const [scramble, setScramble] = useState("");

    useEffect(() => setScramble(generateScramble()), [])
    useEffect(() => {
        if (intervalCount === 3) {
            setScramble(generateScramble());
        };
    }, [intervalCount])

    return (  
        <h1>{ scramble }</h1> 
    )
}
