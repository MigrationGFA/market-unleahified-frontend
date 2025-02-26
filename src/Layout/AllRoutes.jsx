// ** Import from react dom
import { Route, Routes, Navigate } from "react-router-dom";

// ** Import core SCSS styles
import "../assets/scss/theme.scss";

// Student Dashboard Pages

import LandingPage from "../landing-job/LandingJob";
import About from "../Pages/about/About";
import Pricing from "../Pages/pricing/Pricing";
import Contact from "../Pages/contact/Contact";
import FAQs from "../Pages/compare-plan/FAQs";
import TermsOfUse from "../../src/Pages/home-academy/TermsOfUse";
import PrivacyPolicy from "../../src/Pages/home-academy/PrivacyPolicy";

// ** Import Admin Dahbaord Menu Pages
import Overview from "../Admin/overview/Overview";
import Analytics from "../Admin/analytics/Analytics";

// ** Import Admin Courses Pages
import AllJobs from "../Admin/courses/all-courses/AllJobs";
import JobCategory from "../Admin/courses/JobCategory";
import CategorySingle from "../Admin/courses/CategorySingle";

// ** Import Admin Users Pages
import JobProvider from "../Admin/user/JobProvider";
import JobSeeker from "../Admin/user/JobSeeker";
import AdminDashboardIndex from "../Admin/AdminDashboardIndex";

// ** Import Admin Authentication components
// import AdminSignIn from "../Admin/authentication/AdminSignIn";
// import AdminSignup from "../Admin/authentication/AdminSignUp"

// IMPORTS FOR HELP CENTER PAGES ( v1.3.0 )
import HelpCenter from "../Components/marketing/pages/help-center/HelpCenter";
import HelpCenterFAQ from "../Components/marketing/pages/help-center/HelpCenterFAQs";
import HelpCenterGuide from "../Components/marketing/pages/help-center/help-center-guide/HelpCenterGuide";
import HelpCenterGuideSingle from "../Components/marketing/pages/help-center/help-center-guide-single/HelpCenterGuideSingle";
import HelpCenterSupport from "../Components/marketing/pages/help-center/help-center-support/HelpCenterSupport";
import HelpCenterTransparentLayout from "../Components/marketing/pages/help-center/HelpCenterTransparentLayout";
import HelpCenterSupportForm from "../Components/marketing/pages/help-center/help-center-support/SupportForm";

// ** Import Authentication components
import ForgetPassword from "../Authentications/ForgetPassword";
import NewPassword from "../Authentications/NewPassword";
import VerifyEmail from "../Authentications/VerifyEmail";
import SignUp from "../Authentications/Signup";
import SignIn from "../Authentications/Signin";
import AuthLayout from "./Dashboard/AuthRoute";
import UserEmailVerification from "../Authentications/UserEmailVerification";

import JobListingLayout from "../Layout/JobListingLayout";
import JobsList from "../Components/marketing/pages/jobs/listing/JobsList";
import JobSingle from "../Components/marketing/pages/jobs/listing/JobSingle";
import CompanyList from "../Components/marketing/pages/jobs/company-list/CompanyList";
import CompanyAbout from "../Components/marketing/pages/jobs/company/About";
import CompanyReviews from "../Components/marketing/pages/jobs/company/Reviews";
import CompanyJobs from "../Components/marketing/pages/jobs/company/Jobs";
import CompanyBenifits from "../Components/marketing/pages/jobs/company/Benifits";
import CompanyPhotos from "../Components/marketing/pages/jobs/company/Photos";
import PostAJob from "../Components/marketing/pages/jobs/post-a-job/PostAJob";
import ProviderProfile from "../Components/marketing/pages/jobs/post-a-job-profile/ProviderProfile";
import UploadResume from "../Components/marketing/pages/jobs/upload-resume/UploadResume";
import UpdateResume from "../Components/marketing/pages/jobs/update resume/UpdateResume";
import ApplyForJob from "../Components/marketing/pages/jobs/listing/ApplyForJob";

import JobSeekerDashboard from "../Instructor/Dashboard";
import JobSeekerJob from "../Instructor/MyJob";
import JobSeekerContract from "../Instructor/ContractPage";
import JobSeekerOffer from "../Instructor/MyOffer";
import JobSeekerReviews from "../Instructor/Reviews";
import JobSeekerEarning from "../Instructor/Earnings";
import JobSeekerStudents from "../Instructor/Students";
import JobSeekerPayouts from "../Instructor/account-settings/Payouts";
import JobSeekerSocialProfiles from "../Instructor/account-settings/SocialProfiles";
import JobSeekerDeleteProfile from "../Instructor/account-settings/DeleteProfile";

import ProviderLanding from "../Instructor/ProviderLandingPage/ProviderLanding";
import ProviderInterestPage from "../Instructor/ProviderLandingPage/providerInterestPage";
import ProviderDashboard from "../Providerdashboard/Dashboard";
import ProviderJob from "../Providerdashboard/MyJob";
import ProviderContract from "../Providerdashboard/ContractPage"
import ProviderJobApplicants from '../Providerdashboard/JobApplicants';
import ProviderReviews from "../Providerdashboard/Reviews";
import ProviderEarning from "../Providerdashboard/Earnings";
import ProviderStudents from "../Providerdashboard/Students";
import ProviderPayouts from "../Providerdashboard/account-settings/Payouts";
import ProviderSocialProfiles from "../Providerdashboard/account-settings/SocialProfiles";
import ProviderDeleteProfile from "../Providerdashboard/account-settings/DeleteProfile";

import ScrollToTop from "../Components/ScrollToTop";

