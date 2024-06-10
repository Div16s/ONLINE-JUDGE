import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ide.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Select, Button, Textarea } from '@chakra-ui/react';

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
  const [error, setError] = useState("");
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
    try {
      const { data } = await axios.post('http://localhost:8000/ide', payload);
      setOutput(data.output);
      console.log(data);
    }
    catch (error) {
      console.log(error.response.data.err);
      setOutput(error.response.data.err);
    } finally {
      setLoading(false);
      setRunning(false);
    }
  }

  useEffect(() => {
    if (output.stderr) {
      const errorString = output.stderr;
      // Define a regular expression to extract the human-readable error message
      const errorRegex = /error: (.+)\n/;
      // Extract the human-readable error message using the regular expression
      const match = errorString.match(errorRegex);

      // If a match is found, extract the error message from the match result
      setError(match[1]);
    }
  }, [output,setError])

  return (
    <>
      <Container fluid className='editor'>
        <h1 className='heading' style={{ fontFamily: "IBM Plex Mono, monospace" }}>CodeSphere Online IDE</h1>

        <Select
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            setCode(starterCode[e.target.value]);
          }}
        >
          <option value='c'>C</option>
          <option value='cpp'>C++</option>
          <option value='java'>Java</option>
          <option value='py'>Python</option>
        </Select>
        <br></br>
        <Row className='Row'>
          <Col md={8} className='Col'>
            <Textarea backgroundColor={"gray.800"} rows='20' cols='75' className='textarea lineNumber' id='myTextarea'
              value={code}
              onChange={(e) => { setCode(e.target.value); }}
            >
            </Textarea>
          </Col>
          <Col md={4} className='Col'>
            <Row className='Row'>
              <h5 className='input-heading'>CUSTOM INPUT</h5>
              <Textarea rows='9' cols='30' className='inputArea'
                value={input}
                onChange={(e) => { setInput(e.target.value); }}
              >

              </Textarea>
            </Row>
            <Row className='Row'>
              <h5 style={{ textAlign: 'center' }} className='output-heading'>OUTPUT</h5>
              <Textarea className='outputArea' rows={'10'} cols={'35'}>
                {!loading && (
                  <>
                    {output.executionTime !== undefined && (
                      <p>{output.executionTime} milliseconds</p>
                    )}
                    {output.stdout && (
                      <p>{output.stdout}</p>
                    )}
                    {output.stderr && (
                      <p style={{ color: 'red' }}>Error: {error}</p>
                    )}
                  </>
                )}
              </Textarea>
              {/* <p style={{backgroundColor:"white"}}>Execution time: {output.executionTime} ms</p> */}
            </Row>
          </Col>
        </Row>

        <Button className='btn btn-dark' isLoading={running} style={{ marginTop: "10px", marginRight: "95%", width: "100px", color: "#4ec22b", height: "40px" }} onClick={handleSubmit}>
          RUN
        </Button>

      </Container>


    </>
  );
}
