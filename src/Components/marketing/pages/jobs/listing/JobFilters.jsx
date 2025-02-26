import React, { useState } from "react";
import { Card, Collapse, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import RangeSlider from "../../../../../Components/elements/range-slider/RangeSlider";
import { getSlug } from "../../../../../helper/utils";

const JobFilters = ({ onFilterChange }) => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openSalary, setOpenSalary] = useState(false);
  const [openDepartments, setOpenDepartments] = useState(false);
  const jobFormat = ["Remote", "Onsite", "Remote or Onsite"];
  const jobType = ["Part-time", "Contract", "Full-time"];
  const [selectedJobFormat, setSelectedJobFormat] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  // Define state for selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    department: "",
    jobLocation: "",
    salaryRange: "",
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    try {

      const requestData = {
        department: [selectedFilters.department], // Convert to array
        jobLocation: [selectedFilters.jobLocation], // Convert to array
        salaryRange: selectedFilters.salaryRange,
        jobFormat: selectedJobFormat.map((format) => format.toLowerCase()), 
        jobType: selectedJobType.map((type) => type.toLowerCase()), 
      };
      
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/jobs/job-list",
        requestData
      );

      // Pass selected filters to parent component
      onFilterChange(response.data.jobs);
      console.log("Filters applied successfully");
    } catch (error) {
      console.error("Error applying filters:", error);
      console.log("An error occurred while applying filters.");
    }
  };

  const handleJobFormatChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedJobFormat((prev) => [...prev, value]);
    } else {
      setSelectedJobFormat((prev) =>
        prev.filter((jobFormat) => jobFormat !== value)
      );
    }
  };
  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

   const handleJobTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedJobType((prev) => [...prev, value]);
    } else {
      setSelectedJobType((prev) =>
        prev.filter((jobType) => jobType !== value)
      );
    }
  };
  
  const handleRangeChange = (value) => {
    const salaryRangeString = value.join("-").toString();
    setSelectedFilters({
      ...selectedFilters,
      salaryRange: salaryRangeString,
    });
  };

  // Dummy data for dropdowns
  const departments = [
    { value: "Graphics & Design", label: "Graphics & Design" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Video & Animation", label: "Video & Animation" },
    { value: "Music & Audio", label: "Music & Audio" },
    { value: "Programming & Tech", label: "Programming & Tech" },
    { value: "Business Development", label: "Business Development" },
    { value: "Photography", label: "Photography" },
    { value: "Catering", label: "Catering" },
    { value: "Lifestyle & Health", label: "Lifestyle & Health" },
    { value: "Logo Making", label: "Logo Making" },
    { value: "Mobile Developer", label: "Mobile Developer" },
    { value: "Data Analytics", label: "Data Analytics" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "UI / UX Design", label: "UI / UX Design" },
    { value: "SEO", label: "SEO" },
    { value: "Finance", label: "Finance" },
    { value: "End-to-End Projects", label: "End-to-End Projects" },
    { value: "SEO", label: "SEO" },
  ];

  const jobLocations = [
    { value: "Abia, Nigeria", label: "Abia, Nigeria" },
    { value: "Adamawa, Nigeria", label: "Adamawa, Nigeria" },
    { value: "Akwa Ibom, Nigeria", label: "Akwa Ibom, Nigeria" },
    { value: "Anambra, Nigeria", label: "Anambra, Nigeria" },
    { value: "Bauchi, Nigeria", label: "Bauchi, Nigeria" },
    { value: "Bayelsa, Nigeria", label: "Bayelsa, Nigeria" },
    { value: "Benue, Nigeria", label: "Benue, Nigeria" },
    { value: "Borno, Nigeria", label: "Borno, Nigeria" },
    { value: "Cross River, Nigeria", label: "Cross River, Nigeria" },
    { value: "Delta, Nigeria", label: "Delta, Nigeria" },
    { value: "Ebonyi, Nigeria", label: "Ebonyi, Nigeria" },
    { value: "Edo, Nigeria", label: "Edo, Nigeria" },
    { value: "Ekiti, Nigeria", label: "Ekiti, Nigeria" },
    { value: "Enugu, Nigeria", label: "Enugu, Nigeria" },
    { value: "Gombe, Nigeria", label: "Gombe, Nigeria" },
    { value: "Imo, Nigeria", label: "Imo, Nigeria" },
    { value: "Jigawa, Nigeria", label: "Jigawa, Nigeria" },
    { value: "Kaduna, Nigeria", label: "Kaduna, Nigeria" },
    { value: "Kano, Nigeria", label: "Kano, Nigeria" },
    { value: "Katsina, Nigeria", label: "Katsina, Nigeria" },
    { value: "Kebbi, Nigeria", label: "Kebbi, Nigeria" },
    { value: "Kogi, Nigeria", label: "Kogi, Nigeria" },
    { value: "Kwara, Nigeria", label: "Kwara, Nigeria" },
    { value: "Lagos, Nigeria", label: "Lagos, Nigeria" },
    { value: "Nasarawa, Nigeria", label: "Nasarawa, Nigeria" },
    { value: "Niger, Nigeria", label: "Niger, Nigeria" },
    { value: "Ogun, Nigeria", label: "Ogun, Nigeria" },
    { value: "Ondo, Nigeria", label: "Ondo, Nigeria" },
    { value: "Osun, Nigeria", label: "Osun, Nigeria" },
    { value: "Oyo, Nigeria", label: "Oyo, Nigeria" },
    { value: "Plateau, Nigeria", label: "Plateau, Nigeria" },
    { value: "Rivers, Nigeria", label: "Rivers, Nigeria" },
    { value: "Sokoto, Nigeria", label: "Sokoto, Nigeria" },
    { value: "Taraba, Nigeria", label: "Taraba, Nigeria" },
    { value: "Yobe, Nigeria", label: "Yobe, Nigeria" },
    { value: "Zamfara, Nigeria", label: "Zamfara, Nigeria" },
  ];

  return (
    <Card className="border mb-6 mb-md-0 shadow-none">
      <Card.Header>
        <h4 className="mb-0 fs-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-filter text-muted me-2"
            viewBox="0 0 16 16"
          >
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>
          All Filters
        </h4>
      </Card.Header>
      <Card.Body className="border-top py-3">
        <Link
          to="#"
          onClick={() => setOpenSalary(!openSalary)}
          aria-controls="Job Format"
          aria-expanded={openSalary}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Job Format
          <span className="float-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </Link>
        <Collapse in={openSalary}>
          <div id="Job Format">
            <Form>
              {/* Checkboxes for Levels */}
              {jobFormat.map((jobFormat, index) => (
                <Form.Check
                  type="checkbox"
                  className="mb-1"
                  label={capitalizeFirstLetter(jobFormat)}
                  value={jobFormat}
                  onChange={handleJobFormatChange}
                  key={index}
                />
              ))}
            </Form>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Body className="py-3">
        <Link
          to="#"
          onClick={() => setOpenDepartments(!openDepartments)}
          aria-controls="departments"
          aria-expanded={openDepartments}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Departments
          <span className="float-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </Link>
        <Collapse in={openDepartments}>
          <div id="departments">
            <div className="mt-3">
              <Form.Select
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    department: e.target.value,
                  })
                }
              >
                <option>Select Department</option>
                {departments.map((department, index) => (
                  <option key={index}>{department.label}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Body className="py-3">
        <Link
          to="#"
          onClick={() => setOpenLocation(!openLocation)}
          aria-controls="locations"
          aria-expanded={openLocation}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Locations
          <span className="float-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </Link>
        <Collapse in={openLocation}>
          <div id="locations">
            <div className="mt-3">
              <Form.Select
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    jobLocation: e.target.value,
                  })
                }
              >
                <option>Select Location</option>
                {jobLocations.map((location, index) => (
                  <option key={index}>{location.label}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Body className="border-top py-3">
        <Link
          to="#"
          onClick={() => setOpenSalary(!openSalary)}
          aria-controls="Job Type"
          aria-expanded={openSalary}
          className="fs-5 text-dark fw-semi-bold"
          data-bs-toggle="collapse"
        >
          Job Type
          <span className="float-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </Link>
        <Collapse in={openSalary}>
          <div id="Job Type">
          <Form>
              {/* Checkboxes for Levels */}
              {jobType.map((jobType, index) => (
                <Form.Check
                  type="checkbox"
                  className="mb-1"
                  label={capitalizeFirstLetter(jobType)}
                  value={jobType}
                  onChange={handleJobTypeChange}
                  key={index}
                />
              ))}
            </Form>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Body className="border-top py-3">
      <h4 className="mb-8 fs-5">Salary Range</h4>
      <RangeSlider
  startValue={[50000]} 
  rangeMin={50000}
  rangeMax={1000000}
  onChange={(value) => {
   
    handleRangeChange(value); 
  }}
/>

      <div className="d-flex justify-content-between mt-2 fs-6 text-dark">
        <span>₦50,000</span>
        <span>₦1,000,000</span>
      </div>
    </Card.Body>

      <Card.Body className="py-3 d-grid">
        <Button variant="primary" onClick={handleSubmit}>
          Apply Filters
        </Button>
      </Card.Body>
    </Card>
  );
};

export default JobFilters;