const AllRoutes = () => {
  return (
    <Routes>
      {/* <ScrollToTop /> */}
      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/authentication/signup" element={<SignUp />} />
        <Route path="/authentication/signin" element={<SignIn />} />
        <Route
          path="/authentication/Forget-password"
          element={<ForgetPassword />}
        />

        <Route path="/user/verify-email" element={<UserEmailVerification />} />
        <Route path="/authentication/Verify-email" element={<VerifyEmail />} />
        <Route path="/user/reset-password" element={<NewPassword />} />
      </Route>

      {/* Landing Pages */}
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/aboutus" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contactUs" element={<Contact />} />
      <Route path="/FAQs" element={<FAQs />} />
      <Route path="/support" element={<HelpCenterSupportForm />} />
      <Route path="/TermsOfUse" element={<TermsOfUse />} />
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

      {/* Routes with HelpCenterTransparentLayout */}
      <Route element={<HelpCenterTransparentLayout />}>
        <Route path="/marketing/help-center/" element={<HelpCenter />} />
      </Route>

      {/* Routes with HelpCenterLayout */}
      <Route element={<HelpCenterFAQ />}>
        <Route path="/marketing/help-center/faq/" element={<HelpCenterFAQ />} />
        <Route
          path="/marketing/help-center/guide/"
          element={<HelpCenterGuide />}
        />
        <Route
          path="/marketing/help-center/guide-single/:categoryslug/:articleslug"
          element={<HelpCenterGuideSingle />}
        />
        <Route
          path="/marketing/help-center/support/"
          element={<HelpCenterSupport />}
        />
      </Route>

      {/* Routes with JobListingLayout */}
      <Route element={<JobListingLayout />}>
        <Route path="/jobs/listing/job-list/" element={<JobsList />} />
        <Route path="/jobs/listing" element={<JobSingle />} />
        <Route path="/jobs/company-list/" element={<CompanyList />} />
        <Route path="/jobs/company/about/" element={<CompanyAbout />} />
        <Route path="/jobs/company/reviews/" element={<CompanyReviews />} />
        <Route path="/jobs/company/jobs/" element={<CompanyJobs />} />
        <Route path="/jobs/company/benifits/" element={<CompanyBenifits />} />
        <Route path="/jobs/company/photos/" element={<CompanyPhotos />} />
        <Route path="/jobs/post-a-job" element={<PostAJob />} />
        <Route path="/jobs/apply-for-this-job" element={<ApplyForJob />} />
        <Route path="/jobs/update-resume/" element={<UpdateResume />} />
      </Route>
      <Route path="/provider-profile" element={<ProviderProfile />} />
      <Route path="/jobs/upload-resume/" element={<UploadResume />} />

      {/*seeker Pages */}
      <Route path="/JobSeeker" element={<ProviderLanding />} />
      <Route path="/JobSeeker/interest-page" element={<ProviderInterestPage />} />
      <Route path="/JobSeekerdashboard" element={<JobSeekerDashboard />} />
      <Route path="/JobSeekerdashboard/My-Job" element={<JobSeekerJob />} />
      <Route
        path="/JobSeekerdashboard/My-Contract"
        element={<JobSeekerContract />}
      />
      <Route path="/JobSeekerdashboard/My-Offer" element={<JobSeekerOffer />} />

      <Route
        path="/JobSeekerdashboard/seeker-reviews"
        element={<JobSeekerReviews />}
      />
      <Route
        path="/JobSeekerdashboard/seeker-earning"
        element={<JobSeekerEarning />}
      />
      <Route
        path="/JobSeekerdashboard/seeker-students"
        element={<JobSeekerStudents />}
      />
      <Route
        path="/JobSeekerdashboard/seeker-payouts"
        element={<JobSeekerPayouts />}
      />

      <Route
        path="/JobSeekerdashboard/seeker-social-profiles"
        element={<JobSeekerSocialProfiles />}
      />
      <Route
        path="/JobSeekerdashboard/seeker-delete-profile"
        element={<JobSeekerDeleteProfile />}
      />

{/* Routes (ADMIN DASHBOARD ROUTERS) with DashboardIndex */}
<Route element={<AdminDashboardIndex />}>
        <Route path="admin/dashboard/overview" element={<Overview />} />
        <Route path="admin/dashboard/analytics" element={<Analytics />} />
        <Route path="admin/jobs/all-jobs" element={<AllJobs />} />
        <Route path="admin/jobs/job-category" element={<JobCategory />} />
        <Route path="admin/jobs/category-single" element={<CategorySingle />} />
        <Route path="/admin/jobProvider" element={<JobProvider />} />
        <Route path="/admin/jobSeeker" element={<JobSeeker />} />
        <Route
          path="admin/dashboard/layouts/layout-vertical"
          element={<Overview />}
        />
      </Route>


       {/* Instructor Pages */}
       <Route path="/Providerdashboard" element={<ProviderDashboard />} />
      <Route
        path="/Providerdashboard/All-Job"
        element={<ProviderJob />}
      />
      <Route
        path="/Providerdashboard/My-Contract"
        element={<ProviderContract/>}
      />
      <Route
        path="/Providerdashboard/Job-Applicants"
        element={<ProviderJobApplicants/>}
      />
      
      <Route
        path="/Providerdashboard/provider-reviews"
        element={<ProviderReviews />}
      />
      <Route
        path="/Providerdashboard/provider-earning"
        element={<ProviderEarning />}
      />
      <Route
        path="/Providerdashboard/provider-students"
        element={<ProviderStudents />}
      />
      <Route
        path="/Providerdashboard/provider-payouts"
        element={<ProviderPayouts />}
      />

      <Route
        path="/Providerdashboard/provider-social-profiles"
        element={<ProviderSocialProfiles />}
      />
      <Route
        path="/Providerdashboard/provider-delete-profile"
        element={<ProviderDeleteProfile />}
      />
    </Routes>
  );
};

export default AllRoutes;
