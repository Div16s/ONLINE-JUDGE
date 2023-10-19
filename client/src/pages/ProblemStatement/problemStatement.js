import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import './problemStatement.css';
import { Navbar } from '../../Components/navbar';

const starterCode = {
    c: "#include <stdio.h>\n\nint main() {\n    // Your C code here\n    return 0;\n}",
    cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Your C++ code here\n    return 0;\n}",
    py: "# Your Python code here",
    java: "public class Main {\n    public static void main(String[] args) {\n        // Your Java code here\n    }\n}",
};

export const ProblemStatement = () => {
    const [code, setCode] = useState(starterCode.cpp);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [verdict, setVerdict] = useState('');
    const [isSolved, setIsSolved] = useState(false);
    //const [textarea, setTextAreaValue] = useState(output);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('cpp'); // Default language is C++
    const [problem, setProblem] = useState({});
    let { problemID } = useParams();
    const [activeSegment, setActiveSegment] = useState('Input');
    const [textAreaValue, setTextAreaValue] = useState('');

    const handleSegmentClick = (segment) => {
        setActiveSegment(segment);
    };

    // Get the textarea element by its ID
    const textarea = document.getElementById('myTextarea');

    const getUserSubmissionStatus = (problemId, userId) => {
        
    };

    useEffect(() => {
        // Add event listener for the Tab key after the component has mounted
        const textarea = document.getElementById('myTextarea');

        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                const spaces = '    ';
                textarea.value = textarea.value.substring(0, start) + spaces + textarea.value.substring(end);

                textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
            }
        };

        textarea.addEventListener('keydown', handleTabKey);

        // Clean up the event listener when the component unmounts
        return () => {
            textarea.removeEventListener('keydown', handleTabKey);
        };
    }, []);



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

    const handleRun = async (e) => {
        e.target.disabled = true;
        setOutput("Running...");
        const payload = {
            language: selectedLanguage,
            code,
            input,
        }

        try {
            setLoading(true);

            const { data } = await axios.post('http://localhost:8000/ide', payload);
            setOutput(data.output);
            setLoading(false);
            setError(null);
            console.log(data);
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.err && error.response.data.err.stderr) {
                const msg = error.response.data.err.stderr;
                const e = msg.split("error:")[1];
                setOutput("Compilation or Run time Error:\n" + e);
            } else {
                setOutput("An error occurred. Please check your code and try again.");
            }
            setLoading(false);
        }
        e.target.disabled = false;
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //console.log(userInfo.email);
    const handleSubmit = async (e) => {
        e.target.disabled = true;
        setVerdict("Running...");
        // console.log(selectedLanguage);
        // console.log(code);
        // console.log(problemID);
        // console.log(problem.problemName);
        // console.log(userInfo.email);
        const payload = {
            language: selectedLanguage,
            code: code,
            problem_id: problemID,
            problem_name: problem.problemName,
            email: userInfo.email,
        };
        try {
            const { data } = await axios.post(
                "http://localhost:8000/submit",
                payload
            );
            const { accepted, total_cases } = data;
            console.log("Accepted: ", accepted);
            console.log("TotalCases: ", total_cases);
            if (accepted === total_cases) {
                setVerdict(
                    `Verdict: Accepted\nDetails: ${accepted}/${total_cases} test cases passed`
                );
            } else {
                setVerdict(`Verdict: Wrong Answer`);
            }
        }
        catch (error) {
            console.log(error);
            setVerdict("Something wrong happened!");
        }
        e.target.disabled = false;
    }

    return (
        <>
            <div className='container'>
                <div className="card Problem">
                    <div className='card-header'>
                        <div className="left-content">
                            <h2 className="ProblemName" style={{
                                fontFamily: "IBM Plex Mono, monospace"
                            }}>{problem?.problemName}
                            </h2>
                            {getUserSubmissionStatus(problem.problemID,userInfo._id)}
                            <h5 style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                                { isSolved === true ? "Solved✅" :
                                    isSolved === false ? "Attempted🧑‍🔧" : ""}
                            </h5>
                        </div>
                        <div className="right-content">
                            <h5 style={{
                                fontFamily: "IBM Plex Mono, monospace",
                                fontWeight: "Bold",
                                color:
                                    problem?.problemDifficulty === 'Easy' ? 'green' :
                                        problem?.problemDifficulty === 'Medium' ? '#ccbb11' :
                                            problem?.problemDifficulty === 'Hard' ? 'red' : 'white',

                            }}>{problem?.problemDifficulty}</h5>
                        </div>
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
                    {/* <p className='language'><strong>LANGUAGE</strong></p> */}
                    <select
                        className='ps-selectBox'
                        value={selectedLanguage}
                        onChange={(e) => {
                            const shouldSwitch = window.confirm(
                                "Are you sure you want to change the language? WARNING: Your current code will be lost."
                            );
                            if (shouldSwitch) {
                                setSelectedLanguage(e.target.value);
                            }

                            setCode(starterCode[e.target.value]);
                        }}
                    >
                        <option value='c'>C</option>
                        <option value='cpp'>C++</option>
                        <option value='java'>Java</option>
                        <option value='py'>Python</option>
                    </select>
                    <br />
                    <textarea className='textarea' rows={20} col={10} id="myTextarea"
                        value={code}
                        onChange={(e) => { setCode(e.target.value); }}
                    ></textarea>
                    <br />
                    <div className='row'>
                        <button className={`col-2 btn btn-primary ${activeSegment === 'Input' ? ' active' : ''}`}
                            style={{ marginRight: '6px', marginLeft: "10px" }}
                            onClick={() => handleSegmentClick('Input')}
                        >
                            Input
                        </button>
                        <button className={`col-2 btn btn-primary${activeSegment === 'Output' ? ' active' : ''}`}
                            style={{ marginRight: '6px' }}
                            onClick={() => handleSegmentClick('Output')}
                        >
                            Output
                        </button>
                        <button className={`col-2 btn btn-primary${activeSegment === 'Verdict' ? ' active' : ''}`}
                            onClick={() => handleSegmentClick('Verdict')}
                        >
                            Verdict
                        </button>
                    </div>

                    <textarea rows={4} col={40} className='inputArea' id='myTextarea'
                        value={input}
                        onChange={(e) => { setInput(e.target.value); }}
                        style={{ display: activeSegment === 'Input' ? 'block' : 'none' }}
                    ></textarea>

                    {activeSegment === 'Output' && (
                        <div className='OutputArea'>
                            <p className='OutputContainer' dangerouslySetInnerHTML={{ __html: output.replace(/\n/g, "<br />") }} />
                            {/* <p className='OutputContainer'>{output}</p> */}
                        </div>

                    )}

                    {activeSegment === 'Verdict' && (
                        <div className='verdictBox'>
                            <p className='verdictContainer'>{verdict}</p>
                        </div>
                    )}

                    <div className='row'>
                        <button className='col-2  btn btn-dark' style={{ fontFamily: "IBM Plex Mono, monospace", marginLeft: "10px", marginRight: "5px", width: "150px", height: "40px", color: "#4ec22b" }} onClick={handleRun}>Run</button>
                        <button className='col-2  btn btn-dark' style={{ fontFamily: "IBM Plex Mono, monospace", width: "150px", height: "40px", color: "#4ec22b" }} onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
            </div >
        </>
    )
}
