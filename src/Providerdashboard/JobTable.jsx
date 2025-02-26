import React, { Fragment, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import DotBadge from "../Components/elements/bootstrap/DotBadge";
import TanstackTable from "../Components/elements/advance-table/TanstackTable";
import { PaystackButton } from "react-paystack";
import { usePaystackPayment } from "react-paystack";
import PaystackPop from "@paystack/inline-js";
import { PaystackConsumer } from "react-paystack";
import { showToast } from "../Components/Showtoast";
import axios from "axios";
import { toast } from "react-toastify";

const JobTable = ({ data, header }) => {
  const emailUser = sessionStorage.getItem("email");
  const UserId = sessionStorage.getItem("UserId");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const config = {
    email: emailUser,
    amount: 0,
    publicKey: "pk_test_57f928ef3b08dc974a816c89f7687c37e9afb03c",
  };

  const onSuccess = (reference) => {
    console.log("this is success caling");
    axios
      .post(
        "https://unleashified-backend.azurewebsites.net/api/v1//provider-payment",
        {
          reference: reference.reference,
          email: emailUser,
          jobId: sessionStorage.getItem("jobId"),
          userId: UserId,
        }
      )
      .then((response) => {
        if (response.data.message === "Course Purchased Successfully") {
          showToast(response.data.message);
          navigate("/student-My-Course/Learning");
        } else {
          showToast("payment for course not verify");
          // Handle other response statuses if needed
        }
      })
      .catch((error) => {
        showToast("An error occurred during payment verification");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onClose = () => {
    console.log("this is been called");
    showToast("You have canceled the transaction");
  };

  const PaystackHookExample = ({ jobId, jobPrice }) => {
    const amountValue = parseFloat(jobPrice.replace(/,/g, ""));
    const updatedConfig = {
      ...config,
      amount: amountValue * 100,
    };
    const initializePayment = usePaystackPayment(updatedConfig);
    const handlePaymentClick = () => {
      console.log("this is config", updatedConfig);

      sessionStorage.setItem("jobId", jobId);
      sessionStorage.setItem("jobPrice", jobPrice);
      initializePayment(onSuccess, onclose);
    };

    return (
      <div>
        {loading ? (
          <button
            className="btn btn-primary"
            style={{ opacity: ".7" }}
            disabled
          >
            Processing
          </button>
        ) : (
          <button onClick={handlePaymentClick} className="btn btn-primary">
            Make Payment
          </button>
        )}
      </div>
    );
  };

  // const handlePayment = () => {
  //   const paystack = new PaystackPop();
  //   paystack.newTransaction({
  //     key: "pk_test_57f928ef3b08dc974a816c89f7687c37e9afb03c",
  //     email: emailUser,
  //     amount: 2000,
  //     firstName: "janet",
  //     lastName: "james",
  //     onSuccess(transaction) {
  //       axios
  //         .post("https://api.liight.com.ng/v1/verifypaystack", {
  //           ref: transaction.reference,
  //           type: sessionStorage.getItem("type"),
  //           ver_id: sessionStorage.getItem("verId"),
  //         })
  //         .then((response) => {
  //           if (response.status === 201) {
  //             setLoading(false);

  //             const paymentId = response.data.data.payment_id;

  //             sessionStorage.setItem("paymentId", paymentId);

  //             const messageResponse = response.data.message;

  //             toast.success(response.data.message, {
  //               position: toast.POSITION.TOP_RIGHT,
  //             });
  //             // setOpenModal(true);
  //             // setBlurBackground(true); // Apply blur effect when modal is open
  //           } else {
  //             setLoading(false);
  //             // Handle other response statuses if needed
  //           }
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //           // Handle any errors during verification
  //           toast.error(error, {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         });

  //     },
  //      onCancel() {
  //           setLoading(false);
  //           toast.error("You have canceled the transaction", {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         };
  //   });
  // };

  const handlePayment = (jobId, jobPrice) => {
    setLoading(true);
    const amountValue = parseFloat(jobPrice.replace(/,/g, ""));
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_57f928ef3b08dc974a816c89f7687c37e9afb03c",
      email: emailUser,
      amount: amountValue * 100,
      onSuccess(reference) {
        axios
          .post(
            "https://unleashified-backend.azurewebsites.net/api/v1/provider-payment",
            {
              reference: reference.reference,
              email: emailUser,
              jobId: jobId,
              userId: UserId,
            }
          )
          .then((response) => {
            if (response.status === 201) {
              setLoading(false);
              showToast(response.data.message);

              // setOpenModal(true);
              // setBlurBackground(true); // Apply blur effect when modal is open
            } else {
              setLoading(false);
              // Handle other response statuses if needed
            }
          })
          .catch((error) => {
            setLoading(false);
            // Handle any errors during verification
            showToast(error.response.data.message);
          });
      },
      onCancel() {
        setLoading(false);
        console.log("enter here");
        showToast("You have canceled the transaction");
      },
    });
  };

  const columns = useMemo(() => {
    return header.map(({ accessorKey, header }) => ({
      header: header,
      accessorKey: accessorKey,
      cell: ({ row }) => {
        if (accessorKey === "jobTitle") {
          return (
            <Link to="#" className="text-inherit">
              <h4 className="mb-1 text-primary-hover">
                {row.original.jobTitle}
              </h4>
              <span className="text-inherit">{row.original.deliveryDate}</span>
            </Link>
          );
        } else if (accessorKey === "status") {
          return (
            <Fragment>
              <DotBadge
                bg={
                  row.original.status.toLowerCase() === "ongoing"
                    ? "warning"
                    : row.original.status.toLowerCase() === "completed"
                    ? "success"
                    : row.original.status.toLowerCase() === "pending"
                    ? "primary"
                    : ""
                }
              ></DotBadge>
              {row.original.status
                ? row.original.status.charAt(0).toUpperCase() +
                  row.original.status.slice(1)
                : ""}
            </Fragment>
          );
        } else if (accessorKey === "paymentStatus") {
          return (
            <Fragment>
              {row.original.paymentStatus === "paid" ? (
                <Button variant="success" disabled>
                  Paid
                </Button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}
                  onClick={() =>
                    handlePayment(row.original._id, row.original.jobSalary)
                  }
                >
                  {loading ? "Processing" : "Make Payment"}
                </button>
              )}
            </Fragment>
          );
        } else if (accessorKey === "action") {
          return (
            <Fragment>
              <Button href="#" variant="success" className="btn-sm">
                Completed
              </Button>
            </Fragment>
          );
        } else {
          return <span>{row.original[accessorKey]}</span>;
        }
      },
    }));
  }, [header]);

  return data ? (
    <TanstackTable
      data={data}
      columns={columns}
      filter={true}
      filterPlaceholder="Search Jobs"
      pagination={true}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default JobTable;

// <PaystackButton
//   {...componentProps}
//   className="btn btn-primary"
//   style={{ height: "100%", borderRadius: "20px" }}
//   callback={() =>
//     handlePaymentClick(row.original._id, row.original.jobSalary)
//   }
// />

// <PaystackHookExample
//   jobId={row.original._id}
//   jobPrice={row.original.jobSalary}
// />
