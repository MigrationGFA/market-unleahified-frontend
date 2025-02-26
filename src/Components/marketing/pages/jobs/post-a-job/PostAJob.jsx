import React, { useState } from "react";
import {
  ButtonGroup,
  ToggleButton,
  Col,
  Row,
  Form,
  Container,
  Button,
} from "react-bootstrap";
import GKTagsInput from "../../../../../Components/elements/tags/GKTagsInput";
import { FormSelect } from "../../../../elements/form-select/FormSelect";
import axios from "axios";
import { useGlobalContext } from "../../../../../context/AuthContext";
import { showToast } from "../../../../Showtoast";
import { useNavigate } from "react-router-dom";

const PostAJob = () => {
  const { userId } = useGlobalContext();
  const [tags, setTags] = useState({
    desiredCandidate: [],
    jobResponsibilities: [],
    jobPerksAndBenefits: [],
  });
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [radioValue, setRadioValue] = useState("0");
  const [jobTitle, setJobTitle] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRoles, setJobRoles] = useState("");
  const [jobFormat, setJobFormat] = useState("");
  const [jobSalaryFormat, setJobSalaryFormat] = useState("");

  const handleTagAdd = (tag, category) => {
    setTags((prevTags) => ({
      ...prevTags,
      [category]: [...prevTags[category], tag],
    }));
  };
  const navigate = useNavigate();

  const handleTagRemove = (tag, category) => {
    setTags((prevTags) => ({
      ...prevTags,
      [category]: prevTags[category].filter((t) => t.name !== tag.name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedTags = {
        desiredCandidate: tags.desiredCandidate.map((tag) => ({
          name: tag.name,
        })),
        jobResponsibilities: tags.jobResponsibilities.map((tag) => ({
          name: tag.name,
        })),
        jobPerksAndBenefits: tags.jobPerksAndBenefits.map((tag) => ({
          name: tag.name,
        })),
      };

      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/post-job",
        {
          jobPosterId: userId,
          jobTitle,
          desiredCandidate: formattedTags.desiredCandidate,
          jobRoles,
          jobExperience,
          jobResponsibilities: formattedTags.jobResponsibilities,
          jobPerksAndBenefits: formattedTags.jobPerksAndBenefits,
          department,
          jobLocation,
          jobType: radioValue,
          jobSalary,
          jobDescription,
          deliveryDate,
          jobFormat,
          jobSalaryFormat,
        }
      );
      console.log("Response:", response.data);
      showToast(response.data.message);
      navigate("/Providerdashboard");
      resetForm();
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      showToast(error.response.data.message);
    }
  };

  const resetForm = () => {
    setJobTitle("");
    setTags({
      desiredCandidate: [],
      jobResponsibilities: [],
      jobPerksAndBenefits: [],
    });
    setJobRoles("");
    setJobExperience("");
    setDepartment("");
    setJobLocation("");
    setRadioValue("0");
    setJobSalary("");
    setDeliveryDate("");
    setJobDescription("");
    setJobFormat("");
    setJobSalaryFormat("");
  };

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

  const jobSalaryFormats = [
    { value: "Fixed", label: "Fixed" },
    { value: "Hourly", label: "Hourly" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
   
  ];
  const radios = [
    { name: "Full Time", value: "Full Time" },
    { name: "Part Time", value: "Part Time" },
    { name: "Freelance", value: "Freelance" },
    { name: "Contract", value: "Contract" },
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
    <section className="py-6 py-lg-12 bg-white">
      <Container>
        <Row>
          <Col md={12} lg={5}>
            <div className="mb-12">
              <h1 className="display-4 mb-3 fw-bold">Post a job today</h1>
              <p className="mb-0 lead">
                Ready to post a job for your company? Choose your job type below
                and fill all the job information
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4} md={4} xs={12}>
            <div className="mb-4">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-info-circle text-primary"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0
                8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="m8.93
                  6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738
                  3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252
                  1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275
                  0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0
                  1 1 0 0 1 2 0z"
                  />
                </svg>
              </div>
              <h3> Job information</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adillicitudin iaculis
                nunc et convallis.
              </p>
            </div>
          </Col>
          <Col lg={{ span: 7, offset: 1 }} md={8} xs={12}>
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Job Title */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-title">
                    Job title<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="job-title"
                    placeholder="Write  the Job Title"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </Col>
                {/* Select Department */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="department">
                    Select Department<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as={FormSelect}
                    options={departments}
                    placeholder="Select Department"
                    defaultValue=""
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                </Col>

                <Col md={12} xs={12} className="mb-3">
                  {/* Job location */}
                  <Form.Label className="d-block">Job Format</Form.Label>
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Onsite"
                    checked={jobFormat === "Onsite"}
                    onChange={() => setJobFormat("Onsite")}
                  />
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Remote"
                    checked={jobFormat === "Remote"}
                    onChange={() => setJobFormat("Remote")}
                  />
                  <Form.Check
                    type="radio"
                    name="job-format"
                    label="Onsite or Remote"
                    checked={jobFormat === "Onsite or Remote"}
                    onChange={() => setJobFormat("Onsite or Remote")}
                  />
                </Col>
                {/* Job Location */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-location">Job Location</Form.Label>
                 
                   <Form.Control
                    as={FormSelect}
                    options={jobLocations}
                    placeholder="Select Job Location"
                    defaultValue=""
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    required
                  />
                </Col>
                {/* Job Type */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label className="d-block">
                    Job Type<span className="text-danger">*</span>
                  </Form.Label>
                  <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-primary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Col>
                {/* Job Salary */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-salary">Job Salary</Form.Label>
                  <Form.Control
                    type="text"
                    id="job-salary"
                    placeholder="Enter job salary"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                  />
                </Col>

                 {/* Select Job Format */}
                 <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="jobSalaryFormat">
                    Job Salary Format<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as={FormSelect}
                    options={jobSalaryFormats}
                    placeholder="Select Salary price format"
                    defaultValue=""
                    value={jobSalaryFormat}
                    onChange={(e) => setJobSalaryFormat(e.target.value)}
                    required
                  />
                </Col>
                {/* Job Experience */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-experience">
                    Job Experience
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="job-experience"
                    placeholder="Enter job experience"
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </Col>
                {/* Job Delivery */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-delivery">
                    Delivery (in day(s))
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="job-delivery"
                    placeholder="Enter delivery days"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </Col>
                {/* Job Description */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-description">
                    Job Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="job-description"
                    placeholder="Write job description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </Col>
                {/* Job Role */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="job-role">Job Role</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="job-role"
                    placeholder="Write job role"
                    value={jobRoles}
                    onChange={(e) => setJobRoles(e.target.value)}
                  />
                </Col>
                {/* Job Responsibilities */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="jobResponsibilities">
                    Job Responsibilities
                  </Form.Label>
                  <GKTagsInput
                    defaultTags={tags.jobResponsibilities}
                    onAddTag={(tag) => handleTagAdd(tag, "jobResponsibilities")}
                    onRemoveTag={(tag) =>
                      handleTagRemove(tag, "jobResponsibilities")
                    }
                  />
                </Col>
                {/* Desired Candidate */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="desiredCandidate">
                    Desired Candidate Profile
                  </Form.Label>
                  <GKTagsInput
                    defaultTags={tags.desiredCandidate}
                    onAddTag={(tag) => handleTagAdd(tag, "desiredCandidate")}
                    onRemoveTag={(tag) =>
                      handleTagRemove(tag, "desiredCandidate")
                    }
                  />
                </Col>
                {/* Job Perks and Benefits */}
                <Col md={12} xs={12} className="mb-3">
                  <Form.Label htmlFor="jobPerksAndBenefits">
                    Job Perks and Benefits
                  </Form.Label>
                  <GKTagsInput
                    defaultTags={tags.jobPerksAndBenefits}
                    onAddTag={(tag) => handleTagAdd(tag, "jobPerksAndBenefits")}
                    onRemoveTag={(tag) =>
                      handleTagRemove(tag, "jobPerksAndBenefits")
                    }
                  />
                </Col>

                {/* Submit Button */}
                <Col md={12} xs={12} className="mb-3">
                  {loading ? (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      className="opacity-50"
                      disabled
                    >
                      Processing
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PostAJob;
