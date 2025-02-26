// import node module libraries
import { Col, Row, Container, Button } from "react-bootstrap";

// import custom components
import StatTopSVGIcon from "../Components/marketing/common/stats/StatTopSVGIcon";

// import required data files
import JobCategoriesData from "../data/marketing/jobs/JobCategoriesData";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BrowseJobCategories = () => {
  return (
    <section className="py-lg-14 bg-light pt-8 pb-10">
      <Container>
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12} xs={12}>
            <Row className="text-center">
              <Col md={12} className="px-lg-10 mb-8 mt-6">
                {/* text */}
                <span className="text-uppercase text-primary fw-semi-bold ls-md">
                  Browse Category
                </span>
                {/* heading */}
                <h2 className="h1 fw-bold mt-3">
                  Discover jobs across popular categories
                </h2>
                {/* text */}
                <p className="mb-0 fs-4">
                  Select a category and we'll show you relevant jobs for it!
                </p>
              </Col>
            </Row>
            <Row className="gy-4">
              {JobCategoriesData.map((item, index) => {
                return (
                  <Col lg={3} md={4} xs={12} key={index}>
                    <StatTopSVGIcon item={item} />
                  </Col>
                );
              })}
              {/* view all categories button/link */}
              <Col xs={12} className="mt-8 text-center">
                <Link to="/authentication/signin">
                  <Button variant="outline-primary">View All Category</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BrowseJobCategories;
