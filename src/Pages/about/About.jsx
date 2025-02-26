// import node module libraries
import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';

// import sub components
import TeamGridRoundImages from './TeamGridRoundImages';
import JustifiedGallery from './JustifiedGallery';
import FeaturesList from './FeaturesList';
import HeroContent from './HeroContent';
import CTAButton from './CTAButton';
import Stat from './Stat';

// import layouts
import NavbarDefault from '../home-academy/navbars/NavbarDefault';
import FooterWithLinks from '../home-academy/FooterWithLinks';

const About = () => {
	return (
		<Fragment>
		
			<NavbarDefault  />

			<main>
				<section className="py-10 bg-white">
					<Container>
						{/* Hero Title */}
						<HeroContent />

						{/* Justified Gallery Section */}
						<JustifiedGallery />

						{/* 4 Columns Stat */}
						<Stat />
					</Container>
				</section>

				{/* Three Columns Features Section */}
				<FeaturesList />

				{/* Team Section in Rounded Image with Grid Layout */}
				<TeamGridRoundImages />

				{/* Hero Call to Action */}
				<CTAButton />
			</main>

			{/* Footer with links */}
			<FooterWithLinks />
		</Fragment>
	);
};

export default About;