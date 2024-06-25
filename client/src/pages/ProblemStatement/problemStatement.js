import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import './problemStatement.css';
import { useRecoilValue } from 'recoil';
import { problemStatusAtom } from '../../atoms/problemStatusAtom';
import { Flex, Box, Select, Text, Heading, Button, Toggle, Textarea, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FcCheckmark } from "react-icons/fc";
import { MdOutlinePending } from "react-icons/md";


const starterCode = {
    c: "#include <stdio.h>\n\nint main() {\n    // Your C code here\n    return 0;\n}",
    cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Your C++ code here\n    return 0;\n}",
    py: "# Your Python code here",
    java: "public class Main {\n    public static void main(String[] args) {\n        // Your Java code here\n    }\n}",
};

const ProblemDetails = ({ problem }) => {
    const solvedProblems = useRecoilValue(problemStatusAtom);
    const [isSolved, setIsSolved] = useState("Unattempted");

    useEffect(() => {
        const setProblemStatus = () => {
            console.log("Problem Name: ", problem.problemName);
            {solvedProblems && solvedProblems.map((solvedProblem) => {
                if (solvedProblem.problemName === problem.problemName) {
                    if (solvedProblem.status === "AC") {
                        setIsSolved("Solved");
                    }
                    else if (solvedProblem.status === "WA") {
                        setIsSolved("Attempted");
                    }
                }
            })}
        }
        setProblemStatus();
    }, [problem.problemName, solvedProblems]);

    return (
        <Box p="4">
            <Flex justifyContent="space-between" alignItems="center" mb="2">
                <Flex direction="column">
                    <Heading size="lg">{problem.problemName}</Heading>
                    {isSolved === "Solved" && (
                        <Flex direction={"row"} gap={1}>
                            <Text>Solved</Text>
                            <FcCheckmark />
                        </Flex>
                    )}
                    {isSolved === "Attempted" && (
                        <Flex direction={"row"} gap={1}>
                            <Text>Attempted</Text>
                            <Text mt={0.5}><MdOutlinePending color='yellow' /></Text>
                        </Flex>
                    )}
                </Flex>
                <Text color={
                    problem?.problemDifficulty === 'Easy' ? 'green.400' :
                        problem?.problemDifficulty === 'Medium' ? '#ccbb11' :
                            problem?.problemDifficulty === 'Hard' ? 'red.400' : 'white'}
                    p={2}
                >
                    <strong>{problem.problemDifficulty}</strong>
                </Text>
            </Flex>
            <hr />
            <Text mb="4">{problem.problemStatement}</Text>
            <hr />
            <Heading size="md" mb="2">Test Cases</Heading>
            <hr />
            {problem.example_testCases?.split('\n\n').map((testCase, index) => (
                <Box key={index} mb="4">
                    {testCase.split('\n').map((line, idx) => (
                        <Text key={idx} mb="2">{line}</Text>
                    ))}
                </Box>
            ))}
            <hr />
            <Text mb="2"><strong>Constraints:</strong> 1 ≤ N ≤ 10^5</Text>
        </Box>
    );
};

const IdeSection = ({ problem }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [code, setCode] = useState(starterCode.cpp);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [verdict, setVerdict] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('cpp'); // Default language is C++
    const [running, setRunning] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let { problemID } = useParams();

    useEffect(() => {
        // Add event listener for the Tab key after the component has mounted
        const textarea = document.getElementById('codeArea');

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

    const handleTabChange = (index) => {
        setTabIndex(index);
    };

    const handleRun = async (e) => {
        e.target.disabled = true;
        const payload = {
            language: selectedLanguage,
            code,
            input,
        }
        setRunning(true);
        setOutput('');
        setError('');
        try {
            const { data } = await axios.post('http://localhost:8000/api/ide/run', payload);
            const fetchedOutput  = data.output;
            console.log("Fetched Output: ", fetchedOutput);
            if(fetchedOutput.includes("Success:")){
                setOutput(fetchedOutput);
            }
            else setError(fetchedOutput);
        }
        catch (error) {
            setError(error.response);
        } finally {
            setRunning(false);
        }
        e.target.disabled = false;
    };

    const handleSubmit = async () => {
        setVerdict("Running...");
        const payload = {
            language: selectedLanguage,
            code: code,
            problem_id: problemID,
            problem_name: problem.problemName,
            email: userInfo.email,
        };
        setSubmitting(true);
        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/submit",
                payload
            );
            const { accepted, total_cases } = data;
            console.log("Accepted: ", accepted);
            console.log("TotalCases: ", total_cases);
            if (accepted === total_cases) {
                setVerdict(`Verdict: Accepted\n\nDetails: ${accepted}/${total_cases} test cases passed`);
            } else {
                setVerdict(`Verdict: Wrong Answer\n\nDetails: ${accepted}/${total_cases} test cases passed`);
            }
        }
        catch (error) {
            setVerdict("Something wrong happened!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box p="4">
            <Box mb="4" width="100%">
                <Select placeholder="Select language" mb="2"
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
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="py">Python</option>
                    <option value="java">Java</option>
                </Select>
                <Textarea id='codeArea' letterSpacing={"inherit"} backgroundColor={"gray.800"} value={code} onChange={(e) => setCode(e.target.value)} rows="16" cols="50" placeholder="Your code goes here..." style={{ width: "100%" }} />
            </Box>
            <Box p="4">
                <Tabs index={tabIndex} onChange={handleTabChange}>
                    <TabList>
                        <Tab>Custom Input</Tab>
                        <Tab>Output</Tab>
                        <Tab>Verdict</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows="5" cols="50" placeholder="Custom Input" />
                        </TabPanel>
                        <TabPanel>
                            {running ? <Textarea rows="5" cols="50" color={"blue.500"} fontWeight={"bold"} value="Running..." readOnly /> 
                                    : output.length>0 ? <Textarea rows="5" cols="50" color={"green.400"} fontFamily={"monospace"} fontWeight={"bold"} value={output} readOnly /> 
                                    : error.length>0 ? <Textarea rows="5" cols="50" color={"red.500"} fontFamily={"monospace"} fontWeight={"bold"} value={error} readOnly /> 
                                    : <Textarea rows="5" cols="50" value="Output will be displayed here" readOnly />
                            }
                        </TabPanel>
                        <TabPanel>
                            <Textarea rows="5" cols="50" value={verdict} placeholder="Verdict" readOnly />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Flex justify="flex-end" gap={2}>
                <Button isLoading={running} backgroundColor={"blue.500"} _hover={{ "backgroundColor": "blue.600" }} onClick={handleRun}>Run</Button>
                <Button isLoading={submitting} backgroundColor={"green.400"} _hover={{ "backgroundColor": "green.500" }} onClick={handleSubmit}>Submit</Button>
            </Flex>
        </Box>
    );
};

export const ProblemStatement = () => {
    const [problem, setProblem] = useState({});
    let { problemID } = useParams();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/problemStatement/${problemID}`);
                setProblem(response.data);
                console.log("Problem statement fetched!!");
            } catch (error) {
                console.log("Error Fetching Problem statement:", error.message);
            }
        };

        fetchProblem();
    }, [problemID]);

    return (
        <Flex>
            <Box w="50%" h={"100vh"} borderRight="1px solid #ccc">
                <ProblemDetails problem={problem} />
            </Box>
            <Box w="50%" h={"100vh"}>
                <IdeSection problem={problem} />
            </Box>
        </Flex>
    )
}