import { v4 as uuid } from 'uuid';

const JobListingRoutes = [
	{
		id: uuid(),
		menuitem: 'Home',
		link: '/'
	},
	{
		id: uuid(),
		menuitem: 'Listing',
		link: '#',
		children: [
			{
				id: uuid(),
				menuitem: 'List',
				link: '/jobs/listing/job-list/'
			},
			{
				id: uuid(),
				menuitem: 'Grid',
				link: '/jobs/listing/job-list/'
			},
			{
				id: uuid(),
				menuitem: 'Single',
				link: '/jobs/listing/helpdesk-software-engineer-web3crypto/'
			}
		]
	},
	{
		id: uuid(),
		menuitem: 'Pages',
		link: '#',
		children: [
			{
				id: uuid(),
				menuitem: 'Company List',
				link: '/jobs/company-list/'
			},
			{
				id: uuid(),
				menuitem: 'Company Single',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'About',
						link: '/jobs/company/about/'
					},
					{
						id: uuid(),
						menuitem: 'Reviews',
						link: '/jobs/company/reviews/'
					},
					{
						id: uuid(),
						menuitem: 'Jobs',
						link: '/jobs/company/jobs/'
					},
					{
						id: uuid(),
						menuitem: 'Benifits',
						link: '/jobs/company/benifits/'
					},
					{
						id: uuid(),
						menuitem: 'Photos',
						link: '/jobs/company/photos/'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Post A Job',
				link: '/jobs/post-a-job/'
			},
			{
				id: uuid(),
				menuitem: 'Upload Resume',
				link: '/jobs/upload-resume/'
			}
		]
	},

	
];

export default JobListingRoutes;
