import React, { useEffect } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../atoms/userAtom';
import { useShowToast } from '../../hooks/useShowToast';

export const SubmissionInfo = () => {
    let { submission_id } = useParams();
    const [submission, setSubmission] = useState({});
    const showToast = useShowToast();
    const userInfo = useRecoilValue(userAtom);

    useEffect(() => {
        const getSubmission = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/submissions/${submission_id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    showToast("Error", data.err, 'error');
                    return;
                }
                setSubmission(data);
                console.log(data);
            } catch (error) {
                showToast("Error", "Submission not found", 'error');
            }
        };
        getSubmission();
    }, [submission_id, showToast]);

    const getLanguageName = (language) => {
        switch (language) {
            case 'cpp':
                return 'C++';
            case 'c':
                return 'C';
            case 'py':
                return 'Python';
            case 'java':
                return 'Java';
            default:
                return language;
        }
    };

    return (
        <div style={{"min-height" : "100vh"}}>
            <Box m={4} mt={0} p="4" borderWidth="1px" borderRadius="md" pb={2}>
                <Heading size="md" mb="2" color={"gray.100"}>{submission.Problem_name}</Heading>
                <hr />
                <Text mb="2">Language: {getLanguageName(submission.language)}</Text>
                <Box borderWidth="1px" borderRadius="md" p="2" bg="gray.800" mb="2">
                    <Text whiteSpace="pre-wrap">{submission.code}</Text>
                </Box>

                <Text mb="2" fontWeight={"bold"} color={
                    submission?.Verdict === 'AC' ? 'green.400' :
                    submission?.Verdict === 'WA' ? 'red.400' : 'white'}
                >
                    Verdict: {submission.Verdict}
                </Text>
                <Text mb="2" pb={2}>Submitted At: {submission.Submitted_At}</Text>
            </Box>
        </div>
    )
}
