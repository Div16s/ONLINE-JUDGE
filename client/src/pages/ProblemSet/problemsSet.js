import React from 'react';
import './problemSet.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShowToast } from '../../hooks/useShowToast';
import { Spinner, Flex, HStack, Select, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Icon, SearchIcon } from '@chakra-ui/icons';

export const ProblemsSet = () => {
    const [problemSet, setProblemSet] = useState([]);
    const [loadingProblemSet, setLoadingProblemSet] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const showToast = useShowToast();
    const navigate = useNavigate();

    const showProblemStatement = (Id) => {
        navigate(`/problemStatement/${Id}`);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleDifficultyChange = (e) => {
        setSelectedDifficulty(e.target.value);
    };

    useEffect(() => {
        const fetchProblemSet = async () => {
            setLoadingProblemSet(true);
            try {
                const response = await fetch("http://localhost:8000/api/problems", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.err) {
                    showToast("Error", data.err, 'error');
                    return;
                }

                setProblemSet(data);

            } catch (error) {
                showToast("Error", "Problem set not found", 'error');
            } finally {
                setLoadingProblemSet(false);
            }
        };
        fetchProblemSet();
    }, [setLoadingProblemSet, showToast]);

    return (
        <div>
            <div className='problemSet'>
                <h1 className='heading' style={{ fontFamily: "IBM Plex Mono, monospace", color: "white" }}>PROBLEM SET</h1>
                <HStack mb={7} gap={4}>
                    <InputGroup size={"md"} maxW={"56rem"}>
                        <InputRightElement pointerEvents="none">
                            <Icon as={SearchIcon} />
                        </InputRightElement>
                        <Input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search Problems"
                        />
                    </InputGroup>
                    <Select value={selectedDifficulty} onChange={handleDifficultyChange}>
                        <option value="">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </Select>
                </HStack>
                {loadingProblemSet && (
                    <Flex justifyContent='center' alignItems='center' h='60vh'>
                        <Spinner
                            thickness='4px'
                            speed='0.25s'
                            emptyColor='gray.200'
                            color='gray.900'
                            size='xl'
                        />
                    </Flex>
                )}
                {!loadingProblemSet && (
                    <div className='setContainer'>
                        <div className='setHeading'>
                            <h3 style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: "bold" }}>Problems</h3>
                            <h3 style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: "bold" }}>Difficulty</h3>
                        </div>
                        <ol style={{ paddingLeft: "0px" }}>
                            {problemSet?.reverse().filter(filteredProblem => (
                                filteredProblem.problemName.toLowerCase().includes(search.toLowerCase()) && (!selectedDifficulty || filteredProblem.problemDifficulty === selectedDifficulty)
                            )).map((v) => (
                                <li key={v._id} className="setProblem" onClick={() => showProblemStatement(v._id)} >
                                    <div className="setProblemName">
                                        <span style={{ fontFamily: "IBM Plex Mono, monospace" }}>{v.problemName}</span>
                                    </div>
                                    <div className="setProblemDifficulty">
                                        <span style={{
                                            fontFamily: "IBM Plex Mono, monospace",
                                            color:
                                                v.problemDifficulty === 'Easy' ? 'green' :
                                                    v.problemDifficulty === 'Medium' ? '#ccbb11' :
                                                        v.problemDifficulty === 'Hard' ? 'red' : 'white',

                                        }}> {v.problemDifficulty} </span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    )
}

