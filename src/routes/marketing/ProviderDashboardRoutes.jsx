export const DashboardMenu = [
	{
		id: 1,
		title: 'My Dashboard',
		link: '/Providerdashboard',
		icon: 'home'
	},
	{
		id: 2,
		title: 'All Jobs',
		link: '/Providerdashboard/All-Job',
		icon: 'book'
	},
	{
		id: 3,
		title: 'Contract',
		link: '/Providerdashboard/My-Contract',
		icon: 'dollar-sign'
	},
	{
		id: 4,
		title: 'Job Applicants',
		link: '/Providerdashboard/Job-Applicants',
		icon: 'shopping-bag'
	},
	
	{
		id: 5,
		title: 'Reviews',
		link: '/Providerdashboard/provider-reviews',
		icon: 'star'
	},
	{
		id: 6,
		title: 'Earnings',
		link: '/Providerdashboard/provider-earning',
		icon: 'pie-chart'
	},
	{
		id: 7,
		title: 'Payouts',
		link: '/Providerdashboard/provider-payouts',
		icon: 'dollar-sign'
	},
	
];

export const AccountSettingsMenu = [
	
	{
		id: 1,
		title: 'Social Profiles',
		link: '/Providerdashboard/provider-social-profiles',
		icon: 'refresh-cw'
	},
	{
		id: 2,
		title: 'Delete Profile',
		link: '/Providerdashboard/provider-delete-profile',
		icon: 'trash'
	},
	{
		id: 3,
		title: 'Sign Out',
		link: '/',
		icon: 'power'
	}
];

export const StudentDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default StudentDashboardMenu;
