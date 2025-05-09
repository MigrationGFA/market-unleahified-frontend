import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, ListGroup, Dropdown, Image } from 'react-bootstrap';
import axios from 'axios';

const RecentJobs = ({ title }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchRecentJobs();
    }, []);

    const fetchRecentJobs = async () => {
        try {
            const response = await axios.get('https://unleashified-backend.azurewebsites.net/api/v1/admin-overview-last-four-jobs');
            setJobs(response.data.lastFourJobs);
        } catch (error) {
            console.error('Error fetching recent jobs:', error);
        }
    };

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
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
        <Card className="h-100">
            <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
                <h4 className="mb-0">{title}</h4>
                <Link to="#" className="btn btn-outline-secondary btn-sm">
                    View all
                </Link>
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    {jobs.map((job, index) => (
                        <ListGroup.Item className={`px-0 ${index === 0 ? 'pt-0' : ''}`} key={job._id}>
                            <Row>
                                <Col xs="auto">
                                    <Link to="#">
                                        <Image src={job.jobPoster.companyLogo} alt="" className="img-fluid rounded img-4by3-lg" />
                                    </Link>
                                </Col>
                                <Col className="ps-0">
                                    <Link to="#">
                                        <h5 className="text-primary-hover">{job.jobTitle}</h5>
                                    </Link>
                                    <div className="d-flex align-items-center">
                                        <span className="fs-6">{job.jobPoster.companyName}</span>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <ActionMenu />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default RecentJobs;
