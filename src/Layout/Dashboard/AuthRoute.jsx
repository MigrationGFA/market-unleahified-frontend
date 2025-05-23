// import node module libraries
import { Outlet } from 'react-router-dom';

const AuthLayout = (props) => {
	return (
		<main>
			<section className=" d-flex flex-column">
				{props.children}
				<Outlet />
			</section>
		</main>
	);
};
export default AuthLayout;
