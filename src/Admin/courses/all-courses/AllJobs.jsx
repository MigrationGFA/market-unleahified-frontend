import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Tab, Card, Nav, Breadcrumb, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CoursesTable from './CoursesTable';

const AllCourses = () => {
    const [allCourses, setAllCourses] = useState([]);
    const [approvedCourses, setApprovedCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [loading, setLoading] = useState(false); // Initial loading state is false
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // Initial active tab is 'all'

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading spinner
            try {
                let response;
                switch (activeTab) {
                    case 'all':
                        response = await axios.get('https://remsana-backend-testing.azurewebsites.net/api/v1/all-courses');
                        setAllCourses(response.data);
                        break;
                    case 'approved':
                        response = await axios.get('https://remsana-backend-testing.azurewebsites.net/api/v1/approved-courses');
                        setApprovedCourses(response.data);
                        break;
                    case 'pending':
                        response = await axios.get('https://remsana-backend-testing.azurewebsites.net/api/v1/pending-courses');
                        setPendingCourses(response.data);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                setError(error);
            }
            setLoading(false); 
        };

        fetchData();
    }, [activeTab]); 

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab); 
    };

    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">All Jobs</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Jobs</Breadcrumb.Item>
                                <Breadcrumb.Item active>All</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Link to="#" className="btn btn-primary">
                                Add New Courses
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Tab.Container defaultActiveKey="all" activeKey={activeTab} onSelect={handleTabSelect}>
                        <Card>
                            <Card.Header className="border-bottom-0 p-0 bg-white">
                                <Nav className="nav-lb-tab">
                                    <Nav.Item>
                                        <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                                            All
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="approved" className="mb-sm-3 mb-md-0">
                                            Ongoing Jobs
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="pending" className="mb-sm-3 mb-md-0">
                                            Completed Jobs 
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Tab.Content>
                                    <Tab.Pane eventKey="all" className="pb-4">
                                        {loading && (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </div>
                                        )}
                                        {!loading && !error && (
                                            <CoursesTable courses_data={allCourses} />
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="approved" className="pb-4">
                                        {loading && (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </div>
                                        )}
                                        {!loading && !error && (
                                            <CoursesTable courses_data={approvedCourses} />
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="pending" className="pb-4">
                                        {loading && (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </div>
                                        )}
                                        {!loading && !error && (
                                            <CoursesTable courses_data={pendingCourses} />
                                        )}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Col>
            </Row>
        </Fragment>
    );
};

export default AllCourses;
