import React from "react";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import { useShowToast } from "../../hooks/useShowToast";
import {
    Flex,
    Text,
    Box,
    Heading,
    Spinner
} from '@chakra-ui/react'
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Filters } from "../../Components/Filters";

export const Submissions = () => {
    const [data, setData] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [loadingSubmissions, setLoadingSubmissions] = useState(true);
    const showToast = useShowToast();
    const userInfo = useRecoilValue(userAtom);
    const email = userInfo.email;
    const handle = userInfo.name;

    useEffect(() => {
        const getData = async () => {
            setLoadingSubmissions(true);
            try {
                // const response = await axios.get("http://localhost:8000/submissions", config)
                const response = await fetch("http://localhost:8000/submissions", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                    body: JSON.stringify({ email: email }),
                });

                const data = await response.json();
                if (data.err) {
                    showToast('Error', data.err, 'error');
                    return;
                }
                setData(data);
                console.log(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoadingSubmissions(false);
            }
        };
        getData();
    }, []);


    //column definitions
    const columns = [{
        header: 'Problem Name',
        accessorKey: 'Problem_name',
        cell: (props) => <p>{props.getValue()}</p>
    }, {
        header: 'Language',
        accessorKey: 'language',
        cell: (props) => <p>{props.getValue()}</p>
    }, {
        header: 'Verdict',
        accessorKey: 'Verdict',
        cell: (props) => <p>{props.getValue()}</p>
    }, {
        header: 'Submitted At',
        accessorKey: 'Submitted_At',
        cell: (props) => {
            return <p>{props.getValue()}</p>;
        }
    }]

    const table = useReactTable({
        data: data,
        columns,
        state: {
            columnFilters
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <>
            <Box maxW={1000} height="100vh" mx={"auto"} px={6} pt={24} fontSize={"md"}>
                <Heading mb={10}>
                    {handle}'s Submissions
                </Heading>
                <Box maxW={1000} overflowX={"auto"} overscrollY={"auto"}>
                    <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                    <Box className="" w={table.getTotalSize() + 200}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Box className="tr" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Box className="th" w={header.getSize() + 50} key={header.id}>
                                        <Text fontSize={"md"} className="m-auto">
                                            {header.column.columnDef.header}
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                        {loadingSubmissions && (
                            <Flex justifyContent='center' alignItems='center' h='55vh'>
                                <Spinner
                                    thickness='4px'
                                    speed='0.25s'
                                    emptyColor='gray.200'
                                    color='gray.900'
                                    size='xl'
                                />
                            </Flex>
                        )}
                        {!loadingSubmissions && table.getRowModel().rows.map((row) => (
                            <Box className="tr" _hover={{ bg: "gray.800" }} key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Box className="td" w={cell.column.getSize() + 50} key={cell.id}>
                                        {cell.column.columnDef.header === "Problem Name" ? (
                                            <Link to={`/submission/${cell.row.original._id}`}>
                                                <Text className="m-1 p-1 text-center" h={8}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </Text>
                                            </Link>
                                        ) : (
                                            <Text className="m-1 p-1 text-center" h={8} backgroundColor={cell.column.columnDef.header === "Verdict" ? cell.getValue() === "AC" ? "green.400" : "red.500" : "inherit"}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Text>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

/* <div className="submission-container">
                <h1 className="heading"> {handle}'s Submissions </h1>
                <div className="submission-accordion">
                    {data.length === 0 ? (
                        <p>Solve at-least one problem.</p>
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
                                        {/* <p>{item.code}</p>
                                        <pre>
                                            <code className="cpp">{item.code}</code>
                                        </pre>
                                        <p><strong>Verdict</strong>: <strong style={{ backgroundColor: (item.Verdict === "AC") ? "#0a0" : "#FF0000", color: "white", padding: "2px" }}>{item.Verdict}</strong></p>
                                        <p><strong>Submitted at</strong>: {item.Submitted_At}</p>
                                    </Card.Body >
                                </Accordion.Collapse >

                            </Card >
                        </Accordion >

                    ))
                    )}

                </div >

            </div > */