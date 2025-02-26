import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Dropdown, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FlatPickr } from '../../Components/elements/flat-pickr/FlatPickr';
import ApexCharts from '../../Components/elements/charts/ApexCharts';
import StatRightIcon from '../../Admin/analytics/stats/StatRightIcon';
import PopularInstructor from './PopularJobCategory';
import RecentCourses from './RecentJobs';
import Activity from './Activity';
import {
    TrafficChartSeries,
    TrafficChartOptions,
    EarningsChartSeries,
    EarningsChartOptions
} from '../../data/charts/ChartData';

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

const ChartActionMenu = () => {
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    <i className="fe fe-more-vertical text-muted"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                    <Dropdown.Header>SETTINGS</Dropdown.Header>
                    <Dropdown.Item eventKey="1">
                        <i className="fe fe-external-link dropdown-item-icon "></i> Export
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        <i className="fe fe-mail dropdown-item-icon "></i> Email Report
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        <i className="fe fe-download dropdown-item-icon "></i> Download
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

const Overview = () => {
    const [dashboardData, setDashboardData] = useState({
        monthlySeeker: 0,
        totalSeeker: 1,
        monthlyProvider: 0,
        totalProvider: 1
    });
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('https://unleashified-backend.azurewebsites.net/api/v1/admin-overview');
            setDashboardData(response.data.dashboardData);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false); 
        }
    };

    return (
        <div>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-lg-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-lg-0">
                            <h1 className="mb-0 h2 fw-bold">Dashboard</h1>
                        </div>
                        <div className="d-flex">
                            <div className="input-group me-3">
                                <FlatPickr value={''} />
                                <span className="input-group-text text-muted" id="basic-addon2">
                                    <i className="fe fe-calendar"></i>
                                </span>
                            </div>
                            <Link to="#" className="btn btn-primary">
                                Setting
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
            {/* Renders Spinner */}
            {loading ? (
                <div className="d-flex justify-content-center mt-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <Row>
                        <Col xl={3} lg={6} md={12} sm={12}>
                            <StatRightIcon
                                title="Monthly Job Seeker"
                                value={dashboardData.monthlySeeker}
                                iconName="user"
                                iconColorVariant="primary"
                                classValue="mb-4"
                            />
                        </Col>
                        <Col xl={3} lg={6} md={12} sm={12}>
                            <StatRightIcon
                                title="Total Job Seeker"
                                value={dashboardData.totalSeeker}
                                iconName="users"
                                iconColorVariant="primary"
                                classValue="mb-4"
                            />
                        </Col>
                        <Col xl={3} lg={6} md={12} sm={12}>
                            <StatRightIcon
                                title="Monthly Job Provider"
                                value={dashboardData.monthlyProvider}
                                iconName="user-check"
                                iconColorVariant="primary"
                                classValue="mb-4"
                            />
                        </Col>
                        <Col xl={3} lg={6} md={12} sm={12}>
                            <StatRightIcon
                                title="Total Job Provider"
                                value={dashboardData.totalProvider}
                                iconName="users"
                                iconColorVariant="primary"
                                classValue="mb-4"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={8} lg={12} md={12} className="mb-4">
                            <Card>
                                <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="mb-0">Earnings</h4>
                                    </div>
                                    <div>
                                        <ChartActionMenu />
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <ApexCharts
                                        options={EarningsChartOptions}
                                        series={EarningsChartSeries}
                                        type="line"
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4} lg={12} md={12} className="mb-4">
                            <Card>
                                <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="mb-0">Traffic</h4>
                                    </div>
                                    <div>
                                        <ChartActionMenu />
                                    </div>
                                </Card.Header>
                                <Card.Body className="py-lg-7">
                                    <div id="chart">
                                        <ApexCharts
                                            options={TrafficChartOptions}
                                            series={TrafficChartSeries}
                                            type="donut"
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={4} lg={6} md={12} className="mb-4">
                            <PopularInstructor title="Popular Job Category" />
                        </Col>
                        <Col xl={4} lg={6} md={12} className="mb-4">
                            <RecentCourses title="Recent Jobs" />
                        </Col>
                        <Col xl={4} lg={6} md={12} className="mb-4">
                            <Activity title="Activity" />
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default Overview;
