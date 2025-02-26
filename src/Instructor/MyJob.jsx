import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash, Edit, MoreVertical } from "react-feather";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  Row,
  Col,
  Dropdown,
  Image,
  Badge,
  Table,
  ListGroup,
  Spinner,
  Tab,
  Nav,
} from "react-bootstrap";
import { FormSelect } from "../Components/elements/form-select/FormSelect";
import GlobalFilter from "../Components/elements/advance-table/GlobalFilter";
import Pagination from "../Components/elements/advance-table/Pagination2";
import LevelIcon from "../Components/marketing/common/miscellaneous/LevelIcon";
import InstructorProfileLayout from "./JobSeekerProfileLayout";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import axios from "axios"; // Import axios library
import { numberWithCommas } from "../helper/utils";
import { useGlobalContext } from "../context/AuthContext";

const MyJob = () => {
  const { userId } = useGlobalContext();
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [coursesAll, setCoursesAll] = useState([]);
  const [coursesOngoing, setCoursesOngoing] = useState([]);
  const [coursesCompleted, setCoursesCompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async (url, setter) => {
    try {
      const response = await axios.get(url);
      setter(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(`https://example.com/all-courses/${userId}`, setCoursesAll);
    fetchCourses(
      `https://example.com/ongoing-courses/${userId}`,
      setCoursesOngoing
    );
    fetchCourses(
      `https://example.com/completed-courses/${userId}`,
      setCoursesCompleted
    );
  }, [userId]);

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

  const sortby = [
    { value: "Date Created", label: "Date Created" },
    { value: "Newest", label: "Newest" },
    { value: "High Rated", label: "High Rated" },
    { value: "Low Rated", label: "Low Rated" },
    { value: "High Earned", label: "High Earned" },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "level",
        header: "Level",
      },
      {
        accessorKey: "hour",
        header: "Hour",
      },
      {
        accessorKey: "image",
        header: "Title",
        cell: ({ row }) => {
          const course = row.original;
          return (
            <div className="d-lg-flex">
              <div>
                <Link to="#">
                  <Image
                    src={course.image}
                    alt=""
                    className="rounded img-4by3-lg"
                  />
                </Link>
              </div>
              <div className="ms-lg-3 mt-2 mt-lg-0">
                <h4 className="mb-1 h5">
                  <Link to="#" className="text-inherit">
                    {course.title
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </Link>
                </h4>
                <ListGroup as="ul" bsPrefix="list-inline" className="fs-6 mb-0">
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    <i className="far fa-clock me-1"></i>
                    {course.hour}
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    <LevelIcon level={course.level} />
                    {course.level}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          return numberWithCommas(row.original.totalNumberOfEnrolledStudent);
        },
      },
      {
        accessorKey: "Price",
        header: "Price",
        cell: ({ row }) => {
          return (
            <Fragment>
              <span className="text-warning">
                {row.original.rating}
                <Icon path={mdiStar} size={0.6} />
              </span>
            </Fragment>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          return numberWithCommas(row.original.totalNumberOfEnrolledStudent);
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          return (
            <Badge
              bg={`${
                row.original.status === "Draft"
                  ? "info"
                  : row.original.status === "Live"
                  ? "success"
                  : row.original.status === "Deleted"
                  ? "danger"
                  : "warning"
              } `}
            >
              {row.original.status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => {
          return (
            <Badge
              bg={`${
                row.original.paymentStatus === "Paid" ? "success" : "danger"
              }`}
            >
              {row.original.paymentStatus}
            </Badge>
          );
        },
      },
    ],
    []
  );

  const allJobsHeader = "All Jobs";
  const ongoingJobsHeader = "Ongoing Jobs";
  const completedJobsHeader = "Completed Jobs";

  return (
    <InstructorProfileLayout>
      <Card className="border-0">
        <Card.Header className="border-bottom-0 p-0 bg-white">
          <Nav className="nav-lb-tab">
            <Nav.Item>
              <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                All
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ongoingjob" className="mb-sm-3 mb-md-0">
                Ongoing Jobs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="completedjob" className="mb-sm-3 mb-md-0">
                Completed Jobs
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className="p-0">
          <Tab.Content>
            <Tab.Pane eventKey="all" className="pb-4">
              <TableData
                columns={columns}
                data={coursesAll}
                isLoading={isLoading}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="ongoingjob" className="pb-4">
              <TableData
                columns={columns}
                data={coursesOngoing}
                isLoading={isLoading}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="completedjob" className="pb-4">
              <TableData
                columns={columns}
                data={coursesCompleted}
                isLoading={isLoading}
              />
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Jobs</h3>
            <p className="mb-0">
              Manage your job and its update like live, draft, and insight.
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col lg={9} md={7} sm={12} className="mb-lg-0 mb-2">
              <GlobalFilter
                filtering={filtering}
                setFiltering={setFiltering}
                placeholder="Search Your Jobs"
              />
            </Col>
            <Col lg={3} md={5} sm={12}>
              <FormSelect options={sortby} placeholder="Sort by" />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </InstructorProfileLayout>
  );
};

const TableData = (
  { columns, data, isLoading, table } // Pass table prop here
) => (
  <Fragment>
    <Row>
      <Col lg={12} md={12} sm={12}>
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table hover responsive className="text-nowrap table-centered">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column, index) => (
                    <td key={index}>
                      {column.cell({ row: { original: row } })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
    <Pagination table={table} />
  </Fragment>
);

export default MyJob;
