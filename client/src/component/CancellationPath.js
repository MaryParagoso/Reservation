import React from "react";
import { Form, Select } from "antd";
import {
  CancelContainer,
  Container,
  SelectContainer,
  CancelWallpaper,
} from "../stylesheets/CssCancellation";
import reservationNumbers from "./ReservationNumber";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TicketTable from "./ticketTable";

const { Option } = Select;

const CancellationPath = () => {

  return (
    <Container>
      <CancelWallpaper>
        <div
          style={{
            paddingTop: "20px",
            textAlign: "left",
            marginLeft: "20px",
          }}
        >
          {/* <Button
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.816)",
              width: "40px",
            }}
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={handleBackButtonClick}
          ></Button> */}
        </div>
        <h1
          style={{
            paddingTop: "80px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Cancellation
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
            <TicketTable />
        </div>
      </CancelWallpaper>
    </Container>
  );
};

export default CancellationPath;
