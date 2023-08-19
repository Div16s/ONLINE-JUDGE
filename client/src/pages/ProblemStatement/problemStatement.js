import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import './problemStatement.css';
import {Navbar} from '../../Components/navbar';

export const ProblemStatement = () => {
    const [problem, setProblem] = useState({});
    let { problemID } = useParams();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                console.log();
                const response = await axios.get(`http://localhost:8000/problemStatement/${problemID}`);
                setProblem(response.data);
                console.log("Problem statement fetched!!");
            } catch (error) {
                console.log("Error Fetching Problem statement:", error.message);
            }
        };

        fetchProblem();
    }, [problemID]);
    return (
        <>
            <Navbar />
            <div className='container'>
                <div className="card Problem">
                    <div className='card-header'>
                        <h2 className="ProblemName"> {problem?.problemName} </h2>
                    </div>

                    <div className='card-body'>
                        {/* <div className="ProblemStatement">{problem?.problemStatement}</div>
                        <div className='ProblemStatement'>{problem?.example_testCases}</div> */}
                        <div className="problem-section">
                            <h3>Problem Statement</h3>
                            <hr />
                            <div className="ProblemStatement">{problem?.problemStatement}</div>
                        </div>
                        <hr />
                        <div className="problem-section">
                            <h3>Test Cases</h3>
                            <hr />
                            {/* <div className="ProblemStatement">{problem?.example_testCases}</div> */}
                            <div className="test-case-examples" dangerouslySetInnerHTML={{ __html: problem?.example_testCases ? problem.example_testCases.replace() : '' }}></div>

                        </div>
                    </div>
                </div>
                <div className='card editor'>
                    <input></input>
                </div>
            </div>
        </>
    )
}
