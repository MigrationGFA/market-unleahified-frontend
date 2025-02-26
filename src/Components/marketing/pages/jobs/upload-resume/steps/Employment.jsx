import React, { useEffect, useState } from "react";
import { Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { FormSelect } from "../../../../../../Components/elements/form-select/FormSelect";
import { FlatPickr } from "../../../../../../Components/elements/flat-pickr/FlatPickr";

const Employment = (props) => {
  const { next, previous } = props;
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    companyName: "",
    companyAddress: "",
    companyCity: "",
    companyCountry: "",
    companyState: "",
    dateOfJoining: new Date(),
    dateOfLeaving: new Date(),
    salary: "",
  });

  const states = [
    { value: "Abia", label: "Abia" },
    { value: "Adamawa", label: "Adamawa" },
    { value: "Akwa Ibom", label: "Akwa Ibom" },
    { value: "Anambra", label: "Anambra" },
    { value: "Bauchi", label: "Bauchi" },
    { value: "Bayelsa", label: "Bayelsa" },
    { value: "Benue", label: "Benue" },
    { value: "Borno", label: "Borno" },
    { value: "Cross River", label: "Cross River" },
    { value: "Delta", label: "Delta" },
    { value: "Ebonyi", label: "Ebonyi" },
    { value: "Edo", label: "Edo" },
    { value: "Ekiti", label: "Ekiti" },
    { value: "Enugu", label: "Enugu" },
    { value: "Gombe", label: "Gombe" },
    { value: "Imo", label: "Imo" },
    { value: "Jigawa", label: "Jigawa" },
    { value: "Kaduna", label: "Kaduna" },
    { value: "Kano", label: "Kano" },
    { value: "Katsina", label: "Katsina" },
    { value: "Kebbi", label: "Kebbi" },
    { value: "Kogi", label: "Kogi" },
    { value: "Kwara", label: "Kwara" },
    { value: "Lagos", label: "Lagos" },
    { value: "Nasarawa", label: "Nasarawa" },
    { value: "Niger", label: "Niger" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ondo", label: "Ondo" },
    { value: "Osun", label: "Osun" },
    { value: "Oyo", label: "Oyo" },
    { value: "Plateau", label: "Plateau" },
    { value: "Rivers", label: "Rivers" },
    { value: "Sokoto", label: "Sokoto" },
    { value: "Taraba", label: "Taraba" },
    { value: "Yobe", label: "Yobe" },
    { value: "Zamfara", label: "Zamfara" },
  ];
  const radios = [
    { name: "Full Time", value: "Full Time" },
    { name: "Freelance", value: "Freelance" },
    { name: "Contract", value: "Contract" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAndContinue = () => {
    sessionStorage.setItem("employmentData", JSON.stringify(formData));
    next();
  };
  const handleDateOfJoiningChange = (selectedDates) => {
    const selectedDate = selectedDates[0];
    console.log("Selected Date of Joining:", selectedDate); // Log the selected date
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : ""; // Convert to ISO string (YYYY-MM-DD)
    console.log("Formatted Date of Joining:", formattedDate); // Log the formatted date
    setFormData((prevData) => ({
      ...prevData,
      dateOfJoining: formattedDate,
    }));
  };

  useEffect(() => {
    const employmentDataString = sessionStorage.getItem("employmentData");
    if (employmentDataString) {
      const employmentData = JSON.parse(employmentDataString);
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...employmentData, // Merge all fields from employmentData into formData
      }));
    }
  }, []);

  const handleDateOfLeavingChange = (selectedDates) => {
    const selectedDate = selectedDates[0];
    console.log("Selected Date of Relieving:", selectedDate); // Log the selected date
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : ""; // Convert to ISO string (YYYY-MM-DD)
    console.log("Formatted Date of Relieving:", formattedDate); // Log the formatted date
    setFormData((prevData) => ({
      ...prevData,
      dateOfLeaving: formattedDate,
    }));
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="jobTitle">Job title</Form.Label>
        <Form.Control
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          placeholder="Write the Job Title"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="d-block">Job type</Form.Label>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="outline-primary"
              name="jobType"
              value={radio.value}
              checked={formData.jobType === radio.value}
              onChange={handleChange}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyName">Company Name</Form.Label>
        <Form.Control
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          placeholder="Company Name"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyAddress">Company Address</Form.Label>
        <Form.Control
          type="text"
          id="companyAddress"
          name="companyAddress"
          value={formData.companyAddress}
          placeholder="Company Address"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyCity">Company City</Form.Label>
        <Form.Control
          type="text"
          id="companyCity"
          name="companyCity"
          value={formData.companyCity}
          placeholder="Company City"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="companyCountry">Company Country</Form.Label>
        <Form.Control
          type="text"
          id="companyCountry"
          name="companyCountry"
          value={formData.companyCountry}
          placeholder="Company Country"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Company State</Form.Label>
        <Form.Control
          as={FormSelect}
          options={states}
          placeholder="States"
          defaultselected=""
          value={formData.companyState}
          onChange={handleChange}
          name="companyState"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="dateOfJoining">Date of Joining</Form.Label>
        <FlatPickr
          value={formData.dateOfJoining}
          placeholder="Date of Joining"
          onChange={handleDateOfJoiningChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="dateOfRelieving">Date of relieving</Form.Label>
        <FlatPickr
          value={formData.dateOfLeaving}
          placeholder="Date of relieving"
          onChange={handleDateOfLeavingChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="salary">Annual Salary</Form.Label>
        <Form.Control
          type="text"
          id="salary"
          name="salary"
          value={formData.salary}
          placeholder="Eg. 1,000,000"
          onChange={handleChange}
        />
      </Form.Group>
      <div className="d-md-flex justify-content-between mb-3">
        <Button variant="outline-secondary" onClick={previous}>
          Go to Back
        </Button>
        <div className="mt-2 mt-md-0 d-flex justify-content-between">
          <Button variant="outline-secondary" className="me-2" onClick={next}>
            Skip
          </Button>
          <Button variant="primary" onClick={handleSaveAndContinue}>
            Save and Continue
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Employment;
