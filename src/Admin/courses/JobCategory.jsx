import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Breadcrumb, Button, Modal, Spinner } from 'react-bootstrap'; 
import TanstackTable from '../../Components/elements/advance-table/TanstackTable';
import AddNewCategoryPopup from './AddNewCategoryPopup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoursesCategory = () => {
    const [show, setShow] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://remsana-backend-testing.azurewebsites.net/api/v1/course-categories');
                setCourses(response.data);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false); 
                
            }
        };

        fetchCourses();
    }, []);

    const handleCategoryClick = async (_id) => {
        navigate(`/courses/category-single/${_id}`);
    };

    const columns = useMemo(
        () => [
            {
                id: 'serialNumber',
                header: 'S/N',
                cell: ({ row }) => (
                    <div className="px-1">{row.index + 1}</div>
                ),
            },
            { accessorKey: '_id', header: 'Category',
              cell: ({ row }) => (
                <button 
    onClick={() => handleCategoryClick(row.original._id)} 
    style={{ 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer', 
        padding: 0,  
        margin: 0,   
    }}
>
    {row.original._id}
</button>

              ),
            },
            { accessorKey: 'totalNumberOfCourses', header: 'Courses Created' },
            { accessorKey: 'totalNumberOfStudent', header: 'Students' },
            { accessorKey: 'totalReviews', header: 'Review' },
            { accessorKey: 'totalAmountPaid', header: 'Total Subscription' },
            { accessorKey: 'slug', header: 'Slug' },
        ],
        []
    );

    const data = useMemo(() => courses, [courses]);

    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">Job Category</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Jobs</Breadcrumb.Item>
                                <Breadcrumb.Item active>Job Category</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Button variant="primary" onClick={handleShow}>
                                Add New Category
                            </Button>
                            <Modal show={show} onHide={handleClose} size="lg">
                                <Modal.Header closeButton>
                                    <Modal.Title>Create New Category</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddNewCategoryPopup />
                                </Modal.Body>
                                <Modal.Footer className="d-flex justify-content-start border-0 pt-0">
                                    <Button variant="primary" onClick={handleClose}>
                                        Add New Category
                                    </Button>
                                    <Button variant="outline-secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Render Spinner while loading */}
            {loading ? (
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <div className="d-flex justify-content-center mt-4">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <Card>
                            <Card.Body className="p-0">
                                <TanstackTable
                                    data={data}
                                    columns={columns}
                                    filter={true}
                                    filterPlaceholder="Search Course Category"
                                    pagination={true}
                                    showRowNumber={true} 
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Fragment>
    );
};

export default CoursesCategory;