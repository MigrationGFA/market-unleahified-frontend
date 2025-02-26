import { Col, Row, Container, Tab } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import JobSearchBox from '../../../../../Components/marketing/common/jobs/JobSearchBox';
import JobFilters from './JobFilters';
import GridListViewButton from '../../../../../Components/elements/miscellaneous/GridListViewButton';
import JobsListView from './JobsListView';
import JobsGridView from './JobsGridView';
import FormSelect from '../../../../elements/form-select/FormSelect';

const JobsList = () => {
    const [jobsData, setJobsData] = useState([]);
	const [filterOptions, setFilterOptions] = useState({});
	const [totalFilteredJobs, setTotalFilteredJobs] = useState(0); 


	useEffect(() => {
		// Set initial filter options to display all courses
		setFilterOptions({ displayAll: true });
	  }, []);
	
	  // Function to handle filter change
	  const handleFilterChange = (filterData) => {
		setFilterOptions(filterData);
		// Reset current page to 1 when filter changes
		setCurrentPage(1);
		// Reset total count when filter changes
		setTotalFilteredJobs(0);
	  };
	

    const sortByOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' }
    ];

    return (
        <Fragment>
            <section className="py-8 bg-light">
                <Container>
                    <Row>
                        <Col lg={8} md={10} xs={12}>
                            <JobSearchBox />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="py-8 bg-white">
                <Container>
                    <Row>
                        <Col md={4} xl={3}>
                            <JobFilters onFilterChange={handleFilterChange} />
                        </Col>
                        <Col xl={9} md={8} className="mb-6 mb-md-0">
                            <Tab.Container defaultActiveKey="grid">
                                <Row className="align-items-center mb-4">
                                    <Col xs>
                                        <p className="mb-0">
                                            1 - 20 of {jobsData.length} IT Manager Jobs in Nigeria
                                        </p>
                                    </Col>
                                    <Col xs="auto">
                                        <div className="d-flex ">
                                            <GridListViewButton keyGrid="grid" keyList="list" />
                                            <FormSelect
                                                options={sortByOptions}
                                                placeholder="Sorting"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Tab.Content>
                                    <Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
                                        <JobsListView filterOptions={filterOptions} setTotalFilteredJobs={setTotalFilteredJobs}  />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="grid" className="pb-4 px-0">
                                        <JobsGridView filterOptions={filterOptions} setTotalFilteredJobs={setTotalFilteredJobs}  />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default JobsList;
