import React, { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import DotBadge from '../../../Components/elements/bootstrap/DotBadge';
import TanstackTable from '../../../Components/elements/advance-table/TanstackTable';
import axios from 'axios';
import { showToast } from "../../../Components/Showtoast";

const CoursesTable = ({courses_data}) => {
    const [statusChanged, setStatusChanged] = useState(false);

    const handleStatusChange = async (id, status) => {
        try {
            const response = await axios.put(`https://remsana-backend-testing.azurewebsites.net/api/v1/courses/${id}`, { status });
            setStatusChanged(true);
            const message = response.data.message; // Adjust this based on the actual response structure
            showToast(message); 
        } catch (error) {
            console.error('Error updating status:', error);
            showToast('Error updating status'); 
        }
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const columns = useMemo(() => [
        {
            header: 'Courses',
            accessorKey: 'title',
            cell: ({ row, getValue }) => (
                <Link href="#" className="text-inherit">
                    <div className="d-lg-flex align-items-center">
                        <div>
                            <Image
                                src={row.original.image}
                                alt=""
                                className="img-4by3-lg rounded"
                            />
                        </div>
                        <div className="ms-lg-3 mt-2 mt-lg-0">
                            <h4 className="mb-1 text-primary-hover">{capitalizeFirstLetter(getValue())}...</h4>
                            <span className="text-inherit">
                                {row.original.date_added}
                            </span>
                        </div>
                    </div>
                </Link>
            ),
        },
        {
            header: 'Instructor',
            accessorKey: 'Agent',
            cell: ({ row }) => (
                <div className="d-flex align-items-center">
                    <Image
                        src={row.original.Agent.InstructorImage}
                        alt=""
                        className="rounded-circle avatar-xs me-2"
                    />
                   
                   <h5 className="mb-0">{row.original.Agent.username}</h5>
                </div>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ getValue }) => (
                <Fragment>
                    <DotBadge
                        bg={
                            getValue().toLowerCase() === 'pending'
                                ? 'warning'
                                : getValue().toLowerCase() === 'live'
                                ? 'success'
                                : getValue().toLowerCase() === 'reject'
                                ? 'fail'
                                : ''
                        }
                    ></DotBadge>
                    {capitalizeFirstLetter(getValue())}
                </Fragment>
            ),
        },
        {
            header: 'Action',
            accessorKey: 'action',
            cell: ({ row }) => (
                <Fragment>
                    <Button
                        variant="outline"
                        className="btn-outline-secondary btn-sm"
                        onClick={() => handleStatusChange(row.original._id, 'rejected')}
                        disabled={row.original.status === 'rejected'}
                    >
                        Reject
                    </Button>{' '}
                    <Button
                        variant="success"
                        className="btn-sm"
                        onClick={() => handleStatusChange(row.original._id, 'live')}
                        disabled={row.original.status === 'live'}
                    >
                        Approve
                    </Button>
                </Fragment>
            ),
        }
    ], []);

    const data = useMemo(() => courses_data, []);

    return (
        <Fragment>
            <TanstackTable
                data={data}
                columns={columns}
                filter={true}
                filterPlaceholder="Search Course"
                pagination={true}
            />
        </Fragment>
    );
};

export default CoursesTable;
