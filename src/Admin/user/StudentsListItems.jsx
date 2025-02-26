// import node module libraries
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Dropdown,
	Image,
	OverlayTrigger,
	Tooltip
} from 'react-bootstrap';
import { MoreVertical, Trash, Edit, Mail } from 'react-feather';

// import custom components
import TanstackTable from '../../Components/elements/advance-table/TanstackTable';

// import utility file
import { numberWithCommas } from '../../helper/utils';

// import data files
import { StudentsList } from '../user/StudentsData';
import axios from 'axios';

// const StudentsListItems = () => {
	// The forwardRef is important!!
	// Dropdown needs access to the DOM node in order to position the Menu

	const StudentsListItems = (studentsData) => {
		const [students, setStudents] = useState([]);
	
		useEffect(() => {
			fetchStudents();
		}, []);
	
		const fetchStudents = async () => {
			try {
				const response = await axios.get('https://remsana-backend-testing.azurewebsites.net/api/v1/students');
				setStudents(response.data);
			} catch (error) {
				console.error('Error fetching students data:', error);
			}
		};
	
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link
			to=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			className="btn-icon btn btn-ghost btn-sm rounded-circle"
		>
			{children}
		</Link>
	));

	const ActionMenu = () => {
		return (
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<MoreVertical size="15px" className="text-secondary" />
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>SETTINGS</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						{' '}
						<Edit size="15px" className="dropdown-item-icon" /> Edit
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						{' '}
						<Trash size="15px" className="dropdown-item-icon" /> Remove
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};


	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				cell: ({ getValue, row }) => {
					return (
						<div className="d-flex align-items-center">
							<Image
								src={row.original.image}
								alt=""
								className="rounded-circle avatar-md me-2"
							/>
							<h5 className="mb-0">{getValue()}</h5>
						</div>
					);
				}
			},
			{
				accessorKey: 'enrolled',
				header: 'Enrolled',
				cell: ({ getValue }) => {
					return getValue() + ' Courses';
				}
			},
			{ accessorKey: 'joined', header: 'Joined At' },
			{
				accessorKey: 'payment',
				header: 'TotaL Payment',
				cell: ({ getValue }) => {
					return '$' + numberWithCommas(getValue());
				}
			},
			{ accessorKey: 'locations', header: 'Locations' },
			{
				accessorKey: 'message',
				header: '',
				cell: () => {
					return (
						<div className="align-middle border-top-0">
							<OverlayTrigger
								key="top"
								placement="top"
								overlay={<Tooltip id={`tooltip-top`}>Message</Tooltip>}
							>
								<Link href="#">
									<Mail size="15px" className="dropdown-item-icon" />
								</Link>
							</OverlayTrigger>
						</div>
					);
				}
			},
			{
				accessorKey: 'delete',
				header: '',
				cell: () => {
					return (
						<div className="align-middle border-top-0">
							<OverlayTrigger
								key="top"
								placement="top"
								overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}
							>
								<Link href="#">
									<Trash size="15px" className="dropdown-item-icon" />
								</Link>
							</OverlayTrigger>
						</div>
					);
				}
			},
			{
				accessorKey: 'shortcutmenu',
				header: '',
				cell: () => {
					return <ActionMenu />;
				}
			}
		],
		[]
	);

	const data = useMemo(() => StudentsList, []);

	return (
		<TanstackTable
			data={data}
			columns={columns}
			filter={true}
			filterPlaceholder="Search Students"
			pagination={true} />
	);
};

export default StudentsListItems;
