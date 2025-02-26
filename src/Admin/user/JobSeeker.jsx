import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Tab, Breadcrumb, Spinner } from 'react-bootstrap';
import GridListViewButton from '../../Components/elements/miscellaneous/GridListViewButton';
import StudentsGridCard from './StudentsGridCard';
import StudentsListItems from './StudentsListItems';
import axios from 'axios';

const Students = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
		const fetchStudents = async () => {
			try {
                setLoading(true); // Start loading spinner
				const response = await axios.get('https://remsana-backend-testing.azurewebsites.net/api/v1/students');
				setStudentsData(response.data);
				console.log(response.data);
			} catch (error) {
				console.error('Error fetching student data:', error);
			} finally {
                setLoading(false); // Stop loading spinner
            }
		};
        fetchStudents();
    }, []);

   

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    return (
        <Fragment>
            <Tab.Container defaultActiveKey="grid">
                <Row>
                    {/* Breadcrumb and other UI elements */}
                </Row>

                <Tab.Content>
                    <Tab.Pane eventKey="grid" className="pb-4">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <StudentsGridCard students={studentsData} />
                        )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="list" className="pb-4">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <StudentsListItems students={studentsData} />
                        )}
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Fragment>
    );
};

export default Students;
