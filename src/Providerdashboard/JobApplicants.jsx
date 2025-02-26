import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import JobApplicantCard from "../Components/marketing/common/cards/JobApplicantCard";
import ProviderProfileLayout from "./ProviderProfileLayout";
import axios from "axios";
import { useGlobalContext } from "../context/AuthContext";

const JobApplicants = () => {
  const { userId } = useGlobalContext();
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-my-applicants/${userId}`
        );
        setJobs(response.data.applicants);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`https://unleashified-backend.azurewebsites.net/api/v1/get-my-applicants/${userId}`);
  //     setJobs(response.data.applicants);
  //     setError(null);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Error fetching data. Please try again.");
  //   }
  // };

  const handleSelectJob = (event) => {
    const jobId = parseInt(event.target.value);
    setSelectedJobId(jobId);
  };

  return (
    <ProviderProfileLayout>
      {error && <div className="text-danger">{error}</div>}
      <Row className="mb-3">
        <Col>
          <Form.Select onChange={handleSelectJob}>
            <option value="">Select Job Posted</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.seekerResume.firstName} {job.seekerResume.lastName}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {jobs.length === 0 && !error && (
          <div className="text-center">No job applicants available.</div>
        )}
        {jobs.map((job) => (
          <Col key={job.id} md={6} lg={4}>
            {selectedJobId === null || selectedJobId === job.id ? (
              <JobApplicantCard
                applicantName={`${job.seekerResume.firstName} ${job.seekerResume.lastName}`}
                applicantImage={job.seekerResume.image}
                jobTitle={job.JobTitle ? job.JobTitle : "Not available"}
                resumeUrl={job.seekerResume.resumeUrl}
                jobId={job.jobId}
                jobSeeker={job.userId}
              />
            ) : null}
          </Col>
        ))}
      </Row>
    </ProviderProfileLayout>
  );
};

export default JobApplicants;
