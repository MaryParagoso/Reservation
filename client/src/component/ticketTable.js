import { ExclamationCircleFilled } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Input, Modal, Space, Table, message } from "antd";

const { confirm } = Modal;

function TicketTable() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [ticketList, setTicketList] = useState([]);
    const searchInput = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/tickets/all"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const movieData = await response.json();
                setTicketList(movieData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (ticketNumber) => {
        confirm({
            title: `Do you Want to delete ${ticketNumber.ticketNumber}?`,
            icon: <ExclamationCircleFilled />,
            content: "Please confirm deletion",
            onOk: async () => {
                try {
                    const response = await fetch(
                        "http://localhost:5000/api/tickets/delete",
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ ticketNumber }),
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

                    const responseData = await response.json();
                    const indexToDelete = ticketList.findIndex(
                        (ticket) =>
                            ticket.ticketNumber === ticketNumber.ticketNumber
                    );

                    if (indexToDelete !== -1) {
                        const updatedList = [...ticketList];
                        updatedList.splice(indexToDelete, 1);
                        setTicketList(updatedList);
                    }

                    message.success(
                        `${ticketNumber.ticketNumber} deleted successfully`
                    );
                } catch (error) {
                    console.error("Error deleting ticket:", error);
                }
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const columns = [
        {
            title: "Ticket Number",
            dataIndex: "ticketNumber",
            key: "ticketNumber",
            width: "30%",
        },
        {
            title: "Seats",
            dataIndex: "seats",
            key: "seats",
            width: "20%",
        },
        {
            title: "Movie ID",
            dataIndex: "movieId",
            key: "movieId",
        },
        {
            title: "Action",
            render: (ticketNumber) => (
                <Button onClick={() => handleDelete(ticketNumber)}>
                    Cancel Ticket
                </Button>
            ),
        },
    ];

    return <Table columns={columns} dataSource={ticketList} />;
}

export default TicketTable;
