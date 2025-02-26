import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FormSelect } from "../../../../../../Components/elements/form-select/FormSelect";

const Education = (props) => {
  const { next, previous } = props;
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [study, setStudy] = useState("");
  const [studyType, setStudyType] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const radios = [
    { name: "Full Time", value: "Full Time" },
    { name: "Part Time", value: "Part Time" },
  ];

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const years = Array.from({ length: 17 }, (_, i) => {
    const year = 2008 + i;
    return { value: year.toString(), label: year.toString() };
  });

  useEffect(() => {
    // Validate form on each state change
    validateForm();
  }, [school, degree, study, studyType, fromMonth, fromYear, toMonth, toYear]);

  const validateForm = () => {
    // Check if all required fields are filled
    const isValid =
      school !== "" &&
      degree !== "" &&
      study !== "" &&
      studyType !== "" &&
      fromMonth !== "" &&
      fromYear !== "" &&
      toMonth !== "" &&
      toYear !== "";
    setIsFormValid(isValid);
  };

  const formatMonthYear = (month, year) => {
	return `${month}, ${year}`;
  };
  
  const saveToSessionStorage = () => {
	const startYear = formatMonthYear(fromMonth, fromYear);
	const endYear = formatMonthYear(toMonth, toYear);
  
	sessionStorage.setItem("school", school);
	sessionStorage.setItem("degree", degree);
	sessionStorage.setItem("study", study);
	sessionStorage.setItem("studyType", studyType);
	sessionStorage.setItem("startYear", startYear);
	sessionStorage.setItem("endYear", endYear);
  };
  
  return (
    <Form>
      <Card className="card-bordered shadow-none mb-3">
        <Card.Body className="p-6">
          <div className="mb-4">
            <h2 className="mb-0">Education</h2>
            <span>
              Add your education detail like school, degree, and graduate.
            </span>
          </div>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Label htmlFor="school-university">
                School / University / Bootcamp
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="school-university"
                placeholder="School / University / Bootcamp"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label htmlFor="degree">
                Degree / Certificate<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="degree"
                placeholder="Degree / Certificate"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label htmlFor="study">
                Field of Study<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="study"
                placeholder="Field of Study"
                value={study}
                onChange={(e) => setStudy(e.target.value)}
                required
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label className="d-block">Course Type</Form.Label>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={studyType === radio.value}
                    onChange={(e) => setStudyType(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
            <Col xs={12}>
              <Form.Label>From</Form.Label>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Control
                as={FormSelect}
                options={months}
                placeholder="Month"
                defaultSelected=""
                value={fromMonth}
                onChange={(e) => setFromMonth(e.target.value)}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Control
                as={FormSelect}
                options={years}
                placeholder="Year"
                defaultSelected=""
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                required
              />
            </Col>
            <Col className="col-12">
              <Form.Label>To</Form.Label>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Control
                as={FormSelect}
                options={months}
                placeholder="Month"
                defaultSelected=""
                value={toMonth}
                onChange={(e) => setToMonth(e.target.value)}
                required
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Control
                as={FormSelect}
                options={years}
                placeholder="Year"
                defaultSelected=""
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
                required
              />
            </Col>
            <Col
              md={12}
              xs={12}
              className="d-md-flex justify-content-between mb-3"
            >
              <Button variant="outline-secondary" onClick={previous}>
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  saveToSessionStorage();
                  next();
                }}
                disabled={!isFormValid}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default Education;
