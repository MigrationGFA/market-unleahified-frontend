import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import JobCard from "../Components/marketing/common/cards/JobCard";
import InstructorProfileLayout from "./JobSeekerProfileLayout";
import axios from "axios";
import { useGlobalContext } from "../context/AuthContext";
import placeholderImage from "../assets/images/instructor/instructor-img-2.jpg";
import { showToast } from "../Components/Showtoast";

const MyOffer = () => {
  const { userId } = useGlobalContext();
  const [offers, setOffers] = useState([]);

  // Function to handle accepting an offer
  const handleAcceptOffer = async (offerId) => {
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/accept-reject-offer",
        {
          status: "true",
          offerId, // Use the offerId obtained from the offer object
          userId,
        }
      );
      showToast(response.data.message);
    } catch (error) {
      console.error("Error accepting offer:", error);
    }
  };

  // Function to handle rejecting an offer
  const handleRejectOffer = async (offerId) => {
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/accept-reject-offer",
        {
          status: false,
          offerId, // Use the offerId obtained from the offer object
          userId,
        }
      );
      showToast(response.data.message);
    } catch (error) {
      console.error("Error rejecting offer:", error);
    }
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-my-offers/${userId}`
        );
        // Set offers with the response data
        setOffers(response.data.offerDetails || []);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    if (userId) {
      fetchOffers();
    }
  }, [userId]);

  return (
    <InstructorProfileLayout>
      <Row>
        {offers.map((offer, index) => (
          <Col key={index} md={6} lg={4}>
            <JobCard
              companyName={offer.companyName}
              jobTitle={offer.jobTitle}
              price={offer.jobSalary}
              jobDescription={offer.jobDescription}
              deliveryTime={offer.deliveryDate}
              companyImage={offer.companyImage || placeholderImage}
              onAcceptOffer={() => handleAcceptOffer(offer.offerId)}
              onRejectOffer={() => handleRejectOffer(offer.offerId)}
            />
          </Col>
        ))}
      </Row>
    </InstructorProfileLayout>
  );
};

export default MyOffer;
