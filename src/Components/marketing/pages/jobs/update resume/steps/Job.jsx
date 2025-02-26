import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FormSelect } from "../../../../../../Components/elements/form-select/FormSelect";
import axios from "axios";
import { showToast } from "../../../../../../Components/Showtoast";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../../../context/AuthContext";

const Job = (props) => {
  const { userId } = useGlobalContext();
  const { previous } = props;
  const [headline, setHeadline] = useState("");
  const [radioValue, setRadioValue] = useState("0");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [availabilityToJoin, setAvailabilityToJoin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const radios = [
    { name: "Full Time", value: "Full Time" },
    { name: "Freelance", value: "Freelance" },
    { name: "Contract", value: "Contract" },
  ];

  const jobTypes = [
    { value: "Permanent", label: "Permanent" },
    { value: "Contract", label: "Contract" },
  ];

  const locations = [
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Bombay", label: "Bombay" },
    { value: "Pune", label: "Pune" },
    { value: "Kerala", label: "Kerala" },
  ];

  const availabilitiesToJoin = [
    { value: "15 Days to less", label: "15 Days to less" },
    { value: "One Month", label: "One Month" },
    { value: "Within 15 days", label: "Within 15 days" },
    { value: "Immediately", label: "Immediately" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", sessionStorage.getItem("firstName"));
    formData.append("lastName", sessionStorage.getItem("lastName"));
    formData.append("middleName", sessionStorage.getItem("middleName"));
    formData.append("email", sessionStorage.getItem("email"));
    formData.append("contact", sessionStorage.getItem("contact"));
    formData.append("gender", sessionStorage.getItem("gender"));

    // Parse employmentData as an object
    const employmentData =
      JSON.parse(sessionStorage.getItem("employmentData")) || {};

    formData.append("salary", employmentData.salary || "nil");
    formData.append("companyAddress", employmentData.companyAddress || "nil");
    formData.append("companyCity", employmentData.companyCity || "nil");
    formData.append("companyCountry", employmentData.companyCountry || "nil");
    formData.append("companyName", employmentData.companyName || "nil");
    formData.append("companyState", employmentData.companyState || "nil");
    formData.append("dateOfJoining", employmentData.dateOfJoining || "nil");
    formData.append("dateOfLeaving", employmentData.dateOfLeaving || "nil");
    formData.append("jobTitle", employmentData.jobTitle || "nil");
    formData.append("jobType", employmentData.jobType || "nil");

    formData.append("school", sessionStorage.getItem("school"));
    formData.append("degree", sessionStorage.getItem("degree"));
    formData.append("study", sessionStorage.getItem("study"));
    formData.append("studyType", sessionStorage.getItem("studyType"));
    formData.append("startYear", sessionStorage.getItem("startYear"));
    formData.append("endYear", sessionStorage.getItem("endYear"));

    formData.append("resume", document.getElementById("resume").files[0]);
    formData.append("headline", headline);
    formData.append("workType", jobType);
    formData.append("workLocation", location);
    formData.append("workAvailability", availabilityToJoin);
    formData.append("userId", userId);

    axios
      .post(
        "https://unleashified-backend.azurewebsites.net/api/v1/seeker-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Response from API:", response.data);
        showToast(response.data.message);
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("lastName");
        sessionStorage.removeItem("middleName");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("contact");
        sessionStorage.removeItem("gender");
        sessionStorage.removeItem("employmentData");
        sessionStorage.removeItem("school");
        sessionStorage.removeItem("degree");
        sessionStorage.removeItem("study");
        sessionStorage.removeItem("studyType");
        sessionStorage.removeItem("startYear");
        sessionStorage.removeItem("endYear");
        

		navigate("/JobSeekerdashboard"); 

        
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        showToast(error.response.data.message);
        navigate("/JobSeekerdashboard");
      });
  };

  return (
    <Form encType="multipart/form-data">
      <Card className="card-bordered shadow-none mb-3">
        <Card.Body className="p-6">
          <div className="mb-4">
            <h2 className="mb-0">What kind of job are you looking for?</h2>
            <span>
              Add the details for are you looking for future opportunity.
            </span>
          </div>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Label htmlFor="resume-headline">Resume Headline</Form.Label>
              <Form.Control
                type="text"
                id="resume-headline"
                placeholder="Ex:Figma Designe"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                as={FormSelect}
                options={jobTypes}
                placeholder="Select"
                defaultselected=""
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label className="d-block">Employment Type</Form.Label>
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
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                placeholder="Enter your Location"
                defaultselected=""
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Availability to Join</Form.Label>
              <Form.Control
                as={FormSelect}
                options={availabilitiesToJoin}
                placeholder="Select"
                defaultselected=""
                value={availabilityToJoin}
                onChange={(e) => setAvailabilityToJoin(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label>Resume</Form.Label>
              <Form.Group className="mb-1 input-group">
                <Form.Control id="resume" type="file" />
                <Form.Label htmlFor="resume" className="input-group-text mb-0">
                  Upload
                </Form.Label>
                <Form.Text className="fs-6">
                  DOC, DOCx, PDF, RTF | Max: 2 MB. Recruiters give first
                  preference to candidates who have a resume
                </Form.Text>
              </Form.Group>
            </Col>
            <Col
              md={12}
              xs={12}
              className="d-md-flex justify-content-between mb-3"
            >
              <Button variant="outline-secondary" onClick={previous}>
                Go to Back
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit Application"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default Job;
