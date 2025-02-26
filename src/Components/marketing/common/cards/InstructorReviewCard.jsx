import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import Ratings from "../ratings/Ratings";

const InstructorReviewCard = ({ item }) => {

  return (
    <div className="d-flex">
      {/* Use the imageUrl directly from item.user */}
      <Image src={item.user.imageUrl} alt="" className="rounded-circle avatar-lg" />
      <div className="ms-3 mt-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            {/* Render the username from item.user */}
            <h4 className="mb-0">{item.user.username}</h4>

          </div>
          {/* <div>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Report Abuse</Tooltip>}
            >
              <Link
                to="#"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Report Abuse"
              >
                <i className="fe fe-flag"></i>
              </Link>
            </OverlayTrigger>
          </div> */}
        </div>
        <div className="mt-2">
          <span className="me-1 text-warning">
            <Ratings rating={item.rating} />
          </span>
          <span className="me-1">for</span>
          <span className="h5">{item.courseTitle}</span>
          <p className="mt-2">{item.review}</p>
          {/* <Link to="#" className="btn btn-outline-secondary btn-sm">
            Respond
          </Link> */}
        </div>
      </div>
    </div>
  );
};

InstructorReviewCard.propTypes = {
  item: PropTypes.shape({

    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,

    rating: PropTypes.number.isRequired,
    courseTitle: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

export default InstructorReviewCard;
