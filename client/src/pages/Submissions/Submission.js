import React from "react";
import { Navbar } from "../../Components/navbar";
import { useState, useEffect } from "react";
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import axios from "axios";
import './Submission.css';

export const Submissions = () => {
    const [data, setData] = useState([]);
    const [expandedCards, setExpandedCards] = useState({});
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const email = userInfo.email;
    const handle = userInfo.name;
    //   console.log(mail,handle);

    useEffect(() => {
        const getData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
                params: {
                    email: email,
                },
            };
            // console.log(email);
            try {
                const response = await axios.get("http://localhost:8000/submissions", config)
                setData(response.data);
                console.log(data);
                // console.log(response);
            } catch (error) {
                console.log(error, "something went wrong");
            }
        };
        getData();
    }, []);

    console.log(data.length);


    function CustomToggle({ children, eventKey, Verdict }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <button
                type="button"
                style={{ backgroundColor: (Verdict === "AC") ? "rgb(46,166,46)" : "#FF0000", color: "white", padding: "10px", border: 'none' }}
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }

    // <div key={item.id} className="submission-card">
    //     {/* Customize the card layout as needed */}
    //     <div className="submission-card-header"
    //         style={{ backgroundColor: (item.Verdict === "AC") ? "#27952b" : "#FF0000" }}
    //     >
    //         <CustomToggle>{item.Problem_name}</CustomToggle>
    //     </div>

    //     <div className="submission-card-body">
    //         <p><strong>Language</strong>: {item.language}</p>
    //         <h5 class="card-title"><strong>Code</strong></h5>
    //         <p>{item.code}</p>
    //         <p><strong>Verdict</strong>: <strong style={{ backgroundColor: (item.Verdict === "AC") ? "#27952b" : "#FF0000", color: "white", padding: "2px" }}>{item.Verdict}</strong></p>
    //         <p><strong>Submitted at</strong>: {item.Submitted_At}</p>
    //     </div>
    // </div>

    return (
        <>
            <div className="submission-container">
                <h1 className="heading"> {handle}'s Submissions </h1>
                <div className="submission-accordion">
                    {data.length === 0 ? (
                        <p>No submissions found.</p>
                    ) : (data.map((item) => (

                        <Accordion defaultActiveKey='1' flush>
                            <Card key={item.id} style={{ marginRight: "10px", marginLeft: "10px" }}>
                                <Card.Header style={{ display: "flex", background: "antiquewhite" }}>
                                    <span style={{ color: 'black', textDecoration: 'none', flex: 1, cursor: PointerEvent, alignSelf: 'center', fontSize: 18 }}>
                                        <CustomToggle Verdict={item.Verdict}>
                                            {item.Problem_name}
                                        </CustomToggle>

                                    </span>
                                </Card.Header>
                                <Accordion.Collapse>
                                    <Card.Body className="submission-card-body">
                                        <p><strong>Language</strong>: {item.language}</p>
                                        <h5 class="card-title"><strong>Code</strong></h5>
                                        {/* <p>{item.code}</p> */}
                                        <pre>
                                            <code className="cpp">{item.code}</code>
                                        </pre>
                                        <p><strong>Verdict</strong>: <strong style={{ backgroundColor: (item.Verdict === "AC") ? "#0a0" : "#FF0000", color: "white", padding: "2px" }}>{item.Verdict}</strong></p>
                                        <p><strong>Submitted at</strong>: {item.Submitted_At}</p>
                                    </Card.Body>
                                </Accordion.Collapse>

                            </Card>
                        </Accordion>

                    ))
                    )}

                </div>

            </div>
        </>
    );
}
