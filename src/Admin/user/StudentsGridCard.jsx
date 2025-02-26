import React, { Fragment, useState, useEffect } from 'react';
import { Col, Card, Image, Row, Form } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { MapPin } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { numberWithCommas } from '../../helper/utils';
import axios from 'axios';

const StudentsGridCard = () => {
    const [students, setStudentsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const studentsPerPage = 8;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://remsana-backend-testing.azurewebsites.net/api/v1/students');
            setStudentsList(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students data:', error);
            setError('Failed to fetch students data');
            setLoading(false);
        }
    };

    const pagesVisited = pageNumber * studentsPerPage;
    const pageCount = Math.ceil(students.length / studentsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const filteredStudents = students.filter(student =>
        Object.values(student)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const displayStudents = filteredStudents
        .slice(pagesVisited, pagesVisited + studentsPerPage)
        .map(student => (
            <Col xl={3} lg={6} md={6} sm={12} key={student.id}>
                <Card className="mb-5">
                    <Card.Body>
                        <div className="text-center">
                            <div className="position-relative">
                                <Image
                                    src={student.imageUrl}
                                    className="rounded-circle avatar-xl mb-3"
                                    alt=""
                                />
                            </div>
                            <h4 className="mb-0">{student.username}</h4>
                            <p className="mb-0">
                                <MapPin size="12" className="me-1 fs-6" />
                                {student.state}, {student.country}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2 mt-6">
                            <span>Payments</span>
                            <span className="text-dark">
                                ${numberWithCommas(student.totalAmountPaid)}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                            <span>Joined at</span>
                            <span>{new Date(student.joinDate).toLocaleDateString()}</span>
                        </div>
                        <div className="d-flex justify-content-between pt-2">
                            <span>Courses</span>
                            <span className="text-dark"> {student.totalCoursesEnrolled} </span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ));

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error
		) {
			return <div>Error: {error}</div>;
			}
			return (
    <Fragment>
        <div className="mb-4">
            <Form.Control
                type="search"
                placeholder="Search Students"
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
        <Row>
            {displayStudents.length > 0 ? (
                displayStudents
            ) : (
                <Col>No matching students found.</Col>
            )}
        </Row>

        <ReactPaginate
            previousLabel={<ChevronLeft size="14px" />}
            nextLabel={<ChevronRight size="14px" />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'justify-content-center mb-0 pagination'}
            previousLinkClassName={'page-link mx-1 rounded'}
            nextLinkClassName={'page-link mx-1 rounded'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link mx-1 rounded'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'active'}
        />
    </Fragment>
);
};

export default StudentsGridCard;