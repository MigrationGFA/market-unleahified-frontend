// import node module libraries
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Dropdown, Image } from "react-bootstrap";

// import custom components
import StatRightBadge from "../Components/marketing/common/stats/StatRightBadge";
import ApexCharts from "../Components/elements/charts/ApexCharts";

import "./dashboard.css";

// import data files
import {
  EarningsChartSeries,
  EarningsChartOptions,
  OrderColumnChartSeries,
  OrderColumnChartOptions,
} from "../data/charts/ChartData";

// import profile layout wrapper
import InstructorProfileLayout from "./JobSeekerProfileLayout";

const Dashboard = () => {
  const [lastApprovedJobs, setLastApprovedJobs] = useState([]);
  const [totalAmount, settotalAmount] = useState(null);
  const [totalJobsApplied, setTotalJobsApplied] = useState(null);
  const [totalJobs, setTotalJobs] = useState(null);
  const [pendingJobs, setPendingJobs] = useState(null);
  const [newJobsApplied, setNewJobsApplied] = useState(null);

  useEffect(() => {
    // Fetch top 4 courses from backend
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await fetch(
          `https://unleashified-backend.azurewebsites.net/api/v1/dashboard/${userId}`
        );
        const data = await response.json();
        settotalAmount(data.totalAmount);
        setTotalJobsApplied(data.totalJobsApplied);
        setTotalJobs(data.totalJobs);
        setPendingJobs(data.pendingJobs);
        setNewJobsApplied(data.newJobsApplied);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await fetch(
          `https://unleashified-backend.azurewebsites.net/api/v1/last-approved-jobs/${userId}`
        );
        const data = await response.json();
        setLastApprovedJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
    <InstructorProfileLayout>
      {/* Page Content section */}
      <Row>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatRightBadge
            title="Revenue"
            subtitle="Earning this month"
            // value={totalAmount}
            // badgeValue={totalAmount}
            value={
              (totalAmount / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (totalAmount % 100).toString().padStart(2, "0")
            }
            badgeValue={
              (totalAmount / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (totalAmount % 100).toString().padStart(2, "0")
            }
            colorVariant="success"
          />
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatRightBadge
            title="Total Job Applied For"
            subtitle="New Job Applied for"
            value={totalJobsApplied}
            badgeValue={newJobsApplied}
            colorVariant="info"
          />
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatRightBadge
            title="Total Approved Job"
            subtitle="Pending Jobs"
            value={totalJobs}
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
          <h3 className="mb-0 h4">Last Four Approved Jobs</h3>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0 text-nowrap table-centered">
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-0 ">
                  JOB DESCRIPTION
                </th>
                <th scope="col" className="border-0">
                  TYPE
                </th>
                <th scope="col" className="border-0">
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody>
              {lastApprovedJobs.map((job, index) => (
                <tr key={index}>
                  <td className="align-middle border-top-0 jobDescriptionCell">
                    {job.jobDescription}
                  </td>

                  <td className="align-middle border-top-0">{job.jobType}</td>
                  <td className="align-middle border-top-0">{job.jobSalary}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* end of Page Content section*/}
    </InstructorProfileLayout>
  );
};
export default Dashboard;
