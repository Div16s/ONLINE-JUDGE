import React from 'react';
import './problemSet.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Navbar } from '../../Components/navbar';

export const ProblemsSet = () => {
    const [problemSet, setProblemSet] = useState([]);
    const naviGate = useNavigate();

    const showProblemStatement = (Id) => {
        naviGate(`/problemStatement/${Id}`);
    };

    useEffect(() => {
        axios.get('http://localhost:8000/problems')
            .then(problemSet => setProblemSet(problemSet.data))
            .catch(err => console.log("Not found problem set!"))
        // const fetchProblemSet = async () => {
        //     try {
        //         const response = await axios.get("http://localhost:8000/problems");
        //         setProblemSet(response.data);
        //         console.log("Problem set fetched successfully!");
        //     } catch (error) {
        //         console.log('Error fetching problem set!');
        //     }
        // };
        // fetchProblemSet();
    }, []);
    return (
        <>
        <Navbar />
        <div className='problemSet'>
            <h1>PROBLEM SET</h1>
            <div className='setContainer'>
                <div className='setHeading'>
                    <h3>Problem</h3>
                    <h3>Difficulty</h3>
                </div>
                <ol style={{paddingLeft:"0px"}}>
                    {problemSet.map((v) =>  (
                        <li key={v._id} className="setProblem" onClick={() => showProblemStatement(v._id)} >
                            <div className="setProblemName">{v.problemName}</div>
                            <div className="setProblemDifficulty">  {v.problemDifficulty} </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
        </>
    )
}

