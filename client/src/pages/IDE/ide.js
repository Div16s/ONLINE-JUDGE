import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ide.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Select, Button, Textarea, Text, Box, Heading, Flex, Tab, Tabs, TabPanel, TabPanels, TabList } from '@chakra-ui/react';

const starterCode = {
  c: "#include <stdio.h>\n\nint main() {\n    // Your C code here\n    return 0;\n}",
  cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your C++ code here\n    return 0;\n}",
  py: "# Your Python code here",
  java: "public class Main {\n    public static void main(String[] args) {\n        // Your Java code here\n    }\n}",
};

export const IDE = () => {
  const [code, setCode] = useState(starterCode.cpp);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('cpp'); 

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

  const handleSubmit = async (e) => {
    const payload = {
      language: selectedLanguage,
      code,
      input,
    }

    setRunning(true);
    setLoading(true);
    setOutput('');
    setError('');
    try {
      const { data } = await axios.post('http://localhost:8000/api/ide/run', payload);
      const fetchedOutput = data.output;
      if(fetchedOutput.includes("Success:")) {
        setOutput(fetchedOutput);
      } 
      else {
        setError(fetchedOutput);
      }
    }
    catch (error) {
      console.log(error.response.data.err);
      setError(error.response.data.err);
    } finally {
      setLoading(false);
      setRunning(false);
    }
  }

  return (
    <>
    <Box p={4}>
        <Heading as='h1' mb={6} fontFamily='IBM Plex Mono, monospace' textAlign={"center"}>
          CodeSphere Online IDE
        </Heading>

        <Select
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            setCode(starterCode[e.target.value]);
          }}
          mb={4}
        >
          <option value='c'>C</option>
          <option value='cpp'>C++</option>
          <option value='java'>Java</option>
          <option value='py'>Python</option>
        </Select>

        <Flex>
          <Box flex="7" pr={4}>
            <Textarea
              bg='gray.800'
              color='white'
              rows='20'
              value={code}
              id='myTextarea'
              letterSpacing={"wide"}
              onChange={(e) => { setCode(e.target.value); }}
              height="100%"
            />
          </Box>

          <Box flex="3">
            <Tabs>
              <TabList>
                <Tab fontWeight={"bold"}>Custom Input</Tab>
                <Tab fontWeight={"bold"}>Output</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Textarea
                    rows={16}
                    value={input}
                    onChange={(e) => { setInput(e.target.value); }}
                    height="100%"
                  />
                </TabPanel>
                <TabPanel>
                {!running ? (
                  <>
                    {output.length > 0 && (
                      <Textarea height="100%" rows={16} value={output} fontFamily={"monospace"} fontWeight={"bold"} color="green.400" />
                    )}
                    {error.length > 0 && (
                      <Textarea height="100%" rows={16} color="red.500" value={error}/>
                    )}
                  </>
                ) : (
                  <Text mt={2} color="blue.500" fontSize={"medium"} fontWeight={"semibold"}>Running...</Text>
                )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>

        <Button
          isLoading={running}
          mt={4}
          colorScheme='green'
          onClick={handleSubmit}
        >
          RUN
        </Button>
      </Box>


    </>
  );
}
