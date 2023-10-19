import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ide.css';
import { Navbar } from '../../Components/navbar';
import { Container, Row, Col } from 'react-bootstrap';
import Loading from '../../Components/Loading_output';

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
  const [textarea, setTextAreaValue] = useState(output);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp'); // Default language is C++
  //console.log(code);

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

  return (
    <>
      <Container fluid className='editor'>
        <h1 className='heading'>CodeSphere Online IDE</h1>

        <select className='selectBox'
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
        </select>
        <br></br>
        <Row className='Row'>
          <Col md={8} className='Col'>
            <textarea rows='20' cols='75' className='textarea lineNumber' id='myTextarea'
              value={code}
              onChange={(e) => { setCode(e.target.value); }}
            >
            </textarea>
          </Col>
          <Col md={4} className='Col'>
            <Row className='Row'>
              <h5 className='input-heading'>CUSTOM INPUT</h5>
              <textarea rows='10' cols='35' className='inputArea'
                value={input}
                onChange={(e) => { setInput(e.target.value); }}
              >

              </textarea>
            </Row>
            <Row className='Row'>
              <h5 style={{ textAlign: 'center' }} className='output-heading'>OUTPUT</h5>
              <p className='outputArea'>{output}</p>
              {/* <p style={{backgroundColor:"white"}}>Execution time: {output.executionTime} ms</p> */}
            </Row>
          </Col>
        </Row>

        <button className='btn btn-dark' style={{ marginRight: "95%", width: "100px", color:"#4ec22b", height: "40px" }} onClick={handleSubmit}>RUN</button>

      </Container>


    </>
  );
}
