import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Logo from '../../assets/remsana-logo.png';
import { useGlobalContext } from '../../context/AuthContext'; 

const AdminSignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { Login } = useGlobalContext();
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const formSchema = yup.object().shape({
    email: yup.string().required('Email cannot be empty').email('Invalid email address'),
    password: yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const onSubmit = async data => {
    try {
      setLoading(true);
      await Login(data);
      // Redirect user to admin dashboard after successful authentication
      navigate('/admin/dashboard'); // Use navigate to redirect
    } catch (error) {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4" alt="" />
                </Link>
                <h1 className="mb-1 fw-bold">Sign in</h1>
                <span>
                  Don’t have an account?{' '}
                  <Link to="/admin/signup" className="ms-1">
                    Sign up
                  </Link>
                </span>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email address here"
                      {...register('email')}
                    />
                    <small className="text-danger">
                      {errors.email && errors.email.message}
                    </small>
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="**************"
                        {...register('password')}
                      />
                      <div
                        className="position-absolute end-20 top-50 translate-middle-y"
                        style={{ right: '10px', cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    <small className="text-danger">
                      {errors.password && errors.password.message}
                    </small>
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <div className="d-md-flex justify-content-between align-items-center">
                      <Form.Group
                        className="mb-3 mb-md-0"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check type="checkbox" label="Remember me" />
                      </Form.Group>
                      <Link to="/authentication/forget-password">
                        Forgot your password?
                      </Link>
                    </div>
                  </Col>
                  <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                    {/* Button */}
                    {loading ? (
                      <Button
                        variant="primary"
                        type="submit"
                        className="opacity-50"
                        disabled
                      >
                        Processing
                      </Button>
                    ) : (
                      <Button variant="primary" type="submit">
                        Sign in
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
              {error && <div className="text-danger mt-2">{error}</div>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AdminSignIn;
