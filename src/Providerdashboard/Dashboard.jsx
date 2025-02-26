// import node module libraries
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Dropdown, Image } from "react-bootstrap";
import axios from "axios";

// import custom components
import StatRightBadge from "../Components/marketing/common/stats/StatRightBadge";
import ApexCharts from "../Components/elements/charts/ApexCharts";

// import data files

import {
  EarningsChartSeries,
  EarningsChartOptions,
  OrderColumnChartSeries,
  OrderColumnChartOptions,
} from "../data/charts/ChartData";

// import profile layout wrapper
import ProviderProfileLayout from "./ProviderProfileLayout";

const Dashboard = () => {
  const [amount, setAmount] = useState(null);
  const [top4Payment, setTop4Payment] = useState([]);
  const [completedJobs, setCompletedJobs] = useState(null);
  const [pendingJobs, setPendingJobs] = useState(null);
  const [monthLyJobs, setMonthLyJobs] = useState(null);
  const [ongoingJobs, setOngoingJobs] = useState(null);
  const [totalJobs, setTotalJobs] = useState(null);
  const [newAmount, setNewAmount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-provider-dashboardJobs/${userId}`
        );

        setAmount(response.data.totalAmountSpent);
        setCompletedJobs(response.data.completedJobs);
        setPendingJobs(response.data.pendingJobs);
        setMonthLyJobs(response.data.monthLyJobs);
        setOngoingJobs(response.data.ongoingJobs);
        setTotalJobs(response.data.totalJobPosting);
        const formattedAmount = (
          response.data.totalAmountSpent / 100
        ).toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        });
        setNewAmount(formattedAmount);
        console.log(formattedAmount); // Output: "₦7,010,000.00"
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getPayment = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-provider-dashboardPaidJobs/${userId}`
        );
        setTop4Payment(response.data.matchingJobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPayment();
  }, []);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn-icon btn btn-ghost btn-sm rounded-circle"
    >
      {children}
    </Link>
  ));

  const ActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="1">
              <i className="fe fe-edit dropdown-item-icon"></i> Edit
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-trash dropdown-item-icon"></i> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <ProviderProfileLayout>
      {/* Page Content section */}
      <Row>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatRightBadge
            title="Money Spent"
            subtitle="Amount this month"
            // value={totalAmount}
            // badgeValue={totalAmount}
            // value={
            //   (parseInt(amount.replace(/,/g, "")) / 100)
            //     .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
            //     .slice(0, -3) +
            //   "." +
            //   (parseInt(amount.replace(/,/g, "")) % 100)
            //     .toString()
            //     .padStart(2, "0")
            // }
            // badgeValue={
            //   (parseInt(amount.replace(/,/g, "")) / 100)
            //     .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
            //     .slice(0, -3) +
            //   "." +
            //   (parseInt(amount.replace(/,/g, "")) % 100)
            //     .toString()
            //     .padStart(2, "0")
            // }
            value={newAmount ? newAmount : ""}
            // value={
            //   (parseInt((amount || "").toString().replace(/,/g, "")) / 100)
            //     .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
            //     .slice(0, -3) +
            //   "." +
            //   (parseInt((amount || "").toString().replace(/,/g, "")) % 100)
            //     .toString()
            //     .padStart(2, "0")
            // }
            badgeValue={
              (parseInt((amount || "").toString().replace(/,/g, "")) / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (parseInt((amount || "").toString().replace(/,/g, "")) % 100)
                .toString()
                .padStart(2, "0")
            }
            colorVariant="success"
          />
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatRightBadge
            title="Total Job Created"
            subtitle="New this month"
            value={totalJobs}
            badgeValue={monthLyJobs}
            colorVariant="info"
          />
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatRightBadge
            title="Total Completed"
            subtitle="Pending"
            value={completedJobs}
            badgeValue={pendingJobs}
            colorVariant="warning"
          />
        </Col>
      </Row>
      {/* <!-- Card --> */}
      {/* <Card className="my-4">
        <Card.Header>
          <h3 className="h4 mb-0">Earnings</h3>
        </Card.Header>
        <Card.Body>
          <ApexCharts
            options={EarningsChartOptions}
            series={EarningsChartSeries}
            height={350}
            type="line"
          />
        </Card.Body>
      </Card> */}
      {/* <!-- Card --> */}
      <Card className="my-4">
        <Card.Header>
          <h3 className="h4 mb-0">Application</h3>
        </Card.Header>
        <Card.Body>
          <ApexCharts
            options={OrderColumnChartOptions}
            series={OrderColumnChartSeries}
            height={287}
            type="bar"
          />
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <h3 className="mb-0 h4">Last Four Paid Jobs</h3>
        </Card.Header>
        <Card.Body className="p-0 ">
          <Table hover responsive className="mb-0 text-nowrap table-centered">
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-0">
                  JOB TITLE
                </th>
                <th scope="col" className="border-0">
                  Status
                </th>
                <th scope="col" className="border-0">
                  AMOUNT
                </th>
                <th scope="col" className="border-0">
                  Type
                </th>
                <th scope="col" className="border-0">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {top4Payment.map((job, index) => (
                <tr key={index}>
                  <td className="align-middle border-top-0">{job.jobTitle}</td>
                  <td className="align-middle border-top-0">{job.status}</td>
                  <td className="align-middle border-top-0">
                    {parseInt(job.jobSalary.replace(/,/g, ""))
                      .toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })
                      .slice(0, -3) +
                      "." +
                      (job.jobSalary.replace(/,/g, "") % 100)
                        .toString()
                        .padStart(2, "0")}
                  </td>
                  <td className="align-middle border-top-0">
                    {job.jobSalaryFormat} Payment
                  </td>
                  <td className="align-middle border-top-0">
                    {job.deliveryDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* end of Page Content section*/}
    </ProviderProfileLayout>
  );
};
export default Dashboard;
