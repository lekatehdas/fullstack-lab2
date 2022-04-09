import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Table, Header, HeaderRow, Body, Row, Cell } from "@table-library/react-table-library";
import { useSort, HeaderCellSort } from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";

function MyApp(props) {
    let [list, setListInfo] = useState([]);

    function setInfo() {
        fetch('http://localhost:3000/api/registrations/latest/')
            .then(res => res.json())
            .then(data => setListInfo(data))
    }

    useEffect(() => {
        setInfo()
        const interval = setInterval(() => {
            setInfo();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const data = { nodes: list };

    const sort = useSort(data, {
        state: {
            sortKey: "UNIX_TIMESTAMP",
            reverse: true
        }
    }, {
        sortFns: {
            STUDENT_ID: (array) =>
                array.sort((a, b) => a.student.student_id.localeCompare(b.student.student_id)),
            STUDENT_NAME: (array) =>
                array.sort((a, b) => a.student.name.localeCompare(b.student.name)),
            COURSE_NAME: (array) =>
                array.sort((a, b) => a.course.course_name.localeCompare(b.course.course_name)),
            UNIX_TIMESTAMP: (array) =>
                array.sort((a, b) => parseInt(a.unix_timestamp) - parseInt(b.unix_timestamp)),
        },
    });

    const pagination = usePagination(data, {
        state: {
            page: 0,
            size:5
        }
    });

    return (
        <Table data={data} sort={sort} pagination={pagination}>
            {(tableList) => (
                <>
                <Header>
                    <HeaderRow>
                        <HeaderCellSort sortKey="STUDENT_ID">Student_ID</HeaderCellSort>
                        <HeaderCellSort sortKey="STUDENT_NAME">Student name</HeaderCellSort>
                        <HeaderCellSort sortKey="COURSE_NAME">Course name</HeaderCellSort>
                        <HeaderCellSort sortKey="UNIX_TIMESTAMP">Registration time (in unix time format)</HeaderCellSort>
                    </HeaderRow>
                </Header>

                <Body>
                    {tableList.map((item) => (
                        <Row key={item._id} item={item}>
                            <Cell>{ item.student.student_id }</Cell>
                            <Cell>{ item.student.name }</Cell>
                            <Cell>{ item.course.course_name }</Cell>
                            <Cell>{ parseInt((new Date(item.unix_timestamp.toString()).getTime() / 1000).toFixed(0)) }</Cell>
                        </Row>
                    ))}
                </Body>
                </>
            )}
        </Table>
    );
}

ReactDOM.render(<MyApp />,
    document.getElementById('root'));
