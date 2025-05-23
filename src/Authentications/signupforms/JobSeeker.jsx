import { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import axios from "axios";
import { showToast } from "../../Components/Showtoast";

const formSchema = yup.object().shape({
  fullName: yup.string().required(" name can't be empty"),
  email: yup
    .string()
    .required("email can't be empty")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters and must contain at least a capital letter, a number, and a special character (!@#$%^&*)"
    ),
  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const StudentSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/register",
        {
          email: data.email,
          userType: "Jobseeker",
          password: data.password,
          username: data.fullName,
        }
      );
      setLoading(false);
      if (response.status === 201) {
        console.log(response.data.message);
        showToast(response.data.message);
        navigate(`/authentication/verify-email?email=${data.email}`);
      }
    } catch (error) {
      console.log("this is good");
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          {...register("fullName", { required: true })}
        />
        <small
          className="text-danger"
          style={{
            visibility: errors.fullName ? "visible" : "hidden",
          }}
        >
          {errors.fullName?.message}
        </small>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email", { required: true })}
        />
        <small
          className="text-danger"
          style={{
            visibility: errors.email ? "visible" : "hidden",
          }}
        >
          {errors.email?.message}
        </small>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <div className="position-relative">
          <Form.Control
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <div
            className="position-absolute end-20 top-50 translate-middle-y"
            style={{ right: "10px", cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <small className="text-danger">{errors.password?.message}</small>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <div className="position-relative">
          <Form.Control
            type={passwordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("cpassword", { required: true })}
          />
          <div
            className="position-absolute end-20 top-50 translate-middle-y"
            style={{ right: "10px", cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <small className="text-danger">{errors.cpassword?.message}</small>
      </Form.Group>
      {loading ? (
        <Button variant="primary" type="submit" className="opacity-50" disabled>
          Processing
        </Button>
      ) : (
        <Button variant="primary" type="submit">
          Sign Up as Job Seeker
        </Button>
      )}
    </Form>
  );
};

export default StudentSignUp;
