"use client"
import React, { useRef, useState } from 'react';
import questions from './Data';
import { Familjen_Grotesk } from 'next/font/google';

const Quiz = () => {
    const [Q, setQ] = useState(1);
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [complete, setcomplete] = useState()

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1, option2, option3, option4];

    

    const handleQuestion = () => {
        if(index === 20){
            const comp = ()=>{
                return <div className='main'>
                    <h3>Quiz has Completed</h3>
                    <p>Your Score is {score} out of {questions.length}</p>
                </div>
            }

            setcomplete(comp)
        }
        else{
            option_array.forEach(option => {
                option.current.classList.remove('right', 'wrong');
            });
            setLock(false);
            setQ(Q + 1);
            setIndex(index + 1);
        }
    };

    const answer = (e, ans) => {
        if (!lock) {
            if (questions[index].ans === ans) {
                e.target.classList.add('right');
                setScore(score + 1);
            } else {
                e.target.classList.add('wrong');
                option_array[questions[index].ans - 1].current.classList.add('right');
            }
            setLock(true);
        }
    };

    return (
        <div className='main'>
           <h1>Quiz App</h1>
            <hr />
            <h4>{Q}. {questions[index].question}</h4>
            <p ref={option1} onClick={(e) => { answer(e, 1) }}>{questions[index].option1}</p>
            <p ref={option2} onClick={(e) => { answer(e, 2) }}>{questions[index].option2}</p>
            <p ref={option3} onClick={(e) => { answer(e, 3) }}>{questions[index].option3}</p>
            <p ref={option4} onClick={(e) => { answer(e, 4) }}>{questions[index].option4}</p>
            <div className='dow'>
                <button onClick={handleQuestion} disabled={index >= questions.length - 1}>Next</button>
                <p>{Q} of {questions.length} Questions</p>
            </div>
            <p className='scor'>Your Score is {score} out of {20}</p>
        </div>
    );
};

export default Quiz;
