import React, { Fragment, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Col, Row, Spinner } from 'react-bootstrap';

import JobListingGridviewCard from '../../../../../Components/marketing/common/cards/JobListingGridviewCard';
import axios from 'axios';

const JobsGridView = ({ setTotalFilteredJobs, filterOptions }) => {
    const [jobsData, setJobsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const recordsPerPage = 6;
    const pagesVisited = pageNumber * recordsPerPage;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let filteredJobs = [];

                if (
                    filterOptions &&
                    (filterOptions.jobFormat ||
                        filterOptions.department ||
                        filterOptions.jobLocation ||
                        filterOptions.jobType ||
                        filterOptions.salaryRange)
                ) {
                    const requestData = {
                        jobFormat: filterOptions.jobFormat || [],
                        department: filterOptions.department || [],
                        jobLocation: filterOptions.jobLocation || [],
                        jobType: filterOptions.jobType || [],
                        salaryRange: filterOptions.salaryRange || [],
                    };

                    const response = await axios.post(
                        'https://unleashified-backend.azurewebsites.net/api/v1/jobs/job-list',
                        requestData
                    );
                    if (response.data && Array.isArray(response.data.jobs)) {
                        filteredJobs = response.data.jobs;
                        setTotalFilteredJobs(filteredJobs.length);
                    }
                } else {
                    const response = await axios.get('https://unleashified-backend.azurewebsites.net/api/v1/all-jobs');
                    if (response.data && Array.isArray(response.data.jobs)) {
                        filteredJobs = response.data.jobs;
                        setTotalFilteredJobs(filteredJobs.length);
                    }
                }
                setJobsData(filteredJobs);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(error.message); // Set the error message
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filterOptions, setTotalFilteredJobs]);


    // Check if jobsData is an array and has length
    const displayRecords = Array.isArray(jobsData) && jobsData.length > 0 ? (
        jobsData
        .slice(pagesVisited, pagesVisited + recordsPerPage)
            .map((item, index) => (
                <Col lg={6} xs={12} className="mb-4" key={item.id || item._id}>
                    <JobListingGridviewCard 
                    key={index}
                          item={item}
                          viewby="grid"
                          />
                </Col>
            ))
    ) : null;
    

    // Calculate page count only if jobsData is valid
    const pageCount = Array.isArray(jobsData) ? Math.ceil(jobsData.length /recordsPerPage) : 0;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <Fragment>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Fragment>
                    {error && ( // Display toast if there's an error
                        <Toast>
                            <Toast.Body>{error}</Toast.Body>
                        </Toast>
                    )}
                    <Row>
                        {displayRecords || <Col>No jobs found.</Col>}
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
         )}
         </Fragment>
    );
};

export default JobsGridView;
