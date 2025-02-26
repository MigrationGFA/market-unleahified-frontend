import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { Col, Row, Card, Breadcrumb } from 'react-bootstrap';
import TanstackTable from '../../Components/elements/advance-table/TanstackTable';
import axios from 'axios';

const CategorySingle = ({ categoryCourses, categoryTitle, onCourseClick }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false); // Update loading state based on the fetching of courses
  }, [categoryCourses]);

  const columns = useMemo(
    () => [
      { accessorKey: 'title', header: 'Courses',
        cell: ({ row }) => (
            <button onClick={() => onCourseClick(row.original)}>{row.original.title}</button>
        ),
      },
      { accessorKey: 'dateAdded', header: 'Date Added' },
      { accessorKey: 'numberOfStudentsEnrolled', header: 'NumberOfStudentsEnrolled' },
      { accessorKey: 'amountPaid', header: 'Amount Paid' }
    ],
    [onCourseClick]
  );

  return (
    <Fragment>
      <style>
        {`
        .tanstack-table {
          border: none !important; /* Remove border around the table */
        }

        .tanstack-table tbody tr td {
          border: none !important; /* Remove borders around table cells */
        }
        `}
      </style>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">
                {categoryTitle}{' '}
                <span className="fs-5">
                  ({categoryCourses.length} Courses)
                </span>{' '}
              </h1>
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Category</Breadcrumb.Item>
                <Breadcrumb.Item active>{categoryTitle}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <button
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#newCategory"
              >
                Back to All Categories
              </button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <Card>
            <Card.Body className="p-0">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <TanstackTable
                  data={categoryCourses}
                  columns={columns}
                  filter={true}
                  filterPlaceholder="Search Course"
                  pagination={true}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CategorySingle;
