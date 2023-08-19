import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './ide.css';
import {Navbar} from '../../Components/navbar';
import { Container,Row,Col } from 'react-bootstrap';

export const IDE = () => {
  const [leftTextAreaValue, setLeftTextAreaValue] = useState('');
  const [rightTextAreaValue, setRightTextAreaValue] = useState('');

    const [code, setCode] = useState('');
  const [input,setInput] = useState('');
  const [output, setOutput] = useState('');
  const [textarea, setTextAreaValue] = useState(output);
  //console.log(code);
  const handleSubmit = async () => {
  
    const payload = {
      language: 'cpp',
      code,
      input
    }

    try {
      const { data } = await axios.post('http://localhost:8000/ide', payload);
      setOutput(data.output);
      console.log(data);
    }
    catch (error) {
      console.log("Error response:", error.response);
      console.log("Error message:", error.message);
      console.log("Error stack:", error.stack);
      console.log("ERROR: Can't run the code!");
    }
  }
  return (
    <>
      <Navbar />
      <Container fluid className='editor'>
        <h1 className='heading'>CodeSphere Online Compiler</h1>

        <select className='selectBox'>
          <option value='c'>C</option>
          <option value='cpp'>C++</option>
          <option value='java'>Java</option>
          <option value='py'>Python</option>
        </select>
        <br></br>
        <Row className='Row'>
          <Col md={6} className='Col'>
            <textarea rows='20' cols='75' className='textarea lineNumber'
              value={code}
              onChange={(e) => { setCode(e.target.value); }}
            >
            </textarea>
          </Col>
          <Col md={6} className='Col'>
            <Row className='Row'>
              <h5 className='input-heading'>CUSTOM INPUT</h5>
              <textarea rows='10' cols='35' className='inputArea'
              value={input}
              onChange={(e) => {setInput(e.target.value); }}
              >
                
              </textarea>
            </Row>
            <Row className='outputArea'>
              <h5 style={{textAlign:'center'}} className='output-heading'>OUTPUT</h5>
              <p className='outputContainer'>{output}</p>
            </Row>
          </Col>
        </Row>

        <button className='button' onClick={handleSubmit}>Submit</button>
        
      </Container>
      

    </>
  );
}
